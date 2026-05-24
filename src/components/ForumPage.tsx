import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Pin,
  Flame,
  Search,
  X,
  Heart,
  Loader2,
  Image as ImageIcon,
  SlidersHorizontal,
  Plus,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { forumApi, IForumThread, IForumReply } from '../services/forum.service';
import { useAuth } from '../context/AuthContext';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

const categories = [
  { id: 'all', label: 'All Discussions' },
  { id: 'News', label: 'News' },
  { id: 'Rare Media', label: 'Rare Media' },
  { id: 'Music Discussion', label: 'Music Discussion' },
  { id: 'Family', label: 'Family' },
  { id: 'Memories', label: 'Memories' },
  { id: 'Tribute', label: 'Tribute' },
];

// ─── Theme Hook ───────────────────────────────────────────────────────────────

function useTheme() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(!document.documentElement.classList.contains('light-mode'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'theme') setIsDark(e.newValue !== 'light');
        };
        window.addEventListener('storage', onStorage);

        return () => {
            observer.disconnect();
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    return isDark;
}

// ─── Main Forum Component ─────────────────────────────────────────────────────

export default function ForumPage() {
  const isDark = useTheme();
  const bg = isDark ? '#0A0A0A' : '#F8F9FA';
  const textColor = isDark ? '#FFFFFF' : '#111111';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [activeThread, setActiveThread] = useState<IForumThread | null>(null);
  const [replies, setReplies] = useState<IForumReply[]>([]);
  const [threads, setThreads] = useState<IForumThread[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [composing, setComposing] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', body: '', category: 'News' });
  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectToLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        if (threadId) {
          const data = await forumApi.getThreadDetails(threadId);
          setActiveThread(data.thread);
          setReplies(data.replies);
        } else {
          await fetchThreads(true);
          setActiveThread(null);
        }
      } catch (err) {
        console.error('Content load error:', err);
        if (!threadId) navigate('/forum');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [threadId]);

  const fetchThreads = useCallback(
    async (reset = false) => {
      try {
        const currentPage = reset ? 1 : page;
        const data = await forumApi.getThreads({
          category: activeCategory === 'all' ? undefined : activeCategory,
          search: search || undefined,
          page: currentPage,
          limit: 10,
        });
        setThreads(prev => (reset ? data.threads : [...prev, ...data.threads]));
        setHasMore(data.pagination.hasMore);
        if (!reset) setPage(currentPage);
      } catch (err) {
        console.error('Error fetching threads:', err);
      }
    },
    [activeCategory, search, page]
  );

  useEffect(() => {
    if (!threadId) fetchThreads(true);
  }, [activeCategory, search]);

  const handleNewDiscussionClick = () => {
    if (!isAuthenticated) redirectToLogin();
    else setComposing(true);
  };

  const handleCreateThread = async () => {
    if (!isAuthenticated) return redirectToLogin();
    if (!newThread.title || !newThread.body) return;
    setSubmitting(true);
    try {
      const created = await forumApi.createThread(newThread);
      setComposing(false);
      setNewThread({ title: '', body: '', category: 'News' });
      navigate(`/forum/${created._id}`);
    } catch (err) {
      console.error('Thread creation failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostReply = async () => {
    if (!isAuthenticated) return redirectToLogin();
    if (!replyText || !activeThread) return;
    setSubmitting(true);
    try {
      const addedReply = await forumApi.addReply(activeThread._id, replyText, replyFile || undefined);
      setReplies(prev => [...prev, addedReply]);
      setReplyText('');
      setReplyFile(null);
    } catch (err) {
      console.error('Reply failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLike = async (replyId: string) => {
    if (!isAuthenticated) return redirectToLogin();
    try {
      const result = await forumApi.toggleLike(replyId);
      setReplies(prev =>
        prev.map(r =>
          r._id === replyId
            ? {
                ...r,
                likes: result.liked
                  ? [...r.likes, user!._id]
                  : r.likes.filter(id => id !== user!._id),
              }
            : r
        )
      );
    } catch (err) {
      console.error('Like toggle failed:', err);
    }
  };

  if (loading && !threads.length && !activeThread) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: bg }}>
        <Loader2 className="animate-spin" size={40} style={{ color: ACCENT_COLOR }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: bg }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-in  { animation: fadeUp  0.45s ease forwards; }
        .animate-modal { animation: scaleIn 0.35s cubic-bezier(.16,1,.3,1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="pt-24 md:pt-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b pb-6" style={{ borderColor }}>
            <div>
              <span 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
              >
                  <MessageSquare size={10} /> The Ledger
              </span>
              {/* Reduced heading size */}
              <h1 className="text-3xl md:text-4xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
                Global Dialogue
              </h1>
            </div>

            <button
              onClick={handleNewDiscussionClick}
              className="mt-6 md:mt-0 flex items-center justify-center gap-2 pl-4 pr-5 py-3 md:py-2.5 rounded-full border transition-all duration-300 w-full md:w-auto hover:scale-105"
              style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}
            >
              <Plus size={14} strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
                New Entry
              </span>
            </button>
          </div>

          {/* Filter bar — only on list view */}
          {!threadId && (
            <div className="pb-8">

              {/* ── DESKTOP filter row ── */}
              <div className="hidden md:flex items-center justify-between gap-6 pb-2">
                <nav className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setPage(1); }}
                      className="shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 border"
                      style={{ 
                          fontFamily: MONO,
                          backgroundColor: activeCategory === cat.id ? ACCENT_COLOR : 'transparent',
                          color: activeCategory === cat.id ? '#000' : textColor,
                          borderColor: activeCategory === cat.id ? ACCENT_COLOR : borderColor,
                          opacity: activeCategory === cat.id ? 1 : 0.6
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </nav>

                <div className="relative shrink-0 w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={12} style={{ color: textColor }} />
                  <input
                    type="text"
                    placeholder="Search ledger..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border rounded-full pl-10 pr-4 py-2.5 text-[11px] font-bold uppercase tracking-widest focus:outline-none transition-colors"
                    style={{ fontFamily: MONO, color: textColor, backgroundColor: inputBg, borderColor }}
                  />
                </div>
              </div>

              {/* ── MOBILE filter row ── */}
              <div className="flex md:hidden items-center justify-between gap-3 pb-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={12} style={{ color: textColor }} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border rounded-full pl-10 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors"
                    style={{ fontFamily: MONO, color: textColor, backgroundColor: inputBg, borderColor }}
                  />
                </div>

                <button
                  onClick={() => setFilterOpen(o => !o)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 text-[10px] font-bold uppercase tracking-widest shrink-0"
                  style={{ 
                      fontFamily: MONO,
                      backgroundColor: activeCategory !== 'all' ? ACCENT_COLOR : 'transparent',
                      color: activeCategory !== 'all' ? '#000' : textColor,
                      borderColor: activeCategory !== 'all' ? ACCENT_COLOR : borderColor,
                      opacity: activeCategory !== 'all' ? 1 : 0.6
                  }}
                >
                  <SlidersHorizontal size={12} />
                  <span>
                    {activeCategory === 'all' ? 'Filter' : categories.find(c => c.id === activeCategory)?.label}
                  </span>
                </button>
              </div>

              {/* Mobile filter drawer */}
              {filterOpen && (
                <div className="flex md:hidden gap-2 flex-wrap pt-4 animate-in">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setPage(1); setFilterOpen(false); }}
                      className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all"
                      style={{ 
                          fontFamily: MONO,
                          backgroundColor: activeCategory === cat.id ? ACCENT_COLOR : 'transparent',
                          color: activeCategory === cat.id ? '#000' : textColor,
                          borderColor: activeCategory === cat.id ? ACCENT_COLOR : borderColor,
                          opacity: activeCategory === cat.id ? 1 : 0.6
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">

        {/* ── LIST VIEW ── */}
        {!threadId ? (
          <div className="flex flex-col">
            {threads.map((thread, i) => (
              <div
                key={thread._id}
                onClick={() => navigate(`/forum/${thread._id}`)}
                className="group flex flex-col md:flex-row md:items-center py-7 border-b transition-all duration-400 cursor-pointer animate-in hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 rounded-[16px]"
                style={{ borderColor, animationDelay: `${i * 40}ms` }}
              >
                <div className="flex-grow min-w-0 md:pr-12">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.3em]"
                      style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                    >
                      {thread.category}
                    </span>
                    {thread.pinned && <Pin size={10} style={{ color: ACCENT_COLOR }} />}
                    {thread.hot && <Flame size={10} style={{ color: ACCENT_COLOR }} />}
                  </div>

                  {/* Reduced thread title size */}
                  <h3
                    className="text-lg md:text-xl font-normal group-hover:text-orange-500 transition-colors duration-300 leading-snug mb-1.5"
                    style={{ fontFamily: FONT, color: textColor }}
                  >
                    {thread.title}
                  </h3>

                  <p
                    className="text-sm font-light opacity-60 line-clamp-1 max-w-3xl"
                    style={{ fontFamily: FONT, color: textColor }}
                  >
                    {thread.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end mt-5 md:mt-0 gap-8 shrink-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={thread.author.avatar}
                      className="w-8 h-8 rounded-full border object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      style={{ borderColor }}
                      alt=""
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ fontFamily: MONO, color: textColor }}>
                        {thread.author.username}
                      </p>
                      <p className="text-[9px] opacity-40 uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                        {thread.lastActive}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center pl-6 border-l" style={{ borderColor }}>
                      <p className="text-xl font-normal leading-none group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
                        {thread.replyCount}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest mt-1 opacity-40" style={{ fontFamily: MONO, color: textColor }}>Replies</p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="py-12 flex justify-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-10 py-3 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500"
                  style={{ fontFamily: MONO, borderColor, color: textColor }}
                >
                  Load More History
                </button>
              </div>
            )}
          </div>
        ) : (

          /* ── THREAD DETAIL VIEW ── */
          <div className="animate-in max-w-4xl mx-auto py-4">

            <button 
              onClick={() => navigate('/forum')}
              className="group flex items-center gap-3 uppercase font-bold tracking-[0.2em] text-[10px] mb-10 transition-all hover:text-orange-500"
              style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
              Back to Ledger
            </button>

            {activeThread && (
              <>
                <header className="mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                    {activeThread.category}
                  </span>
                  {/* Reduced thread detail title size */}
                  <h2 className="text-3xl md:text-4xl font-normal leading-tight mb-8" style={{ fontFamily: FONT, color: textColor }}>
                    {activeThread.title}
                  </h2>
                  <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor }}>
                    <img src={activeThread.author.avatar} className="w-10 h-10 rounded-full border grayscale" style={{ borderColor }} alt="" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>{activeThread.author.username}</p>
                      <p className="text-[9px] uppercase tracking-widest mt-1 opacity-40" style={{ fontFamily: MONO, color: textColor }}>{activeThread.lastActive}</p>
                    </div>
                  </div>
                </header>

                <div className="space-y-12 mb-20">
                  <div className="pb-12 border-b" style={{ borderColor }}>
                    <p className="text-lg font-light leading-relaxed whitespace-pre-wrap opacity-90" style={{ fontFamily: FONT, color: textColor }}>
                      {activeThread.body}
                    </p>
                  </div>

                  {replies.map((reply) => (
                    <div key={reply._id} className="pb-12 border-b" style={{ borderColor }}>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <img src={reply.author.avatar} className="w-8 h-8 rounded-full border grayscale" style={{ borderColor }} alt="" />
                          <span className="text-[11px] uppercase tracking-widest font-bold" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                            {reply.author.username}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                            Ledger Entry
                        </span>
                      </div>

                      {reply.imageUrl && (
                        <div className="rounded-[20px] overflow-hidden border mb-6" style={{ borderColor }}>
                            <img src={reply.imageUrl} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Attachment" />
                        </div>
                      )}

                      <p className="text-[17px] font-light leading-relaxed mb-6 opacity-90" style={{ fontFamily: FONT, color: textColor }}>
                        {reply.body}
                      </p>
                      
                      <button
                        onClick={() => handleToggleLike(reply._id)}
                        className={`flex items-center gap-2 transition-colors ${user && reply.likes.includes(user._id) ? 'text-red-500' : 'opacity-40 hover:text-red-400'}`}
                        style={{ color: user && reply.likes.includes(user._id) ? '#ef4444' : textColor, fontFamily: MONO }}
                      >
                        <Heart size={14} fill={user && reply.likes.includes(user._id) ? 'currentColor' : 'none'} />
                        <span className="text-[11px] font-bold">{reply.likes.length}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* ── REPLY BOX ── */}
                <div
                  className="mt-8 pt-8 animate-in"
                  onClick={() => !isAuthenticated && redirectToLogin()}
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                    Add to the Ledger
                  </h4>

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    readOnly={!isAuthenticated}
                    placeholder={isAuthenticated ? "Write your contribution..." : "Click here to login and reply"}
                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors h-24 resize-none mb-6 text-base font-light cursor-pointer"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-3 cursor-pointer opacity-50 hover:opacity-100 hover:text-orange-500 transition-all group" style={{ fontFamily: MONO, color: textColor }}>
                      <input
                        type="file"
                        disabled={!isAuthenticated}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setReplyFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <ImageIcon size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        {replyFile ? replyFile.name : "Attach Image"}
                      </span>
                    </label>

                    <button
                      onClick={handlePostReply}
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                      {submitting ? <Loader2 className="animate-spin" size={14} /> : (isAuthenticated ? "Post Contribution" : "Login to Reply")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* ── NEW THREAD MODAL ── */}
      {composing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 backdrop-blur-md transition-opacity"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setComposing(false)}
          />

          {/* Reduced Modal Container Size (max-w-2xl) */}
          <div className="relative w-full max-w-2xl border rounded-[20px] shadow-2xl animate-modal overflow-hidden" style={{ backgroundColor: bg, borderColor }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-5 border-b" style={{ borderColor }}>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-1.5" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                  Community Ledger
                </p>
                {/* Reduced Modal title size */}
                <h2 className="text-xl md:text-2xl font-normal" style={{ fontFamily: FONT, color: textColor }}>
                  Create New Entry
                </h2>
              </div>
              <button onClick={() => setComposing(false)} className="opacity-40 hover:opacity-100 hover:text-red-500 transition-colors" style={{ color: textColor }}>
                <X size={20} />
              </button>
            </div>

            {/* Compose area */}
            <div className="px-6 md:px-8 pt-6 pb-6">
                
              {/* Sleek Category Dropdown */}
              <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Category
                  </label>
                  <div className="relative">
                      <select
                        value={newThread.category}
                        onChange={e => setNewThread({ ...newThread, category: e.target.value })}
                        className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base font-normal appearance-none cursor-pointer"
                        style={{ fontFamily: FONT, color: textColor, borderColor }}
                      >
                        {categories.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id} style={{ backgroundColor: bg, color: textColor }}>
                                {cat.label}
                            </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" style={{ color: textColor }} />
                  </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Discussion Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a descriptive title..."
                    value={newThread.title}
                    onChange={e => setNewThread({ ...newThread, title: e.target.value })}
                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-lg font-normal"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />
              </div>

              <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Your Thoughts
                  </label>
                  <textarea
                    placeholder="What would you like to discuss?"
                    value={newThread.body}
                    onChange={e => setNewThread({ ...newThread, body: e.target.value })}
                    rows={4} // Reduced rows to fit laptop screens better
                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base font-light resize-none leading-relaxed"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />
              </div>
            </div>

            {/* Action footer */}
            <div className="px-6 md:px-8 py-5 bg-black/5 dark:bg-white/5 border-t flex justify-end" style={{ borderColor }}>
              <button
                onClick={handleCreateThread}
                disabled={submitting}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-all disabled:opacity-50"
                style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
              >
                {submitting ? <Loader2 className="animate-spin" size={14} /> : 'Publish Entry'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, X, Loader2, Mic, Eye, Clock, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostService, IPost, ICategory } from '../services/post.service';

const ACCENT = '#FF8C00';
const FONT   = 'Georgia, serif';
const MONO   = '"Courier New", Courier, monospace';

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatDuration(seconds?: number): string {
    if (!seconds) return '';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
}

function getSpotifyEmbed(post: IPost): string | null {
    if (post.mediaMeta?.spotifyId) {
        const type = post.mediaMeta?.spotifyType || 'track';
        return `https://open.spotify.com/embed/${type}/${post.mediaMeta.spotifyId}?utm_source=generator&theme=0`;
    }
    if (post.mediaUrl) {
        const match = post.mediaUrl.match(/open\.spotify\.com\/(track|album|episode|playlist)\/([A-Za-z0-9]+)/);
        if (match) {
            return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
        }
    }
    return null;
}

/* ─── Floating Mini Player ───────────────────────────────────────────────── */
function MiniPlayer({ post, onClose }: { post: IPost; onClose: () => void }) {
    const embedUrl = getSpotifyEmbed(post);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 350);
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-350 ease-out"
            style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
        >
            <div
                className="mx-auto max-w-2xl rounded-t-3xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}
            >
                {/* Header */}
                <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1A]">
                        <img src={post.thumbnail || '/placeholder.jpg'} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate leading-tight" style={{ fontFamily: FONT }}>{post.title}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: ACCENT, fontFamily: MONO }}>{post.category?.name}</p>
                    </div>
                    <Link
                        to={`/audio/${post.slug}`}
                        onClick={handleClose}
                        className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest no-underline transition-all shrink-0"
                        style={{ backgroundColor: 'rgba(255,140,0,0.1)', color: ACCENT, border: '1px solid rgba(255,140,0,0.2)', fontFamily: MONO }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.color = '#000'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,140,0,0.1)'; e.currentTarget.style.color = ACCENT; }}
                    >
                        Full Page
                    </Link>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                    >
                        <X size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                    </button>
                </div>
                {/* Spotify embed */}
                {embedUrl ? (
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="block"
                        style={{ border: 'none' }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-20" style={{ backgroundColor: '#0A0A0A' }}>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: MONO }}>No Spotify link available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Small Horizontal Card ──────────────────────────────────────────────── */
function TrackCard({ post, onPlay }: { post: IPost; onPlay: (post: IPost) => void }) {
    const duration = formatDuration(post.duration);
    return (
        <Link to={`/audio/${post.slug}`} className="group block no-underline shrink-0" style={{ width: '160px' }}>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 bg-[#1A1A1A]">
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
                />
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); onPlay(post); }}
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    style={{ backgroundColor: ACCENT }}
                >
                    <Play size={14} fill="#000" color="#000" className="ml-0.5" />
                </button>
                {duration && (
                    <div
                        className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold"
                        style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: 'rgba(255,255,255,0.8)', fontFamily: MONO }}
                    >
                        <Clock size={8} />{duration}
                    </div>
                )}
            </div>
            <p className="text-xs font-bold text-white/80 line-clamp-2 leading-snug mb-1 group-hover:text-[#FF8C00] transition-colors" style={{ fontFamily: FONT }}>
                {post.title}
            </p>
            <p className="text-[10px] text-white/30" style={{ fontFamily: MONO }}>{post.category?.name}</p>
        </Link>
    );
}

/* ─── Quick Pick Tile ────────────────────────────────────────────────────── */
function QuickTile({ post, onPlay }: { post: IPost; onPlay: (post: IPost) => void }) {
    return (
        <Link
            to={`/audio/${post.slug}`}
            className="group flex items-center gap-3 rounded-lg overflow-hidden no-underline transition-all duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
        >
            <div className="w-16 h-16 shrink-0 overflow-hidden">
                <img src={post.thumbnail || '/placeholder.jpg'} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-bold text-white/80 line-clamp-2 leading-snug pr-3 flex-1 group-hover:text-white transition-colors" style={{ fontFamily: FONT }}>
                {post.title}
            </p>
            <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); onPlay(post); }}
                className="w-8 h-8 rounded-full items-center justify-center mr-2 shrink-0 hidden group-hover:flex transition-all"
                style={{ backgroundColor: ACCENT }}
            >
                <Play size={12} fill="#000" color="#000" className="ml-0.5" />
            </button>
        </Link>
    );
}

/* ─── Hero Feature Card ──────────────────────────────────────────────────── */
function HeroCard({ post, onPlay }: { post: IPost; onPlay: (post: IPost) => void }) {
    const duration = formatDuration(post.duration);
    return (
        <Link
            to={`/audio/${post.slug}`}
            className="group relative block no-underline rounded-2xl overflow-hidden"
            style={{ minHeight: '280px', backgroundColor: '#1A1A1A' }}
        >
            <img
                src={post.thumbnail || '/placeholder.jpg'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-40 group-hover:brightness-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {duration && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-[9px] font-bold" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: MONO }}>
                            <Clock size={8} /> {duration}
                        </span>
                    </div>
                )}
                <h2 className="text-xl md:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-[#FF8C00] transition-colors duration-300" style={{ fontFamily: FONT }}>
                    {post.title}
                </h2>
                {post.excerpt && (
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-5" style={{ fontFamily: FONT }}>{post.excerpt}</p>
                )}
                <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); onPlay(post); }}
                    className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all group-hover:gap-3"
                    style={{ backgroundColor: ACCENT, color: '#000', fontFamily: MONO }}
                >
                    <Play size={12} fill="#000" />
                    Play Now
                </button>
            </div>
        </Link>
    );
}

/* ─── Horizontal Scroll Row ─────────────────────────────────────────────── */
function ScrollRow({ title, posts, catId, onPlay }: {
    title: string; posts: IPost[]; catId?: string; onPlay: (post: IPost) => void;
}) {
    const rowRef = useRef<HTMLDivElement>(null);
    if (!posts.length) return null;
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base md:text-lg font-bold text-white" style={{ fontFamily: FONT }}>{title}</h2>
                {catId && (
                    <Link
                        to={`/audio?category=${catId}`}
                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest no-underline transition-colors"
                        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: MONO }}
                        onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                    >
                        See all <ChevronRight size={12} />
                    </Link>
                )}
            </div>
            <div ref={rowRef} className="flex gap-5 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {posts.map(post => (
                    <TrackCard key={post._id} post={post} onPlay={onPlay} />
                ))}
            </div>
        </div>
    );
}

/* ─── Search Results Grid ────────────────────────────────────────────────── */
function SearchGrid({ posts, loading, hasMore, lastRef, onPlay }: {
    posts: IPost[]; loading: boolean; hasMore: boolean;
    lastRef: (node: HTMLDivElement | null) => void;
    onPlay: (post: IPost) => void;
}) {
    if (!loading && posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <Mic size={32} style={{ color: 'rgba(255,140,0,0.2)' }} className="mb-4" />
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: MONO }}>No results found</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
            {posts.map((post, idx, arr) => (
                <div key={post._id} ref={idx === arr.length - 1 ? lastRef : null}>
                    <TrackCard post={post} onPlay={onPlay} />
                </div>
            ))}
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function AudioPage() {
    const [allPosts,      setAllPosts]      = useState<IPost[]>([]);
    const [categories,    setCategories]    = useState<ICategory[]>([]);
    const [searchQuery,   setSearchQuery]   = useState('');
    const [debouncedQ,    setDebouncedQ]    = useState('');
    const [searchResults, setSearchResults] = useState<IPost[]>([]);
    const [searchPage,    setSearchPage]    = useState(1);
    const [searchHasMore, setSearchHasMore] = useState(true);
    const [loading,       setLoading]       = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchOpen,    setSearchOpen]    = useState(false);
    const [activePost,    setActivePost]    = useState<IPost | null>(null);

    const loadingRef  = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const inputRef    = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [catRes, postRes] = await Promise.all([
                    PostService.getCategories(),
                    PostService.getPosts({ type: 'audio', status: 'published', page: 1, limit: 50 }),
                ]);
                setCategories(catRes.data);
                setAllPosts(postRes.data.posts);
            } catch (err) {
                console.error('Failed to load audio page:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedQ(searchQuery), 400);
        return () => clearTimeout(t);
    }, [searchQuery]);

    useEffect(() => {
        setSearchResults([]);
        setSearchPage(1);
        setSearchHasMore(true);
    }, [debouncedQ]);

    useEffect(() => {
        if (debouncedQ.trim()) runSearch(searchPage);
    }, [searchPage, debouncedQ]);

    const runSearch = async (page: number) => {
        if (loadingRef.current || !debouncedQ.trim()) return;
        loadingRef.current = true;
        setSearchLoading(true);
        try {
            const res = await PostService.searchPosts({ q: debouncedQ.trim(), type: 'audio', page, limit: 15 });
            const result = res.data;
            setSearchResults(prev => page === 1 ? result.posts : [...prev, ...result.posts]);
            setSearchHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setSearchLoading(false);
            loadingRef.current = false;
        }
    };

    const lastSearchRef = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loadingRef.current && searchHasMore) setSearchPage(p => p + 1);
        }, { rootMargin: '200px' });
        if (node) observerRef.current.observe(node);
    }, [searchHasMore]);

    // Featured = backend-flagged post first, fallback to first post
    const featured   = allPosts.find(p => p.featured) ?? allPosts[0] ?? null;
    const restPosts  = featured ? allPosts.filter(p => p._id !== featured._id) : allPosts;

    const groupedByCategory = categories.map(cat => ({
        cat,
        posts: restPosts.filter(p => p.category?._id === cat._id),
    })).filter(g => g.posts.length > 0);

    const quickPicks  = restPosts.slice(0, 6);
    const isSearching = !!debouncedQ.trim();

    const openSearch  = () => { setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 50); };
    const closeSearch = () => { setSearchOpen(false); setSearchQuery(''); };

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#0A0A0A' }}>

            {/* Ambient top glow */}
            <div
                className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(255,140,0,0.06), transparent)' }}
            />

            <div
                className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-28 pb-32 relative z-10"
                style={{ paddingBottom: activePost ? '280px' : undefined }}
            >

                {/* Top Bar */}
                <div className="flex items-center justify-between mb-10 md:mb-14">
                    <div className={`transition-all duration-300 ${searchOpen ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}>
                        {/* <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: ACCENT, fontFamily: MONO }}>{getGreeting()}</p> */}
                        <h1 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: FONT }}>Audio Feed</h1>
                    </div>
                    <div className={`flex items-center gap-3 transition-all duration-300 ${searchOpen ? 'flex-1' : ''}`}>
                        {searchOpen ? (
                            <div className="flex items-center flex-1 rounded-2xl px-4 py-3 gap-3" style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,140,0,0.3)' }}>
                                <Search size={15} style={{ color: ACCENT, flexShrink: 0 }} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search audio…"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/20"
                                    style={{ fontFamily: FONT }}
                                />
                                <button onClick={closeSearch} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}><X size={15} /></button>
                            </div>
                        ) : (
                            <button
                                onClick={openSearch}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,140,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,140,0,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                <Search size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin" style={{ color: 'rgba(255,140,0,0.4)' }} size={28} />
                        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: MONO }}>Loading your collection…</p>
                    </div>
                )}

                {/* Search results */}
                {!loading && isSearching && (
                    <div>
                        <p className="text-sm text-white/30 mb-8" style={{ fontFamily: MONO }}>
                            Results for <span className="text-white font-bold">"{debouncedQ}"</span>
                        </p>
                        <SearchGrid posts={searchResults} loading={searchLoading} hasMore={searchHasMore} lastRef={lastSearchRef} onPlay={setActivePost} />
                        {searchLoading && (
                            <div className="flex justify-center py-10">
                                <Loader2 className="animate-spin" style={{ color: 'rgba(255,140,0,0.4)' }} size={20} />
                            </div>
                        )}
                    </div>
                )}

                {/* Home content */}
                {!loading && !isSearching && (
                    <>
                        {/* Hero — featured or first post, no badge */}
                        {featured && (
                            <div className="mb-12">
                                <HeroCard post={featured} onPlay={setActivePost} />
                            </div>
                        )}

                        {/* Quick Picks — remaining posts, never includes the hero */}
                        {quickPicks.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-base md:text-lg font-bold text-white mb-5" style={{ fontFamily: FONT }}>Quick Picks</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {quickPicks.map(post => (
                                        <QuickTile key={post._id} post={post} onPlay={setActivePost} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {groupedByCategory.map(({ cat, posts }) => (
                            <ScrollRow key={cat._id} title={cat.name} posts={posts} catId={cat._id} onPlay={setActivePost} />
                        ))}

                        {groupedByCategory.length === 0 && restPosts.length > 0 && (
                            <ScrollRow title="All Episodes" posts={restPosts} onPlay={setActivePost} />
                        )}

                        {allPosts.length === 0 && (
                            <div
                                className="flex flex-col items-center justify-center py-40 rounded-3xl"
                                style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.06)' }}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(255,140,0,0.06)', border: '1px solid rgba(255,140,0,0.1)' }}>
                                    <Mic size={24} style={{ color: 'rgba(255,140,0,0.3)' }} />
                                </div>
                                <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: MONO }}>No audio published yet</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Floating Mini Player */}
            {activePost && (
                <MiniPlayer post={activePost} onClose={() => setActivePost(null)} />
            )}
        </div>
    );
}
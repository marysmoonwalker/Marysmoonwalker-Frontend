import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Loader2, Eye, Calendar, ArrowLeft, Mic,
    SkipBack, SkipForward, ChevronUp, ChevronDown, List
} from 'lucide-react';
import { PostService, IPost } from '../services/post.service';

const FONT  = 'Georgia, serif';
const MONO  = '"Courier New", Courier, monospace';
const GREEN = '#1DB954';
const DIM   = 'rgba(255,255,255,0.75)';

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatDuration(seconds?: number): string {
    if (!seconds) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function getSpotifyEmbed(post: IPost | null): string | null {
    if (!post) return null;
    if (post.mediaMeta?.spotifyId) {
        const type = post.mediaMeta?.spotifyType || 'episode';
        return `https://open.spotify.com/embed/${type}/${post.mediaMeta.spotifyId}?utm_source=generator&theme=0`;
    }
    if (post.mediaUrl) {
        const m = post.mediaUrl.match(/open\.spotify\.com\/(track|album|episode|playlist)\/([A-Za-z0-9]+)/);
        if (m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`;
    }
    return null;
}

function getSpotifyOpenUrl(post: IPost | null): string | null {
    if (!post) return null;
    if (post.mediaMeta?.spotifyId) {
        const type = post.mediaMeta?.spotifyType || 'episode';
        return `https://open.spotify.com/${type}/${post.mediaMeta.spotifyId}`;
    }
    if (post.mediaUrl?.includes('open.spotify.com')) return post.mediaUrl;
    return null;
}

/* ─── Queue Item ─────────────────────────────────────────────────────────── */
function QueueItem({
    post, index, isActive, onSelect,
}: {
    post: IPost; index: number; isActive: boolean; onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all"
            style={{ backgroundColor: isActive ? 'rgba(29,185,84,0.1)' : 'transparent' }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = isActive ? 'rgba(29,185,84,0.1)' : 'transparent'; }}
        >
            {/* Index */}
            <div className="w-7 flex items-center justify-center shrink-0">
                {isActive
                    ? <Mic size={12} style={{ color: GREEN }} />
                    : <span className="text-[11px]" style={{ color: DIM, fontFamily: MONO }}>{index + 1}</span>
                }
            </div>
            {/* Thumbnail */}
            <div className="w-9 h-9 rounded shrink-0 overflow-hidden bg-[#1A1A1A]">
                <img src={post.thumbnail || '/placeholder.jpg'} alt={post.title} className="w-full h-full object-cover" />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate leading-tight" style={{ color: isActive ? GREEN : 'rgba(255,255,255,0.95)', fontFamily: FONT }}>
                    {post.title}
                </p>
                <p className="text-[10px] truncate mt-0.5" style={{ color: DIM, fontFamily: MONO }}>
                    {post.category?.name || 'Audio'}
                </p>
            </div>
            {/* Duration */}
            {post.duration && (
                <span className="text-[10px] shrink-0" style={{ color: DIM, fontFamily: MONO }}>
                    {formatDuration(post.duration)}
                </span>
            )}
        </button>
    );
}

/* ─── Related Sidebar Card ───────────────────────────────────────────────── */
function RelatedCard({ post, isActive, onSelect }: {
    post: IPost; isActive: boolean; onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className="group w-full flex gap-4 py-4 text-left transition-all border-b last:border-0"
            style={{ borderColor: isActive ? `${GREEN}30` : 'rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}25`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = isActive ? `${GREEN}30` : 'rgba(255,255,255,0.05)'; }}
        >
            <div className="relative w-28 sm:w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: isActive ? 1 : 0.7 }}
                />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <h4
                    className="text-[13px] font-light leading-snug line-clamp-2 transition-colors"
                    style={{ color: isActive ? GREEN : 'rgba(255,255,255,0.9)', fontFamily: FONT }}
                >
                    {post.title}
                </h4>
                {post.duration && (
                    <span className="text-[10px]" style={{ color: DIM, fontFamily: MONO }}>
                        {formatDuration(post.duration)}
                    </span>
                )}
            </div>
        </button>
    );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function AudioDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate  = useNavigate();

    const [post,      setPost]      = useState<IPost | null>(null);
    const [queue,     setQueue]     = useState<IPost[]>([]);
    const [queueIdx,  setQueueIdx]  = useState(0);
    const [loading,   setLoading]   = useState(true);
    const [error,     setError]     = useState(false);
    const [queueOpen, setQueueOpen] = useState(false);
    const [barOpen,   setBarOpen]   = useState(true);

    /* ── Load post + build queue ──────────────────────────────────────── */
    useEffect(() => {
        if (!slug) return;
        window.scrollTo({ top: 0 });
        loadPost(slug);
    }, [slug]);

    const loadPost = async (s: string) => {
        setLoading(true);
        setError(false);
        try {
            const res    = await PostService.getPostBySlug(s);
            const p      = res.data;
            setPost(p);
            const rel    = await PostService.getPosts({ type: 'audio', status: 'published', limit: 20 });
            const all: IPost[] = rel.data.posts;
            const others = all.filter(r => r._id !== p._id);
            setQueue([p, ...others]);
            setQueueIdx(0);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    /* ── Navigate to a track by queue index ──────────────────────────── */
    const goToTrack = useCallback((idx: number) => {
        const target = queue[idx];
        if (!target) return;
        setQueueIdx(idx);
        navigate(`/audio/${target.slug}`, { replace: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [queue, navigate]);

    /* ── Prev / Next ──────────────────────────────────────────────────── */
    const handlePrev = useCallback(() => {
        if (queueIdx > 0) goToTrack(queueIdx - 1);
    }, [queueIdx, goToTrack]);

    const handleNext = useCallback(() => {
        if (queueIdx < queue.length - 1) goToTrack(queueIdx + 1);
    }, [queueIdx, queue.length, goToTrack]);

    /* ── Sync idx when slug changes from sidebar nav ──────────────────── */
    useEffect(() => {
        if (!slug || queue.length === 0) return;
        const idx = queue.findIndex(p => p.slug === slug);
        if (idx !== -1 && idx !== queueIdx) setQueueIdx(idx);
    }, [slug, queue]);

    /* ── Keyboard shortcuts ───────────────────────────────────────────── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
            if (e.code === 'ArrowRight') { e.preventDefault(); handleNext(); }
            if (e.code === 'ArrowLeft')  { e.preventDefault(); handlePrev(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleNext, handlePrev]);

    /* ── Derived ──────────────────────────────────────────────────────── */
    const currentPost = queue[queueIdx] || post;
    const embedUrl    = getSpotifyEmbed(currentPost);
    const spotifyUrl  = getSpotifyOpenUrl(currentPost);
    const related     = queue.slice(1, 6);
    const hasPrev     = queueIdx > 0;
    const hasNext     = queueIdx < queue.length - 1;

    /* ── Loading ──────────────────────────────────────────────────────── */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin" size={32} style={{ color: `${GREEN}40` }} />
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: MONO }}>
                        Loading episode…
                    </p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: '#050505' }}>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: FONT }}>
                    Audio not found
                </p>
                <Link to="/audio" className="text-sm no-underline" style={{ color: `${GREEN}80` }}>
                    ← Back to Audio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#050505', paddingBottom: '100px' }}>

            {/* Blurred album art backdrop */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {currentPost?.thumbnail && (
                    <img
                        key={currentPost._id}
                        src={currentPost.thumbnail}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: 'blur(120px)', opacity: 0.07, transform: 'scale(1.3)', transition: 'opacity 1s ease' }}
                    />
                )}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.55) 40%, #050505 100%)' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-8 relative z-10">

                {/* ── Main layout ───────────────────────────────────────── */}
                <div className="flex flex-col xl:flex-row items-start justify-center gap-16">

                    {/* ── Left column ─────────────────────────────────────── */}
                    <div className="flex-1 w-full xl:max-w-[850px] mx-auto">

                        {/* Back link */}
                        <div className="mb-10">
                            <Link
                                to="/audio"
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] no-underline transition-colors"
                                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: MONO }}
                                onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                            >
                                <ArrowLeft size={12} /> Back to Collection
                            </Link>
                        </div>

                        {/* Album art + episode info */}
                        <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">

                            {/* Art */}
                            <div
                                className="w-full sm:w-56 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-2xl"
                                style={{ boxShadow: `0 32px 80px ${GREEN}18` }}
                            >
                                <img
                                    key={currentPost?._id}
                                    src={currentPost?.thumbnail || '/placeholder.jpg'}
                                    alt={currentPost?.title}
                                    className="w-full h-full object-cover"
                                    style={{ transition: 'opacity 0.5s ease' }}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-end flex-1 min-w-0 pt-2">
                                <p className="text-[9px] font-black uppercase tracking-[0.35em] mb-3" style={{ color: GREEN, fontFamily: MONO }}>
                                    {currentPost?.category?.name || 'Episode'}
                                </p>
                                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3" style={{ fontFamily: FONT }}>
                                    {currentPost?.title}
                                </h1>
                                {currentPost?.excerpt && (
                                    <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: FONT }}>
                                        {currentPost.excerpt}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-4 text-[10px]" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: MONO }}>
                                    {currentPost?.createdAt && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={10} />
                                            {new Date(currentPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    )}
                                    {currentPost?.viewsCount ? (
                                        <span className="flex items-center gap-1.5">
                                            <Eye size={10} /> {currentPost.viewsCount.toLocaleString()} plays
                                        </span>
                                    ) : null}
                                    {currentPost?.duration ? (
                                        <span>{formatDuration(currentPost.duration)}</span>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* ── Spotify embed — the actual player ─────────────── */}
                        <div
                            className="rounded-2xl overflow-hidden mb-4 shadow-2xl"
                            style={{ border: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#000' }}
                        >
                            {embedUrl ? (
                                <iframe
                                    key={currentPost?._id}
                                    src={embedUrl}
                                    title={currentPost?.title}
                                    width="100%"
                                    height="152"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="block"
                                    style={{ border: 'none' }}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-36 gap-3" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                    <Mic size={32} style={{ color: 'rgba(255,255,255,0.15)' }} />
                                    <p className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: MONO }}>
                                        No Spotify source attached
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Article sections */}
                        {post.sections && post.sections.length > 0 && (
                            <div className="space-y-12 max-w-3xl mx-auto mt-10">
                                {post.sections.map((section: any, idx: number) => (
                                    <div key={idx}>
                                        {section.type === 'text' && section.content && (
                                            <div
                                                className="leading-loose text-[16px]"
                                                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: FONT }}
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        )}
                                        {section.type === 'image' && section.mediaUrl && (
                                            <figure className="my-12">
                                                <img
                                                    src={section.mediaUrl}
                                                    alt={section.caption}
                                                    className="w-full rounded-xl"
                                                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                                                />
                                                {section.caption && (
                                                    <figcaption className="text-center text-[11px] mt-4 italic" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}>
                                                        {section.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Up Next sidebar ───────────────────────────── */}
                    {related.length > 0 && (
                        <aside className="w-full xl:w-72 shrink-0">
                            <div className="sticky top-32">
                                <h3
                                    className="text-[10px] uppercase tracking-[0.4em] mb-6 pb-3"
                                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: FONT, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    Up Next
                                </h3>
                                <div className="flex flex-col">
                                    {related.map((r, i) => (
                                        <RelatedCard
                                            key={r._id}
                                            post={r}
                                            isActive={queue[queueIdx]?._id === r._id}
                                            onSelect={() => goToTrack(i + 1)}
                                        />
                                    ))}
                                </div>
                                <Link
                                    to="/audio"
                                    className="inline-flex items-center gap-2 mt-10 text-[10px] uppercase tracking-widest no-underline transition-colors"
                                    style={{ color: `${GREEN}80`, fontFamily: FONT }}
                                    onMouseEnter={e => (e.currentTarget.style.color = GREEN)}
                                    onMouseLeave={e => (e.currentTarget.style.color = `${GREEN}80`)}
                                >
                                    <span>Back to Archive</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BOTTOM BAR — episode navigation only
                Spotify iframe handles all audio playback
            ══════════════════════════════════════════════════════════════ */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50"
                style={{
                    backgroundColor: '#0A0A0A',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    transform: barOpen ? 'translateY(0)' : 'translateY(calc(100% - 4px))',
                    transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                {/* Collapse / expand tab */}
                <button
                    onClick={() => setBarOpen(o => !o)}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-6 flex items-center justify-center rounded-t-xl"
                    style={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.07)', borderBottom: 'none' }}
                >
                    {barOpen
                        ? <ChevronDown size={14} style={{ color: DIM }} />
                        : <ChevronUp   size={14} style={{ color: DIM }} />
                    }
                </button>

                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-6">

                        {/* Left: current episode info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 shadow-lg">
                                <img
                                    src={currentPost?.thumbnail || '/placeholder.jpg'}
                                    alt={currentPost?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-white truncate leading-tight" style={{ fontFamily: FONT }}>
                                    {currentPost?.title}
                                </p>
                                <p className="text-[10px] truncate mt-0.5" style={{ color: DIM, fontFamily: MONO }}>
                                    {currentPost?.category?.name || 'Audio'}
                                    {currentPost?.duration ? ` · ${formatDuration(currentPost.duration)}` : ''}
                                </p>
                            </div>
                        </div>

                        {/* Centre: prev / counter / next */}
                        <div className="flex items-center gap-4 shrink-0">

                            {/* Prev */}
                            <button
                                onClick={handlePrev}
                                disabled={!hasPrev}
                                className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                                style={{
                                    color: hasPrev ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                                    cursor: hasPrev ? 'pointer' : 'default',
                                }}
                                onMouseEnter={e => { if (hasPrev) e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { if (hasPrev) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                title="Previous episode (←)"
                            >
                                <SkipBack size={20} fill="currentColor" />
                            </button>

                            {/* Episode counter */}
                            <div
                                className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest"
                                style={{ backgroundColor: 'rgba(29,185,84,0.1)', color: GREEN, border: `1px solid ${GREEN}30`, fontFamily: MONO }}
                            >
                                {queueIdx + 1} / {queue.length}
                            </div>

                            {/* Next */}
                            <button
                                onClick={handleNext}
                                disabled={!hasNext}
                                className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                                style={{
                                    color: hasNext ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                                    cursor: hasNext ? 'pointer' : 'default',
                                }}
                                onMouseEnter={e => { if (hasNext) e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { if (hasNext) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                title="Next episode (→)"
                            >
                                <SkipForward size={20} fill="currentColor" />
                            </button>
                        </div>

                        {/* Right: open spotify + queue */}
                        <div className="flex items-center gap-3 shrink-0">
                            {spotifyUrl && (
                                <a
                                    href={spotifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest no-underline transition-all"
                                    style={{ backgroundColor: 'rgba(29,185,84,0.08)', color: `${GREEN}`, border: `1px solid ${GREEN}20`, fontFamily: MONO }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = GREEN; e.currentTarget.style.color = '#000'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(29,185,84,0.08)'; e.currentTarget.style.color = GREEN; }}
                                >
                                    {/* Spotify logo */}
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                    </svg>
                                    Open in Spotify
                                </a>
                            )}

                            <button
                                onClick={() => setQueueOpen(o => !o)}
                                className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
                                style={{ color: queueOpen ? GREEN : 'rgba(255,255,255,0.65)' }}
                                onMouseEnter={e => { if (!queueOpen) e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { if (!queueOpen) e.currentTarget.style.color = queueOpen ? GREEN : 'rgba(255,255,255,0.65)'; }}
                                title="Episode list"
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Queue panel */}
                <div
                    className="overflow-hidden"
                    style={{
                        maxHeight: queueOpen ? '360px' : '0px',
                        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                >
                    <div
                        className="py-3 overflow-y-auto"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#080808', maxHeight: '360px' }}
                    >
                        <div className="max-w-7xl mx-auto px-4">
                            <p className="text-[9px] uppercase tracking-[0.35em] mb-3 px-4" style={{ color: DIM, fontFamily: MONO }}>
                                Episodes · {queue.length} total
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {queue.map((p, i) => (
                                    <QueueItem
                                        key={p._id}
                                        post={p}
                                        index={i}
                                        isActive={i === queueIdx}
                                        onSelect={() => { goToTrack(i); setQueueOpen(false); }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
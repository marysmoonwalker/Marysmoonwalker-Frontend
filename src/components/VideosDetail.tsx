import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Play, Clock, Eye } from 'lucide-react';
import { PostService, IPost } from '../services/post.service';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

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
        return () => observer.disconnect();
    }, []);

    return isDark;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function formatDuration(seconds?: number): string {
    if (!seconds) return '';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
}

// ─── Sidebar Related Video Card ───────────────────────────────────────────────

function RelatedCard({ post, textColor, borderColor }: { post: IPost, textColor: string, borderColor: string }) {
    const duration = formatDuration(post.duration as any);
    const timePosted = timeAgo(post.createdAt);

    return (
        <Link
            to={`/videos/${post.slug}`}
            className="group flex gap-3 mb-4 no-underline items-start"
        >
            <div className="relative w-40 shrink-0 aspect-video rounded-xl overflow-hidden bg-zinc-900 border" style={{ borderColor }}>
                <img
                    src={post.thumbnail || `https://img.youtube.com/vi/${post.mediaMeta?.videoId}/hqdefault.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* YouTube Style Duration Badge */}
                {duration && (
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-[1px] bg-black/80 rounded-[4px] text-[10px] font-bold text-white tracking-wider" style={{ fontFamily: MONO }}>
                        {duration}
                    </div>
                )}
                
                {/* Hover Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 scale-75 group-hover:scale-100 transition-transform">
                        <Play size={12} fill="currentColor" className="translate-x-0.5" />
                    </div>
                </div>
            </div>

            <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-[14px] font-medium leading-snug line-clamp-2 transition-colors group-hover:text-orange-500 mb-1" style={{ fontFamily: FONT, color: textColor }}>
                    {post.title}
                </h4>
                
                <div className="flex flex-col text-[12px] opacity-60" style={{ fontFamily: FONT, color: textColor }}>
                    <span className="line-clamp-1 mb-0.5">@{post.author?.username || 'moonwalker'}</span>
                    <div className="flex items-center gap-1.5">
                        {post.viewsCount !== undefined && <span>{post.viewsCount.toLocaleString()} views</span>}
                        {post.viewsCount !== undefined && <span className="text-[8px]">•</span>}
                        <span>{timePosted}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ─── Main Single Video Page Component ─────────────────────────────────────────

export default function SingleVideoPage() {
    const isDark = useTheme();
    const bg = isDark ? '#0F0F0F' : '#FFFFFF'; 
    const textColor = isDark ? '#F1F1F1' : '#0F0F0F'; 
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<IPost | null>(null);
    const [related, setRelated] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) return;
        window.scrollTo({ top: 0 });
        loadPost(slug);
    }, [slug]);

    const loadPost = async (s: string) => {
        setLoading(true);
        setError(false);
        try {
            const res = await PostService.getPostBySlug(s);
            const p = res.data;
            setPost(p);

            const rel = await PostService.getPosts({
                type: 'video',
                status: 'published',
                limit: 10,
            });
            setRelated(rel.data.posts.filter(r => r._id !== p._id).slice(0, 8));
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-500" style={{ backgroundColor: bg }}>
                <Loader2 className="animate-spin" size={32} style={{ color: ACCENT_COLOR }} />
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                    Loading Video...
                </p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500" style={{ backgroundColor: bg }}>
                <p className="text-2xl font-normal" style={{ fontFamily: FONT, color: textColor }}>Video Unavailable</p>
                <Link to="/videos" className="flex items-center gap-3 px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
                    <ArrowLeft size={14} /> Back to Screening Room
                </Link>
            </div>
        );
    }

    // Identify if the video is a Short
    const isShort = 
        post.tags?.some(tag => tag.toLowerCase().includes('short')) || 
        post.category?.name.toLowerCase().includes('short') ||
        post.title.toLowerCase().includes('#shorts');

    // Adaptive Embed URL (Shorts use different YouTube routing sometimes, but embed works for both)
    const embedUrl = post?.mediaMeta?.videoId
        ? `https://www.youtube.com/embed/${post.mediaMeta.videoId}?rel=0&modestbranding=1&autoplay=1`
        : null;

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
                
                {/* Back Navigation */}
                <div className="mb-6">
                    <Link to="/videos" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-orange-500 transition-colors" style={{ fontFamily: MONO, color: textColor }}>
                        <ArrowLeft size={14} /> Back
                    </Link>
                </div>

                {/* ─── Two Column Layout ─── */}
                <div className="flex flex-col xl:flex-row items-start gap-8 lg:gap-10">
                    
                    {/* LEFT COLUMN: Main Video Player & Details */}
                    <div className="flex-1 w-full max-w-full overflow-hidden">
                        
                        {/* Video Player Container */}
                        <div className={`relative w-full bg-black rounded-2xl overflow-hidden border mb-5 mx-auto ${isShort ? 'max-w-[400px] aspect-[9/16]' : 'aspect-video'}`} style={{ borderColor }}>
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    title={post.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                    <Play size={48} className="opacity-20" style={{ color: textColor }} />
                                </div>
                            )}
                        </div>

                        {/* Video Title */}
                        <h1 className="text-2xl md:text-3xl font-medium leading-tight mb-4" style={{ fontFamily: FONT, color: textColor }}>
                            {post.title}
                        </h1>

                        {/* YouTube Style Channel Identity Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor }}>
                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border bg-zinc-800" style={{ borderColor }}>
                                    <img src={post.author?.avatar || 'https://via.placeholder.com/150'} alt="Channel" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-medium" style={{ fontFamily: FONT, color: textColor }}>
                                        @{post.author?.username || 'moonwalker'}
                                    </span>
                                    <span className="text-[12px] opacity-60" style={{ fontFamily: FONT, color: textColor }}>
                                        {post.author?.fullName || 'Contributor'}
                                    </span>
                                </div>
                            </div>

                            {/* Views & Date Metadata */}
                            <div className="flex items-center gap-4 bg-zinc-900/40 px-4 py-2 rounded-full border" style={{ borderColor }}>
                                {post.viewsCount !== undefined && (
                                    <div className="flex items-center gap-2 text-[12px] font-medium opacity-80" style={{ fontFamily: FONT, color: textColor }}>
                                        <Eye size={14} /> {post.viewsCount.toLocaleString()} views
                                    </div>
                                )}
                                <span className="opacity-30 text-[10px]" style={{ color: textColor }}>|</span>
                                <span className="text-[12px] font-medium opacity-80" style={{ fontFamily: FONT, color: textColor }}>
                                    {timeAgo(post.createdAt)}
                                </span>
                            </div>
                        </div>

                        {/* Video Description / Content Box */}
                        <div className="mt-6 p-6 rounded-2xl border" style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                {post.category && (
                                    <span className="px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-widest text-black" style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}>
                                        {post.category.name}
                                    </span>
                                )}
                                <span className="text-[13px] font-medium opacity-80" style={{ fontFamily: FONT, color: textColor }}>
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            {/* Main Text Content */}
                            <div className="prose prose-lg max-w-none text-[15px] md:text-[16px] leading-relaxed opacity-90" style={{ fontFamily: FONT, color: textColor }}>
                                {post.excerpt && <p className="mb-6 font-medium">{post.excerpt}</p>}
                                
                                {post.sections?.map((section, idx) => (
                                    <div key={idx}>
                                        {section.type === 'text' && section.content && (
                                            <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 pt-6 border-t flex flex-wrap gap-2" style={{ borderColor }}>
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-[13px] font-medium transition-colors hover:text-orange-500 cursor-pointer" style={{ color: ACCENT_COLOR, fontFamily: FONT }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Up Next) */}
                    {related.length > 0 && (
                        <aside className="w-full xl:w-[420px] shrink-0 mt-8 xl:mt-0">
                            <h3 className="text-[16px] font-medium mb-4" style={{ fontFamily: FONT, color: textColor }}>
                                Up Next
                            </h3>
                            <div className="flex flex-col">
                                {related.map(r => (
                                    <RelatedCard key={r._id} post={r} textColor={textColor} borderColor={borderColor} />
                                ))}
                            </div>
                        </aside>
                    )}

                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, Eye, Calendar, ArrowLeft, Mic } from 'lucide-react';
import { PostService, IPost } from '../services/post.service';

const FONT = 'Georgia, serif';

/** Sidebar Related Card */
function RelatedCard({ post }: { post: IPost }) {
    return (
        <Link
            to={`/audio/${post.slug}`}
            className="group flex gap-4 py-4 border-b border-white/5 hover:border-[#1DB954]/15 transition-all no-underline last:border-0"
        >
            <div className="relative w-28 sm:w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <Mic size={10} className="text-[#1DB954]" />
                </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4
                    className="text-[13px] font-light text-white/70 leading-snug line-clamp-2 group-hover:text-[#1DB954] transition-colors"
                    style={{ fontFamily: FONT }}
                >
                    {post.title}
                </h4>
            </div>
        </Link>
    );
}

export default function SingleAudioPage() {
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
                type: 'audio',
                status: 'published',
                limit: 6,
            });
            setRelated(rel.data.posts.filter(r => r._id !== p._id).slice(0, 5));
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Build Spotify embed URL from mediaMeta
    const spotifyId   = post?.mediaMeta?.spotifyId;
    const spotifyType = post?.mediaMeta?.spotifyType || 'track'; // fallback to 'track'
    const embedUrl    = spotifyId
        ? `https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`
        : null;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#1DB954]/40" size={32} />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
                <p className="text-white/20 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: FONT }}>
                    Audio not found
                </p>
                <Link to="/audio" className="text-[#1DB954]/60 hover:text-[#1DB954] text-sm no-underline">
                    Back to Audio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#1DB954]/20">
            {/* Ambient glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-[#1DB954]/[0.02] blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-32 relative z-10">

                {/* Back Link */}
                <div className="max-w-[850px] mx-auto mb-10">
                    <Link
                        to="/audio"
                        className="inline-flex items-center gap-2 text-white/20 hover:text-[#1DB954] text-[10px] uppercase tracking-[0.3em] transition-colors no-underline"
                        style={{ fontFamily: FONT }}
                    >
                        <ArrowLeft size={12} /> Back to Collection
                    </Link>
                </div>

                {/* Main Content & Sidebar Layout */}
                <div className="flex flex-col xl:flex-row items-start justify-center gap-16">

                    {/* Centered Column */}
                    <div className="flex-1 w-full xl:max-w-[850px] mx-auto">

                        {/* Spotify Embed */}
                        <div className="w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-12 bg-black">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    title={post.title}
                                    width="100%"
                                    height="152"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="block"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-36 bg-zinc-900/40">
                                    <Mic size={48} className="text-white/5" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnail (optional — shows album art or custom thumb) */}
                        {post.thumbnail && (
                            <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/5 shadow-xl mb-12">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                        )}

                        {/* Title Section */}
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                            <div className="flex items-center gap-4 mb-6 text-[11px] text-white/30" style={{ fontFamily: FONT }}>
                                <span className="flex items-center gap-2">
                                    <Calendar size={12} className="opacity-40" />
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric',
                                    })}
                                </span>
                                {post.viewsCount ? (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                        <span className="flex items-center gap-2">
                                            <Eye size={12} className="opacity-40" />
                                            {post.viewsCount.toLocaleString()} plays
                                        </span>
                                    </>
                                ) : null}
                            </div>

                            <h1
                                className="text-3xl md:text-5xl font-light text-white/95 leading-tight mb-8"
                                style={{ fontFamily: FONT }}
                            >
                                {post.title}
                            </h1>

                            <div className="h-px w-20 bg-[#1DB954]/20 mb-10" />

                            {post.excerpt && (
                                <p
                                    className="text-lg md:text-xl text-white/40 leading-relaxed italic mb-12 font-light"
                                    style={{ fontFamily: FONT }}
                                >
                                    {post.excerpt}
                                </p>
                            )}
                        </div>

                        {/* Article-style Sections */}
                        {post.sections && post.sections.length > 0 && (
                            <div className="space-y-12 max-w-3xl mx-auto">
                                {post.sections.map((section, idx) => (
                                    <div key={idx} className="prose prose-invert prose-green max-w-none">
                                        {section.type === 'text' && section.content && (
                                            <div
                                                className="text-white/40 leading-loose text-[16px]"
                                                style={{ fontFamily: FONT }}
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        )}
                                        {section.type === 'image' && section.mediaUrl && (
                                            <figure className="my-12">
                                                <img
                                                    src={section.mediaUrl}
                                                    alt={section.caption}
                                                    className="w-full rounded-xl border border-white/5"
                                                />
                                                {section.caption && (
                                                    <figcaption className="text-center text-[11px] text-white/20 mt-4 italic">
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

                    {/* Sidebar — Up Next */}
                    {related.length > 0 && (
                        <aside className="w-full xl:w-72 shrink-0">
                            <div className="sticky top-32">
                                <h3
                                    className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-6 border-b border-white/5 pb-3"
                                    style={{ fontFamily: FONT }}
                                >
                                    Up Next
                                </h3>
                                <div className="flex flex-col">
                                    {related.map(r => (
                                        <RelatedCard key={r._id} post={r} />
                                    ))}
                                </div>
                                <Link
                                    to="/audio"
                                    className="group flex items-center gap-2 mt-10 text-[10px] uppercase tracking-widest text-[#1DB954]/40 hover:text-[#1DB954] transition-all no-underline"
                                    style={{ fontFamily: FONT }}
                                >
                                    <span>Back to Archive</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
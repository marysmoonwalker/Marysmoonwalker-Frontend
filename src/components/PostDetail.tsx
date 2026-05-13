// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { ArrowLeft, Calendar, User, Tag, Loader2, Share2, Clock, BookOpen, CheckCircle } from 'lucide-react';
// import { PostService, IPost, IPostSection } from '../services/post.service';

// const FONT = 'Georgia, serif';

// const postCache: Record<string, IPost> = {};

// function extractYouTubeId(url?: string): string {
//   if (!url) return '';
//   if (url.includes('v=')) return url.split('v=')[1]?.split('&')[0] ?? '';
//   return url.split('/').pop()?.split('?')[0] ?? '';
// }

// function extractSpotifyId(url?: string): string {
//   if (!url) return '';
//   const match = url.match(/spotify\.com\/(?:embed\/)?(episode|track|show)\/([a-zA-Z0-9]+)/);
//   return match ? match[2] : '';
// }

// function getSpotifyType(url?: string): string {
//   if (!url) return 'episode';
//   const match = url.match(/spotify\.com\/(?:embed\/)?(episode|track|show)\//);
//   return match ? match[1] : 'episode';
// }

// interface SectionProps {
//   section: IPostSection;
//   idx: number;
//   postTitle?: string;
// }

// function RenderSection({ section, idx, postTitle }: SectionProps) {
//   if (section.type === 'text') {
//     return (
//       <p className="mb-8 text-white/70 leading-loose text-lg font-light" style={{ fontFamily: FONT }}>
//         {section.content}
//       </p>
//     );
//   }

//   if (section.type === 'heading') {
//     if (section.headingLevel === 3) {
//       return (
//         <h3 className="text-2xl font-light text-amber-400 mt-14 mb-5" style={{ fontFamily: FONT }}>
//           {section.content}
//         </h3>
//       );
//     }
//     return (
//       <h2 className="text-3xl font-light text-amber-400 mt-16 mb-6" style={{ fontFamily: FONT }}>
//         {section.content}
//       </h2>
//     );
//   }

//   if (section.type === 'image') {
//     return (
//       <figure className="my-12">
//         <div className="rounded-2xl overflow-hidden border border-white/10">
//           <img
//             src={section.mediaUrl ?? ''}
//             alt={section.caption ?? postTitle ?? ''}
//             className="w-full h-auto object-cover"
//           />
//         </div>
//         {section.caption && (
//           <figcaption className="mt-4 text-center text-amber-500/50 text-xs uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             — {section.caption}
//           </figcaption>
//         )}
//       </figure>
//     );
//   }

//   if (section.type === 'video') {
//     const url = section.mediaUrl ?? '';
//     const isSpotify = url.includes('spotify');
//     const isYouTube = url.includes('youtube') || url.includes('youtu.be');

//     if (isSpotify) {
//       const spotifyId = extractSpotifyId(url);
//       const spotifyType = getSpotifyType(url);
//       const src = `https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`;
//       return (
//         <div className="my-12">
//           <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: 'rgba(0,0,0,0.4)' }}>
//             <iframe
//               src={src}
//               width="100%"
//               height="232"
//               frameBorder="0"
//               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//               title={section.caption ?? 'Spotify Audio'}
//             />
//           </div>
//           {section.caption && (
//             <p className="mt-3 text-center text-amber-500/50 text-xs uppercase tracking-widest" style={{ fontFamily: FONT }}>
//               — {section.caption}
//             </p>
//           )}
//         </div>
//       );
//     }

//     if (isYouTube) {
//       const videoId = extractYouTubeId(url);
//       const src = 'https://www.youtube.com/embed/' + videoId;
//       return (
//         <div className="my-12">
//           <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
//             <iframe
//               width="100%"
//               height="100%"
//               src={src}
//               title={section.caption ?? 'Video'}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//           {section.caption && (
//             <p className="mt-3 text-center text-amber-500/50 text-xs uppercase tracking-widest" style={{ fontFamily: FONT }}>
//               — {section.caption}
//             </p>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className="my-12">
//         <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
//           <video src={url} controls className="w-full h-full object-cover" />
//         </div>
//         {section.caption && (
//           <p className="mt-3 text-center text-amber-500/50 text-xs uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             — {section.caption}
//           </p>
//         )}
//       </div>
//     );
//   }

//   return null;
// }

// export default function PostDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const [post, setPost] = useState<IPost | null>(slug && postCache[slug] ? postCache[slug] : null);
//   const [loading, setLoading] = useState(!post);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (!slug) return;
    
//     window.scrollTo(0, 0);

//     let isMounted = true;

//     if (!postCache[slug]) {
//         setLoading(true);
//     }

//     PostService.getPostBySlug(slug)
//       .then((res) => {
//         if (isMounted && res && res.data) {
//           postCache[slug] = res.data;
//           setPost(res.data);
//           setError(false);
//         } else if (isMounted) {
//           setError(true);
//         }
//       })
//       .catch(() => {
//         if (isMounted) setError(true);
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });

//       return () => { isMounted = false; };
//   }, [slug]);

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2500);
//     });
//   };

//   if (loading && !post) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#050505' }}>
//         <Loader2 className="animate-spin text-amber-500" size={44} />
//         <p className="text-amber-200/50 uppercase tracking-widest text-xs" style={{ fontFamily: FONT }}>
//           Loading Article...
//         </p>
//       </div>
//     );
//   }

//   if (error || !post) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#050505' }}>
//         <h2 className="text-amber-500 text-2xl font-light" style={{ fontFamily: FONT }}>
//           Article Not Found
//         </h2>
//         <Link
//           to="/articles"
//           className="px-8 py-3 border border-amber-500/30 text-amber-500 rounded-full text-xs uppercase tracking-widest transition-all hover:bg-amber-500/10"
//           style={{ fontFamily: FONT }}
//         >
//           Back to Articles
//         </Link>
//       </div>
//     );
//   }

//   const heroOverlayStyle = { background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.5) 50%, transparent 100%)' };
//   const shareStyle = {
//     fontFamily: FONT,
//     background: copied ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.04)',
//     borderColor: copied ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.1)',
//   };

//   return (
//     <div className="min-h-screen text-gray-100 pb-32" style={{ background: '#050505' }}>

//       <div className="relative w-full overflow-hidden" style={{ height: '70vh' }}>
//         <img src={post.thumbnail ?? ''} alt={post.title} className="w-full h-full object-cover" />
//         <div className="absolute inset-0" style={heroOverlayStyle} />
//         <div className="absolute bottom-0 left-0 w-full px-6 pb-10 md:px-16 md:pb-16">
//           <div className="max-w-5xl mx-auto">

//             {post.category && (
//               <span
//                 className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-amber-500/40 text-amber-400 bg-amber-500/10 mb-6"
//                 style={{ fontFamily: FONT }}
//               >
//                 {post.category.name}
//               </span>
//             )}

//             <h1 className="text-4xl md:text-6xl font-light leading-tight mb-10" style={{ fontFamily: FONT }}>
//               {post.title}
//             </h1>

//             <div className="flex flex-wrap gap-8 text-white/40 text-xs uppercase tracking-widest border-t border-white/10 pt-8" style={{ fontFamily: FONT }}>
//               <div className="flex items-center gap-2">
//                 <User size={13} className="text-amber-500" />
//                 <span>{post.author?.fullName ?? 'Unknown'}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar size={13} className="text-amber-500" />
//                 <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
//               </div>
//               {post.readTime && (
//                 <div className="flex items-center gap-2">
//                   <Clock size={13} className="text-amber-500" />
//                   <span>{post.readTime} Min Read</span>
//                 </div>
//               )}
//               {post.viewsCount !== undefined && (
//                 <div className="flex items-center gap-2">
//                   <BookOpen size={13} className="text-amber-500" />
//                   <span>{post.viewsCount.toLocaleString()} Views</span>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       <article className="max-w-4xl mx-auto px-6 mt-20">

//         <div className="mb-16 border-l-4 border-amber-500/40 pl-8">
//           <p className="text-xl font-light text-amber-100/75 leading-relaxed italic" style={{ fontFamily: FONT }}>
//             {post.excerpt}
//           </p>
//         </div>

//         <div>
//           {post.sections && post.sections.length > 0 ? (
//             post.sections.map((section, idx) => (
//               <RenderSection key={idx} section={section} idx={idx} postTitle={post.title} />
//             ))
//           ) : (
//             <div
//               className="prose prose-invert prose-amber max-w-none text-white/70 text-lg leading-loose"
//               dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
//             />
//           )}
//         </div>

//         {post.tags && post.tags.length > 0 && (
//           <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap items-center gap-3">
//             <Tag size={15} className="text-amber-500" />
//             {post.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="text-xs uppercase tracking-widest text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:border-amber-500/30 hover:text-amber-400 transition-colors cursor-pointer"
//                 style={{ fontFamily: FONT }}
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         <div className="mt-14 flex justify-center">
//           <button
//             onClick={handleShare}
//             className="flex items-center gap-4 border px-12 py-4 rounded-full transition-all duration-300 hover:scale-105"
//             style={shareStyle}
//           >
//             {copied ? (
//               <CheckCircle size={17} className="text-amber-400" />
//             ) : (
//               <Share2 size={17} className="text-amber-500" />
//             )}
//             <span className="text-xs uppercase tracking-widest text-white/60">
//               {copied ? 'Link Copied!' : 'Share Article'}
//             </span>
//           </button>
//         </div>

//         <div className="mt-20 pt-10 border-t border-white/5 flex justify-center">
//           <button
//             onClick={() => navigate('/articles')}
//             className="flex items-center gap-2 text-amber-500/50 hover:text-amber-400 uppercase tracking-widest text-xs transition-colors"
//             style={{ fontFamily: FONT }}
//           >
//             <ArrowLeft size={13} />
//             Back to Articles
//           </button>
//         </div>

//       </article>

//     </div>
//   );
// }















import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PostService, IPost, IPostSection } from '../services/post.service';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

const postCache: Record<string, IPost> = {};

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

// ─── Utility Functions ────────────────────────────────────────────────────────

function extractYouTubeId(url?: string): string {
    if (!url) return '';
    if (url.includes('v=')) return url.split('v=')[1]?.split('&')[0] ?? '';
    return url.split('/').pop()?.split('?')[0] ?? '';
}

function extractSpotifyId(url?: string): string {
    if (!url) return '';
    const match = url.match(/spotify\.com\/(?:embed\/)?(episode|track|show)\/([a-zA-Z0-9]+)/);
    return match ? match[2] : '';
}

function getSpotifyType(url?: string): string {
    if (!url) return 'episode';
    const match = url.match(/spotify\.com\/(?:embed\/)?(episode|track|show)\//);
    return match ? match[1] : 'episode';
}

// ─── Section Renderer ─────────────────────────────────────────────────────────

interface SectionProps {
    section: IPostSection;
    idx: number;
    postTitle?: string;
    textColor: string;
    borderColor: string;
}

function RenderSection({ section, idx, postTitle, textColor, borderColor }: SectionProps) {
    if (section.type === 'text') {
        return (
            <p className="mb-8 leading-relaxed md:leading-loose text-[17px] md:text-xl font-light opacity-80" style={{ fontFamily: FONT, color: textColor }}>
                {section.content}
            </p>
        );
    }

    if (section.type === 'heading') {
        if (section.headingLevel === 3) {
            return (
                <h3 className="text-2xl font-normal mt-14 mb-5" style={{ fontFamily: FONT, color: textColor }}>
                    {section.content}
                </h3>
            );
        }
        return (
            <h2 className="text-3xl md:text-4xl font-normal mt-16 mb-6 pb-4 border-b" style={{ fontFamily: FONT, color: textColor, borderColor }}>
                {section.content}
            </h2>
        );
    }

    if (section.type === 'image') {
        return (
            <figure className="my-14">
                <div className="rounded-[20px] overflow-hidden border" style={{ borderColor }}>
                    <img
                        src={section.mediaUrl ?? ''}
                        alt={section.caption ?? postTitle ?? ''}
                        className="w-full h-auto object-cover"
                    />
                </div>
                {section.caption && (
                    <figcaption className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                        — {section.caption}
                    </figcaption>
                )}
            </figure>
        );
    }

    if (section.type === 'video') {
        const url = section.mediaUrl ?? '';
        const isSpotify = url.includes('spotify');
        const isYouTube = url.includes('youtube') || url.includes('youtu.be');

        if (isSpotify) {
            const spotifyId = extractSpotifyId(url);
            const spotifyType = getSpotifyType(url);
            const src = `https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`;
            return (
                <div className="my-14">
                    <div className="rounded-[20px] overflow-hidden border" style={{ borderColor, background: 'rgba(0,0,0,0.8)' }}>
                        <iframe
                            src={src}
                            width="100%"
                            height="232"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            title={section.caption ?? 'Spotify Audio'}
                        />
                    </div>
                    {section.caption && (
                        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                            — {section.caption}
                        </p>
                    )}
                </div>
            );
        }

        if (isYouTube) {
            const videoId = extractYouTubeId(url);
            const src = 'https://www.youtube.com/embed/' + videoId;
            return (
                <div className="my-14">
                    <div className="aspect-video rounded-[20px] overflow-hidden border" style={{ borderColor }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={src}
                            title={section.caption ?? 'Video'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {section.caption && (
                        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                            — {section.caption}
                        </p>
                    )}
                </div>
            );
        }

        return (
            <div className="my-14">
                <div className="aspect-video rounded-[20px] overflow-hidden border" style={{ borderColor }}>
                    <video src={url} controls className="w-full h-full object-cover" />
                </div>
                {section.caption && (
                    <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                        — {section.caption}
                    </p>
                )}
            </div>
        );
    }

    return null;
}

// ─── Main Post Detail Component ───────────────────────────────────────────────

export default function PostDetail() {
    const isDark = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    
    const [post, setPost] = useState<IPost | null>(slug && postCache[slug] ? postCache[slug] : null);
    const [relatedPosts, setRelatedPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(!post);
    const [error, setError] = useState(false);

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => {
        if (!slug) return;
        window.scrollTo(0, 0);
        let isMounted = true;

        if (!postCache[slug]) setLoading(true);

        // Fetch Main Post
        PostService.getPostBySlug(slug)
            .then((res) => {
                if (isMounted && res && res.data) {
                    postCache[slug] = res.data;
                    setPost(res.data);
                    setError(false);
                    
                    // Fetch Related Posts for Sidebar
                    PostService.getArticles({ page: 1, limit: 5 })
                        .then((relatedRes) => {
                            if (isMounted && relatedRes.data.posts) {
                                // Filter out current post
                                const filtered = relatedRes.data.posts.filter(p => p.slug !== slug).slice(0, 4);
                                setRelatedPosts(filtered);
                            }
                        });
                } else if (isMounted) {
                    setError(true);
                }
            })
            .catch(() => {
                if (isMounted) setError(true);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, [slug]);

    if (loading && !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-500" style={{ backgroundColor: bg }}>
                <Loader2 className="animate-spin" size={32} style={{ color: ACCENT_COLOR }} />
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                    Opening the Archive...
                </p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500" style={{ backgroundColor: bg }}>
                <h2 className="text-3xl font-normal" style={{ fontFamily: FONT, color: textColor }}>
                    Article Not Found
                </h2>
                <button
                    onClick={() => navigate('/articles')}
                    className="flex items-center gap-3 px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-orange-500 hover:text-black hover:border-orange-500"
                    style={{ borderColor, color: textColor, fontFamily: MONO }}
                >
                    <ArrowLeft size={14} /> Return to Library
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>

            {/* Cinematic Hero Section */}
            <div className="relative w-full overflow-hidden" style={{ height: '70vh' }}>
                <img src={post.thumbnail ?? ''} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:px-16 md:pb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl">
                            {post.category && (
                                <span
                                    className="inline-block px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-lg"
                                    style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                                >
                                    {post.category.name}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8" style={{ fontFamily: FONT, color: '#FFFFFF' }}>
                                {post.title}
                            </h1>
                            
                            {/* Updated to use username */}
                            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest pt-6 border-t border-white/20" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.7)' }}>
                                <span>By {post.author?.username ?? 'Editorial Team'}</span>
                                <span className="opacity-40">•</span>
                                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                {post.readTime && (
                                    <><span className="opacity-40 hidden sm:inline">•</span><span className="hidden sm:inline">{post.readTime} Min Read</span></>
                                )}
                                {post.viewsCount !== undefined && (
                                    <><span className="opacity-40 hidden sm:inline">•</span><span className="hidden sm:inline">{post.viewsCount.toLocaleString()} Views</span></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Standard Blog Split Layout ─── */}
            <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* LEFT COLUMN: Main Article (8 Columns) */}
                    <article className="lg:col-span-8 flex flex-col">
                        
                        {/* The "Deck" (Magazine Sub-headline) */}
                        <div className="mb-12 md:mb-16">
                            <p className="text-xl md:text-2xl font-normal leading-relaxed md:leading-loose" style={{ fontFamily: FONT, color: ACCENT_COLOR }}>
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Main Body */}
                        <div className="article-body">
                            {post.sections && post.sections.length > 0 ? (
                                post.sections.map((section, idx) => (
                                    <RenderSection 
                                        key={idx} 
                                        section={section} 
                                        idx={idx} 
                                        postTitle={post.title} 
                                        textColor={textColor}
                                        borderColor={borderColor}
                                    />
                                ))
                            ) : (
                                <div
                                    className="prose prose-lg max-w-none text-[17px] md:text-xl font-light leading-relaxed md:leading-loose opacity-80"
                                    style={{ fontFamily: FONT, color: textColor }}
                                    dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                                />
                            )}
                        </div>

                        {/* Aligned Tag Grid */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-16 pt-10 border-t flex flex-wrap items-center gap-3" style={{ borderColor }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mr-2" style={{ fontFamily: MONO, color: textColor }}>
                                    Indexed Under:
                                </span>
                                {post.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer hover:border-orange-500 hover:text-orange-500"
                                        style={{ fontFamily: MONO, borderColor, color: textColor }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Bottom Navigation: Back to Library beautifully aligned at the end of the post */}
                        <div className="mt-16 pt-8 border-t flex justify-start" style={{ borderColor }}>
                            <Link
                                to="/articles"
                                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:gap-4"
                                style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                            >
                                <ArrowLeft size={14} /> Back to Library
                            </Link>
                        </div>

                    </article>

                    {/* RIGHT COLUMN: Sticky Sidebar (4 Columns) */}
                    <aside className="lg:col-span-4 border-t lg:border-t-0 pt-12 lg:pt-0" style={{ borderColor }}>
                        <div className="sticky top-10 flex flex-col gap-12">
                            
                            {/* Related / Trending Narratives */}
                            {relatedPosts.length > 0 && (
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-6 border-b pb-4" style={{ color: ACCENT_COLOR, borderColor, fontFamily: MONO }}>
                                        Trending Narratives
                                    </span>
                                    <div className="flex flex-col">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link 
                                                key={relatedPost._id}
                                                to={`/articles/${relatedPost.slug}`}
                                                className="group flex gap-5 py-5 border-b last:border-0 no-underline transition-all"
                                                style={{ borderColor }}
                                            >
                                                <div className="w-20 h-20 shrink-0 rounded-[12px] overflow-hidden bg-zinc-800 border" style={{ borderColor }}>
                                                    <img src={relatedPost.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[8px] font-bold uppercase tracking-widest block mb-2" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                                        {relatedPost.category?.name || 'Story'}
                                                    </span>
                                                    <h4 className="text-sm md:text-base font-normal leading-tight group-hover:text-orange-500 transition-colors line-clamp-3" style={{ color: textColor, fontFamily: FONT }}>
                                                        {relatedPost.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>
                </div>
            </div>

        </div>
    );
}
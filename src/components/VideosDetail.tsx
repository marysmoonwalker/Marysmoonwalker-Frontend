// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Loader2, Eye, Calendar, ArrowLeft, Play } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function formatDuration(seconds?: number): string {
//     if (!seconds) return '';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
//     return `${m}:${String(s).padStart(2, '0')}`;
// }

// function RelatedCard({ post }: { post: IPost }) {
//     return (
//         <Link
//             to={`/videos/${post.slug}`}
//             className="group flex gap-4 py-4 border-b border-white/5 hover:border-amber-500/15 transition-all no-underline last:border-0"
//         >
//             <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
//                 <img
//                     src={post.thumbnail || `https://img.youtube.com/vi/${post.mediaMeta?.videoId}/hqdefault.jpg`}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="w-7 h-7 rounded-full bg-amber-500/30 border border-amber-500/50 flex items-center justify-center">
//                         <Play size={10} fill="currentColor" className="text-amber-400 translate-x-px" />
//                     </div>
//                 </div>
//             </div>
//             <div className="flex-1 min-w-0 flex flex-col justify-center">
//                 <p
//                     className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 mb-1.5"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.category?.name}
//                 </p>
//                 <h4
//                     className="text-sm font-light text-white/70 leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h4>
//             </div>
//         </Link>
//     );
// }

// export default function SingleVideoPage() {
//     const { slug } = useParams<{ slug: string }>();
//     const [post, setPost]         = useState<IPost | null>(null);
//     const [related, setRelated]   = useState<IPost[]>([]);
//     const [loading, setLoading]   = useState(true);
//     const [error, setError]       = useState(false);

//     useEffect(() => {
//         if (!slug) return;
//         window.scrollTo({ top: 0 });
//         loadPost(slug);
//     }, [slug]);

//     const loadPost = async (s: string) => {
//         setLoading(true);
//         setError(false);
//         try {
//             const res = await PostService.getPostBySlug(s);
//             const p   = res.data;
//             setPost(p);

//             const rel = await PostService.getPosts({
//                 type:     'video',
//                 status:   'published',
//                 category: (p.category as any)?._id ?? p.category,
//                 limit:    6,
//                 page:     1,
//             });

//             setRelated(rel.data.posts.filter(r => r._id !== p._id).slice(0, 5));
//         } catch {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const date = post
//         ? new Date(post.createdAt).toLocaleDateString('en-US', {
//               month: 'long', day: 'numeric', year: 'numeric',
//           })
//         : '';

//     const embedUrl = post?.mediaMeta?.videoId
//         ? `https://www.youtube.com/embed/${post.mediaMeta.videoId}?rel=0&modestbranding=1&color=white`
//         : null;

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <Loader2 className="animate-spin text-amber-500/40" size={32} />
//             </div>
//         );
//     }

//     if (error || !post) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
//                 <p className="text-white/20 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: FONT }}>
//                     Video not found
//                 </p>
//                 <Link
//                     to="/videos"
//                     className="flex items-center gap-2 text-amber-500/60 hover:text-amber-400 text-sm transition-colors no-underline"
//                     style={{ fontFamily: FONT }}
//                 >
//                     <ArrowLeft size={15} /> Back to Videos
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#050505] text-white">

//             {/* Ambient glow behind player */}
//             <div
//                 className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl opacity-20"
//                 style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.3) 0%, transparent 70%)' }}
//             />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 relative z-10">

//                 {/* Back */}
//                 <Link
//                     to="/videos"
//                     className="inline-flex items-center gap-2 text-white/25 hover:text-amber-400 text-[11px] uppercase tracking-widest mb-10 transition-colors no-underline"
//                     style={{ fontFamily: FONT }}
//                 >
//                     <ArrowLeft size={13} /> All Videos
//                 </Link>

//                 <div className="flex flex-col xl:flex-row gap-12">

//                     {/* Main — Player + Info */}
//                     <div className="flex-1 min-w-0">

//                         {/* Player */}
//                         <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 mb-8">
//                             {embedUrl ? (
//                                 <iframe
//                                     src={embedUrl}
//                                     title={post.title}
//                                     className="absolute inset-0 w-full h-full"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 />
//                             ) : (
//                                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
//                                     {post.thumbnail && (
//                                         <img src={post.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
//                                     )}
//                                     <div className="relative z-10 flex flex-col items-center gap-2">
//                                         <Play size={40} className="text-amber-500/40" />
//                                         <p className="text-white/30 text-xs uppercase tracking-widest" style={{ fontFamily: FONT }}>
//                                             No embed available
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Meta */}
//                         <div className="mb-6 flex items-center gap-3 flex-wrap">
//                             <span
//                                 className="text-[10px] uppercase tracking-[0.3em] text-amber-500"
//                                 style={{ fontFamily: FONT, color: post.category?.color || '#C9A84C' }}
//                             >
//                                 {post.category?.name}
//                             </span>
//                             <span className="text-white/15">·</span>
//                             <span className="flex items-center gap-1.5 text-[11px] text-white/30" style={{ fontFamily: FONT }}>
//                                 <Calendar size={11} /> {date}
//                             </span>
//                             {post.viewsCount ? (
//                                 <>
//                                     <span className="text-white/15">·</span>
//                                     <span className="flex items-center gap-1.5 text-[11px] text-white/30" style={{ fontFamily: FONT }}>
//                                         <Eye size={11} /> {post.viewsCount.toLocaleString()} views
//                                     </span>
//                                 </>
//                             ) : null}
//                             {post.duration ? (
//                                 <>
//                                     <span className="text-white/15">·</span>
//                                     <span className="text-[11px] text-white/30 font-mono">
//                                         {formatDuration(post.duration)}
//                                     </span>
//                                 </>
//                             ) : null}
//                         </div>

//                         {/* Title */}
//                         <h1
//                             className="text-2xl md:text-3xl font-light text-white/90 leading-snug mb-6"
//                             style={{ fontFamily: FONT }}
//                         >
//                             {post.title}
//                         </h1>

//                         {/* Divider */}
//                         <div className="w-full h-px bg-white/5 mb-8" />

//                         {/* Excerpt */}
//                         {post.excerpt && (
//                             <p
//                                 className="text-base text-white/50 leading-relaxed mb-10"
//                                 style={{ fontFamily: FONT }}
//                             >
//                                 {post.excerpt}
//                             </p>
//                         )}

//                         {/* Sections — description / show notes */}
//                         {post.sections && post.sections.length > 0 && (
//                             <div className="space-y-6">
//                                 {post.sections.map((section, i) => (
//                                     <div key={i}>
//                                         {section.type === 'text' && section.content && (
//                                             <p
//                                                 className="text-sm text-white/45 leading-relaxed"
//                                                 style={{ fontFamily: FONT }}
//                                                 dangerouslySetInnerHTML={{ __html: section.content }}
//                                             />
//                                         )}
//                                         {section.type === 'image' && section.mediaUrl && (
//                                             <figure>
//                                                 <img
//                                                     src={section.mediaUrl}
//                                                     alt={section.caption || ''}
//                                                     className="w-full rounded-xl border border-white/5"
//                                                 />
//                                                 {section.caption && (
//                                                     <figcaption
//                                                         className="mt-2 text-[11px] text-white/25 italic text-center"
//                                                         style={{ fontFamily: FONT }}
//                                                     >
//                                                         {section.caption}
//                                                     </figcaption>
//                                                 )}
//                                             </figure>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Tags */}
//                         {post.tags && post.tags.length > 0 && (
//                             <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
//                                 {post.tags.map(tag => (
//                                     <span
//                                         key={tag}
//                                         className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/8 text-white/30"
//                                         style={{ fontFamily: FONT }}
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Sidebar — Related Videos */}
//                     {related.length > 0 && (
//                         <aside className="xl:w-80 shrink-0">
//                             <div className="sticky top-24">
//                                 <p
//                                     className="text-[10px] uppercase tracking-[0.4em] text-amber-500/50 mb-6"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     More Videos
//                                 </p>
//                                 <div>
//                                     {related.map(r => (
//                                         <RelatedCard key={r._id} post={r} />
//                                     ))}
//                                 </div>
//                                 <Link
//                                     to="/videos"
//                                     className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-widest text-white/20 hover:text-amber-400 transition-colors no-underline"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     View all videos →
//                                 </Link>
//                             </div>
//                         </aside>
//                     )}

//                 </div>
//             </div>
//         </div>
//     );
// }























// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Loader2, Eye, Calendar, ArrowLeft, Play } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function formatDuration(seconds?: number): string {
//     if (!seconds) return '';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
//     return `${m}:${String(s).padStart(2, '0')}`;
// }

// function RelatedCard({ post }: { post: IPost }) {
//     return (
//         <Link
//             to={`/videos/${post.slug}`}
//             className="group flex gap-4 py-4 border-b border-white/5 hover:border-amber-500/15 transition-all no-underline last:border-0"
//         >
//             <div className="relative w-28 sm:w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
//                 <img
//                     src={post.thumbnail || `https://img.youtube.com/vi/${post.mediaMeta?.videoId}/hqdefault.jpg`}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
//                     <div className="w-7 h-7 rounded-full bg-amber-500/30 border border-amber-500/50 flex items-center justify-center">
//                         <Play size={10} fill="currentColor" className="text-amber-400 translate-x-px" />
//                     </div>
//                 </div>
//             </div>
//             <div className="flex-1 min-w-0 flex flex-col justify-center">
//                 <p
//                     className="text-[9px] uppercase tracking-[0.2em] text-amber-500/60 mb-1"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.category?.name}
//                 </p>
//                 <h4
//                     className="text-xs sm:text-sm font-light text-white/70 leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h4>
//             </div>
//         </Link>
//     );
// }

// export default function SingleVideoPage() {
//     const { slug } = useParams<{ slug: string }>();
//     const [post, setPost] = useState<IPost | null>(null);
//     const [related, setRelated] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if (!slug) return;
//         window.scrollTo({ top: 0 });
//         loadPost(slug);
//     }, [slug]);

//     const loadPost = async (s: string) => {
//         setLoading(true);
//         setError(false);
//         try {
//             const res = await PostService.getPostBySlug(s);
//             const p = res.data;
//             setPost(p);

//             const rel = await PostService.getPosts({
//                 type: 'video',
//                 status: 'published',
//                 category: (p.category as any)?._id ?? p.category,
//                 limit: 6,
//                 page: 1,
//             });

//             setRelated(rel.data.posts.filter(r => r._id !== p._id).slice(0, 5));
//         } catch {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const date = post
//         ? new Date(post.createdAt).toLocaleDateString('en-US', {
//             month: 'long', day: 'numeric', year: 'numeric',
//         })
//         : '';

//     const embedUrl = post?.mediaMeta?.videoId
//         ? `https://www.youtube.com/embed/${post.mediaMeta.videoId}?rel=0&modestbranding=1&color=white`
//         : null;

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <Loader2 className="animate-spin text-amber-500/40" size={32} />
//             </div>
//         );
//     }

//     if (error || !post) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
//                 <p className="text-white/20 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: FONT }}>
//                     Video not found
//                 </p>
//                 <Link
//                     to="/videos"
//                     className="flex items-center gap-2 text-amber-500/60 hover:text-amber-400 text-sm transition-colors no-underline"
//                     style={{ fontFamily: FONT }}
//                 >
//                     <ArrowLeft size={15} /> Back to Videos
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#050505] text-white">
//             <div
//                 className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] blur-[120px] opacity-10"
//                 style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
//             />

//             <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-32 relative z-10">
//                 {/* Back Button */}
//                 <Link
//                     to="/videos"
//                     className="inline-flex items-center gap-2 text-white/25 hover:text-amber-400 text-[10px] uppercase tracking-widest mb-8 transition-colors no-underline"
//                     style={{ fontFamily: FONT }}
//                 >
//                     <ArrowLeft size={12} /> Back to Collection
//                 </Link>

//                 <div className="flex flex-col xl:flex-row items-start gap-10">
                    
//                     {/* Main Section: Adjusted width for better Desktop framing */}
//                     <div className="w-full xl:max-w-[760px] flex-1">
                        
//                         {/* Video Player Frame - Fixed "Too Big" issue on Desktop */}
//                         <div className="relative w-full aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-8">
//                             {embedUrl ? (
//                                 <iframe
//                                     src={embedUrl}
//                                     title={post.title}
//                                     className="absolute inset-0 w-full h-full"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 />
//                             ) : (
//                                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
//                                     {post.thumbnail && (
//                                         <img src={post.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
//                                     )}
//                                     <div className="relative z-10 flex flex-col items-center gap-2">
//                                         <Play size={40} className="text-amber-500/40" />
//                                         <p className="text-white/30 text-[10px] uppercase tracking-widest" style={{ fontFamily: FONT }}>
//                                             Playback unavailable
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Content Info */}
//                         <div className="px-1 sm:px-0">
//                             <div className="mb-4 flex items-center gap-3 flex-wrap">
//                                 <span
//                                     className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium"
//                                     style={{ fontFamily: FONT, color: post.category?.color || '#C9A84C' }}
//                                 >
//                                     {post.category?.name}
//                                 </span>
//                                 <span className="text-white/10">|</span>
//                                 <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/40" style={{ fontFamily: FONT }}>
//                                     <Calendar size={11} className="opacity-50" /> {date}
//                                 </span>
//                                 {post.viewsCount ? (
//                                     <>
//                                         <span className="text-white/10">|</span>
//                                         <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/40" style={{ fontFamily: FONT }}>
//                                             <Eye size={11} className="opacity-50" /> {post.viewsCount.toLocaleString()} views
//                                         </span>
//                                     </>
//                                 ) : null}
//                             </div>

//                             <h1
//                                 className="text-xl md:text-3xl font-light text-white/90 leading-tight mb-6"
//                                 style={{ fontFamily: FONT }}
//                             >
//                                 {post.title}
//                             </h1>

//                             <div className="w-12 h-[1px] bg-amber-500/40 mb-8" />

//                             {post.excerpt && (
//                                 <p
//                                     className="text-sm md:text-base text-white/50 leading-relaxed mb-10 max-w-2xl"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     {post.excerpt}
//                                 </p>
//                             )}

//                             {/* Description / Show Notes */}
//                             {post.sections && post.sections.length > 0 && (
//                                 <div className="space-y-8 mt-10">
//                                     {post.sections.map((section, i) => (
//                                         <div key={i} className="max-w-3xl">
//                                             {section.type === 'text' && section.content && (
//                                                 <div
//                                                     className="text-sm text-white/40 leading-loose prose prose-invert prose-sm"
//                                                     style={{ fontFamily: FONT }}
//                                                     dangerouslySetInnerHTML={{ __html: section.content }}
//                                                 />
//                                             )}
//                                             {section.type === 'image' && section.mediaUrl && (
//                                                 <figure className="my-6">
//                                                     <img
//                                                         src={section.mediaUrl}
//                                                         alt={section.caption || ''}
//                                                         className="w-full rounded-lg border border-white/5 shadow-lg"
//                                                     />
//                                                     {section.caption && (
//                                                         <figcaption className="mt-3 text-[10px] text-white/20 italic text-center" style={{ fontFamily: FONT }}>
//                                                             {section.caption}
//                                                         </figcaption>
//                                                     )}
//                                                 </figure>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Tags */}
//                             {post.tags && post.tags.length > 0 && (
//                                 <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/5">
//                                     {post.tags.map(tag => (
//                                         <span
//                                             key={tag}
//                                             className="px-3 py-1 rounded-full text-[9px] uppercase tracking-wider border border-white/5 bg-white/[0.02] text-white/30"
//                                             style={{ fontFamily: FONT }}
//                                         >
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Sidebar: Related Videos */}
//                     {related.length > 0 && (
//                         <aside className="w-full xl:w-80 shrink-0">
//                             <div className="sticky top-28">
//                                 <p
//                                     className="text-[10px] uppercase tracking-[0.4em] text-amber-500/40 mb-6 border-b border-white/5 pb-2"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     Up Next
//                                 </p>
//                                 <div className="flex flex-col">
//                                     {related.map(r => (
//                                         <RelatedCard key={r._id} post={r} />
//                                     ))}
//                                 </div>
//                                 <Link
//                                     to="/videos"
//                                     className="group inline-flex items-center gap-2 mt-8 text-[10px] uppercase tracking-widest text-white/30 hover:text-amber-400 transition-colors no-underline"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     <span>Browse Library</span>
//                                     <span className="group-hover:translate-x-1 transition-transform">→</span>
//                                 </Link>
//                             </div>
//                         </aside>
//                     )}

//                 </div>
//             </div>
//         </div>
//     );
// }



















// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Loader2, Eye, Calendar, ArrowLeft, Play, Clock } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// /** Formats seconds to MM:SS */
// function formatDuration(seconds?: number): string {
//     if (!seconds) return '';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
//     return `${m}:${String(s).padStart(2, '0')}`;
// }

// /** Sidebar Card Component */
// function RelatedCard({ post }: { post: IPost }) {
//     // FIX: Pulling duration from root level
//     const duration = formatDuration(post.duration as any);

//     return (
//         <Link
//             to={`/videos/${post.slug}`}
//             className="group flex gap-4 py-4 border-b border-white/5 hover:border-amber-500/15 transition-all no-underline last:border-0"
//         >
//             <div className="relative w-28 sm:w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
//                 <img
//                     src={post.thumbnail || `https://img.youtube.com/vi/${post.mediaMeta?.videoId}/hqdefault.jpg`}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
//                 />
//                 {duration && (
//                     <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/90 rounded text-[8px] font-mono text-white/90 border border-white/10">
//                         {duration}
//                     </div>
//                 )}
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
//                     <Play size={10} fill="currentColor" className="text-amber-400" />
//                 </div>
//             </div>
//             <div className="flex-1 min-w-0 flex flex-col justify-center">
//                 <h4 className="text-[13px] font-light text-white/70 leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors" style={{ fontFamily: FONT }}>
//                     {post.title}
//                 </h4>
//             </div>
//         </Link>
//     );
// }

// export default function SingleVideoPage() {
//     const { slug } = useParams<{ slug: string }>();
//     const [post, setPost] = useState<IPost | null>(null);
//     const [related, setRelated] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         if (!slug) return;
//         window.scrollTo({ top: 0 });
//         loadPost(slug);
//     }, [slug]);

//     const loadPost = async (s: string) => {
//         setLoading(true);
//         setError(false);
//         try {
//             const res = await PostService.getPostBySlug(s);
//             const p = res.data;
//             setPost(p);

//             const rel = await PostService.getPosts({
//                 type: 'video',
//                 status: 'published',
//                 limit: 6,
//             });
//             setRelated(rel.data.posts.filter(r => r._id !== p._id).slice(0, 5));
//         } catch (err) {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const embedUrl = post?.mediaMeta?.videoId
//         ? `https://www.youtube.com/embed/${post.mediaMeta.videoId}?rel=0&modestbranding=1&autoplay=0`
//         : null;

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <Loader2 className="animate-spin text-amber-500/40" size={32} />
//             </div>
//         );
//     }

//     if (error || !post) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-6">
//                 <p className="text-white/20 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: FONT }}>Video not found</p>
//                 <Link to="/videos" className="text-amber-500/60 hover:text-amber-400 text-sm no-underline">Back to Videos</Link>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
//             {/* Background ambient glow */}
//             <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px] bg-amber-500/[0.02] blur-[120px] pointer-events-none" />

//             <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 md:pt-32 pb-32 relative z-10">
                
//                 {/* Back Link */}
//                 <div className="max-w-[850px] mx-auto mb-10">
//                     <Link to="/videos" className="inline-flex items-center gap-2 text-white/20 hover:text-amber-400 text-[10px] uppercase tracking-[0.3em] transition-colors no-underline" style={{ fontFamily: FONT }}>
//                         <ArrowLeft size={12} /> Back to Collection
//                     </Link>
//                 </div>

//                 {/* Main Content & Sidebar Layout */}
//                 <div className="flex flex-col xl:flex-row items-start justify-center gap-16">
                    
//                     {/* Centered Column */}
//                     <div className="flex-1 w-full xl:max-w-[850px] mx-auto">
                        
//                         {/* Video Frame - Aligned Center */}
//                         <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-12">
//                             {embedUrl ? (
//                                 <iframe
//                                     src={embedUrl}
//                                     title={post.title}
//                                     className="absolute inset-0 w-full h-full"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 />
//                             ) : (
//                                 <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40">
//                                     <Play size={48} className="text-white/5" />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Title Section - Aligned Center */}
//                         <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
//                             <div className="flex items-center gap-4 mb-6 text-[11px] text-white/30" style={{ fontFamily: FONT }}>
//                                 <span className="flex items-center gap-2">
//                                     <Calendar size={12} className="opacity-40" />
//                                     {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                                 </span>
//                                 {post.viewsCount ? (
//                                     <>
//                                         <span className="w-1 h-1 rounded-full bg-white/10" />
//                                         <span className="flex items-center gap-2">
//                                             <Eye size={12} className="opacity-40" />
//                                             {post.viewsCount.toLocaleString()} views
//                                         </span>
//                                     </>
//                                 ) : null}
//                             </div>

//                             <h1 className="text-3xl md:text-5xl font-light text-white/95 leading-tight mb-8" style={{ fontFamily: FONT }}>
//                                 {post.title}
//                             </h1>

//                             <div className="h-px w-20 bg-amber-500/20 mb-10" />

//                             {post.excerpt && (
//                                 <p className="text-lg md:text-xl text-white/40 leading-relaxed italic mb-12 font-light" style={{ fontFamily: FONT }}>
//                                     {post.excerpt}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Article Content */}
//                         <div className="space-y-12 max-w-3xl mx-auto">
//                             {post.sections?.map((section, idx) => (
//                                 <div key={idx} className="prose prose-invert prose-amber max-w-none">
//                                     {section.type === 'text' && section.content && (
//                                         <div 
//                                             className="text-white/40 leading-loose text-[16px]" 
//                                             style={{ fontFamily: FONT }}
//                                             dangerouslySetInnerHTML={{ __html: section.content }} 
//                                         />
//                                     )}
//                                     {section.type === 'image' && section.mediaUrl && (
//                                         <figure className="my-12">
//                                             <img src={section.mediaUrl} alt={section.caption} className="w-full rounded-xl border border-white/5" />
//                                             {section.caption && (
//                                                 <figcaption className="text-center text-[11px] text-white/20 mt-4 italic">{section.caption}</figcaption>
//                                             )}
//                                         </figure>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Sidebar - Up Next */}
//                     {related.length > 0 && (
//                         <aside className="w-full xl:w-72 shrink-0">
//                             <div className="sticky top-32">
//                                 <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-6 border-b border-white/5 pb-3" style={{ fontFamily: FONT }}>
//                                     Up Next
//                                 </h3>
//                                 <div className="flex flex-col">
//                                     {related.map(r => (
//                                         <RelatedCard key={r._id} post={r} />
//                                     ))}
//                                 </div>
//                                 <Link to="/videos" className="group flex items-center gap-2 mt-10 text-[10px] uppercase tracking-widest text-amber-500/40 hover:text-amber-400 transition-all no-underline" style={{ fontFamily: FONT }}>
//                                     <span>Back to Archive</span>
//                                     <span className="group-hover:translate-x-1 transition-transform">→</span>
//                                 </Link>
//                             </div>
//                         </aside>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }























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
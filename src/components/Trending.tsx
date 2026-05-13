// import { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Play, Mic, FileText, TrendingUp, ArrowRight, Eye, Flame } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';

// function getPostUrl(post: IPost) {
//     if (post.type === 'video') return `/videos/${post.slug}`;
//     if (post.type === 'audio') return `/audio/${post.slug}`;
//     return `/articles/${post.slug}`;
// }

// function getTypeColor(type: IPost['type']) {

//     if (type === 'audio') return '#22FF5F';
//     return '#FFB800';
// }

// function getTypeLabel(type: IPost['type']) {
//     if (type === 'video') return 'Video';
//     if (type === 'audio') return 'Audio';
//     return 'Article';
// }

// function TypeIcon({ type, size = 14 }: { type: IPost['type']; size?: number }) {
//     if (type === 'video') return <Play size={size} fill="currentColor" />;
//     if (type === 'audio') return <Mic size={size} />;
//     return <FileText size={size} />;
// }

// // ─── Hero Card ───────────────────────────────────────────────────────────────

// function HeroCard({ post }: { post: IPost }) {
//     const color = getTypeColor(post.type);
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', {
//         month: 'long', day: 'numeric', year: 'numeric',
//     });

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className="group relative w-full block overflow-hidden rounded-3xl no-underline"
//             style={{ minHeight: '520px' }}
//         >
//             <div className="absolute inset-0">
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
//                 />
//                 {/* Darker overlays to make white text pop more intensely */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
//             </div>

//             {/* Rank badge - Higher Contrast */}
//             <div className="absolute top-8 left-8 flex items-center gap-3">
//                 <div
//                     className="flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md"
//                     style={{ borderColor: `${color}`, background: `${color}33` }}
//                 >
//                     <Flame size={12} style={{ color }} fill={color} />
//                     <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color, fontFamily: MONO }}>
//                         #1 Trending
//                     </span>
//                 </div>
//             </div>

//             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
//                 <div className="flex items-center gap-3 mb-5">
//                     <div
//                         className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
//                         style={{ background: color, color: '#000', fontFamily: MONO }}
//                     >
//                         <TypeIcon type={post.type} size={10} />
//                         {getTypeLabel(post.type)}
//                     </div>
//                     {post.category?.name && (
//                         <>
//                             <span className="text-white/60 text-xs">·</span>
//                             <span className="text-white font-bold text-[10px] uppercase tracking-widest" style={{ fontFamily: MONO }}>
//                                 {post.category.name}
//                             </span>
//                         </>
//                     )}
//                     <span className="text-white/60 text-xs">·</span>
//                     <span className="text-white/90 font-bold text-[10px]" style={{ fontFamily: MONO }}>{date}</span>
//                 </div>

//                 <h2
//                     className="text-3xl md:text-5xl font-light text-white leading-tight mb-6 max-w-3xl"
//                     style={{ fontFamily: FONT, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
//                 >
//                     {post.title}
//                 </h2>

//                 {post.excerpt && (
//                     <p
//                         className="text-white/85 text-base leading-relaxed mb-8 max-w-xl line-clamp-2 font-normal"
//                         style={{ fontFamily: FONT }}
//                     >
//                         {post.excerpt}
//                     </p>
//                 )}

//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-6">
//                         {post.viewsCount ? (
//                             <span className="flex items-center gap-2 text-white font-bold text-[11px]" style={{ fontFamily: MONO }}>
//                                 <Eye size={12} className="text-white" />
//                                 {post.viewsCount.toLocaleString()}
//                             </span>
//                         ) : null}
//                     </div>

//                     <div
//                         className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
//                         style={{ color, fontFamily: MONO }}
//                     >
//                         Read More <ArrowRight size={14} />
//                     </div>
//                 </div>
//             </div>

//             <div
//                 className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                 style={{ boxShadow: `inset 0 0 0 2px ${color}` }}
//             />
//         </Link>
//     );
// }

// // ─── Small Scroll Card ────────────────────────────────────────────────────────

// function ScrollCard({ post, rank }: { post: IPost; rank: number }) {
//     const color = getTypeColor(post.type);

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className="group relative flex-shrink-0 block overflow-hidden rounded-2xl no-underline"
//             style={{ width: '260px', background: '#111', border: '1px solid rgba(255,255,255,0.2)' }}
//         >
//             <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

//                 <div
//                     className="absolute top-3 left-3 text-[12px] font-black leading-none bg-black/60 px-1.5 py-0.5 rounded"
//                     style={{ color: color, fontFamily: MONO }}
//                 >
//                     #{rank}
//                 </div>

//                 <div
//                     className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md"
//                     style={{ background: color, color: '#000', fontFamily: MONO }}
//                 >
//                     <TypeIcon type={post.type} size={9} />
//                     {getTypeLabel(post.type)}
//                 </div>
//             </div>

//             <div className="p-4">
//                 {post.category?.name && (
//                     <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color, fontFamily: MONO }}>
//                         {post.category.name}
//                     </p>
//                 )}
//                 <h4
//                     className="text-[14px] font-normal text-white leading-snug line-clamp-2 group-hover:text-white transition-colors duration-300"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h4>
//                 {post.viewsCount ? (
//                     <div className="flex items-center gap-1.5 mt-3 text-white/80 font-bold text-[10px]" style={{ fontFamily: MONO }}>
//                         <Eye size={10} />
//                         {post.viewsCount.toLocaleString()}
//                     </div>
//                 ) : null}
//             </div>

//             <div
//                 className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                 style={{ boxShadow: `inset 0 0 0 2px ${color}` }}
//             />
//         </Link>
//     );
// }

// // ─── Marquee ─────────────────────────────────────────────────────────────────

// function TrendingMarquee() {
//     const items = ['Trending Now', 'Most Viewed', 'Top Stories', 'On Fire', 'Popular', 'Rising'];
//     const repeated = [...items, ...items, ...items];

//     return (
//         <div className="relative overflow-hidden py-3 border-y border-white/20 mb-12">
//             <div
//                 className="flex gap-10 whitespace-nowrap"
//                 style={{
//                     animation: 'marquee 28s linear infinite',
//                     width: 'max-content',
//                 }}
//             >
//                 {repeated.map((item, i) => (
//                     <span key={i} className="flex items-center gap-3">
//                         <TrendingUp size={12} className="text-amber-400" />
//                         <span
//                             className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60"
//                             style={{ fontFamily: MONO }}
//                         >
//                             {item}
//                         </span>
//                     </span>
//                 ))}
//             </div>

//             <style>{`
//                 @keyframes marquee {
//                     from { transform: translateX(0); }
//                     to   { transform: translateX(-33.333%); }
//                 }
//             `}</style>
//         </div>
//     );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function TrendingPage() {
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         PostService.getTrendingPosts({ limit: 10 }).then(res => {
//             setPosts(res.data);
//         }).catch(console.error).finally(() => setLoading(false));
//     }, []);

//     const hero = posts[0];
//     const rest = posts.slice(1);

//     // Drag-to-scroll logic preserved...
//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         let isDown = false, startX = 0, scrollLeft = 0;
//         const onDown = (e: MouseEvent) => {
//             isDown = true;
//             startX = e.pageX - el.offsetLeft;
//             scrollLeft = el.scrollLeft;
//             el.style.cursor = 'grabbing';
//         };
//         const onUp = () => { isDown = false; el.style.cursor = 'grab'; };
//         const onMove = (e: MouseEvent) => {
//             if (!isDown) return;
//             e.preventDefault();
//             const x = e.pageX - el.offsetLeft;
//             el.scrollLeft = scrollLeft - (x - startX) * 1.5;
//         };
//         el.addEventListener('mousedown', onDown);
//         el.addEventListener('mouseup', onUp);
//         el.addEventListener('mouseleave', onUp);
//         el.addEventListener('mousemove', onMove);
//         return () => {
//             el.removeEventListener('mousedown', onDown);
//             el.removeEventListener('mouseup', onUp);
//             el.removeEventListener('mouseleave', onUp);
//             el.removeEventListener('mousemove', onMove);
//         };
//     }, [rest.length]);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <div className="flex flex-col items-center gap-4">
//                     <div className="w-px h-16 bg-amber-500 animate-pulse" />
//                     <span className="text-white text-[10px] font-bold uppercase tracking-[0.5em]" style={{ fontFamily: MONO }}>
//                         Loading
//                     </span>
//                 </div>
//             </div>
//         );
//     }

//     if (!hero) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <p className="text-white text-xs font-bold uppercase tracking-[0.3em]" style={{ fontFamily: FONT }}>
//                     Nothing trending right now
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/40">

//             {/* Ambient top glow - Stronger for atmosphere */}
//             <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/[0.1] blur-[100px] pointer-events-none" />

//             <div className="max-w-7xl mx-auto px-6 pt-28 pb-32 relative z-10">

//                 <div className="flex items-end justify-between mb-10">
//                     <div>
//                         <p
//                             className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-400 mb-3"
//                             style={{ fontFamily: MONO }}
//                         >
//                             What's Hot
//                         </p>
//                         <h1
//                             className="text-4xl md:text-6xl font-light text-white leading-none"
//                             style={{ fontFamily: FONT }}
//                         >
//                             Trending
//                         </h1>
//                     </div>

//                     <div className="hidden md:flex items-center gap-2 text-white/70 font-bold text-[10px] uppercase tracking-widest pb-2" style={{ fontFamily: MONO }}>
//                         <span className="w-8 h-px bg-white/50" />
//                         {posts.length} stories
//                     </div>
//                 </div>

//                 <TrendingMarquee />

//                 <div className="mb-10">
//                     <HeroCard post={hero} />
//                 </div>

//                 {rest.length > 0 && (
//                     <div>
//                         <div className="flex items-center justify-between mb-6">
//                             <p
//                                 className="text-[10px] font-black uppercase tracking-[0.5em] text-white"
//                                 style={{ fontFamily: MONO }}
//                             >
//                                 Also Trending
//                             </p>
//                             <p
//                                 className="text-[10px] text-white/60 font-bold uppercase tracking-widest hidden md:block"
//                                 style={{ fontFamily: MONO }}
//                             >
//                                 ← drag to scroll →
//                             </p>
//                         </div>

//                         <div
//                             ref={scrollRef}
//                             className="flex gap-6 overflow-x-auto pb-6"
//                             style={{
//                                 cursor: 'grab',
//                                 scrollbarWidth: 'none',
//                                 msOverflowStyle: 'none',
//                                 WebkitOverflowScrolling: 'touch',
//                             }}
//                         >
//                             <style>{`
//                                 div::-webkit-scrollbar { display: none; }
//                             `}</style>
//                             {rest.map((post, idx) => (
//                                 <ScrollCard key={post._id} post={post} rank={idx + 2} />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="mt-20 pt-10 border-t border-white/20 flex items-center justify-between">
//                     <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50" style={{ fontFamily: MONO }}>
//                         Updated in real-time
//                     </span>
//                     <div className="flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
//                         <span className="text-[10px] font-black uppercase tracking-widest text-white/70" style={{ fontFamily: MONO }}>Live</span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }































// import { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { TrendingUp, ArrowRight, Eye, Flame } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';
// import { fallbackTrendingPosts } from '../components/fallback/Trending';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';

// // Helper to detect theme changes made by the Navbar and sync across tabs

// function useTheme() {
//     const [isDark, setIsDark] = useState<boolean>(() => {
//         const saved = localStorage.getItem('theme');
//         return saved ? saved === 'dark' : true;
//     });

//     useEffect(() => {
//         // React to changes made by the Navbar 
//         const observer = new MutationObserver(() => {
//             setIsDark(!document.documentElement.classList.contains('light-mode'));
//         });
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//         // Cross-tab sync
//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // Helper to get post URL based on type

// function getPostUrl(post: IPost) {
//     if (post.type === 'video') return `/videos/${post.slug}`;
//     if (post.type === 'audio') return `/audio/${post.slug}`;
//     return `/articles/${post.slug}`;
// }

// function getTypeColor(type: IPost['type'], isDark: boolean) {
//     if (type === 'audio') return isDark ? '#22FF5F' : '#16A34A';
//     return isDark ? '#FFB800' : '#B45309';
// }

// // Hero Card Component with dynamic theming and improved contrast for better visibility in both modes

// function HeroCard({ post, isDark }: { post: IPost; isDark: boolean }) {
//     const color      = getTypeColor(post.type, isDark);
//     const date       = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
//     const cardBg     = isDark ? '#111111' : '#FFFFFF';
//     const titleCol   = isDark ? '#FFFFFF' : '#0A0A0A';
//     const metaCol    = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
//     const excerptCol = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)';
//     const divCol     = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
//     const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className="group w-full block no-underline rounded-3xl overflow-hidden transition-all duration-500"
//             style={{
//                 background: cardBg,
//                 border: `1px solid ${cardBorder}`,
//                 boxShadow: isDark ? '0 4px 40px rgba(0,0,0,0.5)' : '0 4px 32px rgba(0,0,0,0.07)',
//             }}
//         >
//             {/* Image */}
//             <div className="relative overflow-hidden aspect-[4/3] md:aspect-[21/9]">
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
//                 />
//                 {/* Gradient fade at bottom */}
//                 <div
//                     className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
//                     style={{ background: `linear-gradient(to top, ${cardBg}, transparent)` }}
//                 />
//                 {/* Trending badge */}
//                 <div className="absolute top-5 left-5">
//                     <div
//                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
//                         style={{ background: `${color}22`, border: `1px solid ${color}66` }}
//                     >
//                         <Flame size={11} style={{ color }} fill={color} />
//                         <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color, fontFamily: MONO }}>
//                             #1 Trending
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Text panel */}
//             <div className="px-8 md:px-12 pt-7 pb-8">
//                 {/* Category + date */}
//                 <div className="flex items-center gap-3 mb-4">
//                     {post.category?.name && (
//                         <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color, fontFamily: MONO }}>
//                             {post.category.name}
//                         </span>
//                     )}
//                     <span style={{ color: metaCol }}>·</span>
//                     <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: metaCol, fontFamily: MONO }}>
//                         {date}
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h2
//                     className="text-3xl md:text-[2.6rem] font-light leading-tight mb-4"
//                     style={{ fontFamily: FONT, color: titleCol, letterSpacing: '-0.01em' }}
//                 >
//                     {post.title}
//                 </h2>

//                 {/* Excerpt */}
//                 {post.excerpt && (
//                     <p className="text-base leading-relaxed line-clamp-2 mb-7" style={{ fontFamily: FONT, color: excerptCol }}>
//                         {post.excerpt}
//                     </p>
//                 )}

//                 {/* Footer row */}
//                 <div className="flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${divCol}` }}>
//                     {post.viewsCount ? (
//                         <span className="flex items-center gap-2 font-bold text-[11px]" style={{ color: metaCol, fontFamily: MONO }}>
//                             <Eye size={12} />
//                             {post.viewsCount.toLocaleString()} views
//                         </span>
//                     ) : <span />}
//                     <div
//                         className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-400"
//                         style={{ color, fontFamily: MONO }}
//                     >
//                         Read More <ArrowRight size={13} />
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// // Scroll Card Component

// function ScrollCard({ post, rank, isDark }: { post: IPost; rank: number; isDark: boolean }) {
//     const color      = getTypeColor(post.type, isDark);
//     const cardBg     = isDark ? '#111111' : '#FFFFFF';
//     const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
//     const titleCol   = isDark ? '#FFFFFF' : '#0A0A0A';
//     const metaCol    = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)';

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className="group flex-shrink-0 block no-underline rounded-2xl overflow-hidden transition-all duration-300"
//             style={{
//                 width: '260px',
//                 background: cardBg,
//                 border: `1px solid ${cardBorder}`,
//                 boxShadow: isDark ? '0 2px 20px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.06)',
//             }}
//         >
//             {/* Image */}
//             <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 {/* Gradient fade at bottom */}
//                 <div
//                     className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
//                     style={{ background: `linear-gradient(to top, ${cardBg}, transparent)` }}
//                 />
//                 {/* Rank badge */}
//                 <div
//                     className="absolute top-3 left-3 text-[11px] font-black leading-none px-2 py-0.5 rounded backdrop-blur-md"
//                     style={{ color, fontFamily: MONO, background: 'rgba(0,0,0,0.45)' }}
//                 >
//                     #{rank}
//                 </div>
//             </div>

//             {/* Text panel */}
//             <div className="p-4 pt-3">
//                 {post.category?.name && (
//                     <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5" style={{ color, fontFamily: MONO }}>
//                         {post.category.name}
//                     </p>
//                 )}
//                 <h4
//                     className="text-[13px] font-normal leading-snug line-clamp-2 mb-3 group-hover:underline decoration-1 underline-offset-2 transition-all duration-300"
//                     style={{ fontFamily: FONT, color: titleCol }}
//                 >
//                     {post.title}
//                 </h4>
//                 {post.viewsCount ? (
//                     <div className="flex items-center gap-1.5 font-bold text-[10px]" style={{ color: metaCol, fontFamily: MONO }}>
//                         <Eye size={9} />
//                         {post.viewsCount.toLocaleString()}
//                     </div>
//                 ) : null}
//             </div>
//         </Link>
//     );
// }

// // Marquee Component with dynamic theming and improved contrast for better visibility in both modes

// function TrendingMarquee({ isDark }: { isDark: boolean }) {
//     const items = ['Trending Now', 'Most Viewed', 'Top Stories', 'On Fire', 'Popular', 'Rising'];
//     const repeated = [...items, ...items, ...items];
//     const accentColor = isDark ? '#F59E0B' : '#B45309';
//     const borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
//     const textColor   = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

//     return (
//         <div
//             className="relative overflow-hidden py-3 mb-12"
//             style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}
//         >
//             <div
//                 className="flex gap-10 whitespace-nowrap"
//                 style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}
//             >
//                 {repeated.map((item, i) => (
//                     <span key={i} className="flex items-center gap-3">
//                         <TrendingUp size={12} style={{ color: accentColor }} />
//                         <span
//                             className="text-[11px] font-black uppercase tracking-[0.4em]"
//                             style={{ fontFamily: MONO, color: textColor }}
//                         >
//                             {item}
//                         </span>
//                     </span>
//                 ))}
//             </div>

//             <style>{`
//                 @keyframes marquee {
//                     from { transform: translateX(0); }
//                     to   { transform: translateX(-33.333%); }
//                 }
//             `}</style>
//         </div>
//     );
// }

// // Skeleton Loader for fetching state

// function FetchingBadge({ isDark }: { isDark: boolean }) {
//     return (
//         <div
//             className="flex items-center gap-2 px-3 py-1.5 rounded-full"
//             style={{
//                 background: isDark ? 'rgba(255,184,0,0.08)' : 'rgba(180,83,9,0.08)',
//                 border: `1px solid ${isDark ? 'rgba(255,184,0,0.25)' : 'rgba(180,83,9,0.2)'}`,
//             }}
//         >
//             <span
//                 className="w-1.5 h-1.5 rounded-full animate-pulse"
//                 style={{ background: isDark ? '#FFB800' : '#B45309' }}
//             />
//             <span
//                 className="text-[10px] font-black uppercase tracking-[0.35em]"
//                 style={{ color: isDark ? '#FFB800' : '#B45309', fontFamily: MONO }}
//             >
//                 Loading latest…
//             </span>
//         </div>
//     );
// }

// // Main Page Component
// export default function TrendingPage() {
//     const isDark = useTheme();

//     const [posts, setPosts]       = useState<IPost[]>(fallbackTrendingPosts);
//     const [isFetching, setFetching] = useState(true);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         PostService.getTrendingPosts({ limit: 10 })
//             .then(res => {
//                 if (res.data?.length) setPosts(res.data);
//             })
//             .catch(console.error)
//             .finally(() => setFetching(false));
//     }, []);

//     // Drag-to-scroll logic
//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         let isDown = false, startX = 0, scrollLeft = 0;
//         const onDown = (e: MouseEvent) => {
//             isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
//             el.style.cursor = 'grabbing';
//         };
//         const onUp   = () => { isDown = false; el.style.cursor = 'grab'; };
//         const onMove = (e: MouseEvent) => {
//             if (!isDown) return;
//             e.preventDefault();
//             el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
//         };
//         el.addEventListener('mousedown', onDown);
//         el.addEventListener('mouseup', onUp);
//         el.addEventListener('mouseleave', onUp);
//         el.addEventListener('mousemove', onMove);
//         return () => {
//             el.removeEventListener('mousedown', onDown);
//             el.removeEventListener('mouseup', onUp);
//             el.removeEventListener('mouseleave', onUp);
//             el.removeEventListener('mousemove', onMove);
//         };
//     }, [posts.length]);

//     const hero = posts[0];
//     const rest = posts.slice(1);

//     // Derived theme tokens
//     const bg          = isDark ? '#050505'                    : '#FFFFFF';
//     const textPrimary = isDark ? '#FFFFFF'                    : '#111111';
//     const textMuted   = isDark ? 'rgba(255,255,255,0.45)'    : 'rgba(0,0,0,0.4)';
//     const glowBg      = isDark ? 'rgba(245,158,11,0.10)'     : 'rgba(180,83,9,0.06)';

//     return (
//         <div
//             className="min-h-screen selection:bg-amber-500/40 transition-colors duration-500"
//             style={{ background: bg, color: textPrimary }}
//         >
//             {/* Ambient top glow */}
//             <div
//                 className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-[100px] pointer-events-none transition-colors duration-500"
//                 style={{ background: glowBg }}
//             />

//             <div className="max-w-7xl mx-auto px-6 pt-28 pb-32 relative z-10">

//                 {/* Page header */}
//                 <div className="flex items-end justify-between mb-10">
//                     <div>
//                         <h1
//                             className="text-4xl md:text-6xl font-light leading-none transition-colors duration-500"
//                             style={{ fontFamily: FONT, color: textPrimary }}
//                         >
//                             Trending
//                         </h1>
//                     </div>

//                     <div className="hidden md:flex items-center gap-3 pb-2">
//                         {isFetching && <FetchingBadge isDark={isDark} />}
//                         <span
//                             className="font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"
//                             style={{ color: textMuted, fontFamily: MONO }}
//                         >
//                             <span className="w-8 h-px" style={{ background: textMuted, display: 'inline-block' }} />
//                             {posts.length} stories
//                         </span>
//                     </div>
//                 </div>

//                 <TrendingMarquee isDark={isDark} />

//                 {/* Hero section */}
//                 <div className="mb-10">
//                     <HeroCard post={hero} isDark={isDark} />
//                 </div>

//                 {/* Also Trending scroll row */}
//                 {rest.length > 0 && (
//                     <div>
//                         <div className="flex items-center justify-between mb-6">
//                             <p
//                                 className="text-[10px] font-black uppercase tracking-[0.5em]"
//                                 style={{ color: textPrimary, fontFamily: MONO }}
//                             >
//                                 Also Trending
//                             </p>
//                             <p
//                                 className="text-[10px] font-bold uppercase tracking-widest hidden md:block"
//                                 style={{ color: textMuted, fontFamily: MONO }}
//                             >
//                                 ← drag to scroll →
//                             </p>
//                         </div>

//                         <div
//                             ref={scrollRef}
//                             className="flex gap-6 overflow-x-auto pb-6"
//                             style={{
//                                 cursor: 'grab',
//                                 scrollbarWidth: 'none',
//                                 msOverflowStyle: 'none',
//                                 WebkitOverflowScrolling: 'touch',
//                             }}
//                         >
//                             <style>{`div::-webkit-scrollbar { display: none; }`}</style>
//                             {rest.map((post, idx) => (
//                                 <ScrollCard key={post._id} post={post} rank={idx + 2} isDark={isDark} />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }






















// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';
// import { fallbackTrendingPosts } from '../components/fallback/Trending';

// // ─── Theme hook ───────────────────────────────────────────────────────────────

// function useTheme() {
//     const [isDark, setIsDark] = useState<boolean>(() => {
//         const saved = localStorage.getItem('theme');
//         return saved ? saved === 'dark' : true;
//     });

//     useEffect(() => {
//         const observer = new MutationObserver(() => {
//             setIsDark(!document.documentElement.classList.contains('light-mode'));
//         });
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function getPostUrl(post: IPost) {
//     if (post.type === 'video') return `/videos/${post.slug}`;
//     if (post.type === 'audio') return `/audio/${post.slug}`;
//     return `/articles/${post.slug}`;
// }

// // ─── Blog Card Component (Matches your FeaturedPosts CSS) ─────────────────────

// function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
//     // Formatting date to act as part of the reading time / info section
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
//     // Fallback for author avatar if your IPost doesn't have one yet
//     const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
//         >
//             {/* Image */}
//             <img
//                 loading="lazy"
//                 src={post.thumbnail || '/placeholder.jpg'}
//                 alt={post.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
            
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300 group-hover:bg-black/60">
                
//                 {/* Category Pill */}
//                 {post.category?.name && (
//                     <span className="text-white px-3 py-1 bg-red-600 w-fit rounded-[8px] font-semibold text-[14px] mb-[10px] transition-colors duration-200 hover:bg-white hover:text-red-600">
//                         {post.category.name}
//                     </span>
//                 )}
                
//                 {/* Title */}
//                 <h1 className={`text-white font-semibold group-hover:underline ${isFeatured ? 'text-2xl md:text-4xl leading-tight' : 'text-xl md:text-2xl leading-snug'} line-clamp-3`}>
//                     {post.title}
//                 </h1>
                
//                 {/* Info (Author & Meta) */}
//                 <div className="flex items-center justify-start gap-[10px] mt-[10px]">
//                     <img
//                         src={authorImage}
//                         alt="Author"
//                         className="w-[25px] h-[25px] rounded-full object-cover bg-gray-200"
//                     />
//                     <p className="text-[14px] text-[#c2c1c1]">
//                         {date} • {post.viewsCount ? `${post.viewsCount.toLocaleString()} views` : '5 min read'}
//                     </p>
//                 </div>

//             </div>
//         </Link>
//     );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function TrendingPage() {
//     const isDark = useTheme();

//     const [posts, setPosts] = useState<IPost[]>(fallbackTrendingPosts);
//     const [isFetching, setFetching] = useState(true);

//     useEffect(() => {
//         PostService.getTrendingPosts({ limit: 10 })
//             .then(res => {
//                 if (res.data?.length) setPosts(res.data);
//             })
//             .catch(console.error)
//             .finally(() => setFetching(false));
//     }, []);

//     // Theme backgrounds matching standard blog layouts
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';

//     return (
//         <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-28 pb-32">
                
//                 {/* Header */}
//                 <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
//                     <h1 className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>
//                         Trending
//                     </h1>
//                     {isFetching && (
//                         <span className="text-sm font-semibold text-gray-500 animate-pulse">
//                             Loading latest...
//                         </span>
//                     )}
//                 </div>

//                 {/* Grid Layout */}
//                 {posts.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
//                         {posts.map((post, index) => (
//                             <BlogCard 
//                                 key={post._id} 
//                                 post={post} 
//                                 // Make the very first post span wider for emphasis
//                                 isFeatured={index === 0} 
//                             />
//                         ))}
//                     </div>
//                 ) : !isFetching ? (
//                     <h5 style={{ color: textColor }}>No trending articles found.</h5>
//                 ) : null}

//             </div>
//         </div>
//     );
// }





















// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';
// import { fallbackTrendingPosts } from '../components/fallback/Trending';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00'; // Very bright golden chocolate

// // ─── Theme hook ───────────────────────────────────────────────────────────────

// function useTheme() {
//     const [isDark, setIsDark] = useState<boolean>(() => {
//         const saved = localStorage.getItem('theme');
//         return saved ? saved === 'dark' : true;
//     });

//     useEffect(() => {
//         const observer = new MutationObserver(() => {
//             setIsDark(!document.documentElement.classList.contains('light-mode'));
//         });
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function getPostUrl(post: IPost) {
//     if (post.type === 'video') return `/videos/${post.slug}`;
//     if (post.type === 'audio') return `/audio/${post.slug}`;
//     return `/articles/${post.slug}`;
// }

// // ─── Blog Card Component (Matches your FeaturedPosts CSS) ─────────────────────

// function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
//     // Formatting date to act as part of the reading time / info section
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
//     // Fallback for author avatar if your IPost doesn't have one yet
//     const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
//         >
//             {/* Image */}
//             <img
//                 loading="lazy"
//                 src={post.thumbnail || '/placeholder.jpg'}
//                 alt={post.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
            
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300 group-hover:bg-black/60">
                
//                 {/* Category Pill */}
//                 {post.category?.name && (
//                     <>
//                         {/* Custom style for hover effect to use our exact accent color */}
//                         <style>{`.pill-hover:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }`}</style>
//                         <span 
//                             className="pill-hover text-white px-2.5 py-1 w-fit rounded-[6px] font-bold text-[11px] mb-[10px] transition-colors duration-200"
//                             style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             {post.category.name}
//                         </span>
//                     </>
//                 )}
                
//                 {/* Title */}
//                 <h1 
//                     className={`text-white font-normal group-hover:underline ${isFeatured ? 'text-xl md:text-[28px] leading-tight' : 'text-[17px] md:text-[20px] leading-snug'} line-clamp-3`}
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h1>
                
//                 {/* Info (Author & Meta) */}
//                 <div className="flex items-center justify-start gap-[8px] mt-[10px]">
//                     <img
//                         src={authorImage}
//                         alt="Author"
//                         className="w-[22px] h-[22px] rounded-full object-cover bg-gray-200"
//                     />
//                     <p className="text-[12px] text-[#c2c1c1]" style={{ fontFamily: MONO }}>
//                         {date} • {post.viewsCount ? `${post.viewsCount.toLocaleString()} views` : '5 min read'}
//                     </p>
//                 </div>

//             </div>
//         </Link>
//     );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function TrendingPage() {
//     const isDark = useTheme();

//     const [posts, setPosts] = useState<IPost[]>(fallbackTrendingPosts);
//     const [isFetching, setFetching] = useState(true);

//     useEffect(() => {
//         PostService.getTrendingPosts({ limit: 10 })
//             .then(res => {
//                 if (res.data?.length) setPosts(res.data);
//             })
//             .catch(console.error)
//             .finally(() => setFetching(false));
//     }, []);

//     // Theme backgrounds matching standard blog layouts
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';

//     return (
//         <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-28 pb-32">
                
//                 {/* Header */}
//                 <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
//                     <h1 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
//                         Trending
//                     </h1>
//                     {isFetching && (
//                         <span className="text-[12px] font-semibold text-gray-500 animate-pulse" style={{ fontFamily: MONO }}>
//                             Loading latest...
//                         </span>
//                     )}
//                 </div>

//                 {/* Grid Layout */}
//                 {posts.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
//                         {posts.map((post, index) => (
//                             <BlogCard 
//                                 key={post._id} 
//                                 post={post} 
//                                 // Make the very first post span wider for emphasis
//                                 isFeatured={index === 0} 
//                             />
//                         ))}
//                     </div>
//                 ) : !isFetching ? (
//                     <h5 style={{ color: textColor, fontFamily: FONT }}>No trending articles found.</h5>
//                 ) : null}

//             </div>
//         </div>
//     );
// }

























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';
// import { fallbackTrendingPosts } from '../components/fallback/Trending';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00'; // Very bright golden chocolate

// // ─── Theme hook ───────────────────────────────────────────────────────────────

// function useTheme() {
//     const [isDark, setIsDark] = useState<boolean>(() => {
//         const saved = localStorage.getItem('theme');
//         return saved ? saved === 'dark' : true;
//     });

//     useEffect(() => {
//         const observer = new MutationObserver(() => {
//             setIsDark(!document.documentElement.classList.contains('light-mode'));
//         });
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function getPostUrl(post: IPost) {
//     if (post.type === 'video') return `/videos/${post.slug}`;
//     if (post.type === 'audio') return `/audio/${post.slug}`;
//     return `/articles/${post.slug}`;
// }

// // ─── Blog Card Component (Matches your FeaturedPosts CSS) ─────────────────────

// function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
//     // Formatting date to act as part of the reading time / info section
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
//     // Fallback for author avatar if your IPost doesn't have one yet
//     const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
//         >
//             {/* Image */}
//             <img
//                 loading="lazy"
//                 src={post.thumbnail || '/placeholder.jpg'}
//                 alt={post.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
            
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300 group-hover:bg-black/60">
                
//                 {/* Category Pill */}
//                 {post.category?.name && (
//                     <>
//                         {/* Custom style for hover effect to use our exact accent color */}
//                         <style>{`.pill-hover:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }`}</style>
//                         <span 
//                             className="pill-hover text-white px-2.5 py-1 w-fit rounded-[6px] font-bold text-[11px] mb-[10px] transition-colors duration-200"
//                             style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             {post.category.name}
//                         </span>
//                     </>
//                 )}
                
//                 {/* Title */}
//                 <h1 
//                     className={`text-white font-normal group-hover:underline ${isFeatured ? 'text-xl md:text-[28px] leading-tight' : 'text-[17px] md:text-[20px] leading-snug'} line-clamp-3`}
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h1>
                
//                 {/* Info (Author & Meta) */}
//                 <div className="flex items-center justify-start gap-[8px] mt-[10px]">
//                     <img
//                         src={authorImage}
//                         alt="Author"
//                         className="w-[22px] h-[22px] rounded-full object-cover bg-gray-200"
//                     />
//                     <p className="text-[12px] text-[#c2c1c1]" style={{ fontFamily: MONO }}>
//                         {date} • {post.viewsCount ? `${post.viewsCount.toLocaleString()} views` : '5 min read'}
//                     </p>
//                 </div>

//             </div>
//         </Link>
//     );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function TrendingPage() {
//     const isDark = useTheme();

//     const [posts, setPosts] = useState<IPost[]>(fallbackTrendingPosts);
//     const [isFetching, setFetching] = useState(true);

//     useEffect(() => {
//         PostService.getTrendingPosts({ limit: 10 })
//             .then(res => {
//                 if (res.data?.length) setPosts(res.data);
//             })
//             .catch(console.error)
//             .finally(() => setFetching(false));
//     }, []);

//     // Theme backgrounds matching standard blog layouts
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';

//     return (
//         <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
//             {/* Reduced top padding (pt-10 md:pt-12) to pull it closer to the subscribe bar */}
//             <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 pb-32">
                
//                 {/* Header */}
//                 <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
//                     <h1 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
//                         Top Stories
//                     </h1>
//                     {isFetching && (
//                         <span className="text-[12px] font-semibold text-gray-500 animate-pulse" style={{ fontFamily: MONO }}>
//                             Loading latest...
//                         </span>
//                     )}
//                 </div>

//                 {/* Grid Layout */}
//                 {posts.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
//                         {posts.map((post, index) => (
//                             <BlogCard 
//                                 key={post._id} 
//                                 post={post} 
//                                 // Make the very first post span wider for emphasis
//                                 isFeatured={index === 0} 
//                             />
//                         ))}
//                     </div>
//                 ) : !isFetching ? (
//                     <h5 style={{ color: textColor, fontFamily: FONT }}>No top stories found.</h5>
//                 ) : null}

//             </div>
//         </div>
//     );
// }





















import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostService, IPost } from '../services/post.service';
import { fallbackTrendingPosts } from '../components/fallback/Trending';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00'; // Very bright golden chocolate

// ─── Theme hook ───────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPostUrl(post: IPost) {
    if (post.type === 'video') return `/videos/${post.slug}`;
    if (post.type === 'audio') return `/audio/${post.slug}`;
    return `/articles/${post.slug}`;
}

// ─── Blog Card Component (Matches your FeaturedPosts CSS) ─────────────────────

function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
    // Formatting date to act as part of the reading time / info section
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Fallback for author avatar if your IPost doesn't have one yet
    const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

    return (
        <Link
            to={getPostUrl(post)}
            className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
        >
            {/* Image */}
            <img
                loading="lazy"
                src={post.thumbnail || '/placeholder.jpg'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300">
                
                {/* Category Pill */}
                {post.category?.name && (
                    <>
                        {/* Custom style for hover effect to use our exact accent color */}
                        <style>{`.pill-hover:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }`}</style>
                        <span 
                            className="pill-hover text-white px-2.5 py-1 w-fit rounded-[6px] font-bold text-[11px] mb-[10px] transition-colors duration-200"
                            style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
                        >
                            {post.category.name}
                        </span>
                    </>
                )}
                
                {/* Title */}
                <h1 
                    className={`text-white font-normal group-hover:underline ${isFeatured ? 'text-xl md:text-[28px] leading-tight' : 'text-[17px] md:text-[20px] leading-snug'} line-clamp-3`}
                    style={{ fontFamily: FONT }}
                >
                    {post.title}
                </h1>
                
                {/* Info (Author & Meta) */}
                <div className="flex items-center justify-start gap-[8px] mt-[10px]">
                    <img
                        src={authorImage}
                        alt="Author"
                        className="w-[22px] h-[22px] rounded-full object-cover bg-gray-200"
                    />
                    <p className="text-[12px] text-[#c2c1c1]" style={{ fontFamily: MONO }}>
                        {date} • {post.viewsCount ? `${post.viewsCount.toLocaleString()} views` : '5 min read'}
                    </p>
                </div>

            </div>
        </Link>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrendingPage() {
    const isDark = useTheme();

    const [posts, setPosts] = useState<IPost[]>(fallbackTrendingPosts);
    const [isFetching, setFetching] = useState(true);

    useEffect(() => {
        PostService.getTrendingPosts({ limit: 10 })
            .then(res => {
                if (res.data?.length) setPosts(res.data);
            })
            .catch(console.error)
            .finally(() => setFetching(false));
    }, []);

    // Theme backgrounds matching standard blog layouts
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
            {/* Reduced top padding (pt-10 md:pt-12) to pull it closer to the subscribe bar */}
            <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 pb-32">
                
                {/* Header */}
                <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <h1 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
                        Top Stories
                    </h1>
                    {isFetching && (
                        <span className="text-[12px] font-semibold text-gray-500 animate-pulse" style={{ fontFamily: MONO }}>
                            Loading latest...
                        </span>
                    )}
                </div>

                {/* Grid Layout */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                        {posts.map((post, index) => (
                            <BlogCard 
                                key={post._id} 
                                post={post} 
                                // Make the very first post span wider for emphasis
                                isFeatured={index === 0} 
                            />
                        ))}
                    </div>
                ) : !isFetching ? (
                    <h5 style={{ color: textColor, fontFamily: FONT }}>No top stories found.</h5>
                ) : null}

            </div>
        </div>
    );
}
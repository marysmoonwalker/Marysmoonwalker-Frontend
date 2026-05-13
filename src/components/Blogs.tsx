// import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);
//   return (
//     <a
//       href={'/articles/' + post.slug}
//       className="group rounded-xl overflow-hidden border border-amber-500/30 hover:border-amber-400/70 bg-black/25 backdrop-blur-sm flex flex-col transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]"
//       style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animationDelay: index * 80 + 'ms' }}
//     >
//       <div className="relative overflow-hidden" style={{ paddingTop: '85%' }}>

//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//         />

//         <div
//           className="absolute inset-0"
//           style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.95) 100%)' }}
//         />

//         <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
//           {post.featured && (
//             <span
//               className="px-2.5 py-0.5 rounded-full text-xs uppercase tracking-widest font-semibold"
//               style={{ fontFamily: FONT, background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#000' }}
//             >
//               Featured
//             </span>
//           )}
//           <span
//             className={'px-2.5 py-0.5 rounded-full text-xs uppercase tracking-widest border backdrop-blur-sm ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>
//         </div>

//         <span
//           className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-xs bg-black/60 text-white/60 border border-white/15 backdrop-blur-sm"
//           style={{ fontFamily: FONT }}
//         >
//           {post.readTime ?? '?'} min read
//         </span>

//         <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 z-10">
//           <h3
//             className="font-light text-base leading-snug line-clamp-2 text-amber-300 group-hover:text-white transition-colors duration-300"
//             style={{ fontFamily: FONT, textShadow: '1px 1px 6px rgba(0,0,0,0.9)' }}
//           >
//             {post.title}
//           </h3>
//         </div>

//       </div>

//       <div className="flex items-center justify-between px-4 py-2.5 border-t border-amber-500/20 bg-black/45">
//         <div className="flex items-center gap-1.5 text-xs text-white/55" style={{ fontFamily: FONT }}>
//           <span>{post.author?.fullName ?? 'Unknown'}</span>
//           <span className="text-amber-400">•</span>
//           <span>{fmtDate(post.createdAt)}</span>
//         </div>
//         <div className="w-7 h-7 rounded-full border border-amber-500/40 group-hover:border-amber-400 group-hover:bg-amber-500/15 flex items-center justify-center text-amber-400 transition-all group-hover:translate-x-0.5">
//           <ArrowRight size={13} />
//         </div>
//       </div>

//     </a>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-16 px-4" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-xl border border-amber-500/15 bg-black/25 animate-pulse"
//                 style={{ paddingTop: '85%' }}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 px-4" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex justify-between items-end mb-10 px-1">
//           <div>
//             <h2
//               className="font-light tracking-widest"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(2rem, 5vw, 3.5rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//                 filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.9))',
//               }}
//             >
//               ARTICLES
//             </h2>
//             <p className="text-white/40 text-xs tracking-widest uppercase mt-1.5" style={{ fontFamily: FONT }}>
//               Stories &amp; Insights
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {showSearch ? (
//               <div className="relative">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search articles..."
//                   className="pl-4 pr-9 py-2.5 rounded-lg border-2 border-amber-500/50 bg-black/40 text-white/90 placeholder-white/40 focus:outline-none focus:border-amber-400 w-56 md:w-64 backdrop-blur-sm text-sm transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-amber-400 transition-colors"
//                 >
//                   <X size={15} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="w-10 h-10 rounded-full border-2 border-amber-500/50 bg-black/30 text-amber-400 flex items-center justify-center hover:bg-amber-500/15 hover:border-amber-400 backdrop-blur-sm transition-all"
//                 aria-label="Search articles"
//               >
//                 <Search size={17} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//           {filtered.length === 0 ? (
//             <div
//               className="col-span-full text-center py-20 text-white/40 tracking-widest text-sm"
//               style={{ fontFamily: FONT }}
//             >
//               No articles found.
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="text-center mt-14">
//           <a
//             href="/articles"
//             className="inline-flex items-center gap-3 border-2 border-amber-500/55 px-10 py-4 rounded-lg text-amber-300 hover:text-white bg-black/30 hover:bg-amber-500/10 hover:border-amber-400 font-light text-base uppercase tracking-widest backdrop-blur-sm transition-all duration-300 hover:scale-105 group"
//             style={{ fontFamily: FONT }}
//           >
//             <Bookmark size={18} />
//             View All Articles
//             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// }


























// import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);

//   return (
//     <Link
//       to={'/articles/' + post.slug}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex flex-col transition-all duration-500 hover:border-amber-500/50"
//       style={{ animationDelay: index * 50 + 'ms' }}
//     >
//       <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//         />
        
//         <div 
//           className="absolute inset-0 z-10" 
//           style={{ 
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)' 
//           }} 
//         />

//         <div className="absolute top-4 left-4 flex gap-2 z-20">
//           <span
//             className={'px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
//           <div className="flex items-center gap-2 mb-2 text-[10px] text-amber-400/80 uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             <span>{fmtDate(post.createdAt)}</span>
//             <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>
//             <span>{post.readTime ?? '5'} MIN READ</span>
//           </div>
          
//           <h3
//             className="text-xl font-light leading-tight text-white group-hover:text-amber-300 transition-colors duration-300"
//             style={{ fontFamily: FONT }}
//           >
//             {post.title}
//           </h3>
//         </div>
//       </div>

//       <div className="flex items-center justify-between p-5 bg-zinc-900/80 backdrop-blur-sm border-t border-white/5">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-[10px] text-amber-200 uppercase font-bold">
//             {post.author?.fullName?.charAt(0) ?? 'U'}
//           </div>
//           <span className="text-xs text-white/50 tracking-wide" style={{ fontFamily: FONT }}>
//             {post.author?.fullName ?? 'Unknown'}
//           </span>
//         </div>
//         <div className="text-amber-500/40 group-hover:text-amber-400 transition-all transform group-hover:translate-x-1">
//           <ArrowRight size={18} strokeWidth={1.5} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-24 px-6 bg-[#050505]" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-zinc-900/50 animate-pulse h-[420px]"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 bg-[#050505]" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <h2
//               className="font-light tracking-[0.2em] mb-4"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
//                 color: '#fff'
//               }}
//             >
//               SELECTED <span className="text-amber-500">WRITINGS</span>
//             </h2>
//             <div className="h-1 w-20 bg-amber-500/40"></div>
//           </div>

//           <div className="flex items-center gap-4">
//             {showSearch ? (
//               <div className="relative group">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="SEARCH..."
//                   className="pl-4 pr-10 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 w-64 backdrop-blur-xl text-xs tracking-widest transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
//               >
//                 <Search size={18} strokeWidth={1.5} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.length === 0 ? (
//             <div className="col-span-full text-center py-20 text-white/20 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: FONT }}>
//               No matches found
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/articles"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Explore Library</span>
//             <div className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }





















// import { ArrowRight, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);

//   return (
//     <Link
//       to={'/articles/' + post.slug}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex flex-col transition-all duration-500 hover:border-amber-500/50"
//       style={{ animationDelay: index * 50 + 'ms' }}
//     >
//       <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//         />
        
//         <div 
//           className="absolute inset-0 z-10" 
//           style={{ 
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)' 
//           }} 
//         />

//         <div className="absolute top-4 left-4 flex gap-2 z-20">
//           <span
//             className={'px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
//           <div className="flex items-center gap-2 text-[10px] text-amber-400/80 uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             <span>{fmtDate(post.createdAt)}</span>
//             <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>
//             <span>{post.readTime ?? '5'} MIN READ</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between p-5 bg-zinc-900/80 backdrop-blur-sm border-t border-white/5">
//         <div className="flex-grow pr-4">
//           <h3
//             className="text-sm font-light leading-tight text-white/90 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2"
//             style={{ fontFamily: FONT }}
//           >
//             {post.title}
//           </h3>
//         </div>
//         <div className="flex-shrink-0 text-amber-500/40 group-hover:text-amber-400 transition-all transform group-hover:translate-x-1">
//           <ArrowRight size={18} strokeWidth={1.5} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-24 px-6 bg-[#050505]" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-zinc-900/50 animate-pulse h-[420px]"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 bg-[#050505]" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <h2
//               className="font-light tracking-[0.2em] mb-4"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
//                 color: '#fff'
//               }}
//             >
//               ARTICLES
//             </h2>
//             <div className="h-1 w-20 bg-amber-500/40"></div>
//           </div>

//           <div className="flex items-center gap-4">
//             {showSearch ? (
//               <div className="relative group">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="SEARCH..."
//                   className="pl-4 pr-10 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 w-64 backdrop-blur-xl text-xs tracking-widest transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
//               >
//                 <Search size={18} strokeWidth={1.5} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.length === 0 ? (
//             <div className="col-span-full text-center py-20 text-white/20 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: FONT }}>
//               No matches found
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/articles"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Explore Library</span>
//             <div className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }
























// import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);

//   return (
//     <Link
//       to={'/articles/' + post.slug}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex flex-col transition-all duration-500 hover:border-amber-500/50 no-underline"
//       style={{ animationDelay: index * 50 + 'ms' }}
//     >
//       <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//         />
        
//         <div 
//           className="absolute inset-0 z-10" 
//           style={{ 
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)' 
//           }} 
//         />

//         <div className="absolute top-4 left-4 flex gap-2 z-20">
//           <span
//             className={'px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
//           <div className="flex items-center gap-2 text-[10px] text-amber-400/80 uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             <span>{fmtDate(post.createdAt)}</span>
//             <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>
//             <span>{post.readTime ?? '5'} MIN READ</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between p-5 bg-zinc-900/80 backdrop-blur-sm border-t border-white/5">
//         <div className="flex-grow pr-4">
//           <h3
//             className="text-sm font-light leading-tight text-white/90 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             {post.title}
//           </h3>
//         </div>
//         <div className="flex-shrink-0 text-amber-500/40 group-hover:text-amber-400 transition-all transform group-hover:translate-x-1">
//           <ArrowRight size={18} strokeWidth={1.5} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-24 px-6 bg-[#050505]" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-zinc-900/50 animate-pulse h-[420px]"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 bg-[#050505]" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <h2
//               className="font-light tracking-[0.2em] mb-4"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               ARTICLES
//             </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             {showSearch ? (
//               <div className="relative group">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="SEARCH..."
//                   className="pl-4 pr-10 py-3 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 w-64 backdrop-blur-xl text-xs tracking-widest transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
//               >
//                 <Search size={18} strokeWidth={1.5} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.length === 0 ? (
//             <div className="col-span-full text-center py-20 text-white/20 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: FONT }}>
//               No matches found
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/articles"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Explore Library</span>
//             <div className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }






















// import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);

//   return (
//     <Link
//       to={'/articles/' + post.slug}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex flex-col transition-all duration-500 hover:border-amber-500/50 no-underline"
//       style={{ animationDelay: index * 50 + 'ms' }}
//     >
//       <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//         />
        
//         <div 
//           className="absolute inset-0 z-10" 
//           style={{ 
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)' 
//           }} 
//         />

//         <div className="absolute top-4 left-4 flex gap-2 z-20">
//           <span
//             className={'px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
//           <div className="flex items-center gap-2 text-[10px] text-amber-400/80 uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             <span>{fmtDate(post.createdAt)}</span>
//             <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>
//             <span>{post.readTime ?? '5'} MIN READ</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between p-5 bg-zinc-900/80 backdrop-blur-sm border-t border-white/5">
//         <div className="flex-grow pr-4">
//           <h3
//             className="text-sm font-light leading-tight text-white/90 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             {post.title}
//           </h3>
//         </div>
//         <div className="flex-shrink-0 text-amber-500/40 group-hover:text-amber-400 transition-all transform group-hover:translate-x-1">
//           <ArrowRight size={18} strokeWidth={1.5} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-24 px-6 bg-[#050505]" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-zinc-900/50 animate-pulse h-[420px]"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 bg-[#050505]" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex items-center justify-between mb-16 gap-4">
//           <div className="flex-shrink-0">
//             <h2
//               className="font-light tracking-[0.2em]"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               ARTICLES
//             </h2>
//           </div>

//           <div className="flex items-center justify-end">
//             {showSearch ? (
//               <div className="relative group">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="SEARCH..."
//                   className="pl-4 pr-10 py-2.5 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 w-48 sm:w-64 backdrop-blur-xl text-[10px] tracking-widest transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
//               >
//                 <Search size={18} strokeWidth={1.5} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.length === 0 ? (
//             <div className="col-span-full text-center py-20 text-white/20 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: FONT }}>
//               No matches found
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/articles"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Explore Library</span>
//             <div className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }

























// import { ArrowRight, Search, X, Star, Flame } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function getCatClass(name?: string): string {
//   const n = (name ?? '').toLowerCase();
//   if (n === 'music') return 'bg-amber-500/25 text-amber-300 border-amber-500/40';
//   if (n === 'events') return 'bg-red-500/20 text-red-300 border-red-500/40';
//   if (n === 'news') return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
//   return 'bg-white/10 text-white/70 border-white/20';
// }

// function fmtDate(iso: string): string {
//   return new Date(iso).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// interface CardProps {
//   post: IPost;
//   index: number;
// }

// function ArticleCard({ post, index }: CardProps) {
//   const catClass = getCatClass(post.category?.name);

//   return (
//     <Link
//       to={'/articles/' + post.slug}
//       className="group relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex flex-col transition-all duration-500 hover:border-amber-500/50 no-underline"
//       style={{ animationDelay: index * 50 + 'ms' }}
//     >
//       <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
//         <img
//           src={post.thumbnail ?? ''}
//           alt={post.title}
//           loading="lazy"
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//         />
        
//         <div 
//           className="absolute inset-0 z-10" 
//           style={{ 
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)' 
//           }} 
//         />

//         {/* Floating Badges (Category + Featured/Trending Icons) */}
//         <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
//           <span
//             className={'px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md ' + catClass}
//             style={{ fontFamily: FONT }}
//           >
//             {post.category?.name ?? 'Article'}
//           </span>

//           {/* Featured Icon */}
//           {post.featured && (
//             <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] bg-blue-500/20 text-blue-300 border border-blue-500/40 backdrop-blur-md" style={{ fontFamily: FONT }}>
//               <Star size={10} fill="currentColor" />
//               {/* <span>Featured</span> */}
//             </div>
//           )}

//           {/* Trending Icon */}
//           {post.pinnedTrending && (
//             <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] bg-orange-500/20 text-orange-400 border border-orange-500/40 backdrop-blur-md" style={{ fontFamily: FONT }}>
//               <Flame size={10} fill="currentColor" />
//               {/* <span>Trending</span> */}
//             </div>
//           )}
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
//           <div className="flex items-center gap-2 text-[10px] text-amber-400/80 uppercase tracking-widest" style={{ fontFamily: FONT }}>
//             <span>{fmtDate(post.createdAt)}</span>
//             <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>
//             <span>{post.readTime ?? '5'} MIN READ</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between p-5 bg-zinc-900/80 backdrop-blur-sm border-t border-white/5">
//         <div className="flex-grow pr-4">
//           <h3
//             className="text-sm font-light leading-tight text-white/90 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             {post.title}
//           </h3>
//         </div>
//         <div className="flex-shrink-0 text-amber-500/40 group-hover:text-amber-400 transition-all transform group-hover:translate-x-1">
//           <ArrowRight size={18} strokeWidth={1.5} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ArticlesSection() {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [filtered, setFiltered] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     PostService.getArticles({ page: 1, limit: 6 })
//       .then((res) => {
//         setPosts(res.data.posts);
//         setFiltered(res.data.posts);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (!query.trim()) {
//       setFiltered(posts);
//       return;
//     }
//     const q = query.toLowerCase();
//     setFiltered(
//       posts.filter(
//         (p) =>
//           p.title.toLowerCase().includes(q) ||
//           p.excerpt.toLowerCase().includes(q) ||
//           (p.category?.name ?? '').toLowerCase().includes(q)
//       )
//     );
//   }, [query, posts]);

//   const openSearch = () => {
//     setShowSearch(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//   };

//   const closeSearch = () => {
//     setShowSearch(false);
//     setQuery('');
//   };

//   if (loading) {
//     return (
//       <section className="py-24 px-6 bg-[#050505]" id="articles">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-zinc-900/50 animate-pulse h-[420px]"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 px-6 bg-[#050505]" id="articles">
//       <div className="max-w-7xl mx-auto">

//         <div className="flex items-center justify-between mb-16 gap-4">
//           <div className="flex-shrink-0">
//             <h2
//               className="font-light tracking-[0.2em]"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               ARTICLES
//             </h2>
//           </div>

//           <div className="flex items-center justify-end">
//             {showSearch ? (
//               <div className="relative group">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="SEARCH..."
//                   className="pl-4 pr-10 py-2.5 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 w-48 sm:w-64 backdrop-blur-xl text-[10px] tracking-widest transition-all"
//                   style={{ fontFamily: FONT }}
//                 />
//                 <button
//                   onClick={closeSearch}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={openSearch}
//                 className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-all"
//               >
//                 <Search size={18} strokeWidth={1.5} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.length === 0 ? (
//             <div className="col-span-full text-center py-20 text-white/20 tracking-[0.3em] text-xs uppercase" style={{ fontFamily: FONT }}>
//               No matches found
//             </div>
//           ) : (
//             filtered.map((post, index) => (
//               <ArticleCard key={post._id} post={post} index={index} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/articles"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Explore Library</span>
//             <div className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }






















// import { ArrowRight, Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// // ─── Theme Hook ───────────────────────────────────────────────────────────────

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
//         return () => observer.disconnect();
//     }, []);

//     return isDark;
// }

// // ─── Refined Story Card ───────────────────────────────────────────────────────

// function StoryCard({ post }: { post: IPost }) {
//     const isDark = useTheme();
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
//     return (
//         <Link
//             to={'/articles/' + post.slug}
//             className="group flex flex-col no-underline transition-all duration-500"
//         >
//             {/* Image Container: Matches the 'Legacy' rounded style and definite size logic */}
//             <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] mb-5 bg-zinc-800">
//                 <img
//                     src={post.thumbnail ?? ''}
//                     alt={post.title}
//                     loading="lazy"
//                     className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
//                 />
//                 {/* Subtle overlay for category badge visibility */}
//                 <div className="absolute top-4 left-4">
//                     <span 
//                         className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] rounded-[4px]"
//                         style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                     >
//                         {post.category?.name ?? 'Story'}
//                     </span>
//                 </div>
//             </div>

//             {/* Text Content */}
//             <div className="space-y-3 px-1">
//                 <div className="flex items-center gap-3">
//                     <span className="text-[10px] font-bold tracking-widest opacity-50 uppercase" style={{ fontFamily: MONO }}>
//                         {date}
//                     </span>
//                     <span className="w-1 h-1 rounded-full bg-orange-500/40"></span>
//                     <span className="text-[10px] font-bold tracking-widest opacity-50 uppercase" style={{ fontFamily: MONO }}>
//                         {post.readTime ?? '5'} MIN READ
//                     </span>
//                 </div>

//                 <h3
//                     className="text-xl md:text-2xl font-normal leading-tight group-hover:text-orange-500 transition-colors"
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h3>

//                 <div 
//                     className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] pt-2"
//                     style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                 >
//                     Read Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
//                 </div>
//             </div>
//         </Link>
//     );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────

// export default function StoriesSection() {
//     const isDark = useTheme();
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [filtered, setFiltered] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [showSearch, setShowSearch] = useState(false);
//     const [query, setQuery] = useState('');
//     const inputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         PostService.getArticles({ page: 1, limit: 6 })
//             .then((res) => {
//                 setPosts(res.data.posts);
//                 setFiltered(res.data.posts);
//             })
//             .catch(console.error)
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => {
//         if (!query.trim()) {
//             setFiltered(posts);
//             return;
//         }
//         const q = query.toLowerCase();
//         setFiltered(posts.filter((p) => p.title.toLowerCase().includes(q)));
//     }, [query, posts]);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     if (loading) {
//         return (
//             <section className="py-20 px-6 transition-colors duration-500" style={{ backgroundColor: bg }}>
//                 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                     {[1, 2, 3].map((i) => (
//                         <div key={i} className="aspect-[16/10] rounded-[20px] bg-zinc-900/30 animate-pulse" />
//                     ))}
//                 </div>
//             </section>
//         );
//     }

//     return (
//         <section className="py-20 px-6 transition-colors duration-500" style={{ backgroundColor: bg }} id="stories">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header (Exactly matches 'The Legacy' header style) */}
//                 <div className="mb-12 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
//                     <h2
//                         className="text-2xl md:text-3xl font-bold"
//                         style={{ fontFamily: FONT, color: textColor }}
//                     >
//                         Stories
//                     </h2>

//                     <div className="flex items-center">
//                         {showSearch ? (
//                             <div className="relative flex items-center">
//                                 <input
//                                     ref={inputRef}
//                                     type="text"
//                                     value={query}
//                                     onChange={(e) => setQuery(e.target.value)}
//                                     placeholder="SEARCH STORIES..."
//                                     className="pl-0 pr-8 py-1 bg-transparent border-b border-orange-500 text-white focus:outline-none text-[10px] tracking-widest w-32 sm:w-64"
//                                     style={{ fontFamily: MONO }}
//                                 />
//                                 <button onClick={() => { setShowSearch(false); setQuery(''); }} className="absolute right-0">
//                                     <X size={14} style={{ color: ACCENT_COLOR }} />
//                                 </button>
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={() => { setShowSearch(true); setTimeout(() => inputRef.current?.focus(), 100); }}
//                                 className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all"
//                                 style={{ color: textColor }}
//                             >
//                                 <span className="text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: MONO }}>Search</span>
//                                 <Search size={16} strokeWidth={2} />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Stories Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
//                     {filtered.length === 0 ? (
//                         <div className="col-span-full py-20 text-center opacity-30 text-xs uppercase tracking-[0.4em]" style={{ color: textColor, fontFamily: MONO }}>
//                             No Stories Found
//                         </div>
//                     ) : (
//                         filtered.map((post) => (
//                             <StoryCard key={post._id} post={post} />
//                         ))
//                     )}
//                 </div>

//                 {/* Footer Link */}
//                 <div className="mt-20 flex justify-center border-t pt-10" style={{ borderColor }}>
//                     <Link
//                         to="/articles"
//                         className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] transition-all"
//                         style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                     >
//                         View Full Archive <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
//                     </Link>
//                 </div>

//             </div>
//         </section>
//     );
// }
























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

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
//         return () => observer.disconnect();
//     }, []);

//     return isDark;
// }

// export default function StoriesSection() {
//     const isDark = useTheme();
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         PostService.getArticles({ page: 1, limit: 5 })
//             .then((res) => setPosts(res.data.posts))
//             .catch(console.error)
//             .finally(() => setLoading(false));
//     }, []);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     if (loading || posts.length === 0) return null;

//     // We take the first post as our "Feature Card"
//     const featurePost = posts[0];
//     // The rest go into the "List"
//     const listPosts = posts.slice(1);

//     return (
//         <section className="py-20 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Section Header */}
//                 <div className="mb-12 border-b pb-4" style={{ borderColor }}>
//                     <h2 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
//                         Stories
//                     </h2>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
//                     {/* LEFT: The Main Feature Card (5 Cols) */}
//                     <div className="lg:col-span-5">
//                         <Link to={`/articles/${featurePost.slug}`} className="group block no-underline">
//                             <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-6 bg-zinc-800">
//                                 <img 
//                                     src={featurePost.thumbnail} 
//                                     alt={featurePost.title}
//                                     className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
//                                 />
//                                 <div className="absolute top-6 left-6">
//                                     <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                                         {featurePost.category?.name || 'Feature'}
//                                     </span>
//                                 </div>
//                             </div>
//                             <h3 className="text-3xl md:text-4xl font-normal leading-tight mb-4 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
//                                 {featurePost.title}
//                             </h3>
//                             <p className="text-base leading-relaxed opacity-60 line-clamp-3 mb-4" style={{ color: textColor, fontFamily: FONT }}>
//                                 {featurePost.excerpt}
//                             </p>
//                             <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Read Full Story <ArrowRight size={14} />
//                             </div>
//                         </Link>
//                     </div>

//                     {/* RIGHT: The Elegant List (7 Cols) */}
//                     <div className="lg:col-span-7 flex flex-col justify-start">
//                         {listPosts.map((post, index) => (
//                             <Link 
//                                 key={post._id} 
//                                 to={`/articles/${post.slug}`}
//                                 className={`group flex items-center gap-6 py-8 ${index !== listPosts.length - 1 ? 'border-b' : ''} no-underline transition-all`}
//                                 style={{ borderColor }}
//                             >
//                                 {/* Small Thumb for List items */}
//                                 <div className="hidden sm:block w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-zinc-800">
//                                     <img src={post.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
//                                 </div>

//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                             {post.category?.name}
//                                         </span>
//                                         <span className="text-[9px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
//                                             {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                         </span>
//                                     </div>
//                                     <h4 className="text-xl md:text-2xl font-normal group-hover:text-orange-500 transition-colors line-clamp-2" style={{ color: textColor, fontFamily: FONT }}>
//                                         {post.title}
//                                     </h4>
//                                 </div>

//                                 <div className="shrink-0 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: ACCENT_COLOR }}>
//                                     <ArrowRight size={20} strokeWidth={1.5} />
//                                 </div>
//                             </Link>
//                         ))}

//                         {/* View All Button at the bottom of the list */}
//                         <Link 
//                             to="/articles"
//                             className="mt-10 self-start px-8 py-3 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-orange-500 hover:text-black hover:border-orange-500"
//                             style={{ borderColor, color: textColor, fontFamily: MONO }}
//                         >
//                             View All Stories
//                         </Link>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

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
//         return () => observer.disconnect();
//     }, []);

//     return isDark;
// }

// export default function StoriesSection() {
//     const isDark = useTheme();
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         PostService.getArticles({ page: 1, limit: 5 })
//             .then((res) => setPosts(res.data.posts))
//             .catch(console.error)
//             .finally(() => setLoading(false));
//     }, []);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     if (loading || posts.length === 0) return null;

//     const featurePost = posts[0];
//     const listPosts = posts.slice(1);

//     return (
//         <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Header - Aligned with Legacy/Top Stories */}
//                 <div className="mb-10 border-b pb-4 flex justify-between items-end" style={{ borderColor }}>
//                     <h2 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
//                         Stories
//                     </h2>
//                     <Link to="/articles" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity" style={{ color: textColor, fontFamily: MONO }}>
//                         Full Archive
//                     </Link>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
//                     {/* LEFT: Compact Feature Card */}
//                     <div className="lg:col-span-6">
//                         <Link to={`/articles/${featurePost.slug}`} className="group block no-underline">
//                             {/* Controlled Landscape Aspect Ratio */}
//                             <div className="relative aspect-video w-full rounded-[20px] overflow-hidden mb-5 bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
//                                 <img 
//                                     src={featurePost.thumbnail} 
//                                     alt={featurePost.title}
//                                     className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
//                                 />
//                                 <div className="absolute top-4 left-4">
//                                     <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-[4px]" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                                         {featurePost.category?.name || 'Feature'}
//                                     </span>
//                                 </div>
//                             </div>
                            
//                             <div className="px-1">
//                                 <h3 className="text-2xl md:text-3xl font-normal leading-tight mb-3 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
//                                     {featurePost.title}
//                                 </h3>
//                                 <p className="text-sm leading-relaxed opacity-60 line-clamp-2 mb-4 max-w-xl" style={{ color: textColor, fontFamily: FONT }}>
//                                     {featurePost.excerpt}
//                                 </p>
//                                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                     Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
//                         </Link>
//                     </div>

//                     {/* RIGHT: Minimalist List */}
//                     <div className="lg:col-span-6 flex flex-col justify-start">
//                         {listPosts.map((post, index) => (
//                             <Link 
//                                 key={post._id} 
//                                 to={`/articles/${post.slug}`}
//                                 className={`group flex items-center gap-5 py-5 ${index !== listPosts.length - 1 ? 'border-b' : ''} no-underline transition-all`}
//                                 style={{ borderColor }}
//                             >
//                                 {/* Precise, smaller thumbnails for list items */}
//                                 <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
//                                     <img src={post.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
//                                 </div>

//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-3 mb-1">
//                                         <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                             {post.category?.name}
//                                         </span>
//                                         <span className="text-[8px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
//                                             {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                         </span>
//                                     </div>
//                                     <h4 className="text-lg md:text-xl font-normal group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight" style={{ color: textColor, fontFamily: FONT }}>
//                                         {post.title}
//                                     </h4>
//                                 </div>

//                                 <div className="shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: ACCENT_COLOR }}>
//                                     <ArrowRight size={18} strokeWidth={1.5} />
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// // ─── Theme Hook ───────────────────────────────────────────────────────────────

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
//         return () => observer.disconnect();
//     }, []);

//     return isDark;
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function StoriesSection() {
//     const isDark = useTheme();
//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetching 5 posts to create the mixture (1 Card + 4 List items)
//         PostService.getArticles({ page: 1, limit: 5 })
//             .then((res) => setPosts(res.data.posts))
//             .catch(console.error)
//             .finally(() => setLoading(false));
//     }, []);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     if (loading || posts.length === 0) return null;

//     const featurePost = posts[0];
//     const listPosts = posts.slice(1);

//     return (
//         <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Section Header (Mirrors The Legacy style) */}
//                 <div className="mb-12 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
//                     <div>
//                         <h2 
//                             className="text-2xl md:text-3xl font-bold mb-1" 
//                             style={{ color: textColor, fontFamily: FONT }}
//                         >
//                             Stories
//                         </h2>
//                         <p 
//                             className="text-[11px] font-bold uppercase tracking-widest"
//                             style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontFamily: MONO }}
//                         >
//                             Narratives and Perspectives
//                         </p>
//                     </div>

//                     <Link 
//                         to="/articles"
//                         className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
//                         style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                     >
//                         Explore Library <ArrowRight size={14} />
//                     </Link>
//                 </div>

//                 {/* Mixed Layout Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
//                     {/* LEFT: The Lead Card (Definite Landscape Size) */}
//                     <div className="lg:col-span-6">
//                         <Link to={`/articles/${featurePost.slug}`} className="group block no-underline">
//                             <div className="relative aspect-video w-full rounded-[20px] overflow-hidden mb-6 bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
//                                 <img 
//                                     src={featurePost.thumbnail} 
//                                     alt={featurePost.title}
//                                     className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
//                                 />
//                                 <div className="absolute top-5 left-5">
//                                     <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-[4px]" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                                         Featured
//                                     </span>
//                                 </div>
//                             </div>
                            
//                             <div className="px-1">
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                         {featurePost.category?.name}
//                                     </span>
//                                     <span className="text-[10px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
//                                         {new Date(featurePost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                     </span>
//                                 </div>
//                                 <h3 className="text-2xl md:text-3xl font-normal leading-tight mb-4 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
//                                     {featurePost.title}
//                                 </h3>
//                                 <p className="text-sm leading-relaxed opacity-60 line-clamp-2 mb-6" style={{ color: textColor, fontFamily: FONT }}>
//                                     {featurePost.excerpt}
//                                 </p>
//                                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                     Read Full Narrative <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
//                         </Link>
//                     </div>

//                     {/* RIGHT: The Compact List (Small Thumbnails) */}
//                     <div className="lg:col-span-6 flex flex-col justify-start">
//                         {listPosts.map((post, index) => (
//                             <Link 
//                                 key={post._id} 
//                                 to={`/articles/${post.slug}`}
//                                 className={`group flex items-center gap-5 py-6 ${index !== listPosts.length - 1 ? 'border-b' : ''} no-underline transition-all`}
//                                 style={{ borderColor }}
//                             >
//                                 {/* Fixed size small picture */}
//                                 <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
//                                     <img src={post.thumbnail} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="" />
//                                 </div>

//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-2 mb-1.5">
//                                         <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                             {post.category?.name}
//                                         </span>
//                                         <span className="text-[14px] opacity-20">•</span>
//                                         <span className="text-[9px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
//                                             {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                         </span>
//                                     </div>
//                                     <h4 className="text-lg md:text-xl font-normal group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight" style={{ color: textColor, fontFamily: FONT }}>
//                                         {post.title}
//                                     </h4>
//                                 </div>

//                                 <div className="shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: ACCENT_COLOR }}>
//                                     <ArrowRight size={18} strokeWidth={1.5} />
//                                 </div>
//                             </Link>
//                         ))}
                        
//                         {/* Mobile View All */}
//                         <div className="mt-8 flex md:hidden">
//                             <Link 
//                                 to="/articles"
//                                 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
//                                 style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                             >
//                                 View All Articles <ArrowRight size={14} />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }


























import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StoriesSection() {
    const isDark = useTheme();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching 5 posts to create the mixture (1 Card + 4 List items)
        PostService.getArticles({ page: 1, limit: 5 })
            .then((res) => setPosts(res.data.posts))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    if (loading || posts.length === 0) return null;

    const featurePost = posts[0];
    const listPosts = posts.slice(1);

    return (
        <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header (Mirrors The Legacy style) */}
                <div className="mb-12 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
                    <div>
                        <h2 
                            className="text-2xl md:text-3xl font-bold mb-1" 
                            style={{ color: textColor, fontFamily: FONT }}
                        >
                            Stories
                        </h2>
                        <p 
                            className="text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontFamily: MONO }}
                        >
                            Narratives and Perspectives
                        </p>
                    </div>

                    <Link 
                        to="/articles"
                        className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
                        style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                    >
                        Explore Library <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Mixed Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* LEFT: The Lead Card (Definite Landscape Size) */}
                    <div className="lg:col-span-6">
                        <Link to={`/articles/${featurePost.slug}`} className="group block no-underline">
                            <div className="relative aspect-video w-full rounded-[20px] overflow-hidden mb-6 bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
                                <img 
                                    src={featurePost.thumbnail} 
                                    alt={featurePost.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute top-5 left-5">
                                    <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-[4px] shadow-lg" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
                                        Featured
                                    </span>
                                </div>
                            </div>
                            
                            <div className="px-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                        {featurePost.category?.name}
                                    </span>
                                    <span className="text-[10px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
                                        {new Date(featurePost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-normal leading-tight mb-4 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
                                    {featurePost.title}
                                </h3>
                                <p className="text-sm leading-relaxed opacity-60 line-clamp-2 mb-6" style={{ color: textColor, fontFamily: FONT }}>
                                    {featurePost.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                    Read Full Narrative <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT: The Compact List (Small Thumbnails) */}
                    <div className="lg:col-span-6 flex flex-col justify-start">
                        {listPosts.map((post, index) => (
                            <Link 
                                key={post._id} 
                                to={`/articles/${post.slug}`}
                                className={`group flex items-center gap-5 py-6 ${index !== listPosts.length - 1 ? 'border-b' : ''} no-underline transition-all`}
                                style={{ borderColor }}
                            >
                                {/* Fixed size small picture */}
                                <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-zinc-800" style={{ border: `1px solid ${borderColor}` }}>
                                    <img src={post.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                            {post.category?.name}
                                        </span>
                                        <span className="text-[14px] opacity-20">•</span>
                                        <span className="text-[9px] opacity-40 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <h4 className="text-lg md:text-xl font-normal group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight" style={{ color: textColor, fontFamily: FONT }}>
                                        {post.title}
                                    </h4>
                                </div>

                                <div className="shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: ACCENT_COLOR }}>
                                    <ArrowRight size={18} strokeWidth={1.5} />
                                </div>
                            </Link>
                        ))}
                        
                        {/* Mobile View All (Now Centered) */}
                        <div className="mt-8 flex md:hidden justify-center">
                            <Link 
                                to="/articles"
                                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
                                style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                            >
                                View All Articles <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
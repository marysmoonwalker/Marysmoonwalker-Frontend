// import { useEffect, useState, useRef, useCallback } from 'react';
// import { Search, X, Loader2, Filter, Play, Mic, FileText, ChevronUp, ChevronDown, Star, Flame } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost, ICategory, PostType } from '../services/post.service';

// const FONT = 'Georgia, serif';

// function ContentCard({ post }: { post: IPost }) {
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', {
//         month: 'short', day: 'numeric', year: 'numeric',
//     });

//     const Icon = post.type === 'video' ? Play : post.type === 'audio' ? Mic : FileText;

//     return (
//         <Link
//             to={`/${post.type === 'article' ? 'articles' : post.type === 'video' ? 'videos' : 'audio'}/${post.slug}`}
//             className="group relative flex flex-col bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:bg-zinc-900/60 no-underline"
//         >
//             <div className="relative aspect-video overflow-hidden">
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
//                 {/* --- Added Badges Section --- */}
//                 <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
//                     {post.featured && (
//                         <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.15em] bg-blue-500/20 text-blue-300 border border-blue-500/40 backdrop-blur-md" style={{ fontFamily: FONT }}>
//                             <Star size={10} fill="currentColor" />
//                             <span>Featured</span>
//                         </div>
//                     )}
//                     {post.pinnedTrending && (
//                         <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.15em] bg-orange-500/20 text-orange-400 border border-orange-500/40 backdrop-blur-md" style={{ fontFamily: FONT }}>
//                             <Flame size={10} fill="currentColor" />
//                             <span>Trending</span>
//                         </div>
//                     )}
//                 </div>
//                 {/* ---------------------------- */}

//                 <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-500">
//                     <Icon size={14} />
//                 </div>
//             </div>
//             <div className="p-6">
//                 <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: FONT }}>
//                     <span className="text-amber-500">{post.category?.name}</span>
//                     <span className="text-white/20">•</span>
//                     <span className="text-white/40">{date}</span>
//                 </div>
//                 <h3 className="text-lg font-light text-white/90 leading-snug line-clamp-2" style={{ fontFamily: FONT }}>
//                     {post.title}
//                 </h3>
//             </div>
//         </Link>
//     );
// }

// export default function BlogPage() {
//     const [posts, setPosts]           = useState<IPost[]>([]);
//     const [categories, setCategories] = useState<ICategory[]>([]);
//     const [showFilters, setShowFilters] = useState(false);

//     const [searchQuery, setSearchQuery]   = useState('');
//     const [debouncedSearch, setDebouncedSearch] = useState('');
//     const [selectedType, setSelectedType] = useState<PostType | ''>('');
//     const [selectedCat, setSelectedCat]   = useState<string>('');

//     const [page, setPage]       = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const loadingRef  = useRef(false);
//     const observerRef = useRef<IntersectionObserver | null>(null);

//     useEffect(() => {
//         PostService.getCategories().then(res => setCategories(res.data));
//     }, []);

//     useEffect(() => {
//         const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
//         return () => clearTimeout(timer);
//     }, [searchQuery]);

//     useEffect(() => {
//         setPosts([]);
//         setPage(1);
//         setHasMore(true);
//     }, [debouncedSearch, selectedType, selectedCat]);

//     useEffect(() => {
//         fetchPosts(page);
//     }, [page, debouncedSearch, selectedType, selectedCat]);

//     const fetchPosts = async (currentPage: number) => {
//         if (loadingRef.current) return;
//         loadingRef.current = true;
//         setLoading(true);

//         try {
//             let result: { posts: IPost[]; totalPages: number; currentPage: number };

//             if (debouncedSearch.trim()) {
//                 const res = await PostService.searchPosts({
//                     q:        debouncedSearch.trim(),
//                     page:     currentPage,
//                     limit:    12,
//                     ...(selectedType && { type: selectedType }),
//                     ...(selectedCat  && { category: selectedCat }),
//                 });
//                 result = res.data;
//             } else {
//                 const res = await PostService.getPosts({
//                     page:   currentPage,
//                     limit:  12,
//                     status: 'published',
//                     ...(selectedType && { type: selectedType }),
//                     ...(selectedCat  && { category: selectedCat }),
//                 });
//                 result = res.data;
//             }

//             setPosts(prev => currentPage === 1 ? result.posts : [...prev, ...result.posts]);
//             setHasMore(result.currentPage < result.totalPages);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//             loadingRef.current = false;
//         }
//     };

//     const lastCardRef = useCallback((node: HTMLDivElement | null) => {
//         if (observerRef.current) observerRef.current.disconnect();

//         observerRef.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && !loadingRef.current) {
//                 setHasMore(prev => {
//                     if (prev) setPage(p => p + 1);
//                     return prev;
//                 });
//             }
//         }, { rootMargin: '200px' });

//         if (node) observerRef.current.observe(node);
//     }, []);

//     const clearFilters = () => {
//         setSearchQuery('');
//         setSelectedType('');
//         setSelectedCat('');
//     };

//     const hasActiveFilters = !!debouncedSearch || !!selectedType || !!selectedCat;

//     return (
//         <div className="min-h-screen bg-[#050505] text-white">
//             <div className="max-w-7xl mx-auto px-6 pt-28 pb-32">

//                 {/* Filter Section */}
//                 <div className="mb-16 space-y-6">
//                     <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">

//                         {/* Search */}
//                         <div className="relative flex-grow">
//                             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
//                             <input
//                                 type="text"
//                                 placeholder="Search articles, videos, or audio…"
//                                 value={searchQuery}
//                                 onChange={e => setSearchQuery(e.target.value)}
//                                 className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl pl-14 pr-12 py-5 text-sm focus:outline-none focus:border-amber-500/20 transition-all placeholder:text-white/10"
//                                 style={{ fontFamily: FONT }}
//                             />
//                             {searchQuery && (
//                                 <button
//                                     onClick={() => setSearchQuery('')}
//                                     className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
//                                 >
//                                     <X size={16} />
//                                 </button>
//                             )}
//                         </div>

//                         <button
//                             onClick={() => setShowFilters(!showFilters)}
//                             className={`flex items-center justify-between md:justify-center gap-4 px-8 py-5 rounded-2xl border transition-all ${
//                                 hasActiveFilters
//                                     ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
//                                     : 'bg-zinc-900/40 border-white/5 text-white/60 hover:text-amber-500 hover:border-amber-500/20'
//                             }`}
//                         >
//                             <div className="flex items-center gap-3">
//                                 <Filter size={16} />
//                                 <span className="text-xs uppercase tracking-[0.2em] font-light">
//                                     {hasActiveFilters ? 'Filtered' : 'Discovery'}
//                                 </span>
//                             </div>
//                             {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                         </button>
//                     </div>

//                     {hasActiveFilters && (
//                         <div className="flex items-center gap-3 flex-wrap">
//                             {selectedType && (
//                                 <span className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] uppercase tracking-widest text-amber-400">
//                                     {selectedType}s
//                                     <button onClick={() => setSelectedType('')}><X size={10} /></button>
//                                 </span>
//                             )}
//                             {selectedCat && (
//                                 <span className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] uppercase tracking-widest text-amber-400">
//                                     {categories.find(c => c._id === selectedCat)?.name}
//                                     <button onClick={() => setSelectedCat('')}><X size={10} /></button>
//                                 </span>
//                             )}
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors underline"
//                                 style={{ fontFamily: FONT }}
//                             >
//                                 Clear all
//                             </button>
//                         </div>
//                     )}

//                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
//                         <div className="p-10 bg-zinc-900/20 border border-white/5 rounded-[2rem] space-y-12">
//                             <div>
//                                 <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6" style={{ fontFamily: FONT }}>
//                                     Filter by Format
//                                 </h4>
//                                 <div className="flex flex-wrap gap-3">
//                                     <button
//                                         onClick={() => setSelectedType('')}
//                                         className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
//                                             !selectedType
//                                                 ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
//                                                 : 'border-white/10 text-white/30 hover:text-white'
//                                         }`}
//                                     >
//                                         All Formats
//                                     </button>
//                                     {(['article', 'video', 'audio'] as PostType[]).map(t => (
//                                         <button
//                                             key={t}
//                                             onClick={() => setSelectedType(selectedType === t ? '' : t)}
//                                             className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
//                                                 selectedType === t
//                                                     ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
//                                                     : 'border-white/10 text-white/30 hover:text-white'
//                                             }`}
//                                         >
//                                             {t}s
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6" style={{ fontFamily: FONT }}>
//                                     Subject Categories
//                                 </h4>
//                                 <div className="flex flex-wrap gap-3">
//                                     <button
//                                         onClick={() => setSelectedCat('')}
//                                         className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
//                                             !selectedCat
//                                                 ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
//                                                 : 'border-white/10 text-white/30 hover:text-white'
//                                         }`}
//                                     >
//                                         Everywhere
//                                     </button>
//                                     {categories.map(cat => (
//                                         <button
//                                             key={cat._id}
//                                             onClick={() => setSelectedCat(selectedCat === cat._id ? '' : cat._id)}
//                                             className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
//                                                 selectedCat === cat._id
//                                                     ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
//                                                     : 'border-white/10 text-white/30 hover:text-white'
//                                             }`}
//                                         >
//                                             {cat.name}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Post Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//                     {posts.map((post, idx) => (
//                         <div
//                             key={post._id}
//                             ref={idx === posts.length - 1 ? lastCardRef : null}
//                         >
//                             <ContentCard post={post} />
//                         </div>
//                     ))}
//                 </div>

//                 {loading && (
//                     <div className="flex justify-center py-24">
//                         <Loader2 className="animate-spin text-amber-500/40" size={28} />
//                     </div>
//                 )}

//                 {!loading && posts.length === 0 && (
//                     <div className="text-center py-40 bg-zinc-900/10 rounded-3xl border border-dashed border-white/5">
//                         <p className="text-white/20 tracking-[0.3em] text-xs uppercase mb-6" style={{ fontFamily: FONT }}>
//                             No content matches the current filter
//                         </p>
//                         {hasActiveFilters && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-[10px] uppercase tracking-widest text-amber-500/60 hover:text-amber-400 transition-colors underline"
//                             >
//                                 Clear filters
//                             </button>
//                         )}
//                     </div>
//                 )}

//                 {!hasMore && posts.length > 0 && !loading && (
//                     <div className="text-center mt-24 py-10 border-t border-white/5">
//                         <span className="text-white/10 text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: FONT }}>
//                             End of Collection
//                         </span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }





















// import { useEffect, useState, useRef, useCallback } from 'react';
// import { Search, X, Loader2, Filter, Play, Mic, FileText, ChevronUp, ChevronDown, Star, Flame } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost, ICategory, PostType } from '../services/post.service';

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

// // ─── Content Card Component ───────────────────────────────────────────────────

// function ContentCard({ post, textColor, borderColor }: { post: IPost, textColor: string, borderColor: string }) {
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', {
//         month: 'short', day: 'numeric', year: 'numeric',
//     });

//     const Icon = post.type === 'video' ? Play : post.type === 'audio' ? Mic : FileText;

//     return (
//         <Link
//             to={`/${post.type === 'article' ? 'articles' : post.type === 'video' ? 'videos' : 'audio'}/${post.slug}`}
//             className="group flex flex-col no-underline transition-all duration-500 hover:-translate-y-1"
//         >
//             {/* Image Container - No Blur, No Opacity, No Gradient */}
//             <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] mb-5" style={{ border: `1px solid ${borderColor}` }}>
//                 <img
//                     src={post.thumbnail || '/placeholder.jpg'}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
//                 />
                
//                 {/* Badges - Floating cleanly over the raw image */}
//                 <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
//                     {post.featured && (
//                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[9px] uppercase tracking-widest font-bold shadow-lg bg-black text-white">
//                             <Star size={10} fill="currentColor" />
//                             <span>Featured</span>
//                         </div>
//                     )}
//                     {post.pinnedTrending && (
//                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[9px] uppercase tracking-widest font-bold shadow-lg" style={{ backgroundColor: ACCENT_COLOR, color: '#000' }}>
//                             <Flame size={10} fill="currentColor" />
//                             <span>Trending</span>
//                         </div>
//                     )}
//                 </div>

//                 {/* Media Type Icon */}
//                 <div className="absolute top-4 right-4 p-2.5 rounded-full shadow-lg bg-black text-white">
//                     <Icon size={14} />
//                 </div>
//             </div>

//             {/* Text Content */}
//             <div className="px-1">
//                 <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: MONO }}>
//                     <span style={{ color: ACCENT_COLOR }}>{post.category?.name}</span>
//                     <span className="opacity-30" style={{ color: textColor }}>•</span>
//                     <span className="opacity-50" style={{ color: textColor }}>{date}</span>
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-normal leading-snug line-clamp-2 transition-colors group-hover:text-orange-500" style={{ fontFamily: FONT, color: textColor }}>
//                     {post.title}
//                 </h3>
//             </div>
//         </Link>
//     );
// }

// // ─── Main Blog Page Component ─────────────────────────────────────────────────

// export default function BlogPage() {
//     const isDark = useTheme();
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     const [posts, setPosts] = useState<IPost[]>([]);
//     const [categories, setCategories] = useState<ICategory[]>([]);
//     const [showFilters, setShowFilters] = useState(false);

//     const [searchQuery, setSearchQuery] = useState('');
//     const [debouncedSearch, setDebouncedSearch] = useState('');
//     const [selectedType, setSelectedType] = useState<PostType | ''>('');
//     const [selectedCat, setSelectedCat] = useState<string>('');

//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const loadingRef = useRef(false);
//     const observerRef = useRef<IntersectionObserver | null>(null);

//     useEffect(() => {
//         PostService.getCategories().then(res => setCategories(res.data));
//     }, []);

//     useEffect(() => {
//         const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
//         return () => clearTimeout(timer);
//     }, [searchQuery]);

//     useEffect(() => {
//         setPosts([]);
//         setPage(1);
//         setHasMore(true);
//     }, [debouncedSearch, selectedType, selectedCat]);

//     useEffect(() => {
//         fetchPosts(page);
//     }, [page, debouncedSearch, selectedType, selectedCat]);

//     const fetchPosts = async (currentPage: number) => {
//         if (loadingRef.current) return;
//         loadingRef.current = true;
//         setLoading(true);

//         try {
//             let result: { posts: IPost[]; totalPages: number; currentPage: number };

//             if (debouncedSearch.trim()) {
//                 const res = await PostService.searchPosts({
//                     q: debouncedSearch.trim(),
//                     page: currentPage,
//                     limit: 12,
//                     ...(selectedType && { type: selectedType }),
//                     ...(selectedCat && { category: selectedCat }),
//                 });
//                 result = res.data;
//             } else {
//                 const res = await PostService.getPosts({
//                     page: currentPage,
//                     limit: 12,
//                     status: 'published',
//                     ...(selectedType && { type: selectedType }),
//                     ...(selectedCat && { category: selectedCat }),
//                 });
//                 result = res.data;
//             }

//             setPosts(prev => currentPage === 1 ? result.posts : [...prev, ...result.posts]);
//             setHasMore(result.currentPage < result.totalPages);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//             loadingRef.current = false;
//         }
//     };

//     const lastCardRef = useCallback((node: HTMLDivElement | null) => {
//         if (observerRef.current) observerRef.current.disconnect();

//         observerRef.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && !loadingRef.current) {
//                 setHasMore(prev => {
//                     if (prev) setPage(p => p + 1);
//                     return prev;
//                 });
//             }
//         }, { rootMargin: '200px' });

//         if (node) observerRef.current.observe(node);
//     }, []);

//     const clearFilters = () => {
//         setSearchQuery('');
//         setSelectedType('');
//         setSelectedCat('');
//     };

//     const hasActiveFilters = !!debouncedSearch || !!selectedType || !!selectedCat;

//     return (
//         <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">

//                 {/* ─── Editorial Header ─── */}
//                 <div className="mb-16 border-b pb-8" style={{ borderColor }}>
//                     <h1 className="text-4xl md:text-6xl font-normal leading-tight mb-4" style={{ fontFamily: FONT, color: textColor }}>
//                         The Archive
//                     </h1>
//                     <p className="text-[11px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                         Explore the complete collection of narratives, media, and history.
//                     </p>
//                 </div>

//                 {/* ─── Search & Filter Control Panel ─── */}
//                 <div className="mb-16">
//                     <div className="flex flex-col md:flex-row gap-8 items-end justify-between border-b pb-6" style={{ borderColor }}>
                        
//                         {/* Sleek Search */}
//                         <div className="relative w-full md:max-w-md">
//                             <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30" size={18} style={{ color: textColor }} />
//                             <input
//                                 type="text"
//                                 placeholder="SEARCH THE ARCHIVE..."
//                                 value={searchQuery}
//                                 onChange={e => setSearchQuery(e.target.value)}
//                                 className="w-full bg-transparent border-b py-3 pl-8 pr-10 focus:outline-none text-[10px] uppercase tracking-widest font-bold transition-colors focus:border-orange-500"
//                                 style={{ fontFamily: MONO, color: textColor, borderColor }}
//                             />
//                             {searchQuery && (
//                                 <button
//                                     onClick={() => setSearchQuery('')}
//                                     className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:text-orange-500 transition-colors"
//                                 >
//                                     <X size={16} style={{ color: textColor }} />
//                                 </button>
//                             )}
//                         </div>

//                         {/* Discovery Toggle */}
//                         <button
//                             onClick={() => setShowFilters(!showFilters)}
//                             className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:text-orange-500 shrink-0"
//                             style={{ fontFamily: MONO, color: hasActiveFilters ? ACCENT_COLOR : textColor }}
//                         >
//                             <Filter size={14} />
//                             <span>{hasActiveFilters ? 'Filters Active' : 'Refine Search'}</span>
//                             {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                         </button>
//                     </div>

//                     {/* Active Filter Indicators */}
//                     {hasActiveFilters && (
//                         <div className="flex items-center gap-3 flex-wrap mt-6">
//                             {selectedType && (
//                                 <span className="flex items-center gap-2 px-3 py-1 rounded-[4px] text-[9px] uppercase tracking-widest font-bold" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                                     {selectedType}
//                                     <button onClick={() => setSelectedType('')}><X size={10} /></button>
//                                 </span>
//                             )}
//                             {selectedCat && (
//                                 <span className="flex items-center gap-2 px-3 py-1 rounded-[4px] text-[9px] uppercase tracking-widest font-bold" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                                     {categories.find(c => c._id === selectedCat)?.name}
//                                     <button onClick={() => setSelectedCat('')}><X size={10} /></button>
//                                 </span>
//                             )}
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-[9px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity underline ml-2"
//                                 style={{ fontFamily: MONO, color: textColor }}
//                             >
//                                 Clear all
//                             </button>
//                         </div>
//                     )}

//                     {/* Filter Drawer */}
//                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 pointer-events-none'}`}>
//                         <div className="p-8 rounded-[20px] border space-y-10" style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                            
//                             {/* Format Filter */}
//                             <div>
//                                 <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                     Format
//                                 </h4>
//                                 <div className="flex flex-wrap gap-3">
//                                     <button
//                                         onClick={() => setSelectedType('')}
//                                         className="px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all"
//                                         style={{ 
//                                             borderColor: !selectedType ? ACCENT_COLOR : borderColor, 
//                                             backgroundColor: !selectedType ? 'rgba(255,140,0,0.1)' : 'transparent',
//                                             color: !selectedType ? ACCENT_COLOR : textColor
//                                         }}
//                                     >
//                                         All Formats
//                                     </button>
//                                     {(['article', 'video', 'audio'] as PostType[]).map(t => (
//                                         <button
//                                             key={t}
//                                             onClick={() => setSelectedType(selectedType === t ? '' : t)}
//                                             className="px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all"
//                                             style={{ 
//                                                 borderColor: selectedType === t ? ACCENT_COLOR : borderColor, 
//                                                 backgroundColor: selectedType === t ? 'rgba(255,140,0,0.1)' : 'transparent',
//                                                 color: selectedType === t ? ACCENT_COLOR : textColor
//                                             }}
//                                         >
//                                             {t}s
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Subject Category Filter */}
//                             <div>
//                                 <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                     Subject Categories
//                                 </h4>
//                                 <div className="flex flex-wrap gap-3">
//                                     <button
//                                         onClick={() => setSelectedCat('')}
//                                         className="px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all"
//                                         style={{ 
//                                             borderColor: !selectedCat ? ACCENT_COLOR : borderColor, 
//                                             backgroundColor: !selectedCat ? 'rgba(255,140,0,0.1)' : 'transparent',
//                                             color: !selectedCat ? ACCENT_COLOR : textColor
//                                         }}
//                                     >
//                                         Everywhere
//                                     </button>
//                                     {categories.map(cat => (
//                                         <button
//                                             key={cat._id}
//                                             onClick={() => setSelectedCat(selectedCat === cat._id ? '' : cat._id)}
//                                             className="px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all"
//                                             style={{ 
//                                                 borderColor: selectedCat === cat._id ? ACCENT_COLOR : borderColor, 
//                                                 backgroundColor: selectedCat === cat._id ? 'rgba(255,140,0,0.1)' : 'transparent',
//                                                 color: selectedCat === cat._id ? ACCENT_COLOR : textColor
//                                             }}
//                                         >
//                                             {cat.name}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ─── Grid ─── */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
//                     {posts.map((post, idx) => (
//                         <div key={post._id} ref={idx === posts.length - 1 ? lastCardRef : null}>
//                             <ContentCard post={post} textColor={textColor} borderColor={borderColor} />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Loading / Empty States */}
//                 {loading && (
//                     <div className="flex justify-center py-20">
//                         <Loader2 className="animate-spin" size={28} style={{ color: ACCENT_COLOR }} />
//                     </div>
//                 )}

//                 {!loading && posts.length === 0 && (
//                     <div className="text-center py-32 rounded-[20px] border border-dashed" style={{ borderColor }}>
//                         <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                             No archives match the current criteria
//                         </p>
//                         {hasActiveFilters && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-[10px] font-bold uppercase tracking-widest underline transition-colors hover:text-orange-500"
//                                 style={{ fontFamily: MONO, color: ACCENT_COLOR }}
//                             >
//                                 Reset Filters
//                             </button>
//                         )}
//                     </div>
//                 )}

//                 {!hasMore && posts.length > 0 && !loading && (
//                     <div className="text-center mt-24 py-10 border-t" style={{ borderColor }}>
//                         <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-30" style={{ fontFamily: MONO, color: textColor }}>
//                             End of Collection
//                         </span>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }
























import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, X, Loader2, Play, Mic, FileText, Star, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostService, IPost, ICategory, PostType } from '../services/post.service';

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

// ─── Featured Hero Card (Post 0) ──────────────────────────────────────────────

function FeaturedCard({ post, textColor, borderColor }: { post: IPost, textColor: string, borderColor: string }) {
    const date = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });

    const Icon = post.type === 'video' ? Play : post.type === 'audio' ? Mic : FileText;

    return (
        <Link
            to={`/${post.type === 'article' ? 'articles' : post.type === 'video' ? 'videos' : 'audio'}/${post.slug}`}
            className="group block mb-16 md:mb-24 no-underline"
        >
            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[24px] mb-6 md:mb-8" style={{ border: `1px solid ${borderColor}` }}>
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[10px] uppercase tracking-widest font-bold shadow-lg bg-black text-white" style={{ fontFamily: MONO }}>
                        <Star size={12} fill="currentColor" />
                        <span>Latest Feature</span>
                    </div>
                </div>

                <div className="absolute top-6 right-6 p-3 rounded-full shadow-lg bg-black text-white">
                    <Icon size={16} />
                </div>
            </div>

            <div className="max-w-4xl">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-bold mb-4" style={{ fontFamily: MONO }}>
                    <span style={{ color: ACCENT_COLOR }}>{post.category?.name}</span>
                    <span className="opacity-30" style={{ color: textColor }}>•</span>
                    <span className="opacity-50" style={{ color: textColor }}>{date}</span>
                    <span className="opacity-30" style={{ color: textColor }}>•</span>
                    <span className="opacity-50" style={{ color: textColor }}>{post.readTime ? `${post.readTime} Min Read` : post.type}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-normal leading-tight mb-4 group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
                    {post.title}
                </h2>
                <p className="text-base md:text-lg opacity-60 line-clamp-2 md:line-clamp-3 leading-relaxed" style={{ fontFamily: FONT, color: textColor }}>
                    {post.excerpt}
                </p>
            </div>
        </Link>
    );
}

// ─── Standard Grid Card (Posts 1+) ────────────────────────────────────────────

function ContentCard({ post, textColor, borderColor }: { post: IPost, textColor: string, borderColor: string }) {
    const date = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    const Icon = post.type === 'video' ? Play : post.type === 'audio' ? Mic : FileText;

    return (
        <Link
            to={`/${post.type === 'article' ? 'articles' : post.type === 'video' ? 'videos' : 'audio'}/${post.slug}`}
            className="group flex flex-col no-underline h-full"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[20px] mb-5" style={{ border: `1px solid ${borderColor}` }}>
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {post.pinnedTrending && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[9px] uppercase tracking-widest font-bold shadow-lg" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
                        <Flame size={10} fill="currentColor" />
                        <span>Trending</span>
                    </div>
                )}

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Icon size={12} />
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: MONO }}>
                    <span style={{ color: ACCENT_COLOR }}>{post.category?.name}</span>
                    <span className="opacity-30" style={{ color: textColor }}>•</span>
                    <span className="opacity-50" style={{ color: textColor }}>{date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-normal leading-snug line-clamp-3 transition-colors group-hover:text-orange-500" style={{ fontFamily: FONT, color: textColor }}>
                    {post.title}
                </h3>
            </div>
        </Link>
    );
}

// ─── Main Blog Page Component ─────────────────────────────────────────────────

export default function BlogPage() {
    const isDark = useTheme();
    const bg = isDark ? '#050505' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const [posts, setPosts] = useState<IPost[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedType, setSelectedType] = useState<PostType | ''>('');
    const [selectedCat, setSelectedCat] = useState<string>('');

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        PostService.getCategories().then(res => setCategories(res.data));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
    }, [debouncedSearch, selectedType, selectedCat]);

    useEffect(() => {
        fetchPosts(page);
    }, [page, debouncedSearch, selectedType, selectedCat]);

    const fetchPosts = async (currentPage: number) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            let result: { posts: IPost[]; totalPages: number; currentPage: number };

            if (debouncedSearch.trim()) {
                const res = await PostService.searchPosts({
                    q: debouncedSearch.trim(),
                    page: currentPage,
                    limit: 13, // Fetch 13 so we have 1 hero + 12 grid items
                    ...(selectedType && { type: selectedType }),
                    ...(selectedCat && { category: selectedCat }),
                });
                result = res.data;
            } else {
                const res = await PostService.getPosts({
                    page: currentPage,
                    limit: 13,
                    status: 'published',
                    ...(selectedType && { type: selectedType }),
                    ...(selectedCat && { category: selectedCat }),
                });
                result = res.data;
            }

            setPosts(prev => currentPage === 1 ? result.posts : [...prev, ...result.posts]);
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    };

    const lastCardRef = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loadingRef.current) {
                setHasMore(prev => {
                    if (prev) setPage(p => p + 1);
                    return prev;
                });
            }
        }, { rootMargin: '200px' });

        if (node) observerRef.current.observe(node);
    }, []);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('');
        setSelectedCat('');
    };

    const hasActiveFilters = !!debouncedSearch || !!selectedType || !!selectedCat;
    const heroPost = posts[0];
    const gridPosts = posts.slice(1);

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">

                {/* ─── Editorial Header & Filters ─── */}
                <div className="mb-12 border-b pb-8" style={{ borderColor }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        
                        <div>
                            {/* <h1 className="text-4xl md:text-6xl font-normal leading-tight mb-2" style={{ fontFamily: FONT, color: textColor }}>
                                The Archive
                            </h1> */}
                            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
                                All Stories
                            </h1>
                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                Global Narratives & Media
                            </p>
                        </div>

                        {/* Search Bar - Clean & Integrated */}
                        <div className="relative w-full md:w-[300px]">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40" size={16} style={{ color: textColor }} />
                            <input
                                type="text"
                                placeholder="SEARCH..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-b py-2 pl-8 pr-8 focus:outline-none text-[10px] uppercase tracking-[0.2em] font-bold transition-colors focus:border-orange-500"
                                style={{ fontFamily: MONO, color: textColor, borderColor }}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-orange-500">
                                    <X size={14} style={{ color: textColor }} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Tags Row */}
                    <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        
                        {/* Format Filters */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedType('')}
                                className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all border"
                                style={{ 
                                    borderColor: !selectedType ? ACCENT_COLOR : borderColor,
                                    color: !selectedType ? ACCENT_COLOR : textColor,
                                    opacity: !selectedType ? 1 : 0.5
                                }}
                            >
                                All Formats
                            </button>
                            {(['article', 'video', 'audio'] as PostType[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedType(selectedType === t ? '' : t)}
                                    className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all border"
                                    style={{ 
                                        borderColor: selectedType === t ? ACCENT_COLOR : borderColor,
                                        color: selectedType === t ? ACCENT_COLOR : textColor,
                                        opacity: selectedType === t ? 1 : 0.5
                                    }}
                                >
                                    {t}s
                                </button>
                            ))}
                        </div>

                        {/* Category Select */}
                        <div className="w-full md:w-auto">
                            <select
                                value={selectedCat}
                                onChange={(e) => setSelectedCat(e.target.value)}
                                className="w-full md:w-auto bg-transparent border py-1.5 px-4 rounded-full focus:outline-none text-[9px] uppercase tracking-[0.2em] font-bold appearance-none cursor-pointer transition-colors hover:border-orange-500"
                                style={{ fontFamily: MONO, color: textColor, borderColor }}
                            >
                                <option value="" style={{ background: bg }}>All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id} style={{ background: bg }}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                {/* ─── The Main Content ─── */}
                {posts.length > 0 && (
                    <div>
                        {/* 1. Hero Feature (Only shows on first page, and if search is empty or matches) */}
                        {page === 1 && heroPost && (
                            <FeaturedCard post={heroPost} textColor={textColor} borderColor={borderColor} />
                        )}

                        {/* 2. Symmetrical Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {gridPosts.map((post, idx) => (
                                <div key={post._id} ref={idx === gridPosts.length - 1 ? lastCardRef : null}>
                                    <ContentCard post={post} textColor={textColor} borderColor={borderColor} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading / Empty States */}
                {loading && (
                    <div className="flex justify-center py-24">
                        <Loader2 className="animate-spin" size={28} style={{ color: ACCENT_COLOR }} />
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-32 rounded-[24px] border border-dashed mt-10" style={{ borderColor }}>
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase mb-6 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                            No entries found in the archive.
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-[10px] font-bold uppercase tracking-widest underline transition-colors hover:text-orange-500"
                                style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                )}

                {!hasMore && posts.length > 0 && !loading && (
                    <div className="text-center mt-32 py-10 border-t" style={{ borderColor }}>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                            End of Collection
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
}
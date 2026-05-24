import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, X, Loader2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostService, IPost, ICategory } from '../services/post.service';

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

// ─── True YouTube-Style Video Card ────────────────────────────────────────────

function VideoCard({ post, textColor, borderColor }: { post: IPost, textColor: string, borderColor: string }) {
    const duration = formatDuration(post.duration as any);
    const timePosted = timeAgo(post.createdAt);

    // Determine if it's a Short based on tags or category name
    const isShort = 
        post.tags?.some(tag => tag.toLowerCase().includes('short')) || 
        post.category?.name.toLowerCase().includes('short') ||
        post.title.toLowerCase().includes('#shorts');

    // Shorts use portrait 9:16 aspect ratio, standard videos use landscape 16:9
    const aspectClass = isShort ? 'aspect-[9/16] max-w-[280px] mx-auto w-full' : 'aspect-video w-full';

    return (
        <Link
            to={`/videos/${post.slug}`}
            className="group flex flex-col no-underline w-full"
        >
            <div className={`relative overflow-hidden rounded-xl mb-3 bg-zinc-900 border ${aspectClass}`} style={{ borderColor }}>
                <img
                    src={post.thumbnail || `https://img.youtube.com/vi/${post.mediaMeta?.videoId}/hqdefault.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-black/60 text-white transition-transform duration-300 scale-75 group-hover:scale-100 border border-white/20">
                        <Play size={18} fill="currentColor" className="translate-x-0.5" />
                    </div>
                </div>

                {/* Duration Badge (YouTube Style bottom-right) */}
                {duration && (
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-[1px] bg-black/80 rounded-[4px] text-[11px] font-bold text-white tracking-wider" style={{ fontFamily: MONO }}>
                        {duration}
                    </div>
                )}

                {/* Shorts Indicator */}
                {isShort && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600/90 backdrop-blur-sm rounded-[4px] text-[10px] font-bold uppercase text-white tracking-widest shadow-sm">
                        Shorts
                    </div>
                )}
            </div>

            {/* Meta Data Block */}
            <div className={`flex gap-3 px-1 ${isShort ? 'max-w-[280px] mx-auto w-full' : 'w-full'}`}>
                {/* Smaller Author Avatar (YouTube uses 36px, we use w-8 h-8 which is 32px) */}
                <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden border mt-1 bg-zinc-800" style={{ borderColor }}>
                    <img src={post.author?.avatar || 'https://via.placeholder.com/150'} alt="Author" className="w-full h-full object-cover" />
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-[16px] font-medium leading-snug line-clamp-2 transition-colors group-hover:text-orange-500 mb-1" style={{ fontFamily: FONT, color: textColor }}>
                        {post.title}
                    </h3>
                    
                    <div className="flex flex-col text-[13px] opacity-60 mt-0.5" style={{ fontFamily: FONT, color: textColor }}>
                        {/* Using Username instead of Full Name */}
                        {/* <span className="hover:text-orange-500 transition-colors line-clamp-1 mb-0.5">
                            {post.author?.username || 'moonwalker'}
                        </span> */}
                        
                        <div className="flex items-center gap-1.5">
                            {post.viewsCount !== undefined && (
                                <span>{post.viewsCount.toLocaleString()} views</span>
                            )}
                            {post.viewsCount !== undefined && <span className="text-[10px]">•</span>}
                            <span>{timePosted}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ─── Main Videos Page Component ───────────────────────────────────────────────

export default function VideosPage() {
    const isDark = useTheme();
    const bg = isDark ? '#0F0F0F' : '#FFFFFF'; // Exact YouTube background colors
    const textColor = isDark ? '#F1F1F1' : '#0F0F0F'; // Exact YouTube text colors
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const [posts, setPosts] = useState<IPost[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        PostService.getCategories().then(res => setCategories(res.data));
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
        return () => clearTimeout(t);
    }, [searchQuery]);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
    }, [debouncedSearch, selectedCat]);

    useEffect(() => {
        fetchVideos(page);
    }, [page, debouncedSearch, selectedCat]);

    const fetchVideos = async (currentPage: number) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            let res;
            const queryText = debouncedSearch.trim();

            if (queryText) {
                res = await PostService.searchPosts({
                    q: queryText,
                    type: 'video',
                    page: currentPage,
                    limit: 16,
                    ...(selectedCat && { category: selectedCat }),
                });
            } else {
                res = await PostService.getPosts({
                    type: 'video',
                    status: 'published',
                    page: currentPage,
                    limit: 16,
                    ...(selectedCat && { category: selectedCat }),
                });
            }

            const result = res.data;
            setPosts(prev => currentPage === 1 ? result.posts : [...prev, ...result.posts]);
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.error("Failed to fetch videos:", err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    };

    const lastCardRef = useCallback((node: HTMLDivElement | null) => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
                setPage(p => p + 1);
            }
        }, { rootMargin: '200px' });
        if (node) observerRef.current.observe(node);
    }, [hasMore]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCat('');
    };

    const hasActiveFilters = !!debouncedSearch || !!selectedCat;

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">

                {/* ─── Sleek Header & Filters ─── */}
                <div className="mb-10 pb-6 border-b flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ borderColor }}>
                    
                    <div>
                        <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-2" style={{ fontFamily: FONT, color: textColor }}>
                            The Screening Room
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                            Motion Pictures, Shorts, and Rare Footage
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                        {/* YouTube-style Search Pill */}
                        <div className="relative w-full sm:w-[280px]">
                            <input
                                type="text"
                                placeholder="Search visuals..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border py-2 pl-10 pr-10 rounded-full focus:outline-none text-xs transition-colors focus:border-orange-500"
                                style={{ fontFamily: FONT, color: textColor, borderColor }}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={14} style={{ color: textColor }} />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-orange-500">
                                    <X size={14} style={{ color: textColor }} />
                                </button>
                            )}
                        </div>

                        {/* Minimalist Category Select */}
                        <select
                            value={selectedCat}
                            onChange={(e) => setSelectedCat(e.target.value)}
                            className="w-full sm:w-auto bg-transparent border py-2 px-6 rounded-full focus:outline-none text-[11px] font-medium appearance-none cursor-pointer transition-colors hover:border-orange-500"
                            style={{ fontFamily: FONT, color: textColor, borderColor }}
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

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40" style={{ fontFamily: MONO, color: textColor }}>Active Filters:</span>
                        <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest font-bold underline hover:text-orange-500 transition-colors" style={{ fontFamily: MONO, color: textColor }}>
                            Clear All
                        </button>
                    </div>
                )}

                {/* ─── True YouTube Grid ─── */}
                {/* 
                    Using a standard Grid.
                    gap-x-4 (tight horizontal space) and gap-y-10 (wide vertical space for titles) matches YT exactly.
                    items-start ensures tall shorts and wide standard videos align nicely at the top without stretching.
                */}
                {posts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 items-start">
                        {posts.map((post, idx) => (
                            <div key={post._id} ref={idx === posts.length - 1 ? lastCardRef : null} className="w-full">
                                <VideoCard post={post} textColor={textColor} borderColor={borderColor} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Loading / Empty States */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin" size={24} style={{ color: ACCENT_COLOR }} />
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className="text-center py-32 rounded-[20px] border border-dashed mt-6" style={{ borderColor }}>
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                            No videos match your search.
                        </p>
                    </div>
                )}

                {!hasMore && posts.length > 0 && !loading && (
                    <div className="text-center mt-20 py-8 border-t" style={{ borderColor }}>
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                            End of Videos
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
}
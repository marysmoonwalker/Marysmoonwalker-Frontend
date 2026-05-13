import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, X, Loader2, Mic, Eye, Filter, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostService, IPost, ICategory } from '../services/post.service';

const FONT = 'Georgia, serif';

/**
 * Formats seconds into MM:SS or HH:MM:SS
 */
function formatDuration(seconds?: number): string {
    if (!seconds) return '';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function AudioCard({ post }: { post: IPost }) {
    const date = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    const duration = formatDuration(post.duration);

    return (
        <Link
            to={`/audio/${post.slug}`}
            className="group flex flex-col bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:bg-zinc-900/60 transition-all duration-500 no-underline"
        >
            <div className="relative aspect-video overflow-hidden bg-black">
                <img
                    src={post.thumbnail || '/placeholder.jpg'}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Spotify-green mic icon badge */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#1DB954]">
                    <Mic size={14} />
                </div>

                {/* Hover play hint */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 backdrop-blur-sm flex items-center justify-center text-[#1DB954] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <Mic size={18} />
                    </div>
                </div>

                {duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white/90 border border-white/10 flex items-center gap-1">
                        <Clock size={10} />
                        {duration}
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: FONT }}>
                    <span style={{ color: post.category?.color || '#1DB954' }}>{post.category?.name}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40">{date}</span>
                </div>
                <h3
                    className="text-lg font-light text-white/90 leading-snug line-clamp-2 group-hover:text-[#1DB954] transition-colors duration-300"
                    style={{ fontFamily: FONT }}
                >
                    {post.title}
                </h3>
                {post.viewsCount ? (
                    <div className="flex items-center gap-1.5 mt-3 text-white/25 text-[11px]">
                        <Eye size={11} />
                        {post.viewsCount.toLocaleString()} plays
                    </div>
                ) : null}
            </div>
        </Link>
    );
}

export default function AudioPage() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Load categories once
    useEffect(() => {
        PostService.getCategories().then(res => setCategories(res.data));
    }, []);

    // Search debounce — 400ms
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
        return () => clearTimeout(t);
    }, [searchQuery]);

    // Reset list when filters change
    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
    }, [debouncedSearch, selectedCat]);

    // Fetch data
    useEffect(() => {
        fetchAudio(page);
    }, [page, debouncedSearch, selectedCat]);

    const fetchAudio = async (currentPage: number) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            let res;
            const queryText = debouncedSearch.trim();

            if (queryText) {
                res = await PostService.searchPosts({
                    q: queryText,
                    type: 'audio',
                    page: currentPage,
                    limit: 12,
                    ...(selectedCat && { category: selectedCat }),
                });
            } else {
                res = await PostService.getPosts({
                    type: 'audio',
                    status: 'published',
                    page: currentPage,
                    limit: 12,
                    ...(selectedCat && { category: selectedCat }),
                });
            }

            const result = res.data;
            setPosts(prev => currentPage === 1 ? result.posts : [...prev, ...result.posts]);
            setHasMore(result.currentPage < result.totalPages);
        } catch (err) {
            console.error("Failed to fetch audio posts:", err);
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
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-32">

                {/* Filter Section */}
                <div className="mb-16 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">

                        {/* Search */}
                        <div className="relative flex-grow">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                            <input
                                type="text"
                                placeholder="Search audio…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl pl-14 pr-12 py-5 text-sm focus:outline-none focus:border-[#1DB954]/20 transition-all placeholder:text-white/10"
                                style={{ fontFamily: FONT }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(f => !f)}
                            className={`flex items-center justify-between md:justify-center gap-4 px-8 py-5 rounded-2xl border transition-all ${
                                hasActiveFilters
                                    ? 'bg-[#1DB954]/10 border-[#1DB954]/30 text-[#1DB954]'
                                    : 'bg-zinc-900/40 border-white/5 text-white/60 hover:text-[#1DB954] hover:border-[#1DB954]/20'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Filter size={16} />
                                <span className="text-xs uppercase tracking-[0.2em] font-light">
                                    {hasActiveFilters ? 'Filtered' : 'Category'}
                                </span>
                            </div>
                            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    {/* Active filter chips */}
                    {hasActiveFilters && (
                        <div className="flex items-center gap-3 flex-wrap">
                            {selectedCat && (
                                <span className="flex items-center gap-2 px-4 py-1.5 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-full text-[10px] uppercase tracking-widest text-[#1DB954]">
                                    {categories.find(c => c._id === selectedCat)?.name}
                                    <button onClick={() => setSelectedCat('')}><X size={10} /></button>
                                </span>
                            )}
                            <button
                                onClick={clearFilters}
                                className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors underline"
                                style={{ fontFamily: FONT }}
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Collapsible Filter Panel */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                        <div className="p-10 bg-zinc-900/20 border border-white/5 rounded-[2rem]">
                            <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6" style={{ fontFamily: FONT }}>
                                Subject Categories
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedCat('')}
                                    className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
                                        !selectedCat
                                            ? 'border-[#1DB954]/50 bg-[#1DB954]/10 text-[#1DB954]'
                                            : 'border-white/10 text-white/30 hover:text-white'
                                    }`}
                                >
                                    All Content
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setSelectedCat(selectedCat === cat._id ? '' : cat._id)}
                                        className={`px-7 py-3 rounded-full text-[10px] uppercase tracking-widest border transition-all ${
                                            selectedCat === cat._id
                                                ? 'border-[#1DB954]/50 bg-[#1DB954]/10 text-[#1DB954]'
                                                : 'border-white/10 text-white/30 hover:text-white'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Audio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {posts.map((post, idx) => (
                        <div key={post._id} ref={idx === posts.length - 1 ? lastCardRef : null}>
                            <AudioCard post={post} />
                        </div>
                    ))}
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="flex justify-center py-24">
                        <Loader2 className="animate-spin text-[#1DB954]/40" size={28} />
                    </div>
                )}

                {/* Empty State */}
                {!loading && posts.length === 0 && (
                    <div className="text-center py-40 bg-zinc-900/10 rounded-3xl border border-dashed border-white/5">
                        <p className="text-white/20 tracking-[0.3em] text-xs uppercase mb-6" style={{ fontFamily: FONT }}>
                            No matching audio found
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-[10px] uppercase tracking-widest text-[#1DB954]/60 hover:text-[#1DB954] transition-colors underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {/* End of Feed */}
                {!hasMore && posts.length > 0 && !loading && (
                    <div className="text-center mt-24 py-10 border-t border-white/5">
                        <span className="text-white/10 text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: FONT }}>
                            End of Collection
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
}
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { PostService, IPost } from '../services/post.service';
// import { fallbackTrendingPosts } from '../components/fallback/Trending';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

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

// // ─── Blog Card Component ──────────────────────────────────────────────────────

// function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
//     const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//     const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

//     return (
//         <Link
//             to={getPostUrl(post)}
//             className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
//         >
//             <img
//                 loading="lazy"
//                 src={post.thumbnail || '/placeholder.jpg'}
//                 alt={post.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />

//             <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300">

//                 {post.category?.name && (
//                     <>
//                         <style>{`.pill-hover:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }`}</style>
//                         <span
//                             className="pill-hover text-white px-2.5 py-1 w-fit rounded-[6px] font-bold text-[11px] mb-[10px] transition-colors duration-200"
//                             style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             {post.category.name}
//                         </span>
//                     </>
//                 )}

//                 <h1
//                     className={`text-white font-normal group-hover:underline ${isFeatured ? 'text-xl md:text-[28px] leading-tight' : 'text-[17px] md:text-[20px] leading-snug'} line-clamp-3`}
//                     style={{ fontFamily: FONT }}
//                 >
//                     {post.title}
//                 </h1>

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
//         PostService.getTrendingPosts({ limit: 8 })
//             .then(res => {
//                 if (res.data?.length) setPosts(res.data);
//             })
//             .catch(console.error)
//             .finally(() => setFetching(false));
//     }, []);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';

//     return (
//         <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">

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

//                 {/* Grid */}
//                 {posts.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
//                         {posts.map((post, index) => (
//                             <BlogCard
//                                 key={post._id}
//                                 post={post}
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
import { useHalloween } from './halloween/HalloweenContext';
import { JackOLantern, BatIcon } from './halloween/HalloweenIcons';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

// ─── Cache Config ─────────────────────────────────────────────────────────────

const CACHE_KEY = 'trending_posts_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getCachedPosts(): IPost[] | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (isExpired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

function setCachedPosts(data: IPost[]) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
        // Fail silently if localStorage is full or unavailable
    }
}

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

function HalloweenStoriesBadge() {
    const { isHalloween } = useHalloween();
    if (!isHalloween) return null;
    return (
        <span
            className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF7518]/15 border border-[#FF7518]/40 text-[#FFA333]"
            style={{ fontFamily: MONO }}
        >
            <JackOLantern size={13} glow={true} /> Spooky Picks
        </span>
    );
}

// ─── Blog Card Component ──────────────────────────────────────────────────────

function BlogCard({ post, isFeatured }: { post: IPost; isFeatured?: boolean }) {
    const { isHalloween } = useHalloween();
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const authorImage = post.author?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${post._id}`;

    return (
        <Link
            to={getPostUrl(post)}
            className={`group relative overflow-hidden rounded-[20px] block w-full ${isFeatured ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : 'min-h-[350px]'}`}
        >
            <img
                loading="lazy"
                src={post.thumbnail || '/placeholder.jpg'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Top right bat watermark on card when Halloween is active */}
            {isHalloween && (
                <div className="absolute top-4 right-4 z-10 text-white/40 group-hover:text-[#FF7518] transition-colors duration-300">
                    <BatIcon size={24} />
                </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-[18px] md:p-6 transition-colors duration-300">

                {post.category?.name && (
                    <>
                        <style>{`.pill-hover:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }`}</style>
                        <span
                            className="pill-hover text-white px-2.5 py-1 w-fit rounded-[6px] font-bold text-[11px] mb-[10px] transition-colors duration-200 inline-flex items-center gap-1.5"
                            style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
                        >
                            {isHalloween && <JackOLantern size={12} glow={false} />}
                            {post.category.name}
                        </span>
                    </>
                )}

                <h1
                    className={`text-white font-normal group-hover:underline ${isFeatured ? 'text-xl md:text-[28px] leading-tight' : 'text-[17px] md:text-[20px] leading-snug'} line-clamp-3`}
                    style={{ fontFamily: FONT }}
                >
                    {post.title}
                </h1>

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
        // ✅ Check cache first
        const cached = getCachedPosts();
        if (cached) {
            setPosts(cached);
            setFetching(false);
            return; // Skip API call entirely
        }

        // Cache miss — fetch from API and save
        PostService.getTrendingPosts({ limit: 8 })
            .then(res => {
                if (res.data?.length) {
                    setCachedPosts(res.data); // 💾 Save to localStorage
                    setPosts(res.data);
                }
            })
            .catch(console.error)
            .finally(() => setFetching(false));
    }, []);

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
                            Top Stories
                        </h1>
                        <HalloweenStoriesBadge />
                    </div>
                    {isFetching && (
                        <span className="text-[12px] font-semibold text-gray-500 animate-pulse" style={{ fontFamily: MONO }}>
                            Loading latest...
                        </span>
                    )}
                </div>

                {/* Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                        {posts.map((post, index) => (
                            <BlogCard
                                key={post._id}
                                post={post}
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
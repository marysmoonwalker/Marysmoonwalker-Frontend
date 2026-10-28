import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PostService, IPost } from '../services/post.service';
import { useHalloween } from './halloween/HalloweenContext';
import { JackOLantern, BatIcon } from './halloween/HalloweenIcons';

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
    const { isHalloween } = useHalloween();
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
        <section className="transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header (Mirrors The Legacy style) */}
                <div className="mb-12 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
                    <div>
                        <h2 
                            className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-2.5" 
                            style={{ color: textColor, fontFamily: FONT }}
                        >
                            <span>Stories</span>
                            {isHalloween && (
                                <span className="inline-block hover:scale-125 transition-transform" title="Spooky Stories">
                                    <JackOLantern size={22} glow={true} />
                                </span>
                            )}
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
                                {isHalloween && (
                                    <div className="absolute top-5 right-5 text-white/50 group-hover:text-[#FF7518] transition-colors">
                                        <BatIcon size={26} />
                                    </div>
                                )}
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
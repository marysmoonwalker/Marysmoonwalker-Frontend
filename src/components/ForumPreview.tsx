import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forumApi, IForumThread } from '../services/forum.service';
import { useHalloween } from './halloween/HalloweenContext';
import { JackOLantern, SkullIcon } from './halloween/HalloweenIcons';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

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

export default function ForumPreview() {
    const isDark = useTheme();
    const { isHalloween } = useHalloween();
    const [threads, setThreads] = useState<IForumThread[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentThreads = async () => {
            try {
                const data = await forumApi.getThreads({ limit: 4 });
                setThreads(data.threads);
            } catch (error) {
                console.error("Failed to load forum preview:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentThreads();
    }, []);

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

    if (loading || threads.length === 0) return null;

    const featuredThread = threads[0];
    const otherThreads = threads.slice(1);

    return (
        <section className="pt-16 md:pt-24 px-6 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-10 border-b pb-4 flex justify-between items-end" style={{ borderColor }}>
                    <div>
                        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ color: textColor, fontFamily: FONT }}>
                            <span>Community</span>
                            {isHalloween && (
                                <span className="inline-block hover:scale-125 transition-transform" title="Halloween Community Dialogue">
                                    <JackOLantern size={20} glow={true} />
                                </span>
                            )}
                        </h2>
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40" style={{ color: textColor, fontFamily: MONO }}>
                            The Global Dialogue
                        </p>
                    </div>
                    <Link 
                        to="/forum" 
                        className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105" 
                        style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                    >
                        All Threads <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* LEFT: Featured Card (Scaled down) */}
                    <div className="lg:col-span-5">
                        <Link 
                            to={`/forum/${featuredThread._id}`} 
                            className="group block relative p-6 md:p-8 rounded-[20px] border transition-all duration-500 hover:border-orange-500/30"
                            style={{ backgroundColor: cardBg, borderColor }}
                        >
                            {isHalloween && (
                                <div className="absolute top-4 right-4 text-white/40 group-hover:text-[#FF7518] transition-colors">
                                    <SkullIcon size={20} glow={true} />
                                </div>
                            )}
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                {featuredThread.category}
                            </span>
                            <h3 className="text-xl md:text-2xl font-normal leading-snug mb-3 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
                                {featuredThread.title}
                            </h3>
                            <p className="text-sm opacity-50 line-clamp-2 leading-relaxed mb-6" style={{ color: textColor, fontFamily: FONT }}>
                                {featuredThread.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <img src={featuredThread.author.avatar} alt="" className="w-6 h-6 rounded-full grayscale border border-white/10" />
                                    <span className="text-[11px] opacity-70" style={{ color: textColor, fontFamily: MONO }}>{featuredThread.author.username}</span>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: MONO }}>
                                    {featuredThread.replyCount} Replies
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT: List (Tiny Avatars + Tight Spacing) */}
                    <div className="lg:col-span-7 flex flex-col">
                        {otherThreads.map((thread, index) => (
                            <Link 
                                key={thread._id} 
                                to={`/forum/${thread._id}`}
                                className={`group flex items-center gap-4 py-5 ${index !== otherThreads.length - 1 ? 'border-b' : ''} no-underline transition-all`}
                                style={{ borderColor }}
                            >
                                {/* Tiny Avatar - Just a hint of identity */}
                                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-zinc-800 border border-white/5">
                                    <img src={thread.author.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                            {thread.category}
                                        </span>
                                        <span className="text-[8px] opacity-30 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
                                            {thread.lastActive}
                                        </span>
                                    </div>
                                    <h4 className="text-base md:text-lg font-normal group-hover:text-orange-500 transition-colors line-clamp-1 leading-tight" style={{ color: textColor, fontFamily: FONT }}>
                                        {thread.title}
                                    </h4>
                                </div>

                                <div className="shrink-0 text-[10px] font-bold opacity-30 group-hover:opacity-100 group-hover:text-orange-500 transition-all" style={{ fontFamily: MONO }}>
                                    {thread.replyCount}
                                </div>
                            </Link>
                        ))}
                        
                        {/* Mobile View All (Now Centered with Arrow) */}
                        <div className="mt-8 flex md:hidden justify-center">
                            <Link 
                                to="/forum"
                                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
                                style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                            >
                                Open the Forum <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
// import React, { useEffect, useState } from 'react';
// import { ArrowRight, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { forumApi, IForumThread } from '../services/forum.service';

// const FONT = 'Georgia, serif';

// function ForumRow({ thread }: { thread: IForumThread }) {
//   return (
//     <Link
//       to={`/forum/${thread._id}`}
//       className="group block relative border-b border-white/10 hover:bg-white/[0.03] transition-all duration-300 no-underline"
//     >
//       <div className="flex flex-col md:flex-row md:items-center py-10 px-4 gap-6">
        
//         {/* Main Content */}
//         <div className="flex-grow min-w-0">
//           <div className="flex items-center gap-3 mb-3">
//             <span 
//               className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-semibold"
//               style={{ fontFamily: FONT }}
//             >
//               {thread.category}
//             </span>
//             {/* Improved visibility for metadata */}
//             <span className="text-[11px] text-white/50 uppercase tracking-widest font-medium">
//               — {thread.lastActive}
//             </span>
//           </div>
          
//           <h3 
//             className="text-xl md:text-3xl font-light text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight mb-3"
//             style={{ fontFamily: FONT }}
//           >
//             {thread.title}
//           </h3>
          
//           <p className="text-base text-white/70 font-light line-clamp-1 max-w-3xl" style={{ fontFamily: FONT }}>
//             {thread.excerpt}
//           </p>
//         </div>

//         {/* User & Stats Panel */}
//         <div className="flex items-center justify-between md:justify-end md:gap-10 shrink-0 border-t border-white/5 md:border-none pt-6 md:pt-0">
//           <div className="flex items-center gap-4">
//              <img 
//                src={thread.author.avatar || 'https://via.placeholder.com/150'} 
//                className="w-10 h-10 rounded-full border border-white/10 object-cover" 
//                alt={thread.author.username} 
//              />
//              <div className="flex flex-col">
//                <span className="text-[10px] text-white/40 uppercase tracking-tighter">Started by</span>
//                <span className="text-[12px] text-white font-medium uppercase tracking-wider" style={{ fontFamily: FONT }}>
//                   {thread.author.username}
//                </span>
//              </div>
//           </div>

//           <div className="flex items-center gap-8">
//             <div className="flex flex-col items-center">
//               <span className="text-[10px] text-white/40 uppercase mb-1">Replies</span>
//               <div className="flex items-center gap-2">
//                 <MessageSquare size={14} className="text-amber-500" />
//                 <span className="text-sm text-white font-medium">{thread.replyCount}</span>
//               </div>
//             </div>
//             <ChevronRight size={20} className="text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-300" />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ForumPreview() {
//   const [threads, setThreads] = useState<IForumThread[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecentThreads = async () => {
//       try {
//         const data = await forumApi.getThreads({ limit: 4 });
//         setThreads(data.threads);
//       } catch (error) {
//         console.error("Failed to load forum preview:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecentThreads();
//   }, []);

//   return (
//     <section className="py-32 px-6 bg-[#050505]" id="forum-preview">
//       <div className="max-w-6xl mx-auto">

//         {/* Header - Using 'Community' as requested */}
//         <div className="flex items-baseline justify-between mb-20">
//           <div className="flex flex-col">
//             <h2
//               className="font-light tracking-[0.3em] uppercase"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.8rem, 6vw, 3rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               COMMUNITY
//             </h2>
//             <div className="h-px w-24 bg-amber-500/30 mt-4"></div>
//           </div>
          
//           <Link to="/forum" className="hidden md:flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors uppercase text-[10px] tracking-[0.3em]">
//             View All Discussions <ArrowRight size={12} />
//           </Link>
//         </div>

//         {/* Thread List */}
//         <div className="border-t border-white/10">
//           {loading ? (
//             <div className="py-24 flex flex-col items-center gap-4">
//               <Loader2 className="text-amber-500 animate-spin" size={40} />
//               <span className="text-[10px] uppercase tracking-widest text-white/20">Loading conversations...</span>
//             </div>
//           ) : (
//             threads.map((thread) => (
//               <ForumRow key={thread._id} thread={thread} />
//             ))
//           )}
//         </div>


//         {/* Action Button */}
//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/forum"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Enter the Forum</span>
//             <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>


//       </div>
//     </section>
//   );
// }





















// import React, { useEffect, useState } from 'react';
// import { ArrowRight, MessageSquare, ChevronRight, Loader2, Pin, Flame } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { forumApi, IForumThread } from '../services/forum.service';

// const FONT = 'Georgia, serif';

// function ForumRow({ thread }: { thread: IForumThread }) {
//   return (
//     <Link
//       to={`/forum/${thread._id}`}
//       className="group block relative border-b border-white/10 hover:bg-white/[0.03] transition-all duration-300 no-underline"
//     >
//       <div className="flex flex-col md:flex-row md:items-center py-10 px-4 gap-6">
        
//         <div className="flex-grow min-w-0">
//           <div className="flex items-center gap-3 mb-3">
//             <span 
//               className="text-[11px] uppercase tracking-[0.25em] text-amber-500 font-semibold"
//               style={{ fontFamily: FONT }}
//             >
//               {thread.category}
//             </span>
//             <span className="text-[11px] text-white/50 uppercase tracking-widest font-medium">
//               — {thread.lastActive}
//             </span>
//             {thread.pinned && <Pin size={10} className="text-amber-500" />}
//             {thread.hot && <Flame size={10} className="text-orange-500" />}
//           </div>
          
//           <h3 
//             className="text-xl md:text-3xl font-light text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight mb-3"
//             style={{ fontFamily: FONT }}
//           >
//             {thread.title}
//           </h3>
          
//           <p className="text-base text-white/70 font-light line-clamp-1 max-w-3xl" style={{ fontFamily: FONT }}>
//             {thread.excerpt}
//           </p>
//         </div>

//         <div className="flex items-center justify-between md:justify-end md:gap-10 shrink-0 border-t border-white/5 md:border-none pt-6 md:pt-0">
//           <div className="flex items-center gap-4">
//              <img 
//                src={thread.author.avatar || 'https://via.placeholder.com/150'} 
//                className="w-10 h-10 rounded-full border border-white/10 object-cover" 
//                alt={thread.author.username} 
//              />
//              <div className="flex flex-col">
//                <span className="text-[10px] text-white/40 tracking-tighter">Started by</span>
//                <span className="text-[12px] text-white font-medium lowercase tracking-wider" style={{ fontFamily: FONT }}>
//                   {thread.author.username}
//                </span>
//              </div>
//           </div>

//           <div className="flex items-center gap-8">
//             <div className="flex flex-col items-center">
//               <span className="text-[10px] text-white/40 mb-1">Replies</span>
//               <div className="flex items-center gap-2">
//                 <MessageSquare size={14} className="text-amber-500" />
//                 <span className="text-sm text-white font-medium">{thread.replyCount}</span>
//               </div>
//             </div>
//             {/* <ChevronRight size={20} className="text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-300" /> */}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function ForumPreview() {
//   const [threads, setThreads] = useState<IForumThread[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecentThreads = async () => {
//       try {
//         const data = await forumApi.getThreads({ limit: 4 });
//         setThreads(data.threads);
//       } catch (error) {
//         console.error("Failed to load forum preview:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecentThreads();
//   }, []);

//   return (
//     <section className="py-32 px-6 bg-[#050505]" id="forum-preview">
//       <div className="max-w-6xl mx-auto">

//         <div className="flex items-baseline justify-between mb-20">
//           <div className="flex flex-col">
//             <h2
//               className="font-light tracking-[0.3em] uppercase"
//               style={{
//                 fontFamily: FONT,
//                 fontSize: 'clamp(1.8rem, 6vw, 3rem)',
//                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               COMMUNITY
//             </h2>
//             {/* <div className="h-px w-24 bg-amber-500/30 mt-4"></div> */}
//           </div>
          
//           <Link to="/forum" className="hidden md:flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors uppercase text-[10px] tracking-[0.3em]">
//             View All Discussions <ArrowRight size={12} />
//           </Link>
//         </div>

//         <div className="border-t border-white/10">
//           {loading ? (
//             <div className="py-24 flex flex-col items-center gap-4">
//               <Loader2 className="text-amber-500 animate-spin" size={40} />
//               <span className="text-[10px] uppercase tracking-widest text-white/20">Loading conversations...</span>
//             </div>
//           ) : (
//             threads.map((thread) => (
//               <ForumRow key={thread._id} thread={thread} />
//             ))
//           )}
//         </div>

//         <div className="mt-20 flex justify-center">
//           <Link
//             to="/forum"
//             className="group flex items-center gap-4 border border-white/10 px-10 py-4 rounded-full text-white/60 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all duration-500 no-underline"
//             style={{ fontFamily: FONT }}
//           >
//             <span className="text-xs uppercase tracking-[0.3em]">Enter the Forum</span>
//             <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-500"></div>
//             <ArrowRight size={14} className="group-hover:text-amber-500" />
//           </Link>
//         </div>

//       </div>
//     </section>
//   );
// }























// import React, { useEffect, useState } from 'react';
// import { ArrowRight, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { forumApi, IForumThread } from '../services/forum.service';

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

// export default function ForumPreview() {
//     const isDark = useTheme();
//     const [threads, setThreads] = useState<IForumThread[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRecentThreads = async () => {
//             try {
//                 const data = await forumApi.getThreads({ limit: 4 });
//                 setThreads(data.threads);
//             } catch (error) {
//                 console.error("Failed to load forum preview:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchRecentThreads();
//     }, []);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
//     const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

//     if (loading || threads.length === 0) return null;

//     const featuredThread = threads[0];
//     const otherThreads = threads.slice(1);

//     return (
//         <section className="py-16 md:py-24 px-6 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Header */}
//                 <div className="mb-10 border-b pb-4 flex justify-between items-end" style={{ borderColor }}>
//                     <div>
//                         <h2 className="text-2xl font-bold mb-1" style={{ color: textColor, fontFamily: FONT }}>
//                             Community
//                         </h2>
//                         <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40" style={{ color: textColor, fontFamily: MONO }}>
//                             The Global Dialogue
//                         </p>
//                     </div>
//                     <Link to="/forum" className="hidden md:block text-[10px] font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: MONO }}>
//                         All Threads
//                     </Link>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
//                     {/* LEFT: Featured Card (Scaled down) */}
//                     <div className="lg:col-span-5">
//                         <Link 
//                             to={`/forum/${featuredThread._id}`} 
//                             className="group block relative p-6 md:p-8 rounded-[20px] border transition-all duration-500 hover:border-orange-500/30"
//                             style={{ backgroundColor: cardBg, borderColor }}
//                         >
//                             <span className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 {featuredThread.category}
//                             </span>
//                             <h3 className="text-xl md:text-2xl font-normal leading-snug mb-3 group-hover:text-orange-500 transition-colors" style={{ color: textColor, fontFamily: FONT }}>
//                                 {featuredThread.title}
//                             </h3>
//                             <p className="text-sm opacity-50 line-clamp-2 leading-relaxed mb-6" style={{ color: textColor, fontFamily: FONT }}>
//                                 {featuredThread.excerpt}
//                             </p>
                            
//                             <div className="flex items-center justify-between pt-5 border-t border-white/5">
//                                 <div className="flex items-center gap-2">
//                                     <img src={featuredThread.author.avatar} alt="" className="w-6 h-6 rounded-full grayscale border border-white/10" />
//                                     <span className="text-[11px] opacity-70" style={{ color: textColor, fontFamily: MONO }}>{featuredThread.author.username}</span>
//                                 </div>
//                                 <span className="text-[9px] font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: MONO }}>
//                                     {featuredThread.replyCount} Replies
//                                 </span>
//                             </div>
//                         </Link>
//                     </div>

//                     {/* RIGHT: List (Tiny Avatars + Tight Spacing) */}
//                     <div className="lg:col-span-7 flex flex-col">
//                         {otherThreads.map((thread, index) => (
//                             <Link 
//                                 key={thread._id} 
//                                 to={`/forum/${thread._id}`}
//                                 className={`group flex items-center gap-4 py-5 ${index !== otherThreads.length - 1 ? 'border-b' : ''} no-underline transition-all`}
//                                 style={{ borderColor }}
//                             >
//                                 {/* Tiny Avatar - Just a hint of identity */}
//                                 <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-zinc-800 border border-white/5">
//                                     <img src={thread.author.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
//                                 </div>

//                                 <div className="flex-1 min-w-0">
//                                     <div className="flex items-center gap-2 mb-0.5">
//                                         <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                             {thread.category}
//                                         </span>
//                                         <span className="text-[8px] opacity-30 uppercase tracking-widest" style={{ color: textColor, fontFamily: MONO }}>
//                                             {thread.lastActive}
//                                         </span>
//                                     </div>
//                                     <h4 className="text-base md:text-lg font-normal group-hover:text-orange-500 transition-colors line-clamp-1 leading-tight" style={{ color: textColor, fontFamily: FONT }}>
//                                         {thread.title}
//                                     </h4>
//                                 </div>

//                                 <div className="shrink-0 text-[10px] font-bold opacity-30 group-hover:opacity-100 group-hover:text-orange-500 transition-all" style={{ fontFamily: MONO }}>
//                                     {thread.replyCount}
//                                 </div>
//                             </Link>
//                         ))}
                        
//                         <Link 
//                             to="/forum" 
//                             className="md:hidden mt-8 text-center py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest"
//                             style={{ borderColor, color: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             Open the Forum
//                         </Link>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }

























import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forumApi, IForumThread } from '../services/forum.service';

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
        <section className="py-16 md:py-24 px-6 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-10 border-b pb-4 flex justify-between items-end" style={{ borderColor }}>
                    <div>
                        <h2 className="text-2xl font-bold mb-1" style={{ color: textColor, fontFamily: FONT }}>
                            Community
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
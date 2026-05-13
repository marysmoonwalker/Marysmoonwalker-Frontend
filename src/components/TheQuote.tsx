// import { useEffect, useState } from 'react';

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

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function QuoteBanner() {
//     const isDark = useTheme();

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const mutedText = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
//     const dividerColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     return (
//         <section 
//             className="py-12 md:py-16 transition-colors duration-500 overflow-hidden" 
//             style={{ backgroundColor: bg }}
//         >
//             <div className="max-w-5xl mx-auto px-6">
//                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left">
                    
//                     {/* The Quote Content */}
//                     <div className="flex-1">
//                         <p 
//                             className="text-lg md:text-xl leading-relaxed italic"
//                             style={{ color: textColor, fontFamily: FONT }}
//                         >
//                             <span style={{ color: ACCENT_COLOR, fontSize: '1.5em', lineHeight: 0 }} className="mr-2">&ldquo;</span>
//                             In a world filled with hate, we must still dare to hope. In a world filled with anger, we must still dare to comfort.
//                             <span style={{ color: ACCENT_COLOR, fontSize: '1.5em', lineHeight: 0 }} className="ml-1">&rdquo;</span>
//                         </p>
//                     </div>

//                     {/* Vertical Divider (Hidden on Mobile) */}
//                     <div className="hidden md:block h-16 w-px" style={{ backgroundColor: dividerColor }} />

//                     {/* Attribution */}
//                     <div className="shrink-0 flex flex-col items-center md:items-start gap-1">
//                         <span 
//                             className="text-[11px] font-bold tracking-[0.2em] uppercase"
//                             style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             Michael Jackson
//                         </span>
//                         <span 
//                             className="text-[9px] tracking-[0.1em] uppercase"
//                             style={{ color: mutedText, fontFamily: MONO }}
//                         >
//                             Oxford Address
//                         </span>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }


















// import { useEffect, useState } from 'react';

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

// export default function SimpleDivider() {
//     const isDark = useTheme();
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     return (
//         <div className="py-12 md:py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="flex items-center gap-6">
//                     <span 
//                         className="shrink-0 text-[11px] font-bold tracking-[0.4em] uppercase"
//                         style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                     >
//                         Directory
//                     </span>
//                     <div className="h-px w-full" style={{ backgroundColor: borderColor }} />
//                 </div>
//             </div>
//         </div>
//     );
// }




























// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

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

// const RECENT_POSTS = [
//     {
//         id: '1',
//         title: "The Architecture of a Legend: How Michael Jackson Built the 'Dangerous' Era",
//         category: "History",
//         date: "May 12, 2026",
//         slug: "dangerous-era-architecture"
//     },
//     {
//         id: '2',
//         title: "Beyond the Stage: The Untold Stories of MJ's Humanitarian Mission in Africa",
//         category: "Humanitarian",
//         date: "May 08, 2026",
//         slug: "humanitarian-mission-africa"
//     },
//     {
//         id: '3',
//         title: "Vinyl Revival: Why 'Off The Wall' Still Sounds Better on a Turntable",
//         category: "Music",
//         date: "May 05, 2026",
//         slug: "off-the-wall-vinyl"
//     }
// ];

// export default function BlogPreview() {
//     const isDark = useTheme();
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     return (
//         <section className="py-20 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Header */}
//                 <div className="mb-12 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
//                     <h2 className="text-2xl md:text-3xl font-bold" style={{ color: textColor, fontFamily: FONT }}>
//                         Recent Articles
//                     </h2>
//                     <Link 
//                         to="/articles" 
//                         className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:gap-3" 
//                         style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                     >
//                         Read All <ArrowRight size={14} />
//                     </Link>
//                 </div>

//                 {/* List Feed */}
//                 <div className="flex flex-col">
//                     {RECENT_POSTS.map((post) => (
//                         <Link 
//                             key={post.id}
//                             to={`/articles/${post.slug}`}
//                             className="group py-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
//                             style={{ borderColor }}
//                         >
//                             <div className="max-w-3xl">
//                                 <span 
//                                     className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block"
//                                     style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                                 >
//                                     {post.category}
//                                 </span>
//                                 <h3 
//                                     className="text-xl md:text-2xl lg:text-3xl font-normal group-hover:underline transition-all"
//                                     style={{ color: textColor, fontFamily: FONT }}
//                                 >
//                                     {post.title}
//                                 </h3>
//                             </div>
                            
//                             <div className="flex items-center gap-6">
//                                 <span 
//                                     className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"
//                                     style={{ color: 'rgba(128,128,128,0.6)', fontFamily: MONO }}
//                                 >
//                                     {post.date}
//                                 </span>
//                                 <div 
//                                     className="hidden md:flex w-10 h-10 rounded-full items-center justify-center border transition-all group-hover:scale-110"
//                                     style={{ borderColor, color: ACCENT_COLOR }}
//                                 >
//                                     <ArrowRight size={18} strokeWidth={1.5} />
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }
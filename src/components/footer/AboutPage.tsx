// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, BookOpen, Globe, Archive } from 'lucide-react';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// function useTheme() {
//     const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
//     // Simplified for brevity, add your full observer here if needed
//     return isDark;
// }

// export default function AboutPage() {
//     const isDark = useTheme();
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     useEffect(() => window.scrollTo(0, 0), []);

//     return (
//         <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-5xl mx-auto px-6 pt-32 md:pt-40">
                
//                 {/* Header */}
//                 <header className="mb-20 border-b pb-12" style={{ borderColor }}>
//                     <span className="inline-block px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}>
//                         The Manifesto
//                     </span>
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6" style={{ fontFamily: FONT, color: textColor }}>
//                         About the Archive
//                     </h1>
//                     <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70 max-w-3xl" style={{ fontFamily: FONT, color: textColor }}>
//                         A digital museum dedicated to preserving, cataloging, and sharing the global cultural impact of the greatest entertainer in human history.
//                     </p>
//                 </header>

//                 {/* Core Pillars */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
//                     {[
//                         { icon: Archive, title: 'Preservation', desc: 'Meticulously indexing rare footage, high-fidelity audio, and historical articles.' },
//                         { icon: Globe, title: 'Accessibility', desc: 'Providing a free, global platform for fans and historians to explore the legacy.' },
//                         { icon: BookOpen, title: 'Education', desc: 'Documenting the cultural, musical, and philanthropic milestones that changed the world.' }
//                     ].map((pillar, i) => (
//                         <div key={i} className="flex flex-col border-t pt-8" style={{ borderColor }}>
//                             <pillar.icon size={24} className="mb-6" style={{ color: ACCENT_COLOR }} />
//                             <h3 className="text-[14px] font-bold uppercase tracking-widest mb-4" style={{ fontFamily: MONO, color: textColor }}>
//                                 {pillar.title}
//                             </h3>
//                             <p className="text-[15px] leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
//                                 {pillar.desc}
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Return */}
//                 <footer className="pt-10 border-t flex justify-start" style={{ borderColor }}>
//                     <Link to="/" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase transition-all no-underline hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.7 }}>
//                         <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
//                         Back to Homepage
//                     </Link>
//                 </footer>
//             </div>
//         </div>
//     );
// }


















import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Globe, Archive, Film, Disc, Sparkles } from 'lucide-react';

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

// ─── Main About Page Component ────────────────────────────────────────────────

export default function AboutPage() {
    const isDark = useTheme();
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-12 border-b pb-4" style={{ borderColor }}>
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Return to Homepage
                    </Link>
                </div>

                {/* ─── Flush-Left Header (Smaller Text) ─── */}
                <header className="mb-16 md:mb-20 max-w-4xl">
                    <span 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-5"
                        style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                        <BookOpen size={10} /> The Manifesto
                    </span>
                    <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-5" style={{ fontFamily: FONT, color: textColor }}>
                        Mary's Moonwalker
                    </h1>
                    <p className="text-base md:text-lg font-light leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
                        More than a collection of memorabilia, this is a meticulously curated digital museum dedicated to preserving, cataloging, and sharing the unparalleled cultural impact of the greatest entertainer in human history.
                    </p>
                </header>

                {/* ─── The Curator Split Layout ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
                    
                    {/* LEFT COLUMN: The Story (7 Columns) */}
                    <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
                        <h2 className="text-2xl md:text-3xl font-normal mb-6" style={{ fontFamily: FONT, color: textColor }}>
                            The Vision Behind the Archive
                        </h2>
                        
                        <article className="prose prose-lg max-w-none text-[16px] md:text-[18px] font-light leading-relaxed opacity-80 space-y-6" style={{ fontFamily: FONT, color: textColor }}>
                            <p>
                                History is incredibly fragile. When an artist alters the trajectory of global culture, music, and fashion as profoundly as the King of Pop did, their legacy demands to be protected from the erosion of time and the noise of modern media. That is the foundational belief of <strong>Mary's Moonwalker</strong>.
                            </p>
                            <p>
                                What began as a private, obsessive collection of rare vinyl presses, tour itineraries, and unreleased studio stems has evolved into a global, open-source vault. Our mission is to ensure that future generations can experience the magic, the controversy, the philanthropy, and the sheer boundary-pushing genius of every era—from the Motown years to the final curtain call.
                            </p>
                            <p>
                                We don't just aggregate data; we contextualize it. Every article, every restored short film, and every historical ledger entry on this platform is verified by a dedicated team of historians and lifelong enthusiasts. We believe that to truly understand modern pop culture, one must first study the blueprint.
                            </p>
                        </article>
                        
                        {/* Signature block */}
                        <div className="mt-10 pt-6 border-t" style={{ borderColor }}>
                            <p className="text-[12px] uppercase tracking-[0.3em] font-bold opacity-50 mb-2" style={{ fontFamily: MONO, color: textColor }}>
                                The Chief Curator
                            </p>
                            <p className="text-xl italic" style={{ fontFamily: FONT, color: textColor }}>
                                Mary
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Curator Portrait (5 Columns) */}
                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="relative rounded-[24px] overflow-hidden border p-2 shadow-2xl" style={{ borderColor, backgroundColor: cardBg }}>
                            <div className="rounded-[16px] overflow-hidden aspect-[4/5] bg-zinc-900">
                                <img 
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Mary - Chief Curator" 
                                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center px-4 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                <span className="text-[10px] text-white font-bold uppercase tracking-widest" style={{ fontFamily: MONO }}>
                                    Founder & Archivist
                                </span>
                                <Sparkles size={14} className="text-amber-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Unified Archive Scope Card ─── */}
                <div className="p-8 md:p-16 rounded-[24px] border shadow-2xl" style={{ borderColor, backgroundColor: cardBg }}>
                    
                    <div className="flex items-center gap-4 mb-12 border-b pb-4" style={{ borderColor }}>
                        <Archive size={16} style={{ color: ACCENT_COLOR }} />
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-60" style={{ fontFamily: MONO, color: textColor }}>
                            The Scope of the Archive
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                        {[
                            { 
                                icon: Archive, 
                                title: 'Historical Preservation', 
                                desc: 'Meticulously indexing and restoring rare concert footage, behind-the-scenes photographs, and historical articles that have been lost to physical degradation or media consolidation.' 
                            },
                            { 
                                icon: Film, 
                                title: 'Cinematic Records', 
                                desc: 'A dedicated vault analyzing the short films that revolutionized MTV and redefined the visual language of the music industry forever.' 
                            },
                            { 
                                icon: Disc, 
                                title: 'The Audio Stems', 
                                desc: 'Deep-dive explorations into studio sessions, examining the legendary engineering, vocal stacks, and innovative instrumentation that created the highest-selling albums in history.' 
                            },
                            { 
                                icon: Globe, 
                                title: 'Global Accessibility', 
                                desc: 'Providing a free, beautifully architected platform for fans, historians, and students worldwide to study the legacy without paywalls or intrusive advertising.' 
                            },
                            { 
                                icon: Sparkles, 
                                title: 'Cultural Context', 
                                desc: 'Documenting not just the music, but the monumental philanthropic efforts, the fashion milestones, and the barrier-breaking achievements.' 
                            },
                            { 
                                icon: BookOpen, 
                                title: 'Community Ledger', 
                                desc: 'An active, moderated forum and contribution system allowing fans from across the globe to submit their own stories, corrections, and rare finds to the database.' 
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <pillar.icon size={18} style={{ color: ACCENT_COLOR }} />
                                    <h3 className="text-[13px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                                        {pillar.title}
                                    </h3>
                                </div>
                                <p className="text-[15px] leading-relaxed opacity-70 pl-8 md:pl-0" style={{ fontFamily: FONT, color: textColor }}>
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Bottom Navigation ─── */}
                <footer className="mt-24 pt-8 border-t flex justify-start" style={{ borderColor }}>
                    <Link 
                        to="/" 
                        className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase transition-all no-underline hover:text-orange-500" 
                        style={{ fontFamily: MONO, color: textColor, opacity: 0.7 }}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                        Back to Homepage
                    </Link>
                </footer>

            </div>
        </div>
    );
}
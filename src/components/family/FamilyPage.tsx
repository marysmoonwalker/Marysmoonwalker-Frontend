import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GitMerge } from 'lucide-react';

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
        return () => { observer.disconnect(); window.removeEventListener('storage', onStorage); };
    }, []);

    return isDark;
}

// ─── Family Data ──────────────────────────────────────────────────────────────

export const familyData = [
    {
        id: 'katherine',
        name: 'Katherine Jackson',
        relation: 'The Matriarch',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop', // Replace with real Katherine photo
        excerpt: 'The gentle, grounding force of the Jackson family. Her unconditional love and deep faith shaped Michael’s lifelong philanthropic spirit and moral compass.',
    },
    {
        id: 'joe',
        name: 'Joe Jackson',
        relation: 'The Patriarch',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop', // Replace with real Joe photo
        excerpt: 'The visionary and strict disciplinarian who recognized his children’s raw talent and relentlessly forged them into the world-conquering Jackson 5.',
    },
    {
        id: 'janet',
        name: 'Janet Jackson',
        relation: 'Youngest Sister',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop', // Replace with real Janet photo
        excerpt: 'A global music icon in her own right. She stepped out of the family shadow to redefine pop, R&B, and dance with masterpieces like Control and Rhythm Nation 1814.',
    },
    {
        id: 'jermaine',
        name: 'Jermaine Jackson',
        relation: 'Older Brother',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop', // Replace with real Jermaine photo
        excerpt: 'The original co-lead singer and bassist of The Jackson 5. His smooth vocals and musicianship were instrumental in establishing the group’s early Motown sound.',
    },
    {
        id: 'jaafar',
        name: 'Jaafar Jackson',
        relation: 'Nephew',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop', // Replace with real Jaafar photo
        excerpt: 'The son of Jermaine Jackson. A rising star handpicked to portray his uncle Michael in the upcoming biographical film, carrying the physical and vocal legacy into a new generation.',
    }
];

// ─── Main Family Page Component ───────────────────────────────────────────────

export default function FamilyPage() {
    const isDark = useTheme();
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

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

                {/* ─── Flush-Left Header (Small text size) ─── */}
                <header className="mb-16 md:mb-24 max-w-3xl">
                    <span 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-4"
                        style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                        <GitMerge size={10} /> The Dynasty
                    </span>
                    <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-4" style={{ fontFamily: FONT, color: textColor }}>
                        The Family Tree
                    </h1>
                    <p className="text-base md:text-lg font-light leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
                        The roots, branches, and future of the most influential family in the history of modern music. Explore the figures who shaped, shared, and are carrying on the legacy.
                    </p>
                </header>

                {/* ─── The Vertical Staggered Tree ─── */}
                <div className="relative max-w-5xl mx-auto">
                    
                    {/* The Center Line */}
                    <div 
                        className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2"
                        style={{ backgroundColor: borderColor }}
                    />

                    <div className="flex flex-col gap-16 md:gap-24">
                        {familyData.map((member, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={member.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* The Tree Node Dot */}
                                    <div 
                                        className="absolute left-[15px] md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 z-10"
                                        style={{ 
                                            backgroundColor: ACCENT_COLOR, 
                                            boxShadow: `0 0 0 4px ${bg}` 
                                        }}
                                    />

                                    {/* Empty space for the opposite side on desktop */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0 flex flex-col group">
                                        <Link to={`/family/${member.id}`} className="block no-underline">
                                            
                                            <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[20px] overflow-hidden border bg-zinc-900 mb-6" style={{ borderColor }}>
                                                <img 
                                                    src={member.image} 
                                                    alt={member.name}
                                                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                                />
                                                {/* Relation Badge */}
                                                <div 
                                                    className="absolute top-4 right-4 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest shadow-lg"
                                                    style={{ backgroundColor: bg, color: textColor, fontFamily: MONO }}
                                                >
                                                    {member.relation}
                                                </div>
                                            </div>

                                            <div className={`flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                                <h2 className="text-xl md:text-2xl font-normal leading-snug mb-3 transition-colors group-hover:text-orange-500" style={{ fontFamily: FONT, color: textColor }}>
                                                    {member.name}
                                                </h2>
                                                <p className="text-[14px] md:text-[15px] font-light leading-relaxed opacity-70 mb-6" style={{ fontFamily: FONT, color: textColor }}>
                                                    {member.excerpt}
                                                </p>
                                                
                                                <div 
                                                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all group-hover:gap-3 group-hover:text-orange-500"
                                                    style={{ fontFamily: MONO, color: textColor }}
                                                >
                                                    Read Biography <ArrowRight size={14} />
                                                </div>
                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

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
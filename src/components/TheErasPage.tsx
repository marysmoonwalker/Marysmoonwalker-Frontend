import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

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

// ─── Timeline Data ────────────────────────────────────────────────────────────

const timelineItems = [
    {
        id: 'thriller',
        title: 'The Thriller Phenomenon',
        year: '1982',
        image: 'https://i.pinimg.com/originals/fb/4d/fd/fb4dfd4e2c955ca3716e6f804043f0dc.gif',
        // image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1000&auto=format&fit=crop',
        excerpt: 'The album that broke all barriers, redefined the music video, and became the highest-selling record in human history.',
    },
    {
        id: 'moonwalk',
        title: 'The Moonwalk Debut',
        year: '1983',
        // image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop',
        image: 'https://i.pinimg.com/736x/a5/25/d5/a525d5da6d17005ef0c21dd8f2dbd4e2.jpg',
        excerpt: 'One televised performance that birthed the most imitated dance move in human history and cemented his crown.',
    },
    {
        id: 'billie-jean',
        title: 'The Billie Jean Revolution',
        year: '1983',
        // image: 'https://images.unsplash.com/photo-1516280440502-a2f1c841e737?q=80&w=1000&auto=format&fit=crop',
        image: 'https://i.pinimg.com/736x/2e/cc/61/2ecc619e9fdd2c83560f295ee63d1ab4.jpg',
        excerpt: 'The iconic bassline, the glowing sidewalk, and the song that single-handedly broke MTVs color barrier.',
    },
    {
        id: 'we-are-the-world',
        title: 'We Are The World',
        year: '1985',
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop',
        excerpt: 'A generation of music legends united in a single room to sing an anthem that raised millions for African famine relief.',
    },
    {
        id: 'bad',
        title: 'The Bad Era',
        year: '1987',
        // image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
        image: 'https://i.pinimg.com/1200x/98/3a/54/983a5425462a73028421d5a9e4e97181.jpg',
        excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits, proving he was peerless.',
    },
    {
        id: 'dangerous-tour',
        title: 'Dangerous World Tour',
        year: '1992',
        image: 'https://i.pinimg.com/736x/39/e4/18/39e418e97880a073d9fe8068d82452dc.jpg',
        // image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop',
        excerpt: 'A breathtaking theatrical spectacle that pushed the boundaries of live performance and donated all profits to charity.',
    }
];

// ─── Main Timeline Page Component ─────────────────────────────────────────────

export default function LegacyTimelinePage() {
    const isDark = useTheme();

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                
                {/* ─── Flush-Left Editorial Header ─── */}
                <header className="mb-20 md:mb-24 max-w-3xl border-b pb-8" style={{ borderColor }}>
                    <span 
                        className="inline-block px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest mb-6"
                        style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                        Historical Archives
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4" style={{ fontFamily: FONT, color: textColor }}>
                        The Legacy
                    </h1>
                    <p className="text-base md:text-lg font-light leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
                        A chronological journey through the most impactful eras and cultural milestones in music history.
                    </p>
                </header>

                {/* ─── The Vertical Timeline ─── */}
                <div className="relative max-w-5xl mx-auto">
                    
                    {/* The Center Line */}
                    <div 
                        className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2"
                        style={{ backgroundColor: borderColor }}
                    />

                    <div className="flex flex-col gap-20 md:gap-32">
                        {timelineItems.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={item.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* The Timeline Dot */}
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
                                        <Link to={`/legacy/${item.id}`} className="block no-underline">
                                            
                                            {/* Era Image */}
                                            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border bg-zinc-900 mb-8" style={{ borderColor }}>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                                />
                                                {/* Floating Year Badge */}
                                                <div 
                                                    className="absolute top-4 right-4 px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest shadow-lg"
                                                    style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                                                >
                                                    {item.year}
                                                </div>
                                            </div>

                                            {/* Era Text */}
                                            <div className={`flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                                <h2 className="text-2xl md:text-3xl font-normal leading-snug mb-4 transition-colors group-hover:text-orange-500" style={{ fontFamily: FONT, color: textColor }}>
                                                    {item.title}
                                                </h2>
                                                <p className="text-base md:text-lg font-light leading-relaxed opacity-70 mb-8" style={{ fontFamily: FONT, color: textColor }}>
                                                    {item.excerpt}
                                                </p>
                                                
                                                <div 
                                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:gap-3 group-hover:text-orange-500"
                                                    style={{ fontFamily: MONO, color: textColor }}
                                                >
                                                    Explore Era <ArrowRight size={14} />
                                                </div>
                                            </div>

                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Classic Footer Navigation ─── */}
                <footer className="mt-32 pt-10 border-t flex justify-start" style={{ borderColor }}>
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
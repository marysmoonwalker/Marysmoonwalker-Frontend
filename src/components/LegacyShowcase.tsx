import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00'; // Bright Golden Chocolate

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

// ─── Data Interfaces & Array ──────────────────────────────────────────────────

export interface LegacyDetail {
    name: string;
    info: string;
}

export interface LegacyItem {
    id: string;
    title: string;
    year: string;
    image: string;
    excerpt: string;
    details: LegacyDetail[];
}

export const legacyItems: LegacyItem[] = [
    {
        id: 'thriller',
        title: 'Thriller',
        year: '1982',
        image: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
        excerpt: 'The best-selling album of all time — a seismic cultural moment that redefined pop music forever.',
        details: [
            { name: 'Global Sales', info: 'Over 70 million copies' },
            { name: 'Grammy Record', info: '8 Awards in one night' },
        ],
    },
    {
        id: 'moonwalk',
        title: 'The Moonwalk',
        year: '1983',
        image: 'https://i.pinimg.com/1200x/dd/d6/30/ddd6302d9db7c7e61e563a880329698d.jpg',
        excerpt: 'One televised step that became the most imitated dance move in human history.',
        details: [
            { name: 'Debut Date', info: 'March 25, 1983' },
            { name: 'TV Viewers', info: '47 Million Americans' },
        ],
    },
    {
        id: 'dangerous-tour',
        title: 'Dangerous World Tour',
        year: '1992–1993',
        image: 'https://i.pinimg.com/1200x/a3/10/18/a310188a6c72e74fb2bd650c76e579f3.jpg',
        excerpt: 'A breathtaking spectacle that took 3.5 million fans across 69 cities on an unforgettable journey.',
        details: [
            { name: 'Attendance', info: '3.5 Million Fans' },
            { name: 'Charity', info: '100% of profits donated' },
        ],
    },
    {
        id: 'billie-jean',
        title: 'Billie Jean',
        year: '1983',
        image: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
        excerpt: 'The song that broke barriers at MTV and cemented Michael as the undisputed King of Pop.',
        details: [
            { name: 'MTV History', info: 'Broke the Color Barrier' },
            { name: 'Awards', info: '2 Grammy Wins' },
        ],
    },
    {
        id: 'we-are-the-world',
        title: 'We Are The World',
        year: '1985',
        image: 'https://i.pinimg.com/736x/39/89/f4/3989f464375ab101f40c09613825a6fe.jpg',
        excerpt: 'A generation united in song — the anthem that raised $60 million for African famine relief.',
        details: [
            { name: 'Funds Raised', info: 'Over $63 Million' },
            { name: 'Artists', info: '45 Legends United' },
        ],
    },
    {
        id: 'bad-album',
        title: 'Bad',
        year: '1987',
        image: 'https://i.pinimg.com/736x/65/d8/e4/65d8e4743f4ad006f70be30180895aac.jpg',
        excerpt: 'Five number ones from a single album — a record that still stands in music history.',
        details: [
            { name: 'Hot 100 Hits', info: '5 Consecutive #1s' },
            { name: 'Sales', info: '35 Million+ Worldwide' },
        ],
    },
];

// ─── Legacy Card Component ────────────────────────────────────────────────────

function LegacyCard({ item }: { item: LegacyItem }) {
    return (
        <Link
            to={`/legacy/${item.id}`}
            // Definite sizes: strictly 280x380 on mobile, 320x420 on desktop
            className="group relative block overflow-hidden rounded-[20px] shrink-0 w-[280px] h-[380px] md:w-[320px] md:h-[420px]"
        >
            <style>{`
                .legacy-title-${item.id}:hover { color: ${ACCENT_COLOR}; }
                .legacy-badge-${item.id}:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }
            `}</style>

            {/* Image (object-cover ensures it never stretches weirdly) */}
            <img
                loading="lazy"
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 transition-colors duration-500 group-hover:bg-black/70">
                
                {/* Top Badge (Year) */}
                <div className="absolute top-5 left-5">
                    <span 
                        className={`legacy-badge-${item.id} text-[#000000] px-3 py-1.5 rounded-[6px] font-bold text-[11px] uppercase tracking-widest transition-colors duration-300`}
                        style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
                    >
                        {item.year}
                    </span>
                </div>
                
                {/* Title */}
                <h1 
                    className={`text-white legacy-title-${item.id} transition-colors duration-300 text-xl md:text-2xl leading-snug line-clamp-2 mb-2`}
                    style={{ fontFamily: FONT }}
                >
                    {item.title}
                </h1>

                {/* Excerpt */}
                <p 
                    className="text-[13px] leading-relaxed line-clamp-2 mb-4"
                    style={{ color: 'rgba(255,255,255,0.7)', fontFamily: FONT }}
                >
                    {item.excerpt}
                </p>
                
                {/* Action Link */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                    Explore Era <ArrowRight size={13} strokeWidth={2.5} />
                </div>

            </div>
        </Link>
    );
}

// ─── Main Showcase Component ──────────────────────────────────────────────────

export default function LegacyShowcase() {
    const isDark = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // Width of card + gap (320px + 30px)
    const SCROLL_AMOUNT = 350; 

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleScroll = () => {
            const idx = Math.round(el.scrollLeft / SCROLL_AMOUNT);
            setCurrentIndex(idx);
        };
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const currentScroll = scrollRef.current.scrollLeft;
        scrollRef.current.scrollTo({
            left: direction === 'right' ? currentScroll + SCROLL_AMOUNT : currentScroll - SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    return (
        <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header (Perfectly matches Top Stories) */}
                <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
                    <h2 
                        className="text-2xl md:text-3xl font-bold" 
                        style={{ color: textColor, fontFamily: FONT }}
                    >
                        The Legacy
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scrollTo('left')}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                            style={{ border: `1px solid ${borderColor}`, color: textColor }}
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        <button 
                            onClick={() => scrollTo('right')}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                            style={{ border: `1px solid ${borderColor}`, color: textColor }}
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Scroller Area */}
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-[30px] pb-6 no-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                    {legacyItems.map((item) => (
                        <div key={item.id} className="snap-start">
                            <LegacyCard item={item} />
                        </div>
                    ))}
                    {/* Padding block so the last card doesn't stick to the right edge */}
                    <div className="shrink-0 w-4 md:w-8" />
                </div>

            </div>
        </section>
    );
}
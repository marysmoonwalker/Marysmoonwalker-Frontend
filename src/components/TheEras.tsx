import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

// ─── Data for the Bento Grid ──────────────────────────────────────────────────

const BENTO_ITEMS = [
    {
        id: 'thriller',
        title: 'The Thriller Phenomenon',
        year: '1982',
        excerpt: 'The album that broke all barriers and became the highest-selling record in human history.',
        image: 'https://i.pinimg.com/originals/fb/4d/fd/fb4dfd4e2c955ca3716e6f804043f0dc.gif',
        // image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1000&auto=format&fit=crop', // Replace with Thriller era image
        gridClass: 'md:col-span-2 md:row-span-1 min-h-[350px]' // Wide box
    },
    {
        id: 'moonwalk',
        title: 'The Moonwalk',
        year: '1983',
        excerpt: 'One televised step that became the most imitated dance move ever.',
        image: 'https://i.pinimg.com/736x/a5/25/d5/a525d5da6d17005ef0c21dd8f2dbd4e2.jpg',
        // image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop', // Replace with Motown 25 image
        gridClass: 'md:col-span-1 md:row-span-2 min-h-[350px] md:min-h-full' // Tall box
    },
    {
        id: 'bad',
        title: 'The Bad Era',
        year: '1987',
        excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits.',
        image: 'https://i.pinimg.com/1200x/98/3a/54/983a5425462a73028421d5a9e4e97181.jpg',
        // image: 'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=1000&auto=format&fit=crop', // Replace with Bad era image
        gridClass: 'md:col-span-1 md:row-span-1 min-h-[300px]' // Square box
    },
    {   
        id: 'dangerous',
        title: 'Dangerous Tour',
        year: '1992',
        excerpt: 'A breathtaking spectacle that donated 100% of its profits to charity.',
        image: 'https://i.pinimg.com/736x/39/e4/18/39e418e97880a073d9fe8068d82452dc.jpg',
        // image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop', // Replace with Dangerous era image
        gridClass: 'md:col-span-1 md:row-span-1 min-h-[300px]' // Square box
    }
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TheLegacyBento() {
    const isDark = useTheme();

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    return (
        <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
                    <div>
                        <h2 
                            className="text-2xl md:text-3xl font-bold mb-1" 
                            style={{ color: textColor, fontFamily: FONT }}
                        >
                            The Legacy
                        </h2>
                        <p 
                            className="text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontFamily: MONO }}
                        >
                            Iconic Moments in History
                        </p>
                    </div>

                    <Link 
                        to="/legacy"
                        className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
                        style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                    >
                        View Full Timeline <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 md:h-[700px]">
                    {BENTO_ITEMS.map((item) => (
                        <Link
                            key={item.id}
                            to={`/legacy/${item.id}`}
                            className={`group relative overflow-hidden rounded-[20px] block w-full ${item.gridClass}`}
                        >
                            <style>{`
                                .bento-hover-${item.id}:hover { color: ${ACCENT_COLOR}; }
                            `}</style>

                            {/* Background Image */}
                            <img
                                loading="lazy"
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                
                                {/* Year Badge */}
                                <span 
                                    className="px-2.5 py-1 w-fit rounded-[6px] font-bold text-[10px] tracking-widest uppercase mb-3 shadow-lg"
                                    style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                                >
                                    {item.year}
                                </span>
                                
                                {/* Title */}
                                <h3 
                                    className={`bento-hover-${item.id} text-white text-2xl md:text-3xl font-normal leading-snug mb-2 transition-colors duration-300`}
                                    style={{ fontFamily: FONT }}
                                >
                                    {item.title}
                                </h3>

                                {/* Excerpt (Fades in slightly and moves up on hover) */}
                                <p 
                                    className="text-white/70 text-[13px] leading-relaxed line-clamp-2 max-w-sm transition-all duration-300 translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100"
                                    style={{ fontFamily: FONT }}
                                >
                                    {item.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile-only View All Link */}
                <div className="mt-8 flex md:hidden justify-center">
                    <Link 
                        to="/legacy"
                        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
                        style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                    >
                        View Full Timeline <ArrowRight size={14} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
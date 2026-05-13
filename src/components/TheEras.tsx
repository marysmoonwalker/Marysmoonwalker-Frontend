// import { useRef, useEffect, useState } from 'react';

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

// // ─── Era Data (Using reliable high-res placeholders) ──────────────────────────

// const ERAS = [
//     {
//         id: 'off-the-wall',
//         year: '1979',
//         title: 'Off The Wall',
//         description: 'The breakthrough. Leaving the Jackson 5 behind, Michael teamed up with Quincy Jones to create a disco-pop masterpiece that proved he was a formidable solo force.',
//         stats: '20M+ Copies Sold',
//         image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop' 
//     },
//     {
//         id: 'thriller',
//         year: '1982',
//         title: 'Thriller',
//         description: 'The zenith of pop culture. Thriller broke MTV’s color barrier, swept the Grammys, and became the highest-selling album in human history. He didn’t just make music; he made magic.',
//         stats: '70M+ Copies Sold',
//         image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1000&auto=format&fit=crop' 
//     },
//     {
//         id: 'bad',
//         year: '1987',
//         title: 'Bad',
//         description: 'Edgier, sharper, and fully in control. Michael wrote nine of the eleven tracks, producing five consecutive Billboard Hot 100 number-one singles—a record that stood for decades.',
//         stats: '5 Consecutive #1 Hits',
//         image: 'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=1000&auto=format&fit=crop'
//     },
//     {
//         id: 'dangerous',
//         year: '1991',
//         title: 'Dangerous',
//         description: 'A sonic shift into New Jack Swing. Dangerous addressed global issues, race, and privacy, accompanied by world tours that redefined stadium spectacles and raised millions to heal the world.',
//         stats: '100% Tour Profits Donated',
//         image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop'
//     }
// ];

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function TheEras() {
//     const isDark = useTheme();
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [activeEra, setActiveEra] = useState(0);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const mutedText = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
//     const imageBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     // Track scroll position to determine which Era text is perfectly in the center of the screen
//     useEffect(() => {
//         const handleScroll = () => {
//             const elements = document.querySelectorAll('.era-text-block');
//             let current = activeEra;
            
//             elements.forEach((el, index) => {
//                 const rect = el.getBoundingClientRect();
//                 // Trigger when the element crosses the middle of the viewport
//                 if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
//                     current = index;
//                 }
//             });
            
//             if (current !== activeEra) {
//                 setActiveEra(current);
//             }
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });
//         // Run once on mount to set initial state
//         handleScroll(); 
        
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [activeEra]);

//     return (
//         <section 
//             ref={containerRef}
//             className="relative transition-colors duration-500" 
//             style={{ backgroundColor: bg }}
//         >
//             <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row relative">
                
//                 {/* 
//                     LEFT SIDE: Sticky Media Container 
//                 */}
//                 <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center py-20 pr-12 lg:pr-20">
//                     <div 
//                         className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden shadow-2xl"
//                         style={{ border: `1px solid ${imageBorder}` }}
//                     >
//                         {ERAS.map((era, index) => (
//                             <img
//                                 key={era.id}
//                                 src={era.image}
//                                 alt={era.title}
//                                 className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
//                                     activeEra === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
//                                 }`}
//                                 style={{ filter: isDark ? 'brightness(0.9)' : 'brightness(1)' }}
//                             />
//                         ))}
                        
//                         {/* Overlay Gradient for text readability */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
//                         {/* Dynamic Year Display on Image */}
//                         <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
//                             <div>
//                                 <span 
//                                     className="text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 block mb-1"
//                                     style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                                 >
//                                     Era
//                                 </span>
//                                 <h3 
//                                     className="text-4xl font-normal text-white transition-all duration-300"
//                                     style={{ fontFamily: FONT }}
//                                 >
//                                     {ERAS[activeEra].year}
//                                 </h3>
//                             </div>
//                             <span 
//                                 className="text-[10px] font-bold tracking-widest text-white/50"
//                                 style={{ fontFamily: MONO }}
//                             >
//                                 0{activeEra + 1} / 0{ERAS.length}
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 
//                     RIGHT SIDE: Scrolling Text Content 
//                 */}
//                 <div className="w-full md:w-1/2 flex flex-col pb-32 pt-10 md:pt-0">
                    
//                     {/* Intro Header */}
//                     <div className="h-[40vh] md:h-[60vh] flex flex-col justify-center">
//                         <span 
//                             className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
//                             style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                         >
//                             Evolution of a Legend
//                         </span>
//                         <h2 
//                             className="text-4xl md:text-5xl font-normal leading-[1.1] mb-6" 
//                             style={{ color: textColor, fontFamily: FONT }}
//                         >
//                             The Defining Eras.
//                         </h2>
//                         <p 
//                             className="text-base md:text-lg leading-relaxed max-w-md"
//                             style={{ color: mutedText, fontFamily: FONT }}
//                         >
//                             Michael Jackson didn't just release albums; he created distinct cultural epochs. Scroll through the history of the world's greatest entertainer.
//                         </p>
//                     </div>

//                     {/* Era Text Blocks */}
//                     {ERAS.map((era, index) => (
//                         <div 
//                             key={era.id}
//                             className="era-text-block min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center transition-all duration-500 py-10"
//                             style={{ 
//                                 opacity: activeEra === index ? 1 : 0.25,
//                                 transform: activeEra === index ? 'translateY(0)' : 'translateY(10px)'
//                             }}
//                         >
//                             {/* Mobile Image (Only shows on phones) */}
//                             <div className="md:hidden w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-8 relative" style={{ border: `1px solid ${imageBorder}` }}>
//                                 <img src={era.image} alt={era.title} className="w-full h-full object-cover" />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                                 <div className="absolute bottom-4 left-4 text-white">
//                                     <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>Era</div>
//                                     <div className="text-2xl" style={{ fontFamily: FONT }}>{era.year}</div>
//                                 </div>
//                             </div>

//                             <span 
//                                 className="hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
//                                 style={{ color: ACCENT_COLOR, fontFamily: MONO }}
//                             >
//                                 {era.year}
//                             </span>
                            
//                             <h3 
//                                 className="text-3xl md:text-4xl font-normal mb-5"
//                                 style={{ color: textColor, fontFamily: FONT }}
//                             >
//                                 {era.title}
//                             </h3>
                            
//                             <p 
//                                 className="text-base leading-relaxed mb-8 max-w-lg"
//                                 style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)', fontFamily: FONT }}
//                             >
//                                 {era.description}
//                             </p>
                            
//                             {/* Accent Stat Bar */}
//                             <div 
//                                 className="flex items-center gap-4 py-3 border-t border-b w-fit pr-8" 
//                                 style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
//                             >
//                                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
//                                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: textColor, fontFamily: MONO }}>
//                                     {era.stats}
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }






























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
        image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=1000&auto=format&fit=crop', // Replace with Thriller era image
        gridClass: 'md:col-span-2 md:row-span-1 min-h-[350px]' // Wide box
    },
    {
        id: 'moonwalk',
        title: 'The Moonwalk',
        year: '1983',
        excerpt: 'One televised step that became the most imitated dance move ever.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop', // Replace with Motown 25 image
        gridClass: 'md:col-span-1 md:row-span-2 min-h-[350px] md:min-h-full' // Tall box
    },
    {
        id: 'bad',
        title: 'The Bad Era',
        year: '1987',
        excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits.',
        image: 'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=1000&auto=format&fit=crop', // Replace with Bad era image
        gridClass: 'md:col-span-1 md:row-span-1 min-h-[300px]' // Square box
    },
    {
        id: 'dangerous',
        title: 'Dangerous Tour',
        year: '1992',
        excerpt: 'A breathtaking spectacle that donated 100% of its profits to charity.',
        image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop', // Replace with Dangerous era image
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
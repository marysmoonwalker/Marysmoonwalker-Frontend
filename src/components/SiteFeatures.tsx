// import { FileText, Video, Music } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const FONT   = 'Georgia, serif';
// const AMBER  = '#C9A84C';

// interface Feature {
//     icon:        React.ReactNode;
//     label:       string;
//     title:       string;
//     description: string;
//     link:        string;
// }

// const FEATURES: Feature[] = [
//     {
//         icon:        <FileText size={28} />,
//         label:       'Articles',
//         title:       'News, Stories & Deep Dives',
//         description: "Written tributes, breaking news, historical deep dives, biographical articles, and fan stories. Everything about Michael Jackson's life, legacy, music, and cultural impact — in words.",
//         link:        '/articles',
//     },
//     {
//         icon:        <Video size={28} />,
//         label:       'Videos',
//         title:       'Concerts, Music Videos & More',
//         description: 'Full concerts, iconic music videos, rare interviews, documentaries, and behind-the-scenes footage. Relive legendary performances from Wembley to Bucharest, all in one place.',
//         link:        '/videos',
//     },
//     {
//         icon:        <Music size={28} />,
//         label:       'Audio',
//         title:       'Music, Podcasts & Recordings',
//         description: 'Stream full albums, individual tracks, podcast episodes, and rare audio recordings. From Thriller to Off the Wall — the complete Michael Jackson sound experience.',
//         link:        '/audio',
//     },
// ];

// export default function SiteFeatures() {
//     const [visible, setVisible] = useState<Set<string>>(new Set());

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             entries => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         setVisible(prev => new Set(prev).add(entry.target.id));
//                     }
//                 });
//             },
//             { threshold: 0.1 },
//         );
//         document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
//         return () => observer.disconnect();
//     }, []);

//     return (
//         <section className="relative py-28 px-4 overflow-hidden">

//             {/* Ambient glows */}
//             <div className="pointer-events-none absolute inset-0 overflow-hidden">
//                 <div
//                     className="absolute top-1/2 left-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
//                     style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
//                 />
//                 <div
//                     className="absolute top-1/2 right-0 w-80 h-80 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
//                     style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
//                 />
//             </div>

//             <div className="max-w-7xl mx-auto relative z-10">

//                 {/* Cards */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {FEATURES.map((feature, i) => (
//                         <div
//                             key={feature.link}
//                             id={`feature-${i}`}
//                             data-animate
//                             className={`transition-all duration-700 ${
//                                 visible.has(`feature-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                             }`}
//                             style={{ transitionDelay: `${i * 150}ms` }}
//                         >
//                             <Link
//                                 to={feature.link}
//                                 className="group flex flex-col h-full bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all duration-500 no-underline"
//                                 style={{ backdropFilter: 'blur(8px)' }}
//                             >
//                                 <div className="p-8 flex flex-col flex-1">

//                                     {/* Icon + Label row */}
//                                     <div className="flex items-center gap-4 mb-6">
//                                         <div
//                                             className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
//                                             style={{ backgroundColor: `${AMBER}18`, color: AMBER }}
//                                         >
//                                             {feature.icon}
//                                         </div>
//                                         <div>
//                                             <p
//                                                 className="text-[10px] uppercase tracking-[0.3em] mb-0.5"
//                                                 style={{ color: AMBER, fontFamily: FONT }}
//                                             >
//                                                 {feature.label}
//                                             </p>
//                                             <h3
//                                                 className="text-base font-light leading-snug"
//                                                 style={{ color: '#FFFFFF', fontFamily: FONT }}
//                                             >
//                                                 {feature.title}
//                                             </h3>
//                                         </div>
//                                     </div>

//                                     {/* Description */}
//                                     <p
//                                         className="text-sm leading-relaxed mb-6 flex-1"
//                                         style={{ color: 'rgba(255,255,255,0.82)', fontFamily: FONT }}
//                                     >
//                                         {feature.description}
//                                     </p>

//                                     {/* CTA */}
//                                     <div className="flex items-center justify-between pt-5 border-t border-white/5 group-hover:border-white/10 transition-colors">
//                                         <span
//                                             className="text-[11px] uppercase tracking-[0.3em] transition-colors"
//                                             style={{ color: 'rgba(255,255,255,0.75)', fontFamily: FONT }}
//                                         >
//                                             Browse {feature.label}
//                                         </span>
//                                         <span
//                                             className="text-lg transition-all duration-300 group-hover:translate-x-1"
//                                             style={{ color: AMBER }}
//                                         >
//                                             →
//                                         </span>
//                                     </div>

//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }






















import { FileText, Video, Music, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00'; // Bright Golden Chocolate
const ACCENT_RGB = '255, 140, 0'; // For opacity manipulation

// ─── Theme hook ───────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
    icon: React.ReactNode;
    label: string;
    title: string;
    description: string;
    link: string;
}

const FEATURES: Feature[] = [
    {
        icon: <FileText size={24} />,
        label: 'Articles',
        title: 'News, Stories & Deep Dives',
        description: "Written tributes, breaking news, historical deep dives, biographical articles, and fan stories. Everything about Michael Jackson's life, legacy, music, and cultural impact — in words.",
        link: '/articles',
    },
    {
        icon: <Video size={24} />,
        label: 'Videos',
        title: 'Concerts, Music Videos & More',
        description: 'Full concerts, iconic music videos, rare interviews, documentaries, and behind-the-scenes footage. Relive legendary performances from Wembley to Bucharest, all in one place.',
        link: '/videos',
    },
    {
        icon: <Music size={24} />,
        label: 'Audio',
        title: 'Music, Podcasts & Recordings',
        description: 'Stream full albums, individual tracks, podcast episodes, and rare audio recordings. From Thriller to Off the Wall — the complete Michael Jackson sound experience.',
        link: '/audio',
    },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SiteFeatures() {
    const isDark = useTheme();
    const [visible, setVisible] = useState<Set<string>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisible(prev => new Set(prev).add(entry.target.id));
                    }
                });
            },
            { threshold: 0.1 },
        );
        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Theme Variables
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const mutedText = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
    const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const iconBg = isDark ? `rgba(${ACCENT_RGB}, 0.1)` : `rgba(${ACCENT_RGB}, 0.15)`;
    const sectionBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    return (
        <section className="relative py-20 px-6 overflow-hidden transition-colors duration-500" style={{ backgroundColor: bg }}>

            {/* Ambient Accent Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-1/2 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                    style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB}, 0.08) 0%, transparent 70%)` }}
                />
                <div
                    className="absolute top-1/2 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                    style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB}, 0.08) 0%, transparent 70%)` }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Section Header (Matches Top Stories & The Legacy) */}
                <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: sectionBorder }}>
                    <h2 
                        className="text-2xl md:text-3xl font-bold" 
                        style={{ color: textColor, fontFamily: FONT }}
                    >
                        Explore the Archive
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <div
                            key={feature.link}
                            id={`feature-${i}`}
                            data-animate
                            className={`transition-all duration-700 ease-out ${
                                visible.has(`feature-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                            }`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            <Link
                                to={feature.link}
                                className="group flex flex-col h-full rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                style={{ 
                                    backgroundColor: cardBg, 
                                    border: `1px solid ${cardBorder}`,
                                    boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.03)'
                                }}
                            >
                                <div className="p-8 flex flex-col flex-1">

                                    {/* Icon + Label Row */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundColor: iconBg, color: ACCENT_COLOR }}
                                        >
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <p
                                                className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1"
                                                style={{ color: ACCENT_COLOR, fontFamily: MONO }}
                                            >
                                                {feature.label}
                                            </p>
                                            <h3
                                                className="text-lg md:text-xl font-normal leading-snug"
                                                style={{ color: textColor, fontFamily: FONT }}
                                            >
                                                {feature.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p
                                        className="text-[13px] leading-relaxed mb-8 flex-1"
                                        style={{ color: mutedText, fontFamily: FONT }}
                                    >
                                        {feature.description}
                                    </p>

                                    {/* CTA Footer */}
                                    <div 
                                        className="flex items-center justify-between pt-5 transition-colors duration-300"
                                        style={{ borderTop: `1px solid ${cardBorder}` }}
                                    >
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                                            style={{ color: mutedText, fontFamily: MONO }}
                                        >
                                            Browse Directory
                                        </span>
                                        <span
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                            style={{ color: ACCENT_COLOR }}
                                        >
                                            <ArrowRight size={18} strokeWidth={2} />
                                        </span>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
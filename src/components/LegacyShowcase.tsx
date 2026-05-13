// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const AMBER = '#C9A84C';

// // ─── Data Interfaces ────────────────────────────────────────────────────────

// export interface LegacyDetail {
//     name: string;
//     info: string;
// }

// export interface LegacyItem {
//     id: string;
//     title: string;
//     year: string;
//     image: string;
//     excerpt: string;
//     richText: string;
//     videos: string[]; 
//     gallery: string[];
//     details: LegacyDetail[];
// }

// // ─── Data Array ──────────────────────────────────────────────────────────────

// export const legacyItems: LegacyItem[] = [
//     {
//         id: 'thriller',
//         title: 'Thriller',
//         year: '1982',
//         image: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
//         excerpt: 'The best-selling album of all time — a seismic cultural moment that redefined pop music forever.',
//         videos: [
//             'https://youtu.be/B9H3iinXZv0?si=VrqF1rYXfQhy_URo',
//             'https://youtu.be/JMt67OXOHcI?si=dSP0Q3owQp0magyb'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/8b/6f/4e/8b6f4e3c983057e9340d86e9e4f0a28a.jpg',
//             'https://i.pinimg.com/736x/2e/8e/31/2e8e31005a5a1f108d4b3c4a2a1a2b3c.jpg'
//         ],
//         richText: `
//             <p>Released in November 1982, Thriller remains the gold standard of the music industry. Produced by Quincy Jones, it crossed all musical boundaries, blending pop, rock, and R&B into a singular masterpiece.</p>
//             <p>The album produced seven top-ten singles and won a record-breaking eight Grammy Awards in a single night. It didn't just sell records; it changed the way music was marketed, produced, and consumed globally.</p>
//         `,
//         details: [
//             { name: 'Global Sales', info: 'Over 70 million copies' },
//             { name: 'Grammy Record', info: '8 Awards in one night' },
//             { name: 'Chart Stay', info: '37 weeks at Number 1' },
//             { name: 'Producer', info: 'Quincy Jones' }
//         ],
//     },
//     {
//         id: 'moonwalk',
//         title: 'The Moonwalk',
//         year: '1983',
//         image: 'https://i.pinimg.com/1200x/dd/d6/30/ddd6302d9db7c7e61e563a880329698d.jpg',
//         excerpt: 'One televised step that became the most imitated dance move in human history.',
//         videos: [
//             'https://www.youtube.com/watch?v=7lvsBBNV-U4',
//             'https://www.youtube.com/watch?v=n_3vHnRWp_E'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/ba/da/ce/badace293883c921350a2938c921350a.jpg',
//             'https://i.pinimg.com/736x/8d/62/30/8d62309db7c7e61e563a880329698d.jpg'
//         ],
//         richText: `
//             <p>On March 25, 1983, during the taping of Motown 25, Michael Jackson performed "Billie Jean" and changed dance history. As he glided backward while appearing to walk forward, the world stood still.</p>
//             <p>The Moonwalk became his signature move, a physical manifestation of his "magic" on stage. To this day, it remains the ultimate benchmark for dancers in every corner of the globe.</p>
//         `,
//         details: [
//             { name: 'Debut Date', info: 'March 25, 1983' },
//             { name: 'Event', info: 'Motown 25 Special' },
//             { name: 'TV Viewers', info: '47 Million Americans' },
//             { name: 'Signature', info: 'The Gravity-Defying Glide' }
//         ],
//     },
//     {
//         id: 'dangerous-tour',
//         title: 'Dangerous World Tour',
//         year: '1992–1993',
//         image: 'https://i.pinimg.com/1200x/a3/10/18/a310188a6c72e74fb2bd650c76e579f3.jpg',
//         excerpt: 'A breathtaking spectacle that took 3.5 million fans across 69 cities on an unforgettable journey.',
//         videos: [
//             'https://www.youtube.com/watch?v=h97G6oH_K3o',
//             'https://www.youtube.com/watch?v=-2m83C90Lbg'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/43/10/18/4310188a6c72e74fb2bd650c76e579f3.jpg',
//             'https://i.pinimg.com/736x/b2/20/30/b220309db7c7e61e563a880329698d.jpg'
//         ],
//         richText: `
//             <p>The Dangerous World Tour was a technological marvel. Featuring custom-built stages, pyrotechnics, and the legendary "toaster" entrance, it set the bar for stadium concerts.</p>
//             <p>Spanning 69 dates, the tour donated all profits to various charities, including the Heal the World Foundation, proving Michael's heart was as big as his talent.</p>
//         `,
//         details: [
//             { name: 'Attendance', info: '3.5 Million Fans' },
//             { name: 'Cities', info: '69 Worldwide' },
//             { name: 'Charity', info: '100% of profits donated' },
//             { name: 'Stage Craft', info: 'Revolutionary Pyrotechnics' }
//         ],
//     },
//     {
//         id: 'billie-jean',
//         title: 'Billie Jean',
//         year: '1983',
//         image: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
//         excerpt: 'The song that broke barriers at MTV and cemented Michael as the undisputed King of Pop.',
//         videos: [
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
//             'https://www.youtube.com/watch?v=75at0b0E-6M'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/11/22/33/112233445566778899.jpg',
//             'https://i.pinimg.com/736x/99/88/77/998877665544332211.jpg'
//         ],
//         richText: `
//             <p>"Billie Jean" was a sonic revolution. With its iconic bassline and haunting vocals, it became one of the most successful songs of the 1980s.</p>
//             <p>The music video was a cultural turning point, being the first by a Black artist to be played in heavy rotation on MTV, effectively breaking the color barrier of the network.</p>
//         `,
//         details: [
//             { name: 'Chart Position', info: '#1 in 10+ countries' },
//             { name: 'MTV History', info: 'Broke the Color Barrier' },
//             { name: 'Awards', info: '2 Grammy Wins' },
//             { name: 'Bassline', info: 'Most recognizable in Pop' }
//         ],
//     },
//     {
//         id: 'we-are-the-world',
//         title: 'We Are The World',
//         year: '1985',
//         image: 'https://i.pinimg.com/736x/39/89/f4/3989f464375ab101f40c09613825a6fe.jpg',
//         excerpt: 'A generation united in song — the anthem that raised $60 million for African famine relief.',
//         videos: [
//             'https://www.youtube.com/watch?v=9AjkUyX0Z7w',
//             'https://www.youtube.com/watch?v=Zi0X-M-2t0I'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/55/66/77/556677889900112233.jpg',
//             'https://i.pinimg.com/736x/33/22/11/332211009988776655.jpg'
//         ],
//         richText: `
//             <p>In 1985, Michael Jackson and Lionel Richie co-wrote "We Are The World" to combat famine in Ethiopia. It became the fastest-selling American pop single in history.</p>
//             <p>This project remains a testament to Michael's commitment to humanitarianism, proving music has the power to heal and unite the world.</p>
//         `,
//         details: [
//             { name: 'Funds Raised', info: 'Over $63 Million' },
//             { name: 'Sales', info: '20 Million Copies' },
//             { name: 'Artists', info: '45 Legends United' },
//             { name: 'Legacy', info: 'Grammy Song of the Year' }
//         ],
//     },
//     {
//         id: 'bad-album',
//         title: 'Bad',
//         year: '1987',
//         image: 'https://i.pinimg.com/736x/65/d8/e4/65d8e4743f4ad006f70be30180895aac.jpg',
//         excerpt: 'Five number ones from a single album — a record that still stands in music history.',
//         videos: [
//             'https://www.youtube.com/watch?v=dsUXAEzaC3Q',
//             'https://www.youtube.com/watch?v=f3V-7B7fLuo'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/77/88/99/778899001122334455.jpg',
//             'https://i.pinimg.com/736x/22/33/44/223344556677889900.jpg'
//         ],
//         richText: `
//             <p>Following Thriller, "Bad" proved Michael was the master of his craft. The album showcased a more edgy, street-conscious sound.</p>
//             <p>It was the first album in history to produce five consecutive number-one singles on the Billboard Hot 100, a record that stood for over two decades.</p>
//         `,
//         details: [
//             { name: 'Hot 100 Hits', info: '5 Consecutive #1s' },
//             { name: 'World Tour', info: 'Highest Grossing 80s Tour' },
//             { name: 'Sales', info: '35 Million+ Worldwide' },
//             { name: 'Short Film', info: 'Directed by Martin Scorsese' }
//         ],
//     },
// ];

// // ─── Legacy Card Component ───────────────────────────────────────────────────

// function LegacyCard({ item, index }: { item: LegacyItem; index: number }) {
//     const [hovered, setHovered] = useState(false);

//     return (
//         <Link
//             to={`/legacy/${item.id}`}
//             className="group relative block overflow-hidden no-underline shrink-0"
//             style={{
//                 width: '320px',
//                 height: '480px',
//                 borderRadius: '24px',
//                 background: '#0a0a0a',
//                 transition: 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
//             }}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             <img
//                 src={item.image}
//                 alt={item.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                 style={{ filter: hovered ? 'brightness(0.4)' : 'brightness(0.6)' }}
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//             <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
//                 <span className="text-[10px] tracking-[0.3em] text-amber-500/60 font-bold" style={{ fontFamily: MONO }}>
//                     {item.year}
//                 </span>
//                 {/* was text-white/10 */}
//                 <span className="text-[14px] text-white/40" style={{ fontFamily: MONO }}>
//                     {String(index + 1).padStart(2, '0')}
//                 </span>
//             </div>

//             <div 
//                 className="absolute inset-x-6 top-1/4 space-y-3 z-10 transition-all duration-500"
//                 style={{ 
//                     opacity: hovered ? 1 : 0, 
//                     transform: hovered ? 'translateY(0)' : 'translateY(15px)' 
//                 }}
//             >
//                 {item.details.slice(0, 3).map((d, i) => (
//                     <div key={i} className="bg-black/40 backdrop-blur-md border border-white/5 p-3 rounded-xl">
//                         <p className="text-[8px] uppercase tracking-widest text-amber-500/50 mb-1" style={{ fontFamily: MONO }}>{d.name}</p>
//                         {/* was text-white/80 */}
//                         <p className="text-[11px] text-white/90 font-light truncate" style={{ fontFamily: FONT }}>{d.info}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
//                 <h3 className="text-2xl font-light text-white mb-2" style={{ fontFamily: FONT }}>
//                     {item.title}
//                 </h3>
//                 {/* was text-white/40 */}
//                 <p 
//                     className="text-[11px] text-white/75 leading-relaxed line-clamp-2 transition-opacity duration-300"
//                     style={{ fontFamily: FONT, opacity: hovered ? 0 : 1 }}
//                 >
//                     {item.excerpt}
//                 </p>

//                 <div className="mt-4 flex items-center justify-between">
//                     <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-amber-500/10 group-hover:border-amber-500/50 transition-all duration-500">
//                         <span className="text-lg transition-all duration-300 group-hover:translate-x-1" style={{ color: AMBER }}>
//                             →
//                         </span>
//                     </div>
//                     {/* was text-white/20 */}
//                     <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 group-hover:text-amber-500/80 transition-colors" style={{ fontFamily: MONO }}>
//                         Legacy Archive
//                     </span>
//                 </div>
//             </div>

//             <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 group-hover:ring-amber-500/20 transition-all duration-500" />
//         </Link>
//     );
// }

// // ─── Main Showcase ────────────────────────────────────────────────────────────

// export default function LegacyShowcase() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const CARD_WIDTH = 320;
//     const GAP = 32;

//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         const handleScroll = () => {
//             const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
//             setCurrentIndex(idx);
//         };
//         el.addEventListener('scroll', handleScroll);
//         return () => el.removeEventListener('scroll', handleScroll);
//     }, []);

//     const scrollTo = (idx: number) => {
//         scrollRef.current?.scrollTo({
//             left: idx * (CARD_WIDTH + GAP),
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <section className="py-6 px-6 bg-transparent">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex items-center justify-between mb-16 gap-4">
//                     <div className="flex-shrink-0">
//                         <h2
//                             className="font-light tracking-[0.2em]"
//                             style={{
//                                 fontFamily: FONT,
//                                 fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
//                                 background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                                 WebkitBackgroundClip: 'text',
//                                 WebkitTextFillColor: 'transparent',
//                                 backgroundClip: 'text',
//                             }}
//                         >
//                             THE LEGACY
//                         </h2>
//                     </div>

//                     <div className="flex gap-3">
//                         {/* was text-white/20 */}
//                         <button 
//                             onClick={() => scrollTo(currentIndex - 1)}
//                             disabled={currentIndex === 0}
//                             className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/60 hover:border-amber-500/40 hover:text-amber-500 transition-all disabled:opacity-10"
//                         >
//                             <ChevronLeft size={20} />
//                         </button>
//                         {/* was text-white/20 */}
//                         <button 
//                             onClick={() => scrollTo(currentIndex + 1)}
//                             disabled={currentIndex === legacyItems.length - 1}
//                             className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/60 hover:border-amber-500/40 hover:text-amber-500 transition-all disabled:opacity-10"
//                         >
//                             <ChevronRight size={20} />
//                         </button>
//                     </div>
//                 </div>

//                 <div 
//                     ref={scrollRef}
//                     className="flex overflow-x-auto gap-8 pb-10 no-scrollbar snap-x"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
//                     {legacyItems.map((item, idx) => (
//                         <div key={item.id} className="snap-center">
//                             <LegacyCard item={item} index={idx} />
//                         </div>
//                     ))}
//                     <div className="shrink-0 w-12" />
//                 </div>

//                 <div className="flex justify-center gap-3 mt-8">
//                     {legacyItems.map((_, idx) => (
//                         <button
//                             key={idx}
//                             onClick={() => scrollTo(idx)}
//                             className="h-1 rounded-full transition-all duration-500"
//                             style={{
//                                 width: idx === currentIndex ? '32px' : '8px',
//                                 background: idx === currentIndex ? AMBER : 'rgba(255,255,255,0.1)',
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }



























// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';

// // ─── Theme Hook (Syncs with Navbar) ───────────────────────────────────────────

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

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // ─── Data Interfaces ──────────────────────────────────────────────────────────

// export interface LegacyDetail {
//     name: string;
//     info: string;
// }

// export interface LegacyItem {
//     id: string;
//     title: string;
//     year: string;
//     image: string;
//     excerpt: string;
//     richText: string;
//     videos: string[]; 
//     gallery: string[];
//     details: LegacyDetail[];
// }

// // ─── Data Array ───────────────────────────────────────────────────────────────

// export const legacyItems: LegacyItem[] = [
//     {
//         id: 'thriller',
//         title: 'Thriller',
//         year: '1982',
//         image: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
//         excerpt: 'The best-selling album of all time — a seismic cultural moment that redefined pop music forever.',
//         videos: [
//             'https://youtu.be/B9H3iinXZv0?si=VrqF1rYXfQhy_URo',
//             'https://youtu.be/JMt67OXOHcI?si=dSP0Q3owQp0magyb'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/8b/6f/4e/8b6f4e3c983057e9340d86e9e4f0a28a.jpg',
//             'https://i.pinimg.com/736x/2e/8e/31/2e8e31005a5a1f108d4b3c4a2a1a2b3c.jpg'
//         ],
//         richText: `
//             <p>Released in November 1982, Thriller remains the gold standard of the music industry. Produced by Quincy Jones, it crossed all musical boundaries, blending pop, rock, and R&B into a singular masterpiece.</p>
//             <p>The album produced seven top-ten singles and won a record-breaking eight Grammy Awards in a single night. It didn't just sell records; it changed the way music was marketed, produced, and consumed globally.</p>
//         `,
//         details: [
//             { name: 'Global Sales', info: 'Over 70 million copies' },
//             { name: 'Grammy Record', info: '8 Awards in one night' },
//             { name: 'Chart Stay', info: '37 weeks at Number 1' },
//             { name: 'Producer', info: 'Quincy Jones' }
//         ],
//     },
//     {
//         id: 'moonwalk',
//         title: 'The Moonwalk',
//         year: '1983',
//         image: 'https://i.pinimg.com/1200x/dd/d6/30/ddd6302d9db7c7e61e563a880329698d.jpg',
//         excerpt: 'One televised step that became the most imitated dance move in human history.',
//         videos: [
//             'https://www.youtube.com/watch?v=7lvsBBNV-U4',
//             'https://www.youtube.com/watch?v=n_3vHnRWp_E'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/ba/da/ce/badace293883c921350a2938c921350a.jpg',
//             'https://i.pinimg.com/736x/8d/62/30/8d62309db7c7e61e563a880329698d.jpg'
//         ],
//         richText: `
//             <p>On March 25, 1983, during the taping of Motown 25, Michael Jackson performed "Billie Jean" and changed dance history. As he glided backward while appearing to walk forward, the world stood still.</p>
//             <p>The Moonwalk became his signature move, a physical manifestation of his "magic" on stage. To this day, it remains the ultimate benchmark for dancers in every corner of the globe.</p>
//         `,
//         details: [
//             { name: 'Debut Date', info: 'March 25, 1983' },
//             { name: 'Event', info: 'Motown 25 Special' },
//             { name: 'TV Viewers', info: '47 Million Americans' },
//             { name: 'Signature', info: 'The Gravity-Defying Glide' }
//         ],
//     },
//     {
//         id: 'dangerous-tour',
//         title: 'Dangerous World Tour',
//         year: '1992–1993',
//         image: 'https://i.pinimg.com/1200x/a3/10/18/a310188a6c72e74fb2bd650c76e579f3.jpg',
//         excerpt: 'A breathtaking spectacle that took 3.5 million fans across 69 cities on an unforgettable journey.',
//         videos: [
//             'https://www.youtube.com/watch?v=h97G6oH_K3o',
//             'https://www.youtube.com/watch?v=-2m83C90Lbg'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/43/10/18/4310188a6c72e74fb2bd650c76e579f3.jpg',
//             'https://i.pinimg.com/736x/b2/20/30/b220309db7c7e61e563a880329698d.jpg'
//         ],
//         richText: `
//             <p>The Dangerous World Tour was a technological marvel. Featuring custom-built stages, pyrotechnics, and the legendary "toaster" entrance, it set the bar for stadium concerts.</p>
//             <p>Spanning 69 dates, the tour donated all profits to various charities, including the Heal the World Foundation, proving Michael's heart was as big as his talent.</p>
//         `,
//         details: [
//             { name: 'Attendance', info: '3.5 Million Fans' },
//             { name: 'Cities', info: '69 Worldwide' },
//             { name: 'Charity', info: '100% of profits donated' },
//             { name: 'Stage Craft', info: 'Revolutionary Pyrotechnics' }
//         ],
//     },
//     {
//         id: 'billie-jean',
//         title: 'Billie Jean',
//         year: '1983',
//         image: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
//         excerpt: 'The song that broke barriers at MTV and cemented Michael as the undisputed King of Pop.',
//         videos: [
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
//             'https://www.youtube.com/watch?v=75at0b0E-6M'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/11/22/33/112233445566778899.jpg',
//             'https://i.pinimg.com/736x/99/88/77/998877665544332211.jpg'
//         ],
//         richText: `
//             <p>"Billie Jean" was a sonic revolution. With its iconic bassline and haunting vocals, it became one of the most successful songs of the 1980s.</p>
//             <p>The music video was a cultural turning point, being the first by a Black artist to be played in heavy rotation on MTV, effectively breaking the color barrier of the network.</p>
//         `,
//         details: [
//             { name: 'Chart Position', info: '#1 in 10+ countries' },
//             { name: 'MTV History', info: 'Broke the Color Barrier' },
//             { name: 'Awards', info: '2 Grammy Wins' },
//             { name: 'Bassline', info: 'Most recognizable in Pop' }
//         ],
//     },
//     {
//         id: 'we-are-the-world',
//         title: 'We Are The World',
//         year: '1985',
//         image: 'https://i.pinimg.com/736x/39/89/f4/3989f464375ab101f40c09613825a6fe.jpg',
//         excerpt: 'A generation united in song — the anthem that raised $60 million for African famine relief.',
//         videos: [
//             'https://www.youtube.com/watch?v=9AjkUyX0Z7w',
//             'https://www.youtube.com/watch?v=Zi0X-M-2t0I'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/55/66/77/556677889900112233.jpg',
//             'https://i.pinimg.com/736x/33/22/11/332211009988776655.jpg'
//         ],
//         richText: `
//             <p>In 1985, Michael Jackson and Lionel Richie co-wrote "We Are The World" to combat famine in Ethiopia. It became the fastest-selling American pop single in history.</p>
//             <p>This project remains a testament to Michael's commitment to humanitarianism, proving music has the power to heal and unite the world.</p>
//         `,
//         details: [
//             { name: 'Funds Raised', info: 'Over $63 Million' },
//             { name: 'Sales', info: '20 Million Copies' },
//             { name: 'Artists', info: '45 Legends United' },
//             { name: 'Legacy', info: 'Grammy Song of the Year' }
//         ],
//     },
//     {
//         id: 'bad-album',
//         title: 'Bad',
//         year: '1987',
//         image: 'https://i.pinimg.com/736x/65/d8/e4/65d8e4743f4ad006f70be30180895aac.jpg',
//         excerpt: 'Five number ones from a single album — a record that still stands in music history.',
//         videos: [
//             'https://www.youtube.com/watch?v=dsUXAEzaC3Q',
//             'https://www.youtube.com/watch?v=f3V-7B7fLuo'
//         ],
//         gallery: [
//             'https://i.pinimg.com/736x/77/88/99/778899001122334455.jpg',
//             'https://i.pinimg.com/736x/22/33/44/223344556677889900.jpg'
//         ],
//         richText: `
//             <p>Following Thriller, "Bad" proved Michael was the master of his craft. The album showcased a more edgy, street-conscious sound.</p>
//             <p>It was the first album in history to produce five consecutive number-one singles on the Billboard Hot 100, a record that stood for over two decades.</p>
//         `,
//         details: [
//             { name: 'Hot 100 Hits', info: '5 Consecutive #1s' },
//             { name: 'World Tour', info: 'Highest Grossing 80s Tour' },
//             { name: 'Sales', info: '35 Million+ Worldwide' },
//             { name: 'Short Film', info: 'Directed by Martin Scorsese' }
//         ],
//     },
// ];

// // ─── Legacy Card Component ────────────────────────────────────────────────────

// function LegacyCard({ item, index, isDark }: { item: LegacyItem; index: number; isDark: boolean }) {
//     const [hovered, setHovered] = useState(false);

//     // Dynamic Theme Tokens
//     const cardBg       = isDark ? '#111111' : '#FFFFFF';
//     const cardBorder   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
//     const titleCol     = isDark ? '#FFFFFF' : '#0A0A0A';
//     const textMuted    = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
//     const accentColor  = isDark ? '#F59E0B' : '#B45309';
//     const detailBg     = isDark ? '#1A1A1A' : '#F5F5F5';
    
//     return (
//         <Link
//             to={`/legacy/${item.id}`}
//             className="group relative block overflow-hidden no-underline shrink-0"
//             style={{
//                 width: '320px',
//                 height: '480px',
//                 borderRadius: '24px',
//                 background: cardBg,
//                 border: `1px solid ${cardBorder}`,
//                 boxShadow: isDark ? '0 4px 40px rgba(0,0,0,0.5)' : '0 4px 32px rgba(0,0,0,0.07)',
//                 transition: 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
//             }}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             {/* Full Quality Image (No blur, no opacity filters) */}
//             <img
//                 src={item.image}
//                 alt={item.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
//             />

//             {/* Solid Gradient replacing opacity layer for text readability */}
//             <div
//                 className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
//                 style={{ background: `linear-gradient(to top, ${cardBg} 30%, transparent)` }}
//             />

//             {/* Top Info Tags */}
//             <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
//                 <span className="text-[10px] tracking-[0.3em] font-bold" style={{ color: accentColor, fontFamily: MONO }}>
//                     {item.year}
//                 </span>
//                 <span className="text-[14px]" style={{ color: textMuted, fontFamily: MONO }}>
//                     {String(index + 1).padStart(2, '0')}
//                 </span>
//             </div>

//             {/* Hover Details Panel */}
//             <div 
//                 className="absolute inset-x-6 top-1/4 space-y-3 z-10 transition-all duration-500"
//                 style={{ 
//                     opacity: hovered ? 1 : 0, 
//                     transform: hovered ? 'translateY(0)' : 'translateY(15px)',
//                     pointerEvents: hovered ? 'auto' : 'none'
//                 }}
//             >
//                 {item.details.slice(0, 3).map((d, i) => (
//                     <div 
//                         key={i} 
//                         className="p-3 rounded-xl shadow-lg"
//                         style={{ background: detailBg, border: `1px solid ${cardBorder}` }}
//                     >
//                         <p className="text-[8px] uppercase tracking-widest mb-1" style={{ color: accentColor, fontFamily: MONO }}>
//                             {d.name}
//                         </p>
//                         <p className="text-[11px] font-light truncate" style={{ color: titleCol, fontFamily: FONT }}>
//                             {d.info}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {/* Bottom Panel Text */}
//             <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
//                 <h3 className="text-2xl font-light mb-2" style={{ color: titleCol, fontFamily: FONT }}>
//                     {item.title}
//                 </h3>
                
//                 <p 
//                     className="text-[11px] leading-relaxed line-clamp-2 transition-all duration-300"
//                     style={{ 
//                         color: textMuted, 
//                         fontFamily: FONT, 
//                         opacity: hovered ? 0 : 1,
//                         transform: hovered ? 'translateY(10px)' : 'translateY(0)'
//                     }}
//                 >
//                     {item.excerpt}
//                 </p>

//                 <div className="mt-4 flex items-center justify-between">
//                     <div 
//                         className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500"
//                         style={{ 
//                             background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
//                             border: `1px solid ${cardBorder}` 
//                         }}
//                     >
//                         <span className="text-lg transition-all duration-300 group-hover:translate-x-1" style={{ color: accentColor }}>
//                             →
//                         </span>
//                     </div>
//                     <span 
//                         className="text-[9px] uppercase tracking-[0.2em] transition-colors" 
//                         style={{ color: hovered ? accentColor : textMuted, fontFamily: MONO }}
//                     >
//                         Legacy Archive
//                     </span>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// // ─── Main Showcase ────────────────────────────────────────────────────────────

// export default function LegacyShowcase() {
//     const isDark = useTheme();
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const scrollRef = useRef<HTMLDivElement>(null);
    
//     const CARD_WIDTH = 320;
//     const GAP = 32;

//     // Derived theme tokens
//     const bg          = isDark ? '#050505' : '#FFFFFF';
//     const textPrimary = isDark ? '#FFFFFF' : '#111111';
//     const textMuted   = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';
//     const cardBorder  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
//     const accentColor = isDark ? '#F59E0B' : '#B45309';

//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         const handleScroll = () => {
//             const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
//             setCurrentIndex(idx);
//         };
//         el.addEventListener('scroll', handleScroll);
//         return () => el.removeEventListener('scroll', handleScroll);
//     }, []);

//     const scrollTo = (idx: number) => {
//         scrollRef.current?.scrollTo({
//             left: idx * (CARD_WIDTH + GAP),
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <section className="py-6 px-6 transition-colors duration-500" style={{ background: bg }}>
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Row */}
//                 <div className="flex items-center justify-between mb-16 gap-4">
//                     <div className="flex-shrink-0">
//                         <h2
//                             className="font-light tracking-[0.2em]"
//                             style={{
//                                 fontFamily: FONT,
//                                 fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
//                                 color: textPrimary,
//                             }}
//                         >
//                             THE LEGACY
//                         </h2>
//                     </div>

//                     <div className="flex gap-3">
//                         <button 
//                             onClick={() => scrollTo(currentIndex - 1)}
//                             disabled={currentIndex === 0}
//                             className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-10"
//                             style={{ border: `1px solid ${cardBorder}`, color: textMuted }}
//                         >
//                             <ChevronLeft size={20} />
//                         </button>
                        
//                         <button 
//                             onClick={() => scrollTo(currentIndex + 1)}
//                             disabled={currentIndex === legacyItems.length - 1}
//                             className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-10"
//                             style={{ border: `1px solid ${cardBorder}`, color: textMuted }}
//                         >
//                             <ChevronRight size={20} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Scroller */}
//                 <div 
//                     ref={scrollRef}
//                     className="flex overflow-x-auto gap-8 pb-10 no-scrollbar snap-x"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
//                     {legacyItems.map((item, idx) => (
//                         <div key={item.id} className="snap-center">
//                             <LegacyCard item={item} index={idx} isDark={isDark} />
//                         </div>
//                     ))}
//                     <div className="shrink-0 w-12" />
//                 </div>

//                 {/* Progress Indicators */}
//                 <div className="flex justify-center gap-3 mt-8">
//                     {legacyItems.map((_, idx) => (
//                         <button
//                             key={idx}
//                             onClick={() => scrollTo(idx)}
//                             className="h-1 rounded-full transition-all duration-500"
//                             style={{
//                                 width: idx === currentIndex ? '32px' : '8px',
//                                 background: idx === currentIndex ? accentColor : cardBorder,
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
























// import { useState, useRef, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00'; // Bright Golden Chocolate

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

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);

//         return () => {
//             observer.disconnect();
//             window.removeEventListener('storage', onStorage);
//         };
//     }, []);

//     return isDark;
// }

// // ─── Data Interfaces & Array ──────────────────────────────────────────────────

// export interface LegacyDetail {
//     name: string;
//     info: string;
// }

// export interface LegacyItem {
//     id: string;
//     title: string;
//     year: string;
//     image: string;
//     excerpt: string;
//     details: LegacyDetail[];
// }

// export const legacyItems: LegacyItem[] = [
//     {
//         id: 'thriller',
//         title: 'Thriller',
//         year: '1982',
//         image: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
//         excerpt: 'The best-selling album of all time — a seismic cultural moment that redefined pop music forever.',
//         details: [
//             { name: 'Global Sales', info: 'Over 70 million copies' },
//             { name: 'Grammy Record', info: '8 Awards in one night' },
//         ],
//     },
//     {
//         id: 'moonwalk',
//         title: 'The Moonwalk',
//         year: '1983',
//         image: 'https://i.pinimg.com/1200x/dd/d6/30/ddd6302d9db7c7e61e563a880329698d.jpg',
//         excerpt: 'One televised step that became the most imitated dance move in human history.',
//         details: [
//             { name: 'Debut Date', info: 'March 25, 1983' },
//             { name: 'TV Viewers', info: '47 Million Americans' },
//         ],
//     },
//     {
//         id: 'dangerous-tour',
//         title: 'Dangerous World Tour',
//         year: '1992–1993',
//         image: 'https://i.pinimg.com/1200x/a3/10/18/a310188a6c72e74fb2bd650c76e579f3.jpg',
//         excerpt: 'A breathtaking spectacle that took 3.5 million fans across 69 cities on an unforgettable journey.',
//         details: [
//             { name: 'Attendance', info: '3.5 Million Fans' },
//             { name: 'Charity', info: '100% of profits donated' },
//         ],
//     },
//     {
//         id: 'billie-jean',
//         title: 'Billie Jean',
//         year: '1983',
//         image: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
//         excerpt: 'The song that broke barriers at MTV and cemented Michael as the undisputed King of Pop.',
//         details: [
//             { name: 'MTV History', info: 'Broke the Color Barrier' },
//             { name: 'Awards', info: '2 Grammy Wins' },
//         ],
//     },
//     {
//         id: 'we-are-the-world',
//         title: 'We Are The World',
//         year: '1985',
//         image: 'https://i.pinimg.com/736x/39/89/f4/3989f464375ab101f40c09613825a6fe.jpg',
//         excerpt: 'A generation united in song — the anthem that raised $60 million for African famine relief.',
//         details: [
//             { name: 'Funds Raised', info: 'Over $63 Million' },
//             { name: 'Artists', info: '45 Legends United' },
//         ],
//     },
//     {
//         id: 'bad-album',
//         title: 'Bad',
//         year: '1987',
//         image: 'https://i.pinimg.com/736x/65/d8/e4/65d8e4743f4ad006f70be30180895aac.jpg',
//         excerpt: 'Five number ones from a single album — a record that still stands in music history.',
//         details: [
//             { name: 'Hot 100 Hits', info: '5 Consecutive #1s' },
//             { name: 'Sales', info: '35 Million+ Worldwide' },
//         ],
//     },
// ];

// // ─── Legacy Card Component ────────────────────────────────────────────────────

// function LegacyCard({ item }: { item: LegacyItem }) {
//     return (
//         <Link
//             to={`/legacy/${item.id}`}
//             // Definite sizes: strictly 280x380 on mobile, 320x420 on desktop
//             className="group relative block overflow-hidden rounded-[20px] shrink-0 w-[280px] h-[380px] md:w-[320px] md:h-[420px]"
//         >
//             <style>{`
//                 .legacy-title-${item.id}:hover { color: ${ACCENT_COLOR}; }
//                 .legacy-badge-${item.id}:hover { background-color: white !important; color: ${ACCENT_COLOR} !important; }
//             `}</style>

//             {/* Image (object-cover ensures it never stretches weirdly) */}
//             <img
//                 loading="lazy"
//                 src={item.image}
//                 alt={item.title}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
//             />
            
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 transition-colors duration-500 group-hover:bg-black/70">
                
//                 {/* Top Badge (Year) */}
//                 <div className="absolute top-5 left-5">
//                     <span 
//                         className={`legacy-badge-${item.id} text-[#000000] px-3 py-1.5 rounded-[6px] font-bold text-[11px] uppercase tracking-widest transition-colors duration-300`}
//                         style={{ backgroundColor: ACCENT_COLOR, fontFamily: MONO }}
//                     >
//                         {item.year}
//                     </span>
//                 </div>
                
//                 {/* Title */}
//                 <h1 
//                     className={`text-white legacy-title-${item.id} transition-colors duration-300 text-xl md:text-2xl leading-snug line-clamp-2 mb-2`}
//                     style={{ fontFamily: FONT }}
//                 >
//                     {item.title}
//                 </h1>

//                 {/* Excerpt */}
//                 <p 
//                     className="text-[13px] leading-relaxed line-clamp-2 mb-4"
//                     style={{ color: 'rgba(255,255,255,0.7)', fontFamily: FONT }}
//                 >
//                     {item.excerpt}
//                 </p>
                
//                 {/* Action Link */}
//                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                     Explore Era <ArrowRight size={13} strokeWidth={2.5} />
//                 </div>

//             </div>
//         </Link>
//     );
// }

// // ─── Main Showcase Component ──────────────────────────────────────────────────

// export default function LegacyShowcase() {
//     const isDark = useTheme();
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const scrollRef = useRef<HTMLDivElement>(null);
    
//     // Width of card + gap (320px + 30px)
//     const SCROLL_AMOUNT = 350; 

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         const handleScroll = () => {
//             const idx = Math.round(el.scrollLeft / SCROLL_AMOUNT);
//             setCurrentIndex(idx);
//         };
//         el.addEventListener('scroll', handleScroll);
//         return () => el.removeEventListener('scroll', handleScroll);
//     }, []);

//     const scrollTo = (direction: 'left' | 'right') => {
//         if (!scrollRef.current) return;
//         const currentScroll = scrollRef.current.scrollLeft;
//         scrollRef.current.scrollTo({
//             left: direction === 'right' ? currentScroll + SCROLL_AMOUNT : currentScroll - SCROLL_AMOUNT,
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <section className="py-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Header (Perfectly matches Top Stories) */}
//                 <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor }}>
//                     <h2 
//                         className="text-2xl md:text-3xl font-bold" 
//                         style={{ color: textColor, fontFamily: FONT }}
//                     >
//                         The Legacy
//                     </h2>

//                     {/* Navigation Buttons */}
//                     <div className="flex gap-2">
//                         <button 
//                             onClick={() => scrollTo('left')}
//                             className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
//                             style={{ border: `1px solid ${borderColor}`, color: textColor }}
//                             aria-label="Scroll Left"
//                         >
//                             <ChevronLeft size={18} />
//                         </button>
                        
//                         <button 
//                             onClick={() => scrollTo('right')}
//                             className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
//                             style={{ border: `1px solid ${borderColor}`, color: textColor }}
//                             aria-label="Scroll Right"
//                         >
//                             <ChevronRight size={18} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Scroller Area */}
//                 <div 
//                     ref={scrollRef}
//                     className="flex overflow-x-auto gap-[30px] pb-6 no-scrollbar snap-x snap-mandatory"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
//                     {legacyItems.map((item) => (
//                         <div key={item.id} className="snap-start">
//                             <LegacyCard item={item} />
//                         </div>
//                     ))}
//                     {/* Padding block so the last card doesn't stick to the right edge */}
//                     <div className="shrink-0 w-4 md:w-8" />
//                 </div>

//             </div>
//         </section>
//     );
// }
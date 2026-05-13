// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Play, Image as ImageIcon, Zap } from 'lucide-react';
// import { legacyItems, LegacyItem } from './LegacyShowcase';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const AMBER = '#C9A84C';

// /**
//  * HELPER: Converts any YouTube link (Full or Short) into an Embed URL
//  */
// const getYouTubeEmbedUrl = (url: string) => {
//     try {
//         let videoId = '';
//         if (url.includes('youtube.com/watch?v=')) {
//             videoId = url.split('v=')[1].split('&')[0];
//         } else if (url.includes('youtu.be/')) {
//             videoId = url.split('youtu.be/')[1].split('?')[0];
//         } else if (url.includes('embed/')) {
//             videoId = url.split('embed/')[1].split('?')[0];
//         } else {
//             videoId = url;
//         }
//         return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
//     } catch (e) {
//         return url;
//     }
// };

// export default function LegacyShowcaseDetail() {
//     const { id } = useParams<{ id: string }>();
//     const [item, setItem] = useState<LegacyItem | null>(null);

//     useEffect(() => {
//         const found = legacyItems.find(i => i.id === id) || null;
//         setItem(found);
//         window.scrollTo(0, 0);
//     }, [id]);

//     if (!item) return (
//         <div className="min-h-screen bg-black flex items-center justify-center">
//             <div className="animate-pulse text-amber-500 tracking-[0.5em] text-xs uppercase" style={{ fontFamily: MONO }}>
//                 Loading Archive...
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 pb-32">
//             {/* Background Glow */}
//             <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-amber-600/[0.03] blur-[120px] pointer-events-none z-0" />

//             <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
                
//                 {/* ─── Top Archive Label ─── */}
//                 <div className="mb-12 flex justify-end">
//                     <div className="flex items-center gap-3">
//                         <span className="h-px w-8 bg-amber-500/30" />
//                         <span className="text-[10px] tracking-[0.5em] text-amber-500/50 uppercase" style={{ fontFamily: MONO }}>
//                             Item {item.year}
//                         </span>
//                     </div>
//                 </div>

//                 {/* ─── Hero Section ─── */}
//                 <header className="max-w-4xl mb-24">
//                     <h1 
//                         className="text-5xl md:text-6xl leading-tight font-light tracking-tight mb-10 text-white/90"
//                         style={{ fontFamily: FONT }}
//                     >
//                         {item.title}
//                     </h1>
//                     <div className="flex flex-col md:flex-row gap-12 items-start">
//                         {/* was text-white/40 */}
//                         <p 
//                             className="text-xl md:text-2xl text-white/75 font-light italic leading-relaxed md:w-2/3"
//                             style={{ fontFamily: FONT }}
//                         >
//                             {item.excerpt}
//                         </p>
//                         <div className="md:w-1/3 flex flex-col gap-2 pt-2">
//                              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-500" style={{ fontFamily: MONO }}>Timeline</div>
//                              {/* was text-white/80 */}
//                              <div className="text-3xl font-light text-white/90" style={{ fontFamily: FONT }}>{item.year}</div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* ─── Technical Stats Grid ─── */}
//                 <section className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-32 shadow-2xl">
//                     {item.details.map((detail, i) => (
//                         <div key={i} className="bg-[#080808] p-10 hover:bg-white/[0.02] transition-colors">
//                             <h4 className="text-[9px] uppercase tracking-[0.3em] text-amber-500/40 mb-4" style={{ fontFamily: MONO }}>
//                                 {detail.name}
//                             </h4>
//                             {/* was text-white/80 */}
//                             <p className="text-lg text-white/90 leading-snug" style={{ fontFamily: FONT }}>
//                                 {detail.info}
//                             </p>
//                         </div>
//                     ))}
//                 </section>

//                 <div className="flex flex-col lg:flex-row gap-24 mb-32">
//                     {/* ─── Main Content Column ─── */}
//                     <div className="flex-1">
                        
//                         {/* Rich Text / Story */}
//                         <article className="mb-32">
//                             <div className="flex items-center gap-4 mb-12">
//                                 <Zap size={14} className="text-amber-500" />
//                                 {/* was text-white/30 */}
//                                 <span className="text-[10px] tracking-[0.4em] uppercase text-white/60" style={{ fontFamily: MONO }}>The Narrative</span>
//                                 <div className="h-px flex-1 bg-white/5" />
//                             </div>
//                             {/* was text-white/50 */}
//                             <div 
//                                 className="prose prose-invert max-w-none text-xl md:text-2xl leading-relaxed text-white/75 font-light"
//                                 style={{ fontFamily: FONT }}
//                                 dangerouslySetInnerHTML={{ __html: item.richText }}
//                             />
//                         </article>

//                         {/* Video Archive */}
//                         {item.videos && item.videos.length > 0 && (
//                             <section>
//                                 <div className="flex items-center gap-4 mb-12">
//                                     <Play size={14} className="text-amber-500" />
//                                     {/* was text-white/30 */}
//                                     <span className="text-[10px] tracking-[0.4em] uppercase text-white/60" style={{ fontFamily: MONO }}>Cinematic Records</span>
//                                     <div className="h-px flex-1 bg-white/5" />
//                                 </div>
//                                 <div className="space-y-12">
//                                     {item.videos.map((vid, idx) => (
//                                         <div key={idx} className="group relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-2xl">
//                                             <iframe 
//                                                 src={getYouTubeEmbedUrl(vid)}
//                                                 className="absolute inset-0 w-full h-full"
//                                                 allowFullScreen
//                                                 title={`Video ${idx}`}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}
//                     </div>

//                     {/* ─── Sidebar Column ─── */}
//                     <aside className="lg:w-[380px] shrink-0">
//                         <div className="sticky top-24">
//                             {/* Visual Gallery */}
//                             {item.gallery && item.gallery.length > 0 && (
//                                 <section>
//                                     <div className="flex items-center gap-4 mb-12">
//                                         <ImageIcon size={14} className="text-amber-500" />
//                                         {/* was text-white/30 */}
//                                         <span className="text-[10px] tracking-[0.4em] uppercase text-white/60" style={{ fontFamily: MONO }}>Visual Archive</span>
//                                     </div>
//                                     <div className="grid grid-cols-1 gap-6">
//                                         {item.gallery.map((img, idx) => (
//                                             <div key={idx} className="group rounded-3xl overflow-hidden border border-white/5 bg-white/5">
//                                                 <img 
//                                                     src={img} 
//                                                     alt={`Gallery ${idx}`}
//                                                     className="w-full h-auto object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </section>
//                             )}

//                             {/* Signature Label */}
//                             <div className="mt-20 pt-10 border-t border-white/5">
//                                 {/* was text-white/20 */}
//                                 <div className="text-[8px] text-white/50 uppercase tracking-[0.8em]" style={{ fontFamily: MONO }}>
//                                     AUTHENTIC COLLECTION
//                                 </div>
//                                 {/* was text-white/20 */}
//                                 <div className="text-[8px] text-white/50 uppercase tracking-[0.8em] mt-2" style={{ fontFamily: MONO }}>
//                                     © ESTATE ARCHIVE
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>
//                 </div>

//                 {/* ─── Footer Navigation ─── */}
//                 <footer className="pt-12 border-t border-white/5 flex justify-start">
//                     {/* was text-white/40 */}
//                     <Link 
//                         to="/" 
//                         className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-amber-500 transition-all no-underline"
//                         style={{ fontFamily: MONO }}
//                     >
//                         <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
//                         Back to Showcase
//                     </Link>
//                 </footer>
//             </div>
//         </div>
//     );
// }
















// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Play, Image as ImageIcon, Zap, FileText, MessageSquare } from 'lucide-react';

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

// // ─── Full Massive Data Structure ──────────────────────────────────────────────

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
//     richText: string;
//     videos: string[];
//     gallery: string[];
// }

// export const legacyItems: LegacyItem[] = [
//     {
//         id: 'thriller',
//         title: 'The Thriller Phenomenon',
//         year: '1982',
//         image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'The album that broke all barriers, redefined the music video, and became the highest-selling record in human history.',
//         details: [
//             { name: 'Global Sales', info: '70 Million+' },
//             { name: 'Grammy Record', info: '8 Awards in 1984' },
//             { name: 'Billboard 100', info: '7 Top 10 Singles' },
//             { name: 'Cultural Impact', info: 'Library of Congress' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Conception of a Masterpiece</h3>
//             <p>Released on November 30, 1982, <em>Thriller</em> was not just an album; it was a seismic cultural event. Following the critical and commercial success of <em>Off the Wall</em>, Michael Jackson entered the Westlake Recording Studios in Los Angeles with producer Quincy Jones with a singular, impossible goal: to create an album where "every song was a killer."</p>
//             <p>The recording process was grueling. Jackson wrote four of the album's nine tracks, meticulously crafting the basslines, melodies, and lyrics in his head before dictating them to studio musicians. The album seamlessly blended pop, post-disco, rock, and funk, ensuring it had unprecedented crossover appeal.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Breaking the Color Barrier</h3>
//             <p>At the time of <em>Thriller's</em> release, the newly launched MTV network was playing almost exclusively white rock artists. Black artists struggled to get airplay. When CBS Records pushed for "Billie Jean" to be aired, MTV initially refused. It took intense pressure from the record label's president, Walter Yetnikoff, who threatened to pull all of CBS's artists and go public with MTV's racial bias, to force their hand.</p>
//             <p>Once "Billie Jean" aired, the response was explosive. MTV's ratings skyrocketed, and the doors were permanently kicked open for a generation of black artists.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted to write the kind of song that I would want to hear if I were to go out and buy a record." — Michael Jackson
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Short Film Revolution</h3>
//             <p>Jackson refused to call his visual accompaniments "music videos"—he called them "short films." He enlisted Hollywood director John Landis (<em>An American Werewolf in London</em>) to direct the 14-minute <em>Thriller</em> short film. With a budget of $500,000 (an astronomical sum for a music video at the time), it revolutionized the industry.</p>
//             <p>The film featured complex choreography, Hollywood-grade special effects by Rick Baker, and a narrative structure. It transformed music videos into a highly anticipated global television event.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=sOnqjkJTMaA', // Thriller Short Film
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Billie Jean Short Film
//             'https://www.youtube.com/watch?v=oRdxUFDoQe0'  // Beat It Short Film
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'moonwalk',
//         title: 'The Moonwalk Debut',
//         year: '1983',
//         image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'One televised performance that birthed the most imitated dance move in human history and cemented his crown.',
//         details: [
//             { name: 'Debut Date', info: 'March 25, 1983' },
//             { name: 'Event', info: 'Motown 25 Special' },
//             { name: 'TV Viewers', info: '47 Million Americans' },
//             { name: 'Iconic Attire', info: 'Fedora & Sequin Glove' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Motown 25: Yesterday, Today, Forever</h3>
//             <p>On March 25, 1983, at the Pasadena Civic Auditorium, the trajectory of pop culture shifted. The event was a television special celebrating the 25th anniversary of Motown Records. Michael Jackson agreed to perform with his brothers as the Jackson 5, but on one condition: he was given a solo spot to perform his new hit single, "Billie Jean."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Outfit and The Move</h3>
//             <p>Jackson took the stage in a black sequined jacket, high-water trousers exposing sparkling white socks, a black fedora, and a single rhinestone-encrusted white glove on his left hand. The outfit alone became legendary.</p>
//             <p>During the instrumental bridge of the song, Jackson struck a pose, snapped his fedora into the crowd, and glided backward across the stage while appearing to walk forward. The crowd erupted into deafening screams. The move lasted less than three seconds, but its impact lasted forever. He had just unveiled the "Moonwalk" to the world.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I had been practicing the Moonwalk in my kitchen for days. I wanted it to look like I was walking on water, or like I was sliding on glass." — Michael Jackson
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Morning After</h3>
//             <p>When the special aired on May 16, 1983, an estimated 47 million Americans tuned in. The next morning, children and adults across the globe were attempting to slide backward in their living rooms, school hallways, and city streets. The performance turned Jackson from a massive pop star into a global demigod. Fred Astaire, the legendary dancer, called Jackson the next day to congratulate him, telling him, "You're an angry dancer. I'm the same way."</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=d17ggav1Ljc', // Motown 25 Performance
//             'https://www.youtube.com/watch?v=nBcFbamRQcg'  // Moonwalk Compilation
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'bad',
//         title: 'The Bad Era',
//         year: '1987',
//         image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits, proving he was peerless.',
//         details: [
//             { name: 'Billboard Record', info: '5 Consecutive #1s' },
//             { name: 'World Tour', info: '123 Concerts Globally' },
//             { name: 'Album Sales', info: '35 Million+ Copies' },
//             { name: 'Style Evolution', info: 'Buckles, Belts & Leather' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Following the Unfollowable</h3>
//             <p>How do you follow up the biggest-selling album in human history? That was the immense pressure facing Michael Jackson in 1987. His response was <em>Bad</em>. To distance himself from the polished disco-pop of Thriller, Jackson adopted an edgier, street-smart aesthetic heavily clad in black leather, buckles, and studs.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Five Number Ones</h3>
//             <p>The album was a juggernaut. It became the first album in history to yield five consecutive <i>Billboard Hot 100</i> number-one singles: "I Just Can't Stop Loving You", "Bad", "The Way You Make Me Feel", "Man in the Mirror", and "Dirty Diana". He was no longer just making hits; he was dominating every radio station on the planet.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted to sound like nothing else. I wanted to be tough, I wanted to be strong, and I wanted it to be perfection."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The First Solo World Tour</h3>
//             <p>The <em>Bad World Tour</em> was Jackson's first solo concert tour. Spanning 16 months and 123 concerts, it performed to 4.4 million fans across 15 countries. It broke Guinness World Records for the largest grossing tour in history and the tour with the highest attendance. During his 7 sold-out shows at Wembley Stadium in London, he performed for over 504,000 fans, including Princess Diana and Prince Charles.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=dsUXAEzaC3Q', // Bad Short Film
//             'https://www.youtube.com/watch?v=PivWY9wn5ps', // Smooth Criminal
//             'https://www.youtube.com/watch?v=yUi_S6YWjA0'  // Wembley Performance
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'dangerous-tour',
//         title: 'Dangerous World Tour',
//         year: '1992',
//         image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'A breathtaking theatrical spectacle that pushed the boundaries of live performance and donated all profits to charity.',
//         details: [
//             { name: 'Total Attendance', info: '3.5 Million Fans' },
//             { name: 'Charity Impact', info: '100% Profits Donated' },
//             { name: 'Stage Magic', info: 'The Toaster Entrance' },
//             { name: 'Super Bowl XXVII', info: '133 Million Viewers' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Ultimate Live Spectacle</h3>
//             <p>The <em>Dangerous World Tour</em> was Michael Jackson at his theatrical peak. The stage took nearly 3 days to set up and required two 747 jumbo jets to transport the equipment. But beyond the sheer scale of the production, the tour is remembered for its unprecedented philanthropy: Jackson established the <i>Heal the World Foundation</i> and announced that all profits from the tour would be donated to charity.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Toaster Entrance</h3>
//             <p>The show's opening is considered the greatest entrance in music history. The arena would plunge into darkness before Jackson was violently catapulted through a trapdoor in the stage floor—an illusion known as "the toaster." He would land on his feet, clad in a golden fencing leotard and sunglasses, and stand completely frozen, like a statue, for up to three minutes while the crowd reached a state of absolute hysteria.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted the stage to be a fantasy. I wanted magic. When I perform, I want to take people to places they've never been before."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Reinventing the Super Bowl</h3>
//             <p>In the middle of the Dangerous era (1993), Jackson was asked to perform at the Super Bowl XXVII Halftime Show. Prior to this, halftime shows consisted of marching bands and minor acts, and networks regularly lost viewership during the break. Jackson's explosive performance—featuring pyrotechnics, optical illusions, and a choir of 3,500 children singing "Heal the World"—caused the ratings to actually increase during halftime for the first time in NFL history, setting the gold standard for every Super Bowl performance since.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=F2AitTPI5U0', // Jam Dangerous Tour
//             'https://www.youtube.com/watch?v=idg8TNknv6E'  // Superbowl Halftime
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1540039155732-d674d40b4df9?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'billie-jean',
//         title: 'The Billie Jean Revolution',
//         year: '1983',
//         image: 'https://images.unsplash.com/photo-1516280440502-a2f1c841e737?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'The iconic bassline, the glowing sidewalk, and the song that single-handedly broke MTVs color barrier.',
//         details: [
//             { name: 'Mixing Time', info: 'Over 91 Unique Mixes' },
//             { name: 'Billboard', info: '7 Weeks at #1' },
//             { name: 'Grammys', info: 'Won 2 Awards' },
//             { name: 'Inspiration', info: 'Groupies in the 70s' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Bassline That Changed the World</h3>
//             <p>"Billie Jean" is arguably the most recognizable pop song ever recorded. The genesis of the track started with a drum machine and an incredibly long, looping bassline. Producer Quincy Jones famously hated the long intro—saying it was too long for radio—but Jackson insisted it stay, telling Jones, "That's the jelly! That's what makes me want to dance."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Engineering Perfection</h3>
//             <p>The sound of "Billie Jean" is a marvel of audio engineering. Legendary sound engineer Bruce Swedien was tasked with creating a drum sound that was as tight and punchy as possible. He built a custom wooden platform for the drum kit and mixed the track an astounding 91 times. Ironically, after all those mixes, they ended up going with Mix Number 2.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "A musician knows hit material. Everything has to feel right. It fulfills you, and it makes you feel good. You know it when you hear it. That's how I felt about Billie Jean."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Glowing Sidewalk</h3>
//             <p>The short film for "Billie Jean", directed by Steve Barron, introduced the concept of magical realism to music videos. Jackson played a mysterious, elusive figure whose touch caused the environment to light up and transform. The glowing sidewalk tiles became an iconic visual, representing his Midas touch on the music industry. The video’s surreal, cinematic quality is what ultimately forced MTV to integrate their playlists.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Billie Jean Video
//             'https://www.youtube.com/watch?v=d17ggav1Ljc'  // Billie Jean Live
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'we-are-the-world',
//         title: 'We Are The World',
//         year: '1985',
//         image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'A generation of music legends united in a single room to sing an anthem that raised millions for African famine relief.',
//         details: [
//             { name: 'Funds Raised', info: 'Over $63 Million' },
//             { name: 'Artists Present', info: '45 Global Icons' },
//             { name: 'Written By', info: 'Jackson & Lionel Richie' },
//             { name: 'Awards', info: '4 Grammy Wins' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Check Your Egos at the Door</h3>
//             <p>In 1985, inspired by the UK's "Do They Know It's Christmas?", Harry Belafonte and activist Ken Kragen decided to organize an American response to the devastating famine in Ethiopia. They enlisted Lionel Richie and Michael Jackson to write the anthem. Over several intense days at the Jackson family home in Encino, California, the duo penned "We Are the World."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Greatest Chorus in History</h3>
//             <p>The recording session took place on January 28, 1985, immediately following the American Music Awards so that the industry's biggest stars would already be in Los Angeles. Quincy Jones produced the track, famously placing a sign on the studio door that read: <i>"Check your egos at the door."</i></p>
//             <p>The room contained an unprecedented gathering of musical royalty: Bruce Springsteen, Bob Dylan, Ray Charles, Stevie Wonder, Diana Ross, Tina Turner, Billy Joel, and dozens more. Jackson's solo vocal lines and ad-libs provided the soaring, emotional core of the song's climax.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I remember sitting in the room and looking around at all these legends, and realizing that music had the power to literally save lives." 
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">A Global Phenomenon</h3>
//             <p>Released under the name USA for Africa (United Support of Artists for Africa), the single became the fastest-selling American pop single in history. It reached Number One across the globe and raised over $63 million ($160 million adjusted for inflation) for humanitarian aid in Africa and the United States, proving the immense philanthropic power of the pop music industry.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=s3wNuru4U0I', // We Are The World Official
//             'https://www.youtube.com/watch?v=9AjkUyX0rVw'  // Making of
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop'
//         ]
//     }
// ];

// // ─── Helper: YouTube Embed Formatter ──────────────────────────────────────────

// const getYouTubeEmbedUrl = (url: string) => {
//     try {
//         let videoId = '';
//         if (url.includes('youtube.com/watch?v=')) {
//             videoId = url.split('v=')[1].split('&')[0];
//         } else if (url.includes('youtu.be/')) {
//             videoId = url.split('youtu.be/')[1].split('?')[0];
//         } else if (url.includes('embed/')) {
//             videoId = url.split('embed/')[1].split('?')[0];
//         } else {
//             videoId = url;
//         }
//         return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
//     } catch (e) {
//         return url;
//     }
// };

// // ─── Main Detail Page Component ───────────────────────────────────────────────

// export default function LegacyShowcaseDetail() {
//     const isDark = useTheme();
//     const { id } = useParams<{ id: string }>();
//     const [item, setItem] = useState<LegacyItem | null>(null);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
//     const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

//     useEffect(() => {
//         const found = legacyItems.find(i => i.id === id);
//         if (found) {
//             setItem(found);
//         } else {
//             setItem(null); // Will trigger the 404 state
//         }
//         window.scrollTo(0, 0);
//     }, [id]);

//     // ─── 404 State ───
//     if (!item && id) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500" style={{ backgroundColor: bg }}>
//                 <p className="text-3xl md:text-4xl font-normal" style={{ fontFamily: FONT, color: textColor }}>Archive Not Found</p>
//                 <Link to="/legacy" className="flex items-center gap-3 px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
//                     <ArrowLeft size={14} /> Back to Legacy Timeline
//                 </Link>
//             </div>
//         );
//     }

//     if (!item) return null; // Loading safety

//     return (
//         <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                
//                 {/* ─── Top Navigation ─── */}
//                 <div className="mb-12 border-b pb-6" style={{ borderColor }}>
//                     <Link to="/legacy" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
//                         <ArrowLeft size={14} /> Return to Timeline
//                     </Link>
//                 </div>

//                 {/* ─── Cinematic Hero Header ─── */}
//                 <header className="mb-16 md:mb-24">
//                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
//                         <div className="max-w-4xl">
//                             <span 
//                                 className="inline-block px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest mb-6"
//                                 style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                             >
//                                 Era: {item.year}
//                             </span>
//                             {/* Adjusted Text Size here (was 7xl, now 4xl to 6xl) */}
//                             <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
//                                 {item.title}
//                             </h1>
//                         </div>
//                         <div className="md:w-1/3 md:pb-2">
//                             <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
//                                 {item.excerpt}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Massive Cover Image */}
//                     <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[24px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
//                         <img 
//                             src={item.image} 
//                             alt={item.title} 
//                             className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
//                         />
//                     </div>
//                 </header>

//                 {/* ─── Technical Stats Ledger ─── */}
//                 <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-l border-t mb-24 md:mb-32" style={{ borderColor }}>
//                     {item.details.map((detail, i) => (
//                         <div key={i} className="p-8 md:p-10 border-r border-b flex flex-col justify-center transition-colors hover:bg-orange-500/5" style={{ borderColor, backgroundColor: cardBg }}>
//                             <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold mb-3 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                 {detail.name}
//                             </h4>
//                             <p className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
//                                 {detail.info}
//                             </p>
//                         </div>
//                     ))}
//                 </section>

//                 {/* ─── Split Layout Exhibition ─── */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
                    
//                     {/* LEFT COLUMN: Narrative & Vault (8 Columns) */}
//                     <div className="lg:col-span-8 flex flex-col">
                        
//                         {/* The Narrative */}
//                         <article className="mb-24">
//                             <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
//                                 <Zap size={16} style={{ color: ACCENT_COLOR }} />
//                                 <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                     The Narrative
//                                 </span>
//                             </div>
                            
//                             <div 
//                                 className="prose prose-lg max-w-none text-[17px] md:text-[20px] font-light leading-relaxed md:leading-loose opacity-90"
//                                 style={{ fontFamily: FONT, color: textColor }}
//                                 dangerouslySetInnerHTML={{ __html: item.richText }}
//                             />
//                         </article>

//                         {/* The Vault (Cinematic Records) */}
//                         {item.videos && item.videos.length > 0 && (
//                             <section>
//                                 <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
//                                     <Play size={16} style={{ color: ACCENT_COLOR }} />
//                                     <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                         Cinematic Records
//                                     </span>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {item.videos.map((vid, idx) => (
//                                         <div key={idx} className="relative aspect-video rounded-[24px] overflow-hidden border shadow-xl bg-zinc-900" style={{ borderColor }}>
//                                             <iframe 
//                                                 src={getYouTubeEmbedUrl(vid)}
//                                                 className="absolute inset-0 w-full h-full"
//                                                 allowFullScreen
//                                                 title={`${item.title} Video ${idx + 1}`}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}
//                     </div>

//                     {/* RIGHT COLUMN: Sticky Sidebar (4 Columns) */}
//                     <aside className="lg:col-span-4">
//                         <div className="sticky top-10 flex flex-col gap-16">
                            
//                             {/* Visual Archive (Gallery) */}
//                             {item.gallery && item.gallery.length > 0 && (
//                                 <section>
//                                     <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor }}>
//                                         <ImageIcon size={14} style={{ color: ACCENT_COLOR }} />
//                                         <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                             Visual Archive
//                                         </span>
//                                     </div>
//                                     <div className="flex flex-col gap-6">
//                                         {item.gallery.map((img, idx) => (
//                                             <div key={idx} className="rounded-[20px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
//                                                 <img 
//                                                     src={img} 
//                                                     alt={`${item.title} Archive ${idx + 1}`}
//                                                     className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0" 
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </section>
//                             )}

//                             {/* Related Archives (Cross-linking to Articles/Forums) */}
//                             <section className="p-8 rounded-[24px] border" style={{ borderColor, backgroundColor: cardBg }}>
//                                 <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border-b pb-4" style={{ fontFamily: MONO, color: textColor, borderColor }}>
//                                     Deepen Your Knowledge
//                                 </h3>
                                
//                                 <div className="flex flex-col gap-6">
//                                     <Link to="/articles" className="group flex flex-col gap-2 no-underline">
//                                         <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                             <FileText size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Related Article</span>
//                                         </div>
//                                         <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
//                                             Behind the Scenes of {item.title}: Untold Studio Stories
//                                         </h4>
//                                     </Link>

//                                     <Link to="/forum" className="group flex flex-col gap-2 no-underline pt-6 border-t" style={{ borderColor }}>
//                                         <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                             <MessageSquare size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Community Forum</span>
//                                         </div>
//                                         <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
//                                             Discussing the Global Impact of the {item.year} Era
//                                         </h4>
//                                     </Link>
//                                 </div>
//                             </section>

//                         </div>
//                     </aside>
//                 </div>

//                 {/* ─── Bottom Navigation ─── */}
//                 <div className="mt-32 pt-10 border-t flex justify-center" style={{ borderColor }}>
//                     <Link 
//                         to="/legacy" 
//                         className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:gap-4 hover:text-orange-500"
//                         style={{ fontFamily: MONO, color: textColor }}
//                     >
//                         <ArrowLeft size={14} /> Back to Legacy Timeline
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     );
// }




























// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Play, Image as ImageIcon, Zap, FileText, MessageSquare } from 'lucide-react';
// import { PostService, IPost } from '../services/post.service';
// import { forumApi, IForumThread } from '../services/forum.service';

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

// // ─── Full Massive Data Structure ──────────────────────────────────────────────

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
//     richText: string;
//     videos: string[];
//     gallery: string[];
// }

// export const legacyItems: LegacyItem[] = [
//     {
//         id: 'thriller',
//         title: 'The Thriller Phenomenon',
//         year: '1982',
//         image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'The album that broke all barriers, redefined the music video, and became the highest-selling record in human history.',
//         details: [
//             { name: 'Global Sales', info: '70 Million+' },
//             { name: 'Grammy Record', info: '8 Awards in 1984' },
//             { name: 'Billboard 100', info: '7 Top 10 Singles' },
//             { name: 'Cultural Impact', info: 'Library of Congress' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Conception of a Masterpiece</h3>
//             <p>Released on November 30, 1982, <em>Thriller</em> was not just an album; it was a seismic cultural event. Following the critical and commercial success of <em>Off the Wall</em>, Michael Jackson entered the Westlake Recording Studios in Los Angeles with producer Quincy Jones with a singular, impossible goal: to create an album where "every song was a killer."</p>
//             <p>The recording process was grueling. Jackson wrote four of the album's nine tracks, meticulously crafting the basslines, melodies, and lyrics in his head before dictating them to studio musicians. The album seamlessly blended pop, post-disco, rock, and funk, ensuring it had unprecedented crossover appeal.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Breaking the Color Barrier</h3>
//             <p>At the time of <em>Thriller's</em> release, the newly launched MTV network was playing almost exclusively white rock artists. Black artists struggled to get airplay. When CBS Records pushed for "Billie Jean" to be aired, MTV initially refused. It took intense pressure from the record label's president, Walter Yetnikoff, who threatened to pull all of CBS's artists and go public with MTV's racial bias, to force their hand.</p>
//             <p>Once "Billie Jean" aired, the response was explosive. MTV's ratings skyrocketed, and the doors were permanently kicked open for a generation of black artists.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted to write the kind of song that I would want to hear if I were to go out and buy a record." — Michael Jackson
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Short Film Revolution</h3>
//             <p>Jackson refused to call his visual accompaniments "music videos"—he called them "short films." He enlisted Hollywood director John Landis (<em>An American Werewolf in London</em>) to direct the 14-minute <em>Thriller</em> short film. With a budget of $500,000 (an astronomical sum for a music video at the time), it revolutionized the industry.</p>
//             <p>The film featured complex choreography, Hollywood-grade special effects by Rick Baker, and a narrative structure. It transformed music videos into a highly anticipated global television event.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=sOnqjkJTMaA', // Thriller Short Film
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Billie Jean Short Film
//             'https://www.youtube.com/watch?v=oRdxUFDoQe0'  // Beat It Short Film
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'moonwalk',
//         title: 'The Moonwalk Debut',
//         year: '1983',
//         image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'One televised performance that birthed the most imitated dance move in human history and cemented his crown.',
//         details: [
//             { name: 'Debut Date', info: 'March 25, 1983' },
//             { name: 'Event', info: 'Motown 25 Special' },
//             { name: 'TV Viewers', info: '47 Million Americans' },
//             { name: 'Iconic Attire', info: 'Fedora & Sequin Glove' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Motown 25: Yesterday, Today, Forever</h3>
//             <p>On March 25, 1983, at the Pasadena Civic Auditorium, the trajectory of pop culture shifted. The event was a television special celebrating the 25th anniversary of Motown Records. Michael Jackson agreed to perform with his brothers as the Jackson 5, but on one condition: he was given a solo spot to perform his new hit single, "Billie Jean."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Outfit and The Move</h3>
//             <p>Jackson took the stage in a black sequined jacket, high-water trousers exposing sparkling white socks, a black fedora, and a single rhinestone-encrusted white glove on his left hand. The outfit alone became legendary.</p>
//             <p>During the instrumental bridge of the song, Jackson struck a pose, snapped his fedora into the crowd, and glided backward across the stage while appearing to walk forward. The crowd erupted into deafening screams. The move lasted less than three seconds, but its impact lasted forever. He had just unveiled the "Moonwalk" to the world.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I had been practicing the Moonwalk in my kitchen for days. I wanted it to look like I was walking on water, or like I was sliding on glass." — Michael Jackson
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Morning After</h3>
//             <p>When the special aired on May 16, 1983, an estimated 47 million Americans tuned in. The next morning, children and adults across the globe were attempting to slide backward in their living rooms, school hallways, and city streets. The performance turned Jackson from a massive pop star into a global demigod. Fred Astaire, the legendary dancer, called Jackson the next day to congratulate him, telling him, "You're an angry dancer. I'm the same way."</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=d17ggav1Ljc', // Motown 25 Performance
//             'https://www.youtube.com/watch?v=nBcFbamRQcg'  // Moonwalk Compilation
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'bad',
//         title: 'The Bad Era',
//         year: '1987',
//         image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits, proving he was peerless.',
//         details: [
//             { name: 'Billboard Record', info: '5 Consecutive #1s' },
//             { name: 'World Tour', info: '123 Concerts Globally' },
//             { name: 'Album Sales', info: '35 Million+ Copies' },
//             { name: 'Style Evolution', info: 'Buckles, Belts & Leather' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Following the Unfollowable</h3>
//             <p>How do you follow up the biggest-selling album in human history? That was the immense pressure facing Michael Jackson in 1987. His response was <em>Bad</em>. To distance himself from the polished disco-pop of Thriller, Jackson adopted an edgier, street-smart aesthetic heavily clad in black leather, buckles, and studs.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Five Number Ones</h3>
//             <p>The album was a juggernaut. It became the first album in history to yield five consecutive <i>Billboard Hot 100</i> number-one singles: "I Just Can't Stop Loving You", "Bad", "The Way You Make Me Feel", "Man in the Mirror", and "Dirty Diana". He was no longer just making hits; he was dominating every radio station on the planet.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted to sound like nothing else. I wanted to be tough, I wanted to be strong, and I wanted it to be perfection."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The First Solo World Tour</h3>
//             <p>The <em>Bad World Tour</em> was Jackson's first solo concert tour. Spanning 16 months and 123 concerts, it performed to 4.4 million fans across 15 countries. It broke Guinness World Records for the largest grossing tour in history and the tour with the highest attendance. During his 7 sold-out shows at Wembley Stadium in London, he performed for over 504,000 fans, including Princess Diana and Prince Charles.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=dsUXAEzaC3Q', // Bad Short Film
//             'https://www.youtube.com/watch?v=PivWY9wn5ps', // Smooth Criminal
//             'https://www.youtube.com/watch?v=yUi_S6YWjA0'  // Wembley Performance
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'dangerous-tour',
//         title: 'Dangerous World Tour',
//         year: '1992',
//         image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'A breathtaking theatrical spectacle that pushed the boundaries of live performance and donated all profits to charity.',
//         details: [
//             { name: 'Total Attendance', info: '3.5 Million Fans' },
//             { name: 'Charity Impact', info: '100% Profits Donated' },
//             { name: 'Stage Magic', info: 'The Toaster Entrance' },
//             { name: 'Super Bowl XXVII', info: '133 Million Viewers' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Ultimate Live Spectacle</h3>
//             <p>The <em>Dangerous World Tour</em> was Michael Jackson at his theatrical peak. The stage took nearly 3 days to set up and required two 747 jumbo jets to transport the equipment. But beyond the sheer scale of the production, the tour is remembered for its unprecedented philanthropy: Jackson established the <i>Heal the World Foundation</i> and announced that all profits from the tour would be donated to charity.</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Toaster Entrance</h3>
//             <p>The show's opening is considered the greatest entrance in music history. The arena would plunge into darkness before Jackson was violently catapulted through a trapdoor in the stage floor—an illusion known as "the toaster." He would land on his feet, clad in a golden fencing leotard and sunglasses, and stand completely frozen, like a statue, for up to three minutes while the crowd reached a state of absolute hysteria.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I wanted the stage to be a fantasy. I wanted magic. When I perform, I want to take people to places they've never been before."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Reinventing the Super Bowl</h3>
//             <p>In the middle of the Dangerous era (1993), Jackson was asked to perform at the Super Bowl XXVII Halftime Show. Prior to this, halftime shows consisted of marching bands and minor acts, and networks regularly lost viewership during the break. Jackson's explosive performance—featuring pyrotechnics, optical illusions, and a choir of 3,500 children singing "Heal the World"—caused the ratings to actually increase during halftime for the first time in NFL history, setting the gold standard for every Super Bowl performance since.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=F2AitTPI5U0', // Jam Dangerous Tour
//             'https://www.youtube.com/watch?v=idg8TNknv6E'  // Superbowl Halftime
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1540039155732-d674d40b4df9?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'billie-jean',
//         title: 'The Billie Jean Revolution',
//         year: '1983',
//         image: 'https://images.unsplash.com/photo-1516280440502-a2f1c841e737?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'The iconic bassline, the glowing sidewalk, and the song that single-handedly broke MTVs color barrier.',
//         details: [
//             { name: 'Mixing Time', info: 'Over 91 Unique Mixes' },
//             { name: 'Billboard', info: '7 Weeks at #1' },
//             { name: 'Grammys', info: 'Won 2 Awards' },
//             { name: 'Inspiration', info: 'Groupies in the 70s' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Bassline That Changed the World</h3>
//             <p>"Billie Jean" is arguably the most recognizable pop song ever recorded. The genesis of the track started with a drum machine and an incredibly long, looping bassline. Producer Quincy Jones famously hated the long intro—saying it was too long for radio—but Jackson insisted it stay, telling Jones, "That's the jelly! That's what makes me want to dance."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Engineering Perfection</h3>
//             <p>The sound of "Billie Jean" is a marvel of audio engineering. Legendary sound engineer Bruce Swedien was tasked with creating a drum sound that was as tight and punchy as possible. He built a custom wooden platform for the drum kit and mixed the track an astounding 91 times. Ironically, after all those mixes, they ended up going with Mix Number 2.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "A musician knows hit material. Everything has to feel right. It fulfills you, and it makes you feel good. You know it when you hear it. That's how I felt about Billie Jean."
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Glowing Sidewalk</h3>
//             <p>The short film for "Billie Jean", directed by Steve Barron, introduced the concept of magical realism to music videos. Jackson played a mysterious, elusive figure whose touch caused the environment to light up and transform. The glowing sidewalk tiles became an iconic visual, representing his Midas touch on the music industry. The video’s surreal, cinematic quality is what ultimately forced MTV to integrate their playlists.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', // Billie Jean Video
//             'https://www.youtube.com/watch?v=d17ggav1Ljc'  // Billie Jean Live
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
//         ]
//     },
//     {
//         id: 'we-are-the-world',
//         title: 'We Are The World',
//         year: '1985',
//         image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop',
//         excerpt: 'A generation of music legends united in a single room to sing an anthem that raised millions for African famine relief.',
//         details: [
//             { name: 'Funds Raised', info: 'Over $63 Million' },
//             { name: 'Artists Present', info: '45 Global Icons' },
//             { name: 'Written By', info: 'Jackson & Lionel Richie' },
//             { name: 'Awards', info: '4 Grammy Wins' },
//         ],
//         richText: `
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Check Your Egos at the Door</h3>
//             <p>In 1985, inspired by the UK's "Do They Know It's Christmas?", Harry Belafonte and activist Ken Kragen decided to organize an American response to the devastating famine in Ethiopia. They enlisted Lionel Richie and Michael Jackson to write the anthem. Over several intense days at the Jackson family home in Encino, California, the duo penned "We Are the World."</p>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Greatest Chorus in History</h3>
//             <p>The recording session took place on January 28, 1985, immediately following the American Music Awards so that the industry's biggest stars would already be in Los Angeles. Quincy Jones produced the track, famously placing a sign on the studio door that read: <i>"Check your egos at the door."</i></p>
//             <p>The room contained an unprecedented gathering of musical royalty: Bruce Springsteen, Bob Dylan, Ray Charles, Stevie Wonder, Diana Ross, Tina Turner, Billy Joel, and dozens more. Jackson's solo vocal lines and ad-libs provided the soaring, emotional core of the song's climax.</p>

//             <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
//                 "I remember sitting in the room and looking around at all these legends, and realizing that music had the power to literally save lives." 
//             </blockquote>
            
//             <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">A Global Phenomenon</h3>
//             <p>Released under the name USA for Africa (United Support of Artists for Africa), the single became the fastest-selling American pop single in history. It reached Number One across the globe and raised over $63 million ($160 million adjusted for inflation) for humanitarian aid in Africa and the United States, proving the immense philanthropic power of the pop music industry.</p>
//         `,
//         videos: [
//             'https://www.youtube.com/watch?v=s3wNuru4U0I', // We Are The World Official
//             'https://www.youtube.com/watch?v=9AjkUyX0rVw'  // Making of
//         ],
//         gallery: [
//             'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop',
//             'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop'
//         ]
//     }
// ];

// // ─── Helper: YouTube Embed Formatter ──────────────────────────────────────────

// const getYouTubeEmbedUrl = (url: string) => {
//     try {
//         let videoId = '';
//         if (url.includes('youtube.com/watch?v=')) {
//             videoId = url.split('v=')[1].split('&')[0];
//         } else if (url.includes('youtu.be/')) {
//             videoId = url.split('youtu.be/')[1].split('?')[0];
//         } else if (url.includes('embed/')) {
//             videoId = url.split('embed/')[1].split('?')[0];
//         } else {
//             videoId = url;
//         }
//         return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
//     } catch (e) {
//         return url;
//     }
// };

// // ─── Main Detail Page Component ───────────────────────────────────────────────

// export default function LegacyShowcaseDetail() {
//     const isDark = useTheme();
//     const { id } = useParams<{ id: string }>();
    
//     const [item, setItem] = useState<LegacyItem | null>(null);
//     const [relatedArticle, setRelatedArticle] = useState<IPost | null>(null);
//     const [relatedThread, setRelatedThread] = useState<IForumThread | null>(null);

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
//     const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

//     useEffect(() => {
//         const loadPageData = async () => {
//             const found = legacyItems.find(i => i.id === id);
            
//             if (found) {
//                 setItem(found);
                
//                 // Fetch dynamic backend data based on this specific Era's title
//                 try {
//                     // Try to find an article matching the era title
//                     let articleRes = await PostService.searchPosts({ q: found.title, type: 'article', limit: 1 });
                    
//                     // Fallback to recent articles if search is empty
//                     if (!articleRes.data.posts || articleRes.data.posts.length === 0) {
//                         articleRes = await PostService.getPosts({ type: 'article', limit: 1, status: 'published' });
//                     }
//                     if (articleRes.data.posts && articleRes.data.posts.length > 0) {
//                         setRelatedArticle(articleRes.data.posts[0]);
//                     }

//                     // Try to find a trending forum thread
//                     const threadRes = await forumApi.getThreads({ limit: 5 });
//                     if (threadRes.threads && threadRes.threads.length > 0) {
//                         // Pick the top thread or one that matches (simplified to first for demo)
//                         setRelatedThread(threadRes.threads[0]);
//                     }
//                 } catch (err) {
//                     console.error("Failed to load backend related links", err);
//                 }
//             } else {
//                 setItem(null); // Triggers 404
//             }
//         };

//         loadPageData();
//         window.scrollTo(0, 0);
//     }, [id]);

//     // ─── 404 State ───
//     if (!item && id) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500" style={{ backgroundColor: bg }}>
//                 <p className="text-3xl md:text-4xl font-normal" style={{ fontFamily: FONT, color: textColor }}>Archive Not Found</p>
//                 <Link to="/legacy" className="flex items-center gap-3 px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
//                     <ArrowLeft size={14} /> Back to Legacy Timeline
//                 </Link>
//             </div>
//         );
//     }

//     if (!item) return null; // Loading safety

//     return (
//         <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                
//                 {/* ─── Top Navigation ─── */}
//                 <div className="mb-12 border-b pb-6" style={{ borderColor }}>
//                     <Link to="/legacy" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
//                         <ArrowLeft size={14} /> Return to Timeline
//                     </Link>
//                 </div>

//                 {/* ─── Cinematic Hero Header ─── */}
//                 <header className="mb-16 md:mb-24">
//                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
//                         <div className="max-w-4xl">
//                             <span 
//                                 className="inline-block px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest mb-6"
//                                 style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                             >
//                                 Era: {item.year}
//                             </span>
//                             {/* Adjusted Title Size */}
//                             <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
//                                 {item.title}
//                             </h1>
//                         </div>
//                         <div className="md:w-1/3 md:pb-2">
//                             <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
//                                 {item.excerpt}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Massive Cover Image */}
//                     <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[24px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
//                         <img 
//                             src={item.image} 
//                             alt={item.title} 
//                             className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
//                         />
//                     </div>
//                 </header>

//                 {/* ─── Technical Stats Ledger ─── */}
//                 <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-l border-t mb-24 md:mb-32" style={{ borderColor }}>
//                     {item.details.map((detail, i) => (
//                         <div key={i} className="p-8 md:p-10 border-r border-b flex flex-col justify-center transition-colors hover:bg-orange-500/5" style={{ borderColor, backgroundColor: cardBg }}>
//                             <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold mb-3 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                 {detail.name}
//                             </h4>
//                             <p className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
//                                 {detail.info}
//                             </p>
//                         </div>
//                     ))}
//                 </section>

//                 {/* ─── Split Layout Exhibition ─── */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
                    
//                     {/* LEFT COLUMN: Narrative & Vault (8 Columns) */}
//                     <div className="lg:col-span-8 flex flex-col">
                        
//                         {/* The Narrative */}
//                         <article className="mb-24">
//                             <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
//                                 <Zap size={16} style={{ color: ACCENT_COLOR }} />
//                                 <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                     The Narrative
//                                 </span>
//                             </div>
                            
//                             <div 
//                                 className="prose prose-lg max-w-none text-[17px] md:text-[20px] font-light leading-relaxed md:leading-loose opacity-90"
//                                 style={{ fontFamily: FONT, color: textColor }}
//                                 dangerouslySetInnerHTML={{ __html: item.richText }}
//                             />
//                         </article>

//                         {/* The Vault (Cinematic Records) */}
//                         {item.videos && item.videos.length > 0 && (
//                             <section>
//                                 <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
//                                     <Play size={16} style={{ color: ACCENT_COLOR }} />
//                                     <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                         Cinematic Records
//                                     </span>
//                                 </div>
//                                 <div className="space-y-12">
//                                     {item.videos.map((vid, idx) => (
//                                         <div key={idx} className="relative aspect-video rounded-[24px] overflow-hidden border shadow-xl bg-zinc-900" style={{ borderColor }}>
//                                             <iframe 
//                                                 src={getYouTubeEmbedUrl(vid)}
//                                                 className="absolute inset-0 w-full h-full"
//                                                 allowFullScreen
//                                                 title={`${item.title} Video ${idx + 1}`}
//                                             />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}
//                     </div>

//                     {/* RIGHT COLUMN: Sticky Sidebar (4 Columns) */}
//                     <aside className="lg:col-span-4">
//                         <div className="sticky top-10 flex flex-col gap-16">
                            
//                             {/* Visual Archive (Gallery) */}
//                             {item.gallery && item.gallery.length > 0 && (
//                                 <section>
//                                     <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor }}>
//                                         <ImageIcon size={14} style={{ color: ACCENT_COLOR }} />
//                                         <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
//                                             Visual Archive
//                                         </span>
//                                     </div>
//                                     <div className="flex flex-col gap-6">
//                                         {item.gallery.map((img, idx) => (
//                                             <div key={idx} className="rounded-[20px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
//                                                 <img 
//                                                     src={img} 
//                                                     alt={`${item.title} Archive ${idx + 1}`}
//                                                     className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0" 
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </section>
//                             )}

//                             {/* Dynamic Related Archives (Fetched from Backend) */}
//                             {(relatedArticle || relatedThread) && (
//                                 <section className="p-8 rounded-[24px] border" style={{ borderColor, backgroundColor: cardBg }}>
//                                     <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border-b pb-4" style={{ fontFamily: MONO, color: textColor, borderColor }}>
//                                         Deepen Your Knowledge
//                                     </h3>
                                    
//                                     <div className="flex flex-col gap-6">
                                        
//                                         {/* Dynamic Related Article */}
//                                         {relatedArticle && (
//                                             <Link to={`/articles/${relatedArticle.slug}`} className="group flex flex-col gap-2 no-underline">
//                                                 <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                     <FileText size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Archive Article</span>
//                                                 </div>
//                                                 <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
//                                                     {relatedArticle.title}
//                                                 </h4>
//                                             </Link>
//                                         )}

//                                         {/* Dynamic Related Thread */}
//                                         {relatedThread && (
//                                             <Link to={`/forum/${relatedThread._id}`} className={`group flex flex-col gap-2 no-underline ${relatedArticle ? 'pt-6 border-t' : ''}`} style={{ borderColor }}>
//                                                 <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                     <MessageSquare size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Global Forum</span>
//                                                 </div>
//                                                 <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
//                                                     {relatedThread.title}
//                                                 </h4>
//                                             </Link>
//                                         )}

//                                     </div>
//                                 </section>
//                             )}

//                         </div>
//                     </aside>
//                 </div>

//                 {/* ─── Bottom Navigation ─── */}
//                 <div className="mt-32 pt-10 border-t flex justify-center" style={{ borderColor }}>
//                     <Link 
//                         to="/legacy" 
//                         className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:gap-4 hover:text-orange-500"
//                         style={{ fontFamily: MONO, color: textColor }}
//                     >
//                         <ArrowLeft size={14} /> Back to Legacy Timeline
//                     </Link>
//                 </div>

//             </div>
//         </div>
//     );
// }


























import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Image as ImageIcon, Zap, FileText, MessageSquare } from 'lucide-react';
import { PostService, IPost } from '../services/post.service';
import { forumApi, IForumThread } from '../services/forum.service';

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
        return () => observer.disconnect();
    }, []);

    return isDark;
}

// ─── Full Massive Data Structure ──────────────────────────────────────────────

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
    richText: string;
    videos: string[];
    gallery: string[];
}

export const legacyItems: LegacyItem[] = [
    {
        id: 'thriller',
        title: 'The Thriller Phenomenon',
        year: '1982',
        image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'The album that broke all barriers, redefined the music video, and became the highest-selling record in human history.',
        details: [
            { name: 'Global Sales', info: '70 Million+' },
            { name: 'Grammy Record', info: '8 Awards in 1984' },
            { name: 'Billboard 100', info: '7 Top 10 Singles' },
            { name: 'Cultural Impact', info: 'Library of Congress' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Conception of a Masterpiece</h3>
            <p>Released on November 30, 1982, <em>Thriller</em> was not just an album; it was a seismic cultural event. Following the critical and commercial success of <em>Off the Wall</em>, Michael Jackson entered the Westlake Recording Studios in Los Angeles with producer Quincy Jones with a singular, impossible goal: to create an album where "every song was a killer."</p>
            <p>The recording process was grueling. Jackson wrote four of the album's nine tracks, meticulously crafting the basslines, melodies, and lyrics in his head before dictating them to studio musicians. The album seamlessly blended pop, post-disco, rock, and funk, ensuring it had unprecedented crossover appeal.</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Breaking the Color Barrier</h3>
            <p>At the time of <em>Thriller's</em> release, the newly launched MTV network was playing almost exclusively white rock artists. Black artists struggled to get airplay. When CBS Records pushed for "Billie Jean" to be aired, MTV initially refused. It took intense pressure from the record label's president, Walter Yetnikoff, who threatened to pull all of CBS's artists and go public with MTV's racial bias, to force their hand.</p>
            <p>Once "Billie Jean" aired, the response was explosive. MTV's ratings skyrocketed, and the doors were permanently kicked open for a generation of black artists.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "I wanted to write the kind of song that I would want to hear if I were to go out and buy a record." — Michael Jackson
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Short Film Revolution</h3>
            <p>Jackson refused to call his visual accompaniments "music videos"—he called them "short films." He enlisted Hollywood director John Landis (<em>An American Werewolf in London</em>) to direct the 14-minute <em>Thriller</em> short film. With a budget of $500,000 (an astronomical sum for a music video at the time), it revolutionized the industry.</p>
            <p>The film featured complex choreography, Hollywood-grade special effects by Rick Baker, and a narrative structure. It transformed music videos into a highly anticipated global television event.</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=sOnqjkJTMaA', 
            'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', 
            'https://www.youtube.com/watch?v=oRdxUFDoQe0'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 'moonwalk',
        title: 'The Moonwalk Debut',
        year: '1983',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'One televised performance that birthed the most imitated dance move in human history and cemented his crown.',
        details: [
            { name: 'Debut Date', info: 'March 25, 1983' },
            { name: 'Event', info: 'Motown 25 Special' },
            { name: 'TV Viewers', info: '47 Million Americans' },
            { name: 'Iconic Attire', info: 'Fedora & Sequin Glove' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Motown 25: Yesterday, Today, Forever</h3>
            <p>On March 25, 1983, at the Pasadena Civic Auditorium, the trajectory of pop culture shifted. The event was a television special celebrating the 25th anniversary of Motown Records. Michael Jackson agreed to perform with his brothers as the Jackson 5, but on one condition: he was given a solo spot to perform his new hit single, "Billie Jean."</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Outfit and The Move</h3>
            <p>Jackson took the stage in a black sequined jacket, high-water trousers exposing sparkling white socks, a black fedora, and a single rhinestone-encrusted white glove on his left hand. The outfit alone became legendary.</p>
            <p>During the instrumental bridge of the song, Jackson struck a pose, snapped his fedora into the crowd, and glided backward across the stage while appearing to walk forward. The crowd erupted into deafening screams. The move lasted less than three seconds, but its impact lasted forever. He had just unveiled the "Moonwalk" to the world.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "I had been practicing the Moonwalk in my kitchen for days. I wanted it to look like I was walking on water, or like I was sliding on glass." — Michael Jackson
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Morning After</h3>
            <p>When the special aired on May 16, 1983, an estimated 47 million Americans tuned in. The next morning, children and adults across the globe were attempting to slide backward in their living rooms, school hallways, and city streets. The performance turned Jackson from a massive pop star into a global demigod. Fred Astaire, the legendary dancer, called Jackson the next day to congratulate him, telling him, "You're an angry dancer. I'm the same way."</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=d17ggav1Ljc', 
            'https://www.youtube.com/watch?v=nBcFbamRQcg'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 'bad',
        title: 'The Bad Era',
        year: '1987',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'Edgier, sharper, and producing a record five consecutive #1 Billboard hits, proving he was peerless.',
        details: [
            { name: 'Billboard Record', info: '5 Consecutive #1s' },
            { name: 'World Tour', info: '123 Concerts Globally' },
            { name: 'Album Sales', info: '35 Million+ Copies' },
            { name: 'Style Evolution', info: 'Buckles, Belts & Leather' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Following the Unfollowable</h3>
            <p>How do you follow up the biggest-selling album in human history? That was the immense pressure facing Michael Jackson in 1987. His response was <em>Bad</em>. To distance himself from the polished disco-pop of Thriller, Jackson adopted an edgier, street-smart aesthetic heavily clad in black leather, buckles, and studs.</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Five Number Ones</h3>
            <p>The album was a juggernaut. It became the first album in history to yield five consecutive <i>Billboard Hot 100</i> number-one singles: "I Just Can't Stop Loving You", "Bad", "The Way You Make Me Feel", "Man in the Mirror", and "Dirty Diana". He was no longer just making hits; he was dominating every radio station on the planet.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "I wanted to sound like nothing else. I wanted to be tough, I wanted to be strong, and I wanted it to be perfection."
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The First Solo World Tour</h3>
            <p>The <em>Bad World Tour</em> was Jackson's first solo concert tour. Spanning 16 months and 123 concerts, it performed to 4.4 million fans across 15 countries. It broke Guinness World Records for the largest grossing tour in history and the tour with the highest attendance. During his 7 sold-out shows at Wembley Stadium in London, he performed for over 504,000 fans, including Princess Diana and Prince Charles.</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=dsUXAEzaC3Q', 
            'https://www.youtube.com/watch?v=PivWY9wn5ps', 
            'https://www.youtube.com/watch?v=yUi_S6YWjA0'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 'dangerous-tour',
        title: 'Dangerous World Tour',
        year: '1992',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'A breathtaking theatrical spectacle that pushed the boundaries of live performance and donated all profits to charity.',
        details: [
            { name: 'Total Attendance', info: '3.5 Million Fans' },
            { name: 'Charity Impact', info: '100% Profits Donated' },
            { name: 'Stage Magic', info: 'The Toaster Entrance' },
            { name: 'Super Bowl XXVII', info: '133 Million Viewers' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Ultimate Live Spectacle</h3>
            <p>The <em>Dangerous World Tour</em> was Michael Jackson at his theatrical peak. The stage took nearly 3 days to set up and required two 747 jumbo jets to transport the equipment. But beyond the sheer scale of the production, the tour is remembered for its unprecedented philanthropy: Jackson established the <i>Heal the World Foundation</i> and announced that all profits from the tour would be donated to charity.</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Toaster Entrance</h3>
            <p>The show's opening is considered the greatest entrance in music history. The arena would plunge into darkness before Jackson was violently catapulted through a trapdoor in the stage floor—an illusion known as "the toaster." He would land on his feet, clad in a golden fencing leotard and sunglasses, and stand completely frozen, like a statue, for up to three minutes while the crowd reached a state of absolute hysteria.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "I wanted the stage to be a fantasy. I wanted magic. When I perform, I want to take people to places they've never been before."
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Reinventing the Super Bowl</h3>
            <p>In the middle of the Dangerous era (1993), Jackson was asked to perform at the Super Bowl XXVII Halftime Show. Prior to this, halftime shows consisted of marching bands and minor acts, and networks regularly lost viewership during the break. Jackson's explosive performance—featuring pyrotechnics, optical illusions, and a choir of 3,500 children singing "Heal the World"—caused the ratings to actually increase during halftime for the first time in NFL history, setting the gold standard for every Super Bowl performance since.</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=F2AitTPI5U0', 
            'https://www.youtube.com/watch?v=idg8TNknv6E'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1540039155732-d674d40b4df9?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 'billie-jean',
        title: 'The Billie Jean Revolution',
        year: '1983',
        image: 'https://images.unsplash.com/photo-1516280440502-a2f1c841e737?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'The iconic bassline, the glowing sidewalk, and the song that single-handedly broke MTVs color barrier.',
        details: [
            { name: 'Mixing Time', info: 'Over 91 Unique Mixes' },
            { name: 'Billboard', info: '7 Weeks at #1' },
            { name: 'Grammys', info: 'Won 2 Awards' },
            { name: 'Inspiration', info: 'Groupies in the 70s' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">The Bassline That Changed the World</h3>
            <p>"Billie Jean" is arguably the most recognizable pop song ever recorded. The genesis of the track started with a drum machine and an incredibly long, looping bassline. Producer Quincy Jones famously hated the long intro—saying it was too long for radio—but Jackson insisted it stay, telling Jones, "That's the jelly! That's what makes me want to dance."</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">Engineering Perfection</h3>
            <p>The sound of "Billie Jean" is a marvel of audio engineering. Legendary sound engineer Bruce Swedien was tasked with creating a drum sound that was as tight and punchy as possible. He built a custom wooden platform for the drum kit and mixed the track an astounding 91 times. Ironically, after all those mixes, they ended up going with Mix Number 2.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "A musician knows hit material. Everything has to feel right. It fulfills you, and it makes you feel good. You know it when you hear it. That's how I felt about Billie Jean."
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Glowing Sidewalk</h3>
            <p>The short film for "Billie Jean", directed by Steve Barron, introduced the concept of magical realism to music videos. Jackson played a mysterious, elusive figure whose touch caused the environment to light up and transform. The glowing sidewalk tiles became an iconic visual, representing his Midas touch on the music industry. The video’s surreal, cinematic quality is what ultimately forced MTV to integrate their playlists.</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', 
            'https://www.youtube.com/watch?v=d17ggav1Ljc'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a1a2a44b05ae?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520095972714-909e91b053c1?q=80&w=800&auto=format&fit=crop'
        ]
    },
    {
        id: 'we-are-the-world',
        title: 'We Are The World',
        year: '1985',
        image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'A generation of music legends united in a single room to sing an anthem that raised millions for African famine relief.',
        details: [
            { name: 'Funds Raised', info: 'Over $63 Million' },
            { name: 'Artists Present', info: '45 Global Icons' },
            { name: 'Written By', info: 'Jackson & Lionel Richie' },
            { name: 'Awards', info: '4 Grammy Wins' },
        ],
        richText: `
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-bottom: 1rem;">Check Your Egos at the Door</h3>
            <p>In 1985, inspired by the UK's "Do They Know It's Christmas?", Harry Belafonte and activist Ken Kragen decided to organize an American response to the devastating famine in Ethiopia. They enlisted Lionel Richie and Michael Jackson to write the anthem. Over several intense days at the Jackson family home in Encino, California, the duo penned "We Are the World."</p>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">The Greatest Chorus in History</h3>
            <p>The recording session took place on January 28, 1985, immediately following the American Music Awards so that the industry's biggest stars would already be in Los Angeles. Quincy Jones produced the track, famously placing a sign on the studio door that read: <i>"Check your egos at the door."</i></p>
            <p>The room contained an unprecedented gathering of musical royalty: Bruce Springsteen, Bob Dylan, Ray Charles, Stevie Wonder, Diana Ross, Tina Turner, Billy Joel, and dozens more. Jackson's solo vocal lines and ad-libs provided the soaring, emotional core of the song's climax.</p>

            <blockquote style="border-left: 4px solid #FF8C00; padding-left: 1rem; margin: 2rem 0; font-style: italic; opacity: 0.8;">
                "I remember sitting in the room and looking around at all these legends, and realizing that music had the power to literally save lives." 
            </blockquote>
            
            <h3 style="color: #FF8C00; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">A Global Phenomenon</h3>
            <p>Released under the name USA for Africa (United Support of Artists for Africa), the single became the fastest-selling American pop single in history. It reached Number One across the globe and raised over $63 million ($160 million adjusted for inflation) for humanitarian aid in Africa and the United States, proving the immense philanthropic power of the pop music industry.</p>
        `,
        videos: [
            'https://www.youtube.com/watch?v=s3wNuru4U0I', 
            'https://www.youtube.com/watch?v=9AjkUyX0rVw'  
        ],
        gallery: [
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop'
        ]
    }
];

// ─── Helper: YouTube Embed Formatter ──────────────────────────────────────────

const getYouTubeEmbedUrl = (url: string) => {
    try {
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        } else {
            videoId = url;
        }
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
    } catch (e) {
        return url;
    }
};

// ─── Main Detail Page Component ───────────────────────────────────────────────

export default function LegacyShowcaseDetail() {
    const isDark = useTheme();
    const { id } = useParams<{ id: string }>();
    
    const [item, setItem] = useState<LegacyItem | null>(null);
    const [relatedArticle, setRelatedArticle] = useState<IPost | null>(null);
    const [relatedThread, setRelatedThread] = useState<IForumThread | null>(null);

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

    useEffect(() => {
        const loadPageData = async () => {
            const found = legacyItems.find(i => i.id === id);
            
            if (found) {
                setItem(found);
                
                try {
                    let articleRes = await PostService.searchPosts({ q: found.title, type: 'article', limit: 1 });
                    
                    if (!articleRes.data.posts || articleRes.data.posts.length === 0) {
                        articleRes = await PostService.getPosts({ type: 'article', limit: 1, status: 'published' });
                    }
                    if (articleRes.data.posts && articleRes.data.posts.length > 0) {
                        setRelatedArticle(articleRes.data.posts[0]);
                    }

                    const threadRes = await forumApi.getThreads({ limit: 5 });
                    if (threadRes.threads && threadRes.threads.length > 0) {
                        setRelatedThread(threadRes.threads[0]);
                    }
                } catch (err) {
                    console.error("Failed to load backend related links", err);
                }
            } else {
                setItem(null);
            }
        };

        loadPageData();
        window.scrollTo(0, 0);
    }, [id]);

    if (!item && id) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-500" style={{ backgroundColor: bg }}>
                <p className="text-3xl md:text-4xl font-normal" style={{ fontFamily: FONT, color: textColor }}>Archive Not Found</p>
                {/* Safe temporary routing to home '/' */}
                <Link to="/legacy" className="flex items-center gap-3 px-8 py-3 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
                    <ArrowLeft size={14} /> Back to Legacy Archive
                </Link>
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-40">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-12 border-b pb-6" style={{ borderColor }}>
                    <Link to="/legacy" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Back
                    </Link>
                </div>

                {/* ─── Cinematic Hero Header ─── */}
                <header className="mb-16 md:mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="max-w-4xl">
                            <span 
                                className="inline-block px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest mb-6"
                                style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                            >
                                Era: {item.year}
                            </span>
                            {/* Title Size Reduced */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
                                {item.title}
                            </h1>
                        </div>
                        <div className="md:w-1/3 md:pb-2">
                            <p className="text-lg md:text-xl font-normal leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
                                {item.excerpt}
                            </p>
                        </div>
                    </div>

                    <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[24px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                        />
                    </div>
                </header>

                {/* ─── Technical Stats Ledger ─── */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-l border-t mb-24 md:mb-32" style={{ borderColor }}>
                    {item.details.map((detail, i) => (
                        <div key={i} className="p-8 md:p-10 border-r border-b flex flex-col justify-center transition-colors hover:bg-orange-500/5" style={{ borderColor, backgroundColor: cardBg }}>
                            <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold mb-3 opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                {detail.name}
                            </h4>
                            <p className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
                                {detail.info}
                            </p>
                        </div>
                    ))}
                </section>

                {/* ─── Split Layout Exhibition ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
                    
                    <div className="lg:col-span-8 flex flex-col">
                        
                        <article className="mb-24">
                            <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
                                <Zap size={16} style={{ color: ACCENT_COLOR }} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
                                    The Narrative
                                </span>
                            </div>
                            
                            <div 
                                className="prose prose-lg max-w-none text-[17px] md:text-[20px] font-light leading-relaxed md:leading-loose opacity-90"
                                style={{ fontFamily: FONT, color: textColor }}
                                dangerouslySetInnerHTML={{ __html: item.richText }}
                            />
                        </article>

                        {item.videos && item.videos.length > 0 && (
                            <section>
                                <div className="flex items-center gap-4 mb-10 border-b pb-4" style={{ borderColor }}>
                                    <Play size={16} style={{ color: ACCENT_COLOR }} />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
                                        Cinematic Records
                                    </span>
                                </div>
                                <div className="space-y-12">
                                    {item.videos.map((vid, idx) => (
                                        <div key={idx} className="relative aspect-video rounded-[24px] overflow-hidden border shadow-xl bg-zinc-900" style={{ borderColor }}>
                                            <iframe 
                                                src={getYouTubeEmbedUrl(vid)}
                                                className="absolute inset-0 w-full h-full"
                                                allowFullScreen
                                                title={`${item.title} Video ${idx + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-10 flex flex-col gap-16">
                            
                            {item.gallery && item.gallery.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor }}>
                                        <ImageIcon size={14} style={{ color: ACCENT_COLOR }} />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
                                            Visual Archive
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {item.gallery.map((img, idx) => (
                                            <div key={idx} className="rounded-[20px] overflow-hidden border bg-zinc-900" style={{ borderColor }}>
                                                <img 
                                                    src={img} 
                                                    alt={`${item.title} Archive ${idx + 1}`}
                                                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {(relatedArticle || relatedThread) && (
                                <section className="p-8 rounded-[24px] border" style={{ borderColor, backgroundColor: cardBg }}>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border-b pb-4" style={{ fontFamily: MONO, color: textColor, borderColor }}>
                                        Deepen Your Knowledge
                                    </h3>
                                    
                                    <div className="flex flex-col gap-6">
                                        {relatedArticle && (
                                            <Link to={`/articles/${relatedArticle.slug}`} className="group flex flex-col gap-2 no-underline">
                                                <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                                    <FileText size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Archive Article</span>
                                                </div>
                                                <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
                                                    {relatedArticle.title}
                                                </h4>
                                            </Link>
                                        )}

                                        {relatedThread && (
                                            <Link to={`/forum/${relatedThread._id}`} className={`group flex flex-col gap-2 no-underline ${relatedArticle ? 'pt-6 border-t' : ''}`} style={{ borderColor }}>
                                                <div className="flex items-center gap-2 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                                    <MessageSquare size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Global Forum</span>
                                                </div>
                                                <h4 className="text-base font-normal leading-snug group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
                                                    {relatedThread.title}
                                                </h4>
                                            </Link>
                                        )}
                                    </div>
                                </section>
                            )}

                        </div>
                    </aside>
                </div>

                <div className="mt-32 pt-10 border-t flex justify-center" style={{ borderColor }}>
                    <Link 
                        to="/legacy" 
                        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:gap-4 hover:text-orange-500"
                        style={{ fontFamily: MONO, color: textColor }}
                    >
                        <ArrowLeft size={14} /> Back to Legacy Archive
                    </Link>
                </div>

            </div>
        </div>
    );
}
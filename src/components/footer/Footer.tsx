// import { useState, useEffect } from 'react';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="bg-black" style={{ 
//       borderTop: '2px solid rgba(255, 215, 0, 0.3)',
//       boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.8)'
//     }}>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="py-12">
//           <a
//             href="/donate"
//             className="block border-2 border-amber-500/60 hover:border-amber-400 px-12 py-8 text-center rounded-lg mb-12 mx-auto max-w-4xl transition-all duration-300 hover:scale-[1.02] hover:bg-amber-500/10 group"
//             style={{ 
//               boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 40px rgba(255, 215, 0, 0.1)'
//             }}
//           >
//             <span className="text-3xl md:text-4xl uppercase tracking-wider font-light group-hover:text-amber-300 transition-colors duration-300" style={{
//               fontFamily: 'Georgia, serif',
//               color: '#FFD700',
//               textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.2)',
//               letterSpacing: '0.1em'
//             }}>
//               KEEP THE LEGACY ALIVE - DONATE
//             </span>
//           </a>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
//             <div>
//               <h3 className="text-xl mb-6 uppercase tracking-wider font-light" style={{
//                 fontFamily: 'Georgia, serif',
//                 color: '#FFD700',
//                 textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
//                 letterSpacing: '0.1em'
//               }}>
//                 Site Map
//               </h3>
//               <ul className="space-y-3" style={{ fontFamily: 'Georgia, serif' }}>
//                 <li>
//                   <a
//                     href="#family"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     Family
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/news"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     News
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/media"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     Media
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/forum"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     Forum
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#links"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     Links
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/about"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#forward"
//                     className="text-white/80 hover:text-amber-300 transition-colors"
//                   >
//                     Forward
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="text-center">
//               <div className="inline-flex items-center gap-3 bg-black/50 px-6 py-4 rounded-lg border-2 border-amber-500/60" style={{ 
//                 boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
//               }}>
//                 <Users size={24} className="text-amber-400" />
//                 <div className="text-left">
//                   <p className="text-amber-400 text-xs uppercase tracking-wider font-light" style={{ fontFamily: 'Georgia, serif' }}>
//                     Moonwalkers Online
//                   </p>
//                   <p className="font-light text-3xl" style={{
//                     fontFamily: 'Georgia, serif',
//                     color: '#FFD700',
//                     textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
//                   }}>{onlineCount}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center md:text-right">
//               <h3 className="text-xl mb-6 uppercase tracking-wider font-light" style={{
//                 fontFamily: 'Georgia, serif',
//                 color: '#FFD700',
//                 textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
//                 letterSpacing: '0.1em'
//               }}>
//                 Connect
//               </h3>
//               <div className="flex justify-center md:justify-end gap-4">
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
//                   style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
//                 >
//                   <Instagram size={20} />
//                 </a>
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
//                   style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
//                 >
//                   <Twitter size={20} />
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
//                   style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
//                 >
//                   <Youtube size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t-2 border-amber-500/30 py-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
//           <p className="text-white/80 mb-2">
//             &copy; 2025 Mary's Moonwalker &bull; www.marys-moonwalker.com
//           </p>
//           <p className="text-amber-400 text-sm mb-2">
//             Made by Mary's Moonwalker a devoted fan since 1988
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }














// import { useState, useEffect } from 'react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="relative bg-black overflow-hidden" style={{ borderTop: '1px solid rgba(255, 215, 0, 0.5)' }}>
//       {/* Content */}
//       <div
//         className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-12"
//         style={{
//           opacity: visible ? 1 : 0,
//           transform: visible ? 'translateY(0)' : 'translateY(16px)',
//           transition: 'opacity 1s ease, transform 1s ease',
//         }}
//       >
//         {/* Donate */}
//         <div className="text-center mb-12">
//           <a href="/donate" className="group inline-flex flex-col items-center gap-3">
//             <span
//               className="text-3xl sm:text-4xl tracking-[0.15em] uppercase font-light"
//               style={{
//                 fontFamily: 'Georgia, serif',
//                 color: '#FFD700',
//                 textShadow: '0 0 30px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,0.9)',
//                 letterSpacing: '0.18em',
//               }}
//             >
//               Keep The Legacy Alive
//             </span>
//             <span
//               className="text-sm tracking-[0.4em] uppercase transition-colors duration-300 group-hover:text-amber-300"
//               style={{ fontFamily: 'Georgia, serif', color: '#FFD700' }}
//             >
//               Donate
//             </span>
//           </a>
//         </div>

//         {/* Nav */}
//         <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-12">
//           <a href="#family" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>Family</a>
//           <a href="/news" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>News</a>
//           <a href="/media" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>Media</a>
//           <a href="/forum" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>Forum</a>
//           <a href="#links" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>Links</a>
//           <a href="/about" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>About</a>
//           <a href="#forward" className="text-sm tracking-[0.3em] uppercase hover:text-amber-300 transition-colors" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}>Forward</a>
//         </nav>

//         {/* Online count */}
//         <p className="text-center text-sm tracking-[0.3em] uppercase mb-12" style={{ fontFamily: 'Georgia, serif', color: '#FFD700' }}>
//           {onlineCount} Moonwalkers Online
//         </p>
//       </div>

//       {/* IMAGE */}
//       <div className="relative w-full" style={{ height: '500px' }}>
//         {/* Fade from black at top */}
//         <div
//           className="absolute inset-x-0 top-0 z-10 pointer-events-none"
//           style={{
//             height: '50%',
//             background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)',
//           }}
//         />
//         {/* Fade to black at bottom */}
//         <div
//           className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
//           style={{
//             height: '40%',
//             background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
//           }}
//         />

//         <img
//           src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1920"
//           alt="The King of Pop"
//           className="w-full h-full object-cover object-center"
//           style={{
//             filter: 'sepia(20%) brightness(0.55) contrast(1.15) saturate(0.9)',
//           }}
//         />

//         {/* Text overlay */}
//         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none">
//           <p
//             className="text-sm tracking-[0.5em] uppercase"
//             style={{ fontFamily: 'Georgia, serif', color: '#FFD700' }}
//           >
//             1958 — 2009
//           </p>
//           <h2
//             className="text-4xl sm:text-6xl tracking-[0.1em] uppercase font-light text-center"
//             style={{
//               fontFamily: 'Georgia, serif',
//               color: '#FFD700',
//               textShadow: '0 0 60px rgba(255,215,0,0.4), 0 2px 8px rgba(0,0,0,0.95)',
//             }}
//           >
//             The King of Pop
//           </h2>
//         </div>

//         {/* Copyright */}
//         <div className="absolute bottom-6 inset-x-0 z-20 text-center pointer-events-none">
//           <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.4)' }}>
//             &copy; 2025 Mary's Moonwalker &bull; www.marys-moonwalker.com
//           </p>
//           <p className="mt-1 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.4)' }}>
//             A Devoted Fan Since 1988
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }





















// import { useState, useEffect } from 'react';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="bg-black relative overflow-hidden" style={{ 
//       borderTop: '2px solid #FFD700',
//       boxShadow: '0 -10px 50px rgba(0, 0, 0, 1)'
//     }}>
//       {/* Decorative Gold Glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

//       <div className="max-w-7xl mx-auto px-6 pt-16 pb-0">
//         {/* Main Action Area */}
//         <div className="flex flex-col items-center mb-16">
//           <a
//             href="/donate"
//             className="group relative overflow-hidden border border-amber-500/40 px-12 py-6 rounded-full transition-all duration-500 hover:scale-105 hover:border-amber-400"
//             style={{ 
//               background: 'linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 100%)',
//               boxShadow: '0 0 30px rgba(255, 215, 0, 0.05)'
//             }}
//           >
//             <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//             <span className="relative text-2xl md:text-3xl uppercase tracking-[0.2em] font-light transition-colors duration-300" style={{
//               fontFamily: 'Georgia, serif',
//               color: '#FFD700',
//               textShadow: '0 0 10px rgba(255,215,0,0.3)',
//             }}>
//               {/* Keep The Legacy Alive */} DONATE
//             </span>
//           </a>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
//           {/* Navigation */}
//           <div className="space-y-6">
//             <h3 className="text-sm uppercase tracking-[0.3em] text-amber-500 font-bold">Navigation</h3>
//             <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
//               {['Family', 'News', 'Media', 'Forum', 'Links', 'About', 'Forward'].map((item) => (
//                 <li key={item}>
//                   <a href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2">
//                     <span className="w-1 h-1 bg-amber-600 rounded-full" /> {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Real-time Counter */}
//           <div className="flex flex-col items-center justify-center py-6 border-x border-white/5">
//             <div className="flex items-center gap-4 group">
//               <div className="relative">
//                 <Users size={32} className="text-amber-500 group-hover:scale-110 transition-transform" />
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Moonwalkers Online</p>
//                 <p className="text-4xl font-light text-white tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>
//                   {onlineCount.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex flex-col md:items-end space-y-6">
//             <h3 className="text-sm uppercase tracking-[0.3em] text-amber-500 font-bold">Connect</h3>
//             <div className="flex gap-4">
//               {[Instagram, Twitter, Youtube].map((Icon, idx) => (
//                 <a
//                   key={idx}
//                   href="#"
//                   className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-500"
//                 >
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* The Grand Finale: Tribute Image */}
//         <div className="relative w-full overflow-hidden mt-10">
//            {/* Gradient Overlay to blend image with black background */}
//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-black" />
//           <img 
//             src="https://i.pinimg.com/736x/7d/97/d1/7d97d16dbec260665d4ea02a6a4aeccb.jpg" 
//             alt="Michael Jackson Tribute"
//             className="w-full h-[300px] md:h-[500px] object-cover object-top opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
//           />
          
//           {/* Final Copyright Bar */}
//           <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black to-transparent pt-20 pb-8 text-center px-4">
//              <p className="text-xs tracking-[0.4em] text-amber-500/80 uppercase mb-2">
//               Mary's Moonwalker &bull; Devoted Since 1988
//             </p>
//             <p className="text-[10px] text-gray-500 uppercase tracking-widest">
//               &copy; {new Date().getFullYear()} www.marys-moonwalker.com
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }






















// import { useState, useEffect } from 'react';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="bg-black relative overflow-hidden" style={{ 
//       borderTop: '1px solid rgba(255, 215, 0, 0.2)',
//       boxShadow: '0 -10px 50px rgba(0, 0, 0, 1)'
//     }}>
//       <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
        
//         {/* Refined Donation Link */}
//         <div className="flex flex-col items-center mb-16">
//           <a
//             href="/your-donation-page-link" // Replace with your actual link
//             className="group flex flex-col items-center transition-all duration-300"
//           >
//             <span className="text-amber-500/80 text-[10px] uppercase tracking-[0.4em] mb-2 group-hover:text-amber-400 transition-colors">
//               Support The Site
//             </span>
//             <span className="text-xl md:text-2xl font-light italic text-white/90 group-hover:text-white transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
//               "Donate if you love what we are doing"
//             </span>
//             <div className="w-12 h-px bg-amber-500/30 mt-4 group-hover:w-24 group-hover:bg-amber-500 transition-all duration-500" />
//           </a>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
//           {/* Navigation */}
//           <div className="space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Explore</h3>
//             <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
//               {['Family', 'News', 'Media', 'Forum', 'Links', 'About', 'Forward'].map((item) => (
//                 <li key={item}>
//                   <a href={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-amber-400 transition-colors duration-300">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Real-time Counter */}
//           <div className="flex flex-col items-center justify-center py-4">
//             <div className="flex items-center gap-3">
//               <Users size={20} className="text-amber-600" />
//               <div className="text-left">
//                 <p className="text-[9px] uppercase tracking-widest text-gray-500">Moonwalkers Online</p>
//                 <p className="text-2xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
//                   {onlineCount}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex flex-col md:items-end space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Connect</h3>
//             <div className="flex gap-3">
//               {[Instagram, Twitter, Youtube].map((Icon, idx) => (
//                 <a
//                   key={idx}
//                   href="#"
//                   className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
//                 >
//                   <Icon size={18} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tribute Image Section */}
//         <div className="relative w-full overflow-hidden mt-10">
//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black" />
//           <img 
//             src="https://i.pinimg.com/1200x/b8/ef/d4/b8efd496ffb93dc19c2d15bfc6e51c0a.jpg" 
//             alt="Michael Jackson Tribute"
//             className="w-full h-[250px] md:h-[400px] object-cover object-top opacity-40 grayscale"
//           />
          
//           <div className="absolute bottom-0 left-0 w-full z-20 pb-8 text-center px-4">
//              <p className="text-[9px] tracking-[0.5em] text-amber-600/60 uppercase mb-2">
//               Mary's Moonwalker &bull; Devoted Since 1988
//             </p>
//             <p className="text-[10px] text-gray-600 uppercase tracking-widest">
//               &copy; {new Date().getFullYear()} Mary's Moonwalker
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="bg-black relative overflow-hidden" style={{ 
//       borderTop: '1px solid rgba(255, 215, 0, 0.2)',
//       boxShadow: '0 -10px 50px rgba(0, 0, 0, 1)'
//     }}>
//       <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
        
//         {/* Donation Link - Points to /donate */}
//         <div className="flex flex-col items-center mb-16">
//           <Link
//             to="/donate" 
//             className="group flex flex-col items-center transition-all duration-300"
//           >
//             <span className="text-amber-500/80 text-[10px] uppercase tracking-[0.4em] mb-2 group-hover:text-amber-400 transition-colors">
//               Support The Site
//             </span>
//             <span className="text-xl md:text-2xl font-light italic text-white/90 group-hover:text-white transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
//               "Donate if you love what we are doing"
//             </span>
//             <div className="w-12 h-px bg-amber-500/30 mt-4 group-hover:w-24 group-hover:bg-amber-500 transition-all duration-500" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
//           {/* Navigation - Automatically generates /about, /news, etc. */}
//           <div className="space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Explore</h3>
//             <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
//               {['Family', 'Articles', 'Media', 'Forum', 'About', 'Forward'].map((item) => (
//                 <li key={item}>
//                   <Link 
//                     to={`/${item.toLowerCase()}`} 
//                     className="text-gray-500 hover:text-amber-400 transition-colors duration-300"
//                   >
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Real-time Counter */}
//           <div className="flex flex-col items-center justify-center py-4">
//             <div className="flex items-center gap-3">
//               <Users size={20} className="text-amber-600" />
//               <div className="text-left">
//                 <p className="text-[9px] uppercase tracking-widest text-gray-500">Moonwalkers Online</p>
//                 <p className="text-2xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
//                   {onlineCount}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex flex-col md:items-end space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Connect</h3>
//             <div className="flex gap-3">
//               <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Instagram size={18} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Twitter size={18} />
//               </a>
//               <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Youtube size={18} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Tribute Image Section */}
//         <div className="relative w-full overflow-hidden mt-10">
//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black" />
//           <img 
//             src="https://i.pinimg.com/1200x/b8/ef/d4/b8efd496ffb93dc19c2d15bfc6e51c0a.jpg" 
//             alt="Michael Jackson Tribute"
//             className="w-full h-[250px] md:h-[400px] object-cover object-top opacity-40 grayscale"
//           />
          
//           <div className="absolute bottom-0 left-0 w-full z-20 pb-8 text-center px-4">
//              <p className="text-[9px] tracking-[0.5em] text-amber-600/60 uppercase mb-2">
//               Mary's Moonwalker &bull; Devoted Since 1988
//             </p>
//             <p className="text-[10px] text-gray-600 uppercase tracking-widest">
//               &copy; {new Date().getFullYear()} Mary's Moonwalker
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="bg-black relative overflow-hidden" style={{ 
//       borderTop: '1px solid rgba(255, 215, 0, 0.2)',
//       boxShadow: '0 -10px 50px rgba(0, 0, 0, 1)'
//     }}>
//       <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">
          
//           {/* Navigation - Individual React Links */}
//           <div className="space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Explore</h3>
//             <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
//               <li>
//                 <Link to="/family" className="text-gray-500 hover:text-amber-400 transition-colors">Family</Link>
//               </li>
//               <li>
//                 <Link to="/news" className="text-gray-500 hover:text-amber-400 transition-colors">News</Link>
//               </li>
//               <li>
//                 <Link to="/media" className="text-gray-500 hover:text-amber-400 transition-colors">Media</Link>
//               </li>
//               <li>
//                 <Link to="/forum" className="text-gray-500 hover:text-amber-400 transition-colors">Forum</Link>
//               </li>
//               <li>
//                 <Link to="/links" className="text-gray-500 hover:text-amber-400 transition-colors">Links</Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-500 hover:text-amber-400 transition-colors">About</Link>
//               </li>
//               <li>
//                 <Link to="/forward" className="text-gray-500 hover:text-amber-400 transition-colors">Forward</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Real-time Counter */}
//           <div className="flex flex-col items-center justify-center py-4">
//             <div className="flex items-center gap-3">
//               <Users size={20} className="text-amber-600" />
//               <div className="text-left">
//                 <p className="text-[9px] uppercase tracking-widest text-gray-500">Moonwalkers Online</p>
//                 <p className="text-2xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
//                   {onlineCount}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Socials - We use <a> here because these are external sites */}
//           <div className="flex flex-col md:items-end space-y-6">
//             <h3 className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Connect</h3>
//             <div className="flex gap-3">
//               <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Instagram size={18} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Twitter size={18} />
//               </a>
//               <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-300">
//                 <Youtube size={18} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Tribute Image Section */}
//         <div className="relative w-full overflow-hidden mt-10">
//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-black" />
//           <img 
//             src="https://i.pinimg.com/1200x/c9/2f/7a/c92f7a7bdb2c06ca07d61f311a7dfd33.jpg" 
//             alt="Michael Jackson Tribute"
//             className="w-full h-[250px] md:h-[400px] object-cover object-top opacity-40 grayscale"
//           />
          
//           <div className="absolute bottom-0 left-0 w-full z-20 pb-8 text-center px-4">
//              <p className="text-[9px] tracking-[0.5em] text-amber-600/60 uppercase mb-2">
//               Mary's Moonwalker &bull; Devoted Since 1988
//             </p>
//             <p className="text-[10px] text-gray-600 uppercase tracking-widest">
//               &copy; {new Date().getFullYear()} Mary's Moonwalker
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

// export default function Footer() {
//   const [onlineCount, setOnlineCount] = useState(42);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer
//       className="bg-black relative overflow-hidden"
//       style={{
//         borderTop: '1px solid rgba(255, 215, 0, 0.25)',
//         boxShadow: '0 -10px 60px rgba(0, 0, 0, 1)'
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20">

//           {/* Navigation */}
//           <div className="space-y-6">
//             <h3 className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
//               Explore
//             </h3>

//             <ul
//               className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm"
//               style={{ fontFamily: 'Georgia, serif' }}
//             >
//               <li>
//                 <Link to="/family" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   Family
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/news" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   News
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/media" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   Media
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/forum" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   Forum
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/links" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   Links
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/forward" className="text-gray-300 font-medium hover:text-amber-400 transition-colors">
//                   Forward
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Online Counter */}
//           <div className="flex flex-col items-center justify-center py-4">
//             <div className="flex items-center gap-3">
//               <Users size={20} className="text-amber-400" />
//               <div className="text-left">
//                 <p className="text-xs uppercase tracking-widest text-gray-300 font-medium">
//                   Moonwalkers Online
//                 </p>
//                 <p className="text-3xl font-semibold text-white">
//                   {onlineCount}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Socials */}
//           <div className="flex flex-col md:items-end space-y-6">
//             <h3 className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
//               Connect
//             </h3>

//             <div className="flex gap-3">
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
//               >
//                 <Instagram size={18} />
//               </a>

//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
//               >
//                 <Twitter size={18} />
//               </a>

//               <a
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
//               >
//                 <Youtube size={18} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Tribute Section */}
//         <div className="relative w-full overflow-hidden mt-10">

//           <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-black" />

//           <img
//             src="https://i.pinimg.com/1200x/c9/2f/7a/c92f7a7bdb2c06ca07d61f311a7dfd33.jpg"
//             alt="Michael Jackson Tribute"
//             className="w-full h-[250px] md:h-[400px] object-cover object-top opacity-40 grayscale"
//           />

//           <div className="absolute bottom-0 left-0 w-full z-20 pb-8 text-center px-4">

//             <p className="text-xs tracking-[0.3em] text-amber-400 uppercase mb-2 font-medium">
//               Mary's Moonwalker • Devoted Since 1988
//             </p>

//             <p className="text-sm text-gray-300 uppercase tracking-widest">
//               &copy; {new Date().getFullYear()} Mary's Moonwalker
//             </p>

//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }

























// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Youtube, ArrowRight, Heart, Mail } from 'lucide-react';

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

// // ─── Custom X (Twitter) Icon ──────────────────────────────────────────────────

// function XIcon({ size = 18 }: { size?: number }) {
//     return (
//         <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//         </svg>
//     );
// }

// // ─── Main Footer Component ────────────────────────────────────────────────────

// export default function Footer() {
//     const isDark = useTheme();
//     const bg = isDark ? '#050505' : '#F0F0F0';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const mutedText = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     return (
//         <footer className="relative transition-colors duration-500 pt-20 pb-0 overflow-hidden" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b" style={{ borderColor }}>
                    
//                     {/* COLUMN 1: Newsletter & Donation (Span 5) */}
//                     <div className="md:col-span-5 flex flex-col gap-12">
                        
//                         {/* Newsletter Subscribe */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Stay Connected
//                             </span>
//                             <h3 className="text-xl md:text-2xl font-normal mb-3" style={{ color: textColor, fontFamily: FONT }}>
//                                 The Archival Newsletter
//                             </h3>
//                             <p className="text-sm leading-relaxed mb-6" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Join our global mailing list to receive exclusive historical deep-dives, rare media updates, and community news.
//                             </p>
//                             <form className="relative flex items-center w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
//                                 <input 
//                                     type="email" 
//                                     placeholder="ENTER YOUR EMAIL..." 
//                                     className="w-full bg-transparent border-b py-3 pl-0 pr-10 focus:outline-none text-[10px] uppercase tracking-widest transition-colors"
//                                     style={{ borderColor, color: textColor, fontFamily: MONO }}
//                                 />
//                                 <button type="submit" className="absolute right-0 opacity-50 hover:opacity-100 hover:text-orange-500 transition-all">
//                                     <ArrowRight size={16} />
//                                 </button>
//                             </form>
//                         </div>

//                         {/* Donation Section */}
//                         <div className="bg-zinc-900/50 p-6 md:p-8 rounded-[20px] border" style={{ borderColor, backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Support The Legacy
//                             </span>
//                             <p className="text-sm leading-relaxed mb-6" style={{ color: textColor, fontFamily: FONT }}>
//                                 Maintaining this archive requires dedicated resources. <strong style={{ color: ACCENT_COLOR, fontWeight: 'normal' }}>50% of all contributions are directly donated to global charities</strong> continuing Michael's humanitarian mission.
//                             </p>
//                             <Link to="/donate" className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-orange-500 hover:text-black hover:border-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
//                                 <Heart size={14} /> Make a Donation
//                             </Link>
//                         </div>

//                     </div>

//                     {/* COLUMN 2: Directory (Span 3) */}
//                     <div className="md:col-span-3 flex flex-col">
//                         <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-6" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                             Directory
//                         </span>
//                         <ul className="flex flex-col gap-4 text-base" style={{ fontFamily: FONT }}>
//                             {[
//                                 { name: 'The Legacy', path: '/legacy' },
//                                 { name: 'Articles & Stories', path: '/articles' },
//                                 { name: 'Media Archive', path: '/media' },
//                                 { name: 'Community Forum', path: '/forum' },
//                                 { name: 'Useful Links', path: '/links' },
//                                 { name: 'About the Project', path: '/about' },
//                             ].map((link) => (
//                                 <li key={link.name}>
//                                     <Link to={link.path} className="transition-colors hover:text-orange-500 inline-block" style={{ color: textColor }}>
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* COLUMN 3: Enquiries & Socials (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col justify-between gap-12">
                        
//                         {/* Quick Enquiries */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Get in Touch
//                             </span>
//                             <h3 className="text-xl md:text-2xl font-normal mb-3" style={{ color: textColor, fontFamily: FONT }}>
//                                 Direct Enquiries
//                             </h3>
//                             <p className="text-sm leading-relaxed mb-6" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Have a question, a rare piece of media to share, or a story to tell? Our team is always listening.
//                             </p>
//                             <Link to="/contact" className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-orange-500 hover:text-black hover:border-orange-500" style={{ borderColor, color: textColor, fontFamily: MONO }}>
//                                 <Mail size={14} /> Send a Message
//                             </Link>
//                         </div>

//                         {/* Social Links */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Official Channels
//                             </span>
//                             <div className="flex gap-4">
//                                 {[
//                                     { icon: <Instagram size={16} />, url: 'https://instagram.com' },
//                                     { icon: <XIcon size={14} />, url: 'https://twitter.com' },
//                                     { icon: <Youtube size={16} />, url: 'https://youtube.com' }
//                                 ].map((social, idx) => (
//                                     <a 
//                                         key={idx}
//                                         href={social.url} 
//                                         target="_blank" 
//                                         rel="noreferrer"
//                                         className="w-10 h-10 flex items-center justify-center rounded-full border transition-all hover:border-orange-500 hover:text-orange-500"
//                                         style={{ borderColor, color: mutedText }}
//                                     >
//                                         {social.icon}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* Bottom Section: Tribute Image & Copyright */}
//                 <div className="relative w-full overflow-hidden mt-12 mb-6 rounded-[24px]" style={{ border: `1px solid ${borderColor}` }}>
                    
//                     {/* Gradient Overlay to fade the image */}
//                     <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-black/20" />
                    
//                     {/* Tribute Image (Landscape) */}
//                     <img
//                         src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
//                         alt="Michael Jackson Tribute"
//                         className="w-full h-[250px] md:h-[350px] object-cover object-top opacity-50 grayscale"
//                     />

//                     {/* Copyright Content layered on top */}
//                     <div className="absolute bottom-0 left-0 w-full z-20 pb-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//                         <div>
//                             <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-bold" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Mary's Moonwalker
//                             </p>
//                             <p className="text-xs uppercase tracking-widest text-white/50" style={{ fontFamily: MONO }}>
//                                 Devoted Since 1988
//                             </p>
//                         </div>
                        
//                         <p className="text-[10px] text-white/40 uppercase tracking-widest" style={{ fontFamily: MONO }}>
//                             &copy; {new Date().getFullYear()} All Rights Reserved
//                         </p>
//                     </div>
//                 </div>

//             </div>
//         </footer>
//     );
// }

















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Youtube, ArrowRight, Heart, Mail } from 'lucide-react';

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

// // ─── Custom X (Twitter) Icon ──────────────────────────────────────────────────

// function XIcon({ size = 18 }: { size?: number }) {
//     return (
//         <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//         </svg>
//     );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function Footer() {
//     const isDark = useTheme();
//     // The footer is always dark mode oriented because it sits over a darkened image
//     const textColor = '#FFFFFF'; 
//     const mutedText = 'rgba(255,255,255,0.6)';
//     const borderColor = 'rgba(255,255,255,0.15)';

//     return (
//         <footer className="relative w-full min-h-[800px] md:min-h-[900px] flex flex-col justify-end mt-20">
            
//             {/* 1. The Prominent Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <img
//                     src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
//                     alt="Michael Jackson Tribute"
//                     className="w-full h-full object-cover object-top grayscale opacity-90"
//                 />
//                 {/* Cinematic Gradient: Clear at the top, pitch black at the bottom */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
//             </div>

//             {/* 2. The Content Layer */}
//             <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 pt-40">
                
//                 {/* Massive Watermark/Title */}
//                 <h2 
//                     className="text-5xl md:text-[7vw] leading-none mb-16 md:mb-24 opacity-90"
//                     style={{ color: textColor, fontFamily: FONT }}
//                 >
//                     Mary's Moonwalker
//                 </h2>

//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b" style={{ borderColor }}>
                    
//                     {/* COLUMN 1: Newsletter & Directory (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col justify-between gap-12">
//                         {/* Directory */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-5" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 The Archive
//                             </span>
//                             <ul className="flex flex-col gap-3 text-sm md:text-base" style={{ fontFamily: FONT }}>
//                                 {[
//                                     { name: 'The Legacy Timeline', path: '/legacy' },
//                                     { name: 'Articles & Narratives', path: '/articles' },
//                                     { name: 'Rare Media Vault', path: '/media' },
//                                     { name: 'Global Forum', path: '/forum' },
//                                     { name: 'About This Project', path: '/about' },
//                                 ].map((link) => (
//                                     <li key={link.name}>
//                                         <Link to={link.path} className="transition-colors hover:text-orange-500 text-white/80 hover:text-white">
//                                             {link.name}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Newsletter */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Stay Connected
//                             </span>
//                             <p className="text-xs leading-relaxed mb-4" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Join our mailing list for exclusive archival deep-dives.
//                             </p>
//                             <form className="relative flex items-center w-full max-w-xs group" onSubmit={(e) => e.preventDefault()}>
//                                 <input 
//                                     type="email" 
//                                     placeholder="ENTER YOUR EMAIL" 
//                                     className="w-full bg-transparent border-b py-2 pl-0 pr-8 focus:outline-none text-[10px] uppercase tracking-widest transition-colors focus:border-orange-500"
//                                     style={{ borderColor, color: textColor, fontFamily: MONO }}
//                                 />
//                                 <button type="submit" className="absolute right-0 text-white/40 group-hover:text-orange-500 transition-colors">
//                                     <ArrowRight size={14} />
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     {/* COLUMN 2: Charity/Donation (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col">
//                         <div className="h-full p-8 rounded-[20px] border flex flex-col justify-between backdrop-blur-sm" style={{ borderColor: 'rgba(255, 140, 0, 0.3)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
//                             <div>
//                                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                     Support The Legacy
//                                 </span>
//                                 <h3 className="text-xl font-normal mb-3 leading-snug text-white" style={{ fontFamily: FONT }}>
//                                     Heal The World
//                                 </h3>
//                                 <p className="text-sm leading-relaxed mb-6 text-white/70" style={{ fontFamily: FONT }}>
//                                     Maintaining this digital tribute requires dedicated resources. To honor Michael's humanitarian mission, <span className="text-white font-bold">50% of all contributions are donated directly to global children's charities.</span>
//                                 </p>
//                             </div>
//                             <Link 
//                                 to="/donate" 
//                                 className="inline-flex items-center justify-center gap-3 w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all bg-orange-500 text-black hover:bg-orange-400" 
//                                 style={{ fontFamily: MONO }}
//                             >
//                                 <Heart size={14} fill="currentColor" /> Make a Donation
//                             </Link>
//                         </div>
//                     </div>

//                     {/* COLUMN 3: Enquiries & Socials (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col justify-between gap-12 lg:pl-10">
//                         {/* Enquiries */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Direct Enquiries
//                             </span>
//                             <p className="text-sm leading-relaxed mb-5" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Have a question, a rare piece of media to share, or a story to tell? Our team is always listening.
//                             </p>
//                             <Link 
//                                 to="/contact" 
//                                 className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:border-white" 
//                                 style={{ borderColor, color: textColor, fontFamily: MONO }}
//                             >
//                                 <Mail size={14} /> Send a Message
//                             </Link>
//                         </div>

//                         {/* Socials */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Official Channels
//                             </span>
//                             <div className="flex gap-4">
//                                 {[
//                                     { icon: <Instagram size={18} />, url: 'https://instagram.com' },
//                                     { icon: <XIcon size={16} />, url: 'https://twitter.com' },
//                                     { icon: <Youtube size={18} />, url: 'https://youtube.com' }
//                                 ].map((social, idx) => (
//                                     <a 
//                                         key={idx}
//                                         href={social.url} 
//                                         target="_blank" 
//                                         rel="noreferrer"
//                                         className="w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all hover:border-orange-500 hover:text-orange-500 text-white"
//                                         style={{ borderColor }}
//                                     >
//                                         {social.icon}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Bottom Sign-off */}
//                 <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//                     <p className="text-[10px] uppercase tracking-widest text-white/50" style={{ fontFamily: MONO }}>
//                         Devoted Since 1988
//                     </p>
//                     <p className="text-[10px] uppercase tracking-widest text-white/30" style={{ fontFamily: MONO }}>
//                         &copy; {new Date().getFullYear()} Mary's Moonwalker. All Rights Reserved.
//                     </p>
//                 </div>

//             </div>
//         </footer>
//     );
// }





















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Instagram, Youtube, ArrowRight, Globe, Mail } from 'lucide-react';

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

// // ─── Custom X (Twitter) Icon ──────────────────────────────────────────────────

// function XIcon({ size = 18 }: { size?: number }) {
//     return (
//         <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
//             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//         </svg>
//     );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function Footer() {
//     const isDark = useTheme();
//     // The footer is always dark mode oriented because it sits over a darkened image
//     const textColor = '#FFFFFF'; 
//     const mutedText = 'rgba(255,255,255,0.6)';
//     const borderColor = 'rgba(255,255,255,0.15)';

//     return (
//         <footer className="relative w-full min-h-[800px] md:min-h-[900px] flex flex-col justify-end mt-20">
            
//             {/* 1. The Prominent Background Image */}
//             <div className="absolute inset-0 z-0">
//                 <img
//                     src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
//                     alt="Michael Jackson Tribute"
//                     className="w-full h-full object-cover object-top grayscale opacity-90"
//                 />
//                 {/* Cinematic Gradient: Clear at the top, pitch black at the bottom */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
//             </div>

//             {/* 2. The Content Layer */}
//             <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 pt-40">
                
//                 {/* Massive Watermark/Title */}
//                 <h2 
//                     className="text-5xl md:text-[7vw] leading-none mb-16 md:mb-24 opacity-90"
//                     style={{ color: textColor, fontFamily: FONT }}
//                 >
//                     Mary's Moonwalker
//                 </h2>

//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b" style={{ borderColor }}>
                    
//                     {/* COLUMN 1: Newsletter & Directory (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col justify-between gap-12">
//                         {/* Directory */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-5" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 The Archive
//                             </span>
//                             <ul className="flex flex-col gap-3 text-sm md:text-base" style={{ fontFamily: FONT }}>
//                                 {[
//                                     { name: 'The Legacy Timeline', path: '/legacy' },
//                                     { name: 'Articles & Narratives', path: '/articles' },
//                                     { name: 'Rare Media Vault', path: '/media' },
//                                     { name: 'Global Forum', path: '/forum' },
//                                     { name: 'About This Project', path: '/about' },
//                                 ].map((link) => (
//                                     <li key={link.name}>
//                                         <Link to={link.path} className="transition-colors hover:text-orange-500 text-white/80 hover:text-white">
//                                             {link.name}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Newsletter */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Stay Connected
//                             </span>
//                             <p className="text-xs leading-relaxed mb-4" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Join our mailing list for exclusive archival deep-dives.
//                             </p>
//                             <form className="relative flex items-center w-full max-w-xs group" onSubmit={(e) => e.preventDefault()}>
//                                 <input 
//                                     type="email" 
//                                     placeholder="ENTER YOUR EMAIL" 
//                                     className="w-full bg-transparent border-b py-2 pl-0 pr-8 focus:outline-none text-[10px] uppercase tracking-widest transition-colors focus:border-orange-500"
//                                     style={{ borderColor, color: textColor, fontFamily: MONO }}
//                                 />
//                                 <button type="submit" className="absolute right-0 text-white/40 group-hover:text-orange-500 transition-colors">
//                                     <ArrowRight size={14} />
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     {/* COLUMN 2: Charity/Donation (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col">
//                         <div className="h-full p-8 rounded-[20px] border flex flex-col justify-between backdrop-blur-sm" style={{ borderColor: 'rgba(255, 140, 0, 0.3)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
//                             <div>
//                                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                     Support The Legacy
//                                 </span>
//                                 <h3 className="text-xl font-normal mb-3 leading-snug text-white" style={{ fontFamily: FONT }}>
//                                     Heal The World
//                                 </h3>
//                                 <p className="text-sm leading-relaxed mb-6 text-white/70" style={{ fontFamily: FONT }}>
//                                     Maintaining this digital tribute requires dedicated resources. To honor Michael's humanitarian mission, <span className="text-white font-bold">50% of all contributions are donated directly to global children's charities.</span>
//                                 </p>
//                             </div>
//                             <Link 
//                                 to="/donate" 
//                                 className="inline-flex items-center justify-center gap-3 w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all bg-orange-500 text-black hover:bg-orange-400" 
//                                 style={{ fontFamily: MONO }}
//                             >
//                                 <Globe size={14} strokeWidth={2} /> Make a Donation
//                             </Link>
//                         </div>
//                     </div>

//                     {/* COLUMN 3: Enquiries & Socials (Span 4) */}
//                     <div className="md:col-span-4 flex flex-col justify-between gap-12 lg:pl-10">
//                         {/* Enquiries */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Direct Enquiries
//                             </span>
//                             <p className="text-sm leading-relaxed mb-5" style={{ color: mutedText, fontFamily: FONT }}>
//                                 Have a question, a rare piece of media to share, or a story to tell? Our team is always listening.
//                             </p>
//                             <Link 
//                                 to="/contact" 
//                                 className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:border-white" 
//                                 style={{ borderColor, color: textColor, fontFamily: MONO }}
//                             >
//                                 <Mail size={14} /> Send a Message
//                             </Link>
//                         </div>

//                         {/* Socials */}
//                         <div>
//                             <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                 Official Channels
//                             </span>
//                             <div className="flex gap-4">
//                                 {[
//                                     { icon: <Instagram size={18} />, url: 'https://instagram.com' },
//                                     { icon: <XIcon size={16} />, url: 'https://twitter.com' },
//                                     { icon: <Youtube size={18} />, url: 'https://youtube.com' }
//                                 ].map((social, idx) => (
//                                     <a 
//                                         key={idx}
//                                         href={social.url} 
//                                         target="_blank" 
//                                         rel="noreferrer"
//                                         className="w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all hover:border-orange-500 hover:text-orange-500 text-white"
//                                         style={{ borderColor }}
//                                     >
//                                         {social.icon}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Bottom Sign-off */}
//                 <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//                     <p className="text-[10px] uppercase tracking-widest text-white/50" style={{ fontFamily: MONO }}>
//                         Devoted Since 1988
//                     </p>
//                     <p className="text-[10px] uppercase tracking-widest text-white/30" style={{ fontFamily: MONO }}>
//                         &copy; {new Date().getFullYear()} Mary's Moonwalker. All Rights Reserved.
//                     </p>
//                 </div>

//             </div>
//         </footer>
//     );
// }





















import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowRight, Globe, Mail } from 'lucide-react';

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

// ─── Custom X (Twitter) Icon ──────────────────────────────────────────────────

function XIcon({ size = 18 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
    const isDark = useTheme();
    // The footer is always dark mode oriented because it sits over a darkened image
    const textColor = '#FFFFFF'; 
    const mutedText = 'rgba(255,255,255,0.6)';
    const borderColor = 'rgba(255,255,255,0.15)';

    return (
        <footer className="relative w-full min-h-[800px] md:min-h-[900px] flex flex-col justify-end mt-20">
            
            {/* 1. The Prominent Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
                    alt="Michael Jackson Tribute"
                    className="w-full h-full object-cover object-top grayscale opacity-90"
                />
                {/* Cinematic Gradient: Clear at the top, pitch black at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
            </div>

            {/* 2. The Content Layer */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 pt-40">
                
                {/* Massive Watermark/Title */}
                <h2 
                    className="text-5xl md:text-[7vw] leading-none mb-16 md:mb-24 opacity-90"
                    style={{ color: textColor, fontFamily: FONT }}
                >
                    Mary's Moonwalker
                </h2>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b" style={{ borderColor }}>
                    
                    {/* COLUMN 1: Newsletter & Directory (Span 4) */}
                    <div className="md:col-span-4 flex flex-col justify-between gap-12">
                        {/* Directory */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-5" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                The Archive
                            </span>
                            <ul className="flex flex-col gap-3 text-sm md:text-base" style={{ fontFamily: FONT }}>
                                {[
                                    { name: 'The Legacy Timeline', path: '/legacy' },
                                    { name: 'Articles & Narratives', path: '/articles' },
                                    { name: 'Rare Media Vault', path: '/media' },
                                    { name: 'Global Forum', path: '/forum' },
                                    { name: 'About This Project', path: '/about' },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="transition-colors hover:text-orange-500 text-white/80 hover:text-white">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Stay Connected
                            </span>
                            <p className="text-xs leading-relaxed mb-4" style={{ color: mutedText, fontFamily: FONT }}>
                                Join our mailing list for exclusive archival deep-dives.
                            </p>
                            <form className="relative flex items-center w-full max-w-xs group" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="ENTER YOUR EMAIL" 
                                    className="w-full bg-transparent border-b py-2 pl-0 pr-8 focus:outline-none text-[10px] uppercase tracking-widest transition-colors focus:border-orange-500"
                                    style={{ borderColor, color: textColor, fontFamily: MONO }}
                                />
                                <button type="submit" className="absolute right-0 text-white/40 group-hover:text-orange-500 transition-colors">
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* COLUMN 2: Charity/Donation (Span 4) */}
                    <div className="md:col-span-4 flex flex-col">
                        <div className="h-full p-8 rounded-[20px] border flex flex-col justify-between backdrop-blur-sm" style={{ borderColor: 'rgba(255, 140, 0, 0.3)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                    Support The Legacy
                                </span>
                                <h3 className="text-xl font-normal mb-3 leading-snug text-white" style={{ fontFamily: FONT }}>
                                    Heal The World
                                </h3>
                                <p className="text-sm leading-relaxed mb-6 text-white/70" style={{ fontFamily: FONT }}>
                                    Maintaining this digital tribute requires dedicated resources. To honor Michael's humanitarian mission, <span className="text-white font-bold">50% of all contributions are donated directly to global children's charities.</span>
                                </p>
                            </div>
                            <Link 
                                to="/donate" 
                                className="inline-flex items-center justify-center gap-3 w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all bg-orange-500 text-black hover:bg-orange-400" 
                                style={{ fontFamily: MONO }}
                            >
                                <Globe size={14} strokeWidth={2} /> Make a Donation
                            </Link>
                        </div>
                    </div>

                    {/* COLUMN 3: Enquiries & Socials (Span 4) */}
                    <div className="md:col-span-4 flex flex-col justify-between gap-12 lg:pl-10">
                        {/* Enquiries */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Direct Enquiries
                            </span>
                            <p className="text-sm leading-relaxed mb-5" style={{ color: mutedText, fontFamily: FONT }}>
                                Have a question, a rare piece of media to share, or a story to tell? Our team is always listening.
                            </p>
                            {/* FIXED: Removed inline text color so Tailwind's hover:text-black can work */}
                            <Link 
                                to="/contact" 
                                className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all text-white hover:bg-white hover:text-black hover:border-white" 
                                style={{ borderColor, fontFamily: MONO }}
                            >
                                <Mail size={14} /> Send a Message
                            </Link>
                        </div>

                        {/* Socials */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Official Channels
                            </span>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={18} />, url: 'https://instagram.com' },
                                    { icon: <XIcon size={16} />, url: 'https://twitter.com' },
                                    { icon: <Youtube size={18} />, url: 'https://youtube.com' }
                                ].map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all hover:border-orange-500 hover:text-orange-500 text-white"
                                        style={{ borderColor }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Sign-off */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-[10px] uppercase tracking-widest text-white/50" style={{ fontFamily: MONO }}>
                        Devoted Since 1988
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-white/30" style={{ fontFamily: MONO }}>
                        &copy; {new Date().getFullYear()} Mary's Moonwalker. All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
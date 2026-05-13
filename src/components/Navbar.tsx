// import { useState, useEffect, useRef } from 'react';
// import { User, Menu, X, ChevronDown, LogOut } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface NavItem {
//   label: string;
//   href: string;
//   children?: { label: string; href: string }[];
// }

// const navItems: NavItem[] = [
//   {
//     label: 'Legacy',
//     href: '/legacy/thriller',
//     children: [
//       { label: 'Thriller', href: '/legacy/thriller' },
//       { label: 'Moonwalk', href: '/legacy/moonwalk' },
//       { label: 'Tours', href: '/legacy/dangerous-tour' },
//       { label: 'Billie Jean', href: '/legacy/billie-jean' },
//       { label: 'The World', href: '/legacy/we-are-the-world' },
//       { label: 'Bad', href: '/legacy/bad-album' },
//     ],
//   },
//   {
//     label: 'Family Tree',
//     href: '/family',
//     children: [
//       { label: 'Michael Jackson', href: '/family/michael' },
//       { label: 'Janet Jackson', href: '/family/janet' },
//       { label: 'Jaafar Jackson', href: '/family/jaafar' },
//       { label: 'The Jackson 5', href: '/family/jackson-5' },
//     ],
//   },
//   {
//     label: 'Media',
//     href: '/media',
//     children: [
//       { label: 'Articles', href: '/articles' },
//       { label: 'Music, Podcasts', href: '/audio' },
//       { label: 'Music Videos, Concerts', href: '/videos' },
//     ],
//   },
//   { label: 'News', href: '/articles' },
//   { label: 'Forums', href: '/forum' },
// ];

// export default function Navbar() {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [mobilExpanded, setMobileExpanded] = useState<string | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [mobileOpen]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleMouseEnter = (label: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveDropdown(label);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
//   };

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//     setMobileOpen(false);
//   };

//   return (
//     <>
//       <nav
//         className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
//         style={{
//           background: scrolled
//             ? 'rgba(0, 0, 0, 0.95)'
//             : 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
//           backdropFilter: scrolled ? 'blur(16px)' : 'none',
//           borderBottom: scrolled ? '1px solid rgba(255, 215, 0, 0.15)' : 'none',
//           boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">

//           <Link
//             to="/"
//             className="flex items-center gap-3 group shrink-0"
//             style={{ textDecoration: 'none' }}
//           >
//             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
//               <img
//                 src="https://i.pinimg.com/1200x/6a/9f/01/6a9f01bc9359ff96f64da7e08ddede99.jpg"
//                 alt="Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="flex flex-col leading-none">
//               <span
//                 className="text-base md:text-lg font-light tracking-widest group-hover:text-amber-300 transition-colors duration-300"
//                 style={{
//                   fontFamily: 'Georgia, serif',
//                   background: 'linear-gradient(to right, #FFD700, #FFA500)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                   filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.4))',
//                 }}
//               >
//                 MARY'S MOONWALKER
//               </span>
//               <span
//                 className="text-[9px] md:text-[10px] tracking-[0.3em] font-bold"
//                 style={{
//                   fontFamily: 'Georgia, serif',
//                   color: 'rgba(255,255,255,0.7)', // Brighter gray
//                   letterSpacing: '0.3em',
//                 }}
//               >
//                 {/* THE KING'S ARCHIVE */}
//               </span>
//             </div>
//           </Link>

//           <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
//             {navItems.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative"
//                 onMouseEnter={() => item.children && handleMouseEnter(item.label)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Link
//                   to={item.href}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300 group"
//                   style={{
//                     fontFamily: 'Georgia, serif',
//                     color: activeDropdown === item.label ? '#FFD700' : '#FFFFFF', // Pure White for high visibility
//                     textShadow: activeDropdown === item.label ? '0 0 20px rgba(255,215,0,0.5)' : 'none',
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.color = '#FFD700';
//                     (e.currentTarget as HTMLAnchorElement).style.textShadow = '0 0 20px rgba(255,215,0,0.5)';
//                   }}
//                   onMouseLeave={(e) => {
//                     if (activeDropdown !== item.label) {
//                       (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
//                       (e.currentTarget as HTMLAnchorElement).style.textShadow = 'none';
//                     }
//                   }}
//                 >
//                   {item.label}
//                   {item.children && (
//                     <ChevronDown
//                       size={13}
//                       className="transition-transform duration-300"
//                       style={{
//                         transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
//                         color: activeDropdown === item.label ? '#FFD700' : 'rgba(255,255,255,0.8)',
//                       }}
//                     />
//                   )}
//                 </Link>

//                 <span
//                   className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300"
//                   style={{
//                     background: 'linear-gradient(to right, transparent, #FFD700, transparent)',
//                     opacity: activeDropdown === item.label ? 1 : 0,
//                     boxShadow: '0 0 8px rgba(255,215,0,0.6)',
//                   }}
//                 />

//                 {item.children && (
//                   <div
//                     className="absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300"
//                     style={{
//                       opacity: activeDropdown === item.label ? 1 : 0,
//                       pointerEvents: activeDropdown === item.label ? 'auto' : 'none',
//                       transform: `translateX(-50%) translateY(${activeDropdown === item.label ? '0' : '-8px'})`,
//                     }}
//                   >
//                     <div
//                       className="rounded-xl overflow-hidden min-w-[180px] border border-amber-500/30"
//                       style={{
//                         background: 'rgba(0, 0, 0, 0.98)',
//                         backdropFilter: 'blur(20px)',
//                         boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,215,0,0.1)',
//                       }}
//                     >
//                       <div
//                         className="h-px w-full"
//                         style={{
//                           background: 'linear-gradient(to right, transparent, #FFD700, transparent)',
//                         }}
//                       />
//                       {item.children.map((child, idx) => (
//                         <Link
//                           key={child.href}
//                           to={child.href}
//                           className="flex items-center justify-between px-5 py-3 text-sm font-bold tracking-wider transition-all duration-200 group/item"
//                           style={{
//                             fontFamily: 'Georgia, serif',
//                             color: '#FFFFFF', // Pure White
//                             borderBottom: idx < item.children!.length - 1 ? '1px solid rgba(255,215,0,0.15)' : 'none',
//                           }}
//                           onMouseEnter={(e) => {
//                             const el = e.currentTarget as HTMLAnchorElement;
//                             el.style.color = '#FFD700';
//                             el.style.background = 'rgba(255,215,0,0.08)';
//                             el.style.paddingLeft = '24px';
//                           }}
//                           onMouseLeave={(e) => {
//                             const el = e.currentTarget as HTMLAnchorElement;
//                             el.style.color = '#FFFFFF';
//                             el.style.background = 'transparent';
//                             el.style.paddingLeft = '20px';
//                           }}
//                         >
//                           {child.label}
//                           <span
//                             className="text-amber-500 transition-all duration-200 text-xs opacity-0 group-hover/item:opacity-100"
//                             style={{ fontFamily: 'Georgia, serif' }}
//                           >
//                             →
//                           </span>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center gap-3">
//             {isAuthenticated ? (
//               <div className="hidden sm:flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full border border-amber-500/50 overflow-hidden bg-black/50">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
//                     ) : (
//                       <User size={14} className="m-auto mt-1.5 text-amber-500" />
//                     )}
//                   </div>
//                   <span className="text-xs text-amber-500 font-bold uppercase tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
//                     {user?.username}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
//                   title="Sign Out"
//                 >
//                   <LogOut size={16} />
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-amber-500 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 group"
//                 style={{
//                   background: 'rgba(0,0,0,0.4)',
//                   boxShadow: '0 0 20px rgba(255,215,0,0.2)',
//                   backdropFilter: 'blur(8px)',
//                 }}
//               >
//                 <User
//                   size={15}
//                   className="text-amber-400 group-hover:text-amber-300 transition-colors"
//                 />
//                 <span
//                   className="text-xs font-bold tracking-widest uppercase text-amber-400 group-hover:text-amber-300 transition-colors"
//                   style={{ fontFamily: 'Georgia, serif' }}
//                 >
//                   Sign In
//                 </span>
//               </Link>
//             )}

//             <button
//               onClick={() => setMobileOpen(true)}
//               className="lg:hidden p-2 rounded-full border-2 border-amber-500 hover:border-amber-400 transition-all duration-300"
//               style={{ background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 20px rgba(255,215,0,0.2)' }}
//               aria-label="Open menu"
//             >
//               <Menu size={20} className="text-amber-400" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 z-50 lg:hidden"
//           style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <div
//         className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] lg:hidden flex flex-col transition-transform duration-500 ease-in-out"
//         style={{
//           background: 'rgba(0,0,0,0.98)',
//           backdropFilter: 'blur(24px)',
//           borderLeft: '1px solid rgba(255,215,0,0.3)',
//           boxShadow: '-20px 0 80px rgba(0,0,0,0.9)',
//           transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
//         }}
//       >
//         <div
//           className="flex items-center justify-between px-6 h-16 shrink-0"
//           style={{ borderBottom: '1px solid rgba(255,215,0,0.2)' }}
//         >
//           <span
//             className="text-sm font-bold tracking-[0.3em] uppercase"
//             style={{
//               fontFamily: 'Georgia, serif',
//               background: 'linear-gradient(to right, #FFD700, #FFA500)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Navigation
//           </span>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="p-2 rounded-full border-2 border-amber-500 hover:bg-amber-500/10 transition-all duration-300"
//           >
//             <X size={16} className="text-amber-400" />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
//           {navItems.map((item, idx) => (
//             <div key={item.label}>
//               <button
//                 onClick={() => {
//                   if (item.children) {
//                     setMobileExpanded(mobilExpanded === item.label ? null : item.label);
//                   } else {
//                     navigate(item.href);
//                     setMobileOpen(false);
//                   }
//                 }}
//                 className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300"
//                 style={{
//                   fontFamily: 'Georgia, serif',
//                   color: mobilExpanded === item.label ? '#FFD700' : '#FFFFFF',
//                   background: mobilExpanded === item.label ? 'rgba(255,215,0,0.1)' : 'transparent',
//                   borderLeft: mobilExpanded === item.label ? '2px solid #FFD700' : '2px solid transparent',
//                   animationDelay: `${idx * 60}ms`,
//                 }}
//               >
//                 <span className="text-sm font-bold tracking-widest uppercase">
//                   {item.label}
//                 </span>
//                 {item.children && (
//                   <ChevronDown
//                     size={14}
//                     className="transition-transform duration-300"
//                     style={{
//                       color: '#FFD700',
//                       transform: mobilExpanded === item.label ? 'rotate(180deg)' : 'rotate(0)',
//                     }}
//                   />
//                 )}
//               </button>

//               {item.children && mobilExpanded === item.label && (
//                 <div className="ml-4 mt-1 space-y-1 pb-2 border-l border-white/10">
//                   {item.children.map((child) => (
//                     <Link
//                       key={child.href}
//                       to={child.href}
//                       onClick={() => setMobileOpen(false)}
//                       className="flex items-center gap-3 px-6 py-2.5 rounded-lg transition-all duration-200"
//                       style={{
//                         fontFamily: 'Georgia, serif',
//                         color: 'rgba(255,255,255,0.9)',
//                         fontSize: '13px',
//                         letterSpacing: '0.05em',
//                       }}
//                     >
//                       {child.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         <div
//           className="px-6 py-6 shrink-0"
//           style={{ borderTop: '1px solid rgba(255,215,0,0.2)' }}
//         >
//           {isAuthenticated ? (
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10">
//                 <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/50">
//                   {user?.avatar ? (
//                     <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
//                   ) : (
//                     <User size={20} className="m-auto mt-2.5 text-amber-500" />
//                   )}
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-[10px] font-bold text-white/60 uppercase" style={{ fontFamily: 'Georgia, serif' }}>Logged in as</span>
//                   <span className="text-sm font-bold text-amber-500 uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>{user?.username}</span>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-all duration-300"
//               >
//                 <LogOut size={16} />
//                 <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>Sign Out</span>
//               </button>
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               onClick={() => setMobileOpen(false)}
//               className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border-2 border-amber-500 bg-amber-500/10 transition-all duration-300"
//             >
//               <User size={16} className="text-amber-400" />
//               <span
//                 className="text-sm font-bold tracking-widest uppercase text-amber-400"
//                 style={{ fontFamily: 'Georgia, serif' }}
//               >
//                 Sign In
//               </span>
//             </Link>
//           )}

//           <p
//             className="text-center mt-6 text-xs font-bold"
//             style={{
//               fontFamily: 'Georgia, serif',
//               color: 'rgba(255,255,255,0.5)',
//               letterSpacing: '0.15em',
//             }}
//           >
//             © THE KING'S ARCHIVE
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }



































// import { useState, useEffect, useRef } from 'react';
// import { User, ChevronDown, LogOut, Sun, Moon, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// interface NavItem {
//   label: string;
//   href: string;
//   children?: { label: string; href: string }[];
// }

// const navItems: NavItem[] = [
//   {
//     label: 'Legacy',
//     href: '/legacy/thriller',
//     children: [
//       { label: 'Thriller', href: '/legacy/thriller' },
//       { label: 'Moonwalk', href: '/legacy/moonwalk' },
//       { label: 'Tours', href: '/legacy/dangerous-tour' },
//       { label: 'Billie Jean', href: '/legacy/billie-jean' },
//       { label: 'The World', href: '/legacy/we-are-the-world' },
//       { label: 'Bad', href: '/legacy/bad-album' },
//     ],
//   },
//   {
//     label: 'Family Tree',
//     href: '/family',
//     children: [
//       { label: 'Michael Jackson', href: '/family/michael' },
//       { label: 'Janet Jackson', href: '/family/janet' },
//       { label: 'Jaafar Jackson', href: '/family/jaafar' },
//       { label: 'The Jackson 5', href: '/family/jackson-5' },
//     ],
//   },
//   {
//     label: 'Media',
//     href: '/media',
//     children: [
//       { label: 'Articles', href: '/articles' },
//       { label: 'Music, Podcasts', href: '/audio' },
//       { label: 'Music Videos, Concerts', href: '/videos' },
//     ],
//   },
//   { label: 'News', href: '/articles' },
//   { label: 'Forums', href: '/forum' },
// ];

// export default function Navbar() {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [mobilExpanded, setMobileExpanded] = useState<string | null>(null);
//   const [sidebarKey, setSidebarKey] = useState(0);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Theme — read from localStorage on mount, default to dark
//   const [isDark, setIsDark] = useState<boolean>(() => {
//     const saved = localStorage.getItem('theme');
//     return saved ? saved === 'dark' : true;
//   });

//   // Apply or remove light-mode class on <html> and persist to localStorage
//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.remove('light-mode');
//     } else {
//       document.documentElement.classList.add('light-mode');
//     }
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   const toggleTheme = () => setIsDark((prev) => !prev);

//   // Re-key the sidebar nav on each open to re-trigger stagger animations
//   useEffect(() => {
//     if (mobileOpen) setSidebarKey((prev) => prev + 1);
//   }, [mobileOpen]);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [mobileOpen]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleMouseEnter = (label: string) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveDropdown(label);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
//   };

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//     setMobileOpen(false);
//   };

//   // Theme-aware color tokens
//   const navTextColor    = isDark ? '#FFFFFF'                              : '#111111';

//   // FIX 2: Pure white (#FFFFFF) instead of warm cream for light mode backgrounds
//   const navBg           = scrolled
//     ? isDark ? 'rgba(10, 10, 10, 0.97)'                                  : 'rgba(255, 255, 255, 0.97)'
//     : isDark
//       ? 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)'
//       : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 100%)';
//   const dropdownBg      = isDark ? 'rgba(5, 5, 5, 0.98)'                 : 'rgba(255, 255, 255, 0.98)';
//   const dropdownText    = isDark ? '#FFFFFF'                             : '#111111';

//   // FIX 3: Pure white sidebar background in light mode
//   const sidebarBg       = isDark ? 'rgba(5, 5, 5, 0.99)'                : 'rgba(255, 255, 255, 0.99)';
//   const dividerColor    = isDark ? 'rgba(255,215,0,0.2)'                 : 'rgba(184,134,11,0.3)';
//   const subtleText      = isDark ? 'rgba(255,255,255,0.45)'              : 'rgba(0,0,0,0.4)';
//   const mobileItemBg    = isDark ? 'rgba(255,215,0,0.08)'                : 'rgba(184,134,11,0.1)';
//   const mobileChildText = isDark ? 'rgba(255,255,255,0.85)'              : 'rgba(0,0,0,0.7)';

//   // Gold color tokens — bright in dark mode, darker shade in light mode for contrast
//   const gold            = isDark ? '#FFD700'                             : '#B8860B';
//   const goldHover       = isDark ? '#FFC200'                             : '#996B00';
//   const goldGradient    = isDark
//     ? 'linear-gradient(to right, #FFD700, #FFA500)'
//     : 'linear-gradient(to right, #B8860B, #996B00)';
//   const goldBorderAlpha = isDark ? 'rgba(255,215,0,0.4)'                 : 'rgba(184,134,11,0.5)';
//   const goldGlowAlpha   = isDark ? 'rgba(255,215,0,0.2)'                 : 'rgba(184,134,11,0.2)';
//   const hamburgerLine   = isDark
//     ? 'linear-gradient(to right, #FFD700, #FFA500)'
//     : 'linear-gradient(to right, #B8860B, #996B00)';

//   return (
//     <>
//       {/* Keyframe animations for mobile sidebar items */}
//       <style>{`
//         @keyframes slideInFromRight {
//           from { opacity: 0; transform: translateX(40px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       <nav
//         className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
//         style={{
//           background: navBg,
//           backdropFilter: scrolled ? 'blur(16px)' : 'none',
//           borderBottom: scrolled ? `1px solid ${dividerColor}` : 'none',
//           boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.3)' : 'none',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group shrink-0" style={{ textDecoration: 'none' }}>
//             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
//               <img
//                 src="https://i.pinimg.com/1200x/6a/9f/01/6a9f01bc9359ff96f64da7e08ddede99.jpg"
//                 alt="Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="flex flex-col leading-none">
//               {/* FIX 1: key prop forces remount on theme toggle, clearing stale gradient-clip paint */}
//               <span
//                 key={isDark ? 'dark' : 'light'}
//                 className="text-base md:text-lg font-light tracking-widest"
//                 style={{
//                   fontFamily: 'Georgia, serif',
//                   background: goldGradient,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                   filter: `drop-shadow(0 0 8px ${goldGlowAlpha})`,
//                 }}
//               >
//                 MARY'S MOONWALKER
//               </span>
//             </div>
//           </Link>

//           {/* Desktop nav links */}
//           <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
//             {navItems.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative"
//                 onMouseEnter={() => item.children && handleMouseEnter(item.label)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Link
//                   to={item.href}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300"
//                   style={{
//                     fontFamily: 'Georgia, serif',
//                     color: activeDropdown === item.label ? gold : navTextColor,
//                     textShadow: activeDropdown === item.label ? `0 0 20px ${goldGlowAlpha}` : 'none',
//                   }}
//                   onMouseEnter={(e) => {
//                     (e.currentTarget as HTMLAnchorElement).style.color = gold;
//                     (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 20px ${goldGlowAlpha}`;
//                   }}
//                   onMouseLeave={(e) => {
//                     if (activeDropdown !== item.label) {
//                       (e.currentTarget as HTMLAnchorElement).style.color = navTextColor;
//                       (e.currentTarget as HTMLAnchorElement).style.textShadow = 'none';
//                     }
//                   }}
//                 >
//                   {item.label}
//                   {item.children && (
//                     <ChevronDown
//                       size={13}
//                       className="transition-transform duration-300"
//                       style={{
//                         transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
//                         color: activeDropdown === item.label ? gold : navTextColor,
//                       }}
//                     />
//                   )}
//                 </Link>

//                 {/* Active underline indicator */}
//                 <span
//                   className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300"
//                   style={{
//                     background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
//                     opacity: activeDropdown === item.label ? 1 : 0,
//                     boxShadow: `0 0 8px ${goldGlowAlpha}`,
//                   }}
//                 />

//                 {/* Dropdown panel */}
//                 {item.children && (
//                   <div
//                     className="absolute top-full left-1/2 pt-3 transition-all duration-300"
//                     style={{
//                       opacity: activeDropdown === item.label ? 1 : 0,
//                       pointerEvents: activeDropdown === item.label ? 'auto' : 'none',
//                       transform: `translateX(-50%) translateY(${activeDropdown === item.label ? '0' : '-8px'})`,
//                     }}
//                   >
//                     <div
//                       className="rounded-xl overflow-hidden min-w-[180px]"
//                       style={{
//                         background: dropdownBg,
//                         backdropFilter: 'blur(20px)',
//                         border: `1px solid ${goldBorderAlpha}`,
//                         boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${goldGlowAlpha}`,
//                       }}
//                     >
//                       <div
//                         className="h-px w-full"
//                         style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }}
//                       />
//                       {item.children.map((child, idx) => (
//                         <Link
//                           key={child.href}
//                           to={child.href}
//                           className="flex items-center justify-between px-5 py-3 text-sm font-bold tracking-wider transition-all duration-200 group/item"
//                           style={{
//                             fontFamily: 'Georgia, serif',
//                             color: dropdownText,
//                             borderBottom: idx < item.children!.length - 1 ? `1px solid ${dividerColor}` : 'none',
//                           }}
//                           onMouseEnter={(e) => {
//                             const el = e.currentTarget as HTMLAnchorElement;
//                             el.style.color = gold;
//                             el.style.background = mobileItemBg;
//                             el.style.paddingLeft = '24px';
//                           }}
//                           onMouseLeave={(e) => {
//                             const el = e.currentTarget as HTMLAnchorElement;
//                             el.style.color = dropdownText;
//                             el.style.background = 'transparent';
//                             el.style.paddingLeft = '20px';
//                           }}
//                         >
//                           {child.label}
//                           <span
//                             className="text-xs opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
//                             style={{ color: gold }}
//                           >
//                             →
//                           </span>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Desktop right: theme toggle + auth */}
//           <div className="flex items-center gap-3">

//             {/* Theme toggle — desktop only */}
//             <button
//               onClick={toggleTheme}
//               className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
//               style={{
//                 border: `1px solid ${goldBorderAlpha}`,
//                 color: gold,
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
//                 (e.currentTarget as HTMLButtonElement).style.borderColor = gold;
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
//                 (e.currentTarget as HTMLButtonElement).style.borderColor = goldBorderAlpha;
//               }}
//               title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//               aria-label="Toggle theme"
//             >
//               {isDark
//                 ? <Sun size={15} style={{ color: gold }} />
//                 : <Moon size={15} style={{ color: gold }} />
//               }
//             </button>

//             {isAuthenticated ? (
//               <div className="hidden sm:flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-8 h-8 rounded-full overflow-hidden bg-black/50"
//                     style={{ border: `1px solid ${goldBorderAlpha}` }}
//                   >
//                     {user?.avatar
//                       ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
//                       : <User size={14} className="m-auto mt-1.5" style={{ color: gold }} />
//                     }
//                   </div>
//                   <span
//                     className="text-xs font-bold uppercase tracking-wider"
//                     style={{ fontFamily: 'Georgia, serif', color: gold }}
//                   >
//                     {user?.username}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
//                   title="Sign Out"
//                 >
//                   <LogOut size={16} />
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group"
//                 style={{
//                   // border: `2px solid ${gold}`,
//                   border: `1px solid ${goldBorderAlpha}`,
//                   background: 'transparent',
//                   boxShadow: `0 0 20px ${goldGlowAlpha}`,
//                   backdropFilter: 'blur(8px)',
//                 }}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLAnchorElement).style.background = mobileItemBg;
//                   (e.currentTarget as HTMLAnchorElement).style.borderColor = goldHover;
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
//                   (e.currentTarget as HTMLAnchorElement).style.borderColor = gold;
//                 }}
//               >
//                 <User size={15} style={{ color: gold }} />
//                 <span
//                   className="text-xs font-bold tracking-widest uppercase"
//                   style={{ fontFamily: 'Georgia, serif', color: gold }}
//                 >
//                   Sign In
//                 </span>
//               </Link>
//             )}

//             {/* Modern animated hamburger — no circle, no border, morphs to X on open */}
//             <button
//               onClick={() => setMobileOpen((prev) => !prev)}
//               className="lg:hidden flex flex-col justify-center gap-[5px] p-1"
//               aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//             >
//               {/* Top line — full width, rotates to form top of X */}
//               <span
//                 style={{
//                   display: 'block',
//                   height: '2px',
//                   width: '26px',
//                   background: hamburgerLine,
//                   borderRadius: '2px',
//                   transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
//                   transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
//                 }}
//               />
//               {/* Middle line — shorter and right-aligned for editorial look, fades out on open */}
//               <span
//                 style={{
//                   display: 'block',
//                   height: '2px',
//                   width: '16px',
//                   background: hamburgerLine,
//                   borderRadius: '2px',
//                   marginLeft: 'auto',
//                   transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
//                   opacity: mobileOpen ? 0 : 1,
//                   transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
//                 }}
//               />
//               {/* Bottom line — medium width, rotates to form bottom of X */}
//               <span
//                 style={{
//                   display: 'block',
//                   height: '2px',
//                   width: '26px',
//                   background: hamburgerLine,
//                   borderRadius: '2px',
//                   transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
//                   transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
//                 }}



//                 // style={{
//                 //   display: 'block',
//                 //   height: '2px',
//                 //   width: mobileOpen ? '26px' : '21px',
//                 //   background: hamburgerLine,
//                 //   borderRadius: '2px',
//                 //   transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
//                 //   transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
//                 // }}
//               />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar backdrop with fade transition */}
//       <div
//         className="fixed inset-0 z-50 lg:hidden transition-opacity duration-500"
//         style={{
//           background: 'rgba(0,0,0,0.75)',
//           backdropFilter: 'blur(4px)',
//           opacity: mobileOpen ? 1 : 0,
//           pointerEvents: mobileOpen ? 'auto' : 'none',
//         }}
//         onClick={() => setMobileOpen(false)}
//       />

//       {/* Mobile sidebar panel */}
//       <div
//         className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] lg:hidden flex flex-col transition-transform duration-500 ease-in-out"
//         style={{
//           background: sidebarBg,
//           backdropFilter: 'blur(24px)',
//           borderLeft: `1px solid ${dividerColor}`,
//           boxShadow: '-20px 0 80px rgba(0,0,0,0.6)',
//           transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
//         }}
//       >
//         {/* Sidebar header */}
//         <div
//           className="flex items-center justify-between px-6 h-16 shrink-0"
//           style={{ borderBottom: `1px solid ${dividerColor}` }}
//         >
//           {/* FIX 1 (mobile): same key trick for the "Navigation" gradient text in the sidebar */}
//           <span
//             key={isDark ? 'dark' : 'light'}
//             className="text-sm font-bold tracking-[0.3em] uppercase"
//             style={{
//               fontFamily: 'Georgia, serif',
//               background: goldGradient,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Navigation
//           </span>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="p-2 rounded-full transition-all duration-300"
//             style={{ border: `2px solid ${gold}` }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
//             }}
//           >
//             <X size={16} style={{ color: gold }} />
//           </button>
//         </div>

//         {/* Staggered nav items — re-keyed on every open to replay animation */}
//         <nav key={sidebarKey} className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
//           {navItems.map((item, idx) => (
//             <div
//               key={item.label}
//               style={{
//                 animation: 'slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
//                 animationDelay: `${idx * 75}ms`,
//                 opacity: 0,
//               }}
//             >
//               <button
//                 onClick={() => {
//                   if (item.children) {
//                     setMobileExpanded(mobilExpanded === item.label ? null : item.label);
//                   } else {
//                     navigate(item.href);
//                     setMobileOpen(false);
//                   }
//                 }}
//                 className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300"
//                 style={{
//                   fontFamily: 'Georgia, serif',
//                   color: mobilExpanded === item.label ? gold : navTextColor,
//                   background: mobilExpanded === item.label ? mobileItemBg : 'transparent',
//                   borderLeft: mobilExpanded === item.label ? `2px solid ${gold}` : '2px solid transparent',
//                 }}
//               >
//                 <span className="text-sm font-bold tracking-widest uppercase">
//                   {item.label}
//                 </span>
//                 {item.children && (
//                   <ChevronDown
//                     size={14}
//                     className="transition-transform duration-300"
//                     style={{
//                       color: gold,
//                       transform: mobilExpanded === item.label ? 'rotate(180deg)' : 'rotate(0)',
//                     }}
//                   />
//                 )}
//               </button>

//               {item.children && mobilExpanded === item.label && (
//                 <div
//                   className="ml-4 mt-1 space-y-1 pb-2"
//                   style={{ borderLeft: `1px solid ${goldBorderAlpha}` }}
//                 >
//                   {item.children.map((child, childIdx) => (
//                     <Link
//                       key={child.href}
//                       to={child.href}
//                       onClick={() => setMobileOpen(false)}
//                       className="flex items-center gap-3 px-6 py-2.5 rounded-lg transition-all duration-200"
//                       style={{
//                         fontFamily: 'Georgia, serif',
//                         color: mobileChildText,
//                         fontSize: '13px',
//                         letterSpacing: '0.05em',
//                         animation: 'fadeInUp 0.3s ease forwards',
//                         animationDelay: `${childIdx * 50}ms`,
//                         opacity: 0,
//                       }}
//                     >
//                       {child.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* Sidebar footer: theme toggle + auth */}
//         <div
//           className="px-6 py-6 shrink-0"
//           style={{ borderTop: `1px solid ${dividerColor}` }}
//         >
//           {/* Theme toggle — mobile sidebar */}
//           <button
//             onClick={toggleTheme}
//             className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 mb-4"
//             style={{ border: `1px solid ${goldBorderAlpha}` }}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
//             }}
//           >
//             <span
//               className="text-xs font-bold tracking-widest uppercase"
//               style={{ fontFamily: 'Georgia, serif', color: gold }}
//             >
//               {isDark ? 'Light Mode' : 'Dark Mode'}
//             </span>
//             {isDark
//               ? <Sun size={15} style={{ color: gold }} />
//               : <Moon size={15} style={{ color: gold }} />
//             }
//           </button>

//           {isAuthenticated ? (
//             <div className="space-y-4">
//               <div
//                 className="flex items-center gap-3 px-4 py-3 rounded-xl"
//                 style={{ border: `1px solid ${goldBorderAlpha}`, background: mobileItemBg }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-full overflow-hidden"
//                   style={{ border: `1px solid ${goldBorderAlpha}` }}
//                 >
//                   {user?.avatar
//                     ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
//                     : <User size={20} className="m-auto mt-2.5" style={{ color: gold }} />
//                   }
//                 </div>
//                 <div className="flex flex-col">
//                   {/* <span
//                     className="text-[10px] font-bold uppercase"
//                     style={{ fontFamily: 'Georgia, serif', color: subtleText }}
//                   >
//                     Logged in as
//                   </span> */}
//                   <span
//                     className="text-sm font-bold uppercase tracking-widest"
//                     style={{ fontFamily: 'Georgia, serif', color: gold }}
//                   >
//                     {user?.username}
//                   </span>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-all duration-300"
//               >
//                 <span
//                   className="text-xs font-bold tracking-widest uppercase"
//                   style={{ fontFamily: 'Georgia, serif' }}
//                 >
//                   Sign Out
//                 </span>
//                 <LogOut size={15} />
//               </button>

//               {/* <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-all duration-300"
//               >
//                 <LogOut size={16} />
//                 <span
//                   className="text-sm font-bold tracking-widest uppercase"
//                   style={{ fontFamily: 'Georgia, serif' }}
//                 >
//                   Sign Out
//                 </span>
//               </button> */}
//             </div>
//           ) : (

//             <Link
//               to="/login"
//               onClick={() => setMobileOpen(false)}
//               className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300"
//               style={{ border: `1px solid ${goldBorderAlpha}` }}
//             >
//               <span
//                 className="text-xs font-bold tracking-widest uppercase"
//                 style={{ fontFamily: 'Georgia, serif', color: gold }}
//               >
//                 Sign In
//               </span>
//               <User size={15} style={{ color: gold }} />
//             </Link>

//           )}

//           <p
//             className="text-center mt-6 text-xs font-bold"
//             style={{ fontFamily: 'Georgia, serif', color: subtleText, letterSpacing: '0.15em' }}
//           >
//             © MARY'S MOONWALKER
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

























import { useState, useEffect, useRef } from 'react';
import { User, ChevronDown, LogOut, Sun, Moon, X, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00'; // Bright Golden Chocolate

interface NavItem {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    {
        label: 'Legacy',
        href: '/legacy/thriller',
        children: [
            { label: 'Thriller', href: '/legacy/thriller' },
            { label: 'Moonwalk', href: '/legacy/moonwalk' },
            { label: 'Tours', href: '/legacy/dangerous-tour' },
            { label: 'Billie Jean', href: '/legacy/billie-jean' },
            { label: 'The World', href: '/legacy/we-are-the-world' },
            { label: 'Bad', href: '/legacy/bad-album' },
        ],
    },
    {
        label: 'Family Tree',
        href: '/family',
        children: [
            { label: 'Katherine Jackson', href: '/family/katherine' },
            { label: 'Joe Jackson', href: '/family/joe' },
            { label: 'Janet Jackson', href: '/family/janet' },
            { label: 'Jeramine Jackson', href: '/family/jeramine' },
            { label: 'Jaafar Jackson', href: '/family/jaafar' },
        ],
    },
    {
        label: 'Media',
        href: '/media',
        children: [
            { label: 'Articles', href: '/articles' },
            { label: 'Music, Podcasts', href: '/audio' },
            { label: 'Music Videos, Concerts', href: '/videos' },
        ],
    },
    { label: 'News', href: '/articles' },
    { label: 'Forums', href: '/forum' },
];

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobilExpanded, setMobileExpanded] = useState<string | null>(null);
    const [sidebarKey, setSidebarKey] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Theme — read from localStorage on mount
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    // Re-key sidebar nav to trigger stagger animations cleanly
    useEffect(() => {
        if (mobileOpen) setSidebarKey((prev) => prev + 1);
    }, [mobileOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setMobileOpen(false);
    };

    // ─── Theme-aware color tokens (Vintage Editorial Palette) ──────────────
    const navTextColor    = isDark ? '#FFFFFF' : '#111111';
    const navBg           = scrolled
        ? isDark ? 'rgba(10, 10, 10, 0.97)' : 'rgba(255, 255, 255, 0.97)'
        : isDark
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 100%)';
            
    const dropdownBg      = isDark ? 'rgba(10, 10, 10, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    const dropdownText    = isDark ? '#FFFFFF' : '#111111';
    const sidebarBg       = isDark ? 'rgba(10, 10, 10, 0.99)' : 'rgba(255, 255, 255, 0.99)';
    const subtleText      = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';

    // Accent Colors based on Bright Golden Chocolate
    const accentBorderAlpha = isDark ? 'rgba(255,140,0,0.4)' : 'rgba(255,140,0,0.5)';
    const accentGlowAlpha   = isDark ? 'rgba(255,140,0,0.2)' : 'rgba(255,140,0,0.15)';
    const dividerColor      = isDark ? 'rgba(255,140,0,0.2)' : 'rgba(255,140,0,0.3)';
    const mobileItemBg      = isDark ? 'rgba(255,140,0,0.08)' : 'rgba(255,140,0,0.1)';
    const mobileChildText   = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)';

    return (
        <>
            {/* Keyframe animations for mobile sidebar items */}
            <style>{`
                @keyframes slideInFromRight {
                    from { opacity: 0; transform: translateX(40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    background: navBg,
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${dividerColor}` : 'none',
                    boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.1)' : 'none',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0" style={{ textDecoration: 'none' }}>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
                            <img
                                src="https://i.pinimg.com/1200x/6a/9f/01/6a9f01bc9359ff96f64da7e08ddede99.jpg"
                                alt="Logo"
                                className="w-full h-full object-cover grayscale opacity-90 transition-all group-hover:grayscale-0"
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span
                                className="text-base md:text-lg font-bold tracking-widest uppercase transition-colors duration-300"
                                style={{
                                    fontFamily: FONT,
                                    color: ACCENT_COLOR,
                                    textShadow: `0 0 15px ${accentGlowAlpha}`,
                                }}
                            >
                                MARY'S MOONWALKER
                            </span>
                        </div>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    to={item.href}
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300"
                                    style={{
                                        fontFamily: FONT,
                                        color: activeDropdown === item.label ? ACCENT_COLOR : navTextColor,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.color = ACCENT_COLOR;
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeDropdown !== item.label) {
                                            (e.currentTarget as HTMLAnchorElement).style.color = navTextColor;
                                        }
                                    }}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown
                                            size={14}
                                            className="transition-transform duration-300"
                                            style={{
                                                transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                                                color: activeDropdown === item.label ? ACCENT_COLOR : navTextColor,
                                            }}
                                        />
                                    )}
                                </Link>

                                {/* Active underline indicator */}
                                <span
                                    className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}, transparent)`,
                                        opacity: activeDropdown === item.label ? 1 : 0,
                                        boxShadow: `0 0 8px ${accentGlowAlpha}`,
                                    }}
                                />

                                {/* Dropdown panel */}
                                {item.children && (
                                    <div
                                        className="absolute top-full left-1/2 pt-4 transition-all duration-300"
                                        style={{
                                            opacity: activeDropdown === item.label ? 1 : 0,
                                            pointerEvents: activeDropdown === item.label ? 'auto' : 'none',
                                            transform: `translateX(-50%) translateY(${activeDropdown === item.label ? '0' : '-8px'})`,
                                        }}
                                    >
                                        <div
                                            className="rounded-xl overflow-hidden min-w-[200px]"
                                            style={{
                                                background: dropdownBg,
                                                backdropFilter: 'blur(20px)',
                                                border: `1px solid ${accentBorderAlpha}`,
                                                boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
                                            }}
                                        >
                                            <div
                                                className="h-px w-full"
                                                style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}, transparent)` }}
                                            />
                                            {item.children.map((child, idx) => (
                                                <Link
                                                    key={child.href}
                                                    to={child.href}
                                                    className="flex items-center justify-between px-5 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-all duration-200 group/item"
                                                    style={{
                                                        fontFamily: FONT,
                                                        color: dropdownText,
                                                        borderBottom: idx < item.children!.length - 1 ? `1px solid ${dividerColor}` : 'none',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        const el = e.currentTarget as HTMLAnchorElement;
                                                        el.style.color = ACCENT_COLOR;
                                                        el.style.background = mobileItemBg;
                                                        el.style.paddingLeft = '24px';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        const el = e.currentTarget as HTMLAnchorElement;
                                                        el.style.color = dropdownText;
                                                        el.style.background = 'transparent';
                                                        el.style.paddingLeft = '20px';
                                                    }}
                                                >
                                                    {child.label}
                                                    <span
                                                        className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                                                        style={{ color: ACCENT_COLOR }}
                                                    >
                                                        →
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop right: Theme toggle + Auth */}
                    <div className="flex items-center gap-4">
                        
                        {/* Theme toggle — desktop only */}
                        <button
                            onClick={toggleTheme}
                            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                            style={{
                                border: `1px solid ${accentBorderAlpha}`,
                                color: ACCENT_COLOR,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
                                (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT_COLOR;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                (e.currentTarget as HTMLButtonElement).style.borderColor = accentBorderAlpha;
                            }}
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        {isAuthenticated ? (
                            <div className="hidden sm:flex items-center gap-4">

                                {/* <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full overflow-hidden bg-black/50"
                                        style={{ border: `1px solid ${accentBorderAlpha}` }}
                                    >
                                        {user?.avatar
                                            ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            : <User size={14} className="m-auto mt-1.5" style={{ color: ACCENT_COLOR }} />
                                        }
                                    </div>
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{ fontFamily: FONT, color: ACCENT_COLOR }}
                                    >
                                        {user?.username}
                                    </span>
                                </div> */}

                                <Link 
                                    to="/profile" 
                                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                                >
                                    <div
                                        className="w-8 h-8 rounded-full overflow-hidden bg-black/50"
                                        style={{ border: `1px solid ${accentBorderAlpha}` }}
                                    >
                                        {user?.avatar
                                            ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            : <User size={14} className="m-auto mt-1.5" style={{ color: ACCENT_COLOR }} />
                                        }
                                    </div>
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{ fontFamily: FONT, color: ACCENT_COLOR }}
                                    >
                                        {user?.username}
                                    </span>
                                </Link>

                                {/* Integrated Admin Button */}
                                {user?.role === 'admin' && (
                                    <a
                                        href="/admin/admin.html"
                                        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-[11px] font-bold tracking-widest uppercase"
                                        style={{ border: `1px solid ${accentBorderAlpha}`, color: ACCENT_COLOR, fontFamily: MONO }}
                                        title="Admin Panel"
                                    >
                                        <Shield size={12} />
                                        Admin
                                    </a>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                                    title="Sign Out"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
                                style={{
                                    border: `1px solid ${accentBorderAlpha}`,
                                    background: 'transparent',
                                    backdropFilter: 'blur(8px)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = mobileItemBg;
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT_COLOR;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = accentBorderAlpha;
                                }}
                            >
                                <User size={14} style={{ color: ACCENT_COLOR }} />
                                <span
                                    className="text-xs font-bold tracking-widest uppercase"
                                    style={{ fontFamily: FONT, color: ACCENT_COLOR }}
                                >
                                    Sign In
                                </span>
                            </Link>
                        )}

                        {/* Animated hamburger */}
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="lg:hidden flex flex-col justify-center gap-[5px] p-1"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span
                                style={{
                                    display: 'block', height: '2px', width: '26px',
                                    background: ACCENT_COLOR, borderRadius: '2px',
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block', height: '2px', width: '16px',
                                    background: ACCENT_COLOR, borderRadius: '2px', marginLeft: 'auto',
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block', height: '2px', width: '26px',
                                    background: ACCENT_COLOR, borderRadius: '2px',
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                                }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar backdrop */}
            <div
                className="fixed inset-0 z-50 lg:hidden transition-opacity duration-500"
                style={{
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(4px)',
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? 'auto' : 'none',
                }}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile sidebar panel */}
            <div
                className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] lg:hidden flex flex-col transition-transform duration-500 ease-in-out"
                style={{
                    background: sidebarBg,
                    borderLeft: `1px solid ${dividerColor}`,
                    boxShadow: '-20px 0 80px rgba(0,0,0,0.6)',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                {/* Sidebar header */}
                <div
                    className="flex items-center justify-between px-6 h-16 shrink-0"
                    style={{ borderBottom: `1px solid ${dividerColor}` }}
                >
                    <span
                        className="text-[11px] font-bold tracking-[0.3em] uppercase"
                        style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                    >
                        Directory
                    </span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-full transition-all duration-300"
                        style={{ border: `1px solid ${accentBorderAlpha}` }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        }}
                    >
                        <X size={16} style={{ color: ACCENT_COLOR }} />
                    </button>
                </div>

                {/* Staggered nav items */}
                <nav key={sidebarKey} className="flex-1 overflow-y-auto px-4 py-4 space-y-1 mt-4">
                    {navItems.map((item, idx) => (
                        <div
                            key={item.label}
                            style={{
                                animation: 'slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                                animationDelay: `${idx * 75}ms`,
                                opacity: 0,
                            }}
                        >
                            <button
                                onClick={() => {
                                    if (item.children) {
                                        setMobileExpanded(mobilExpanded === item.label ? null : item.label);
                                    } else {
                                        navigate(item.href);
                                        setMobileOpen(false);
                                    }
                                }}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300"
                                style={{
                                    fontFamily: FONT,
                                    color: mobilExpanded === item.label ? ACCENT_COLOR : navTextColor,
                                    background: mobilExpanded === item.label ? mobileItemBg : 'transparent',
                                }}
                            >
                                <span className="text-sm font-bold tracking-widest uppercase">
                                    {item.label}
                                </span>
                                {item.children && (
                                    <ChevronDown
                                        size={14}
                                        className="transition-transform duration-300"
                                        style={{
                                            color: ACCENT_COLOR,
                                            transform: mobilExpanded === item.label ? 'rotate(180deg)' : 'rotate(0)',
                                        }}
                                    />
                                )}
                            </button>

                            {item.children && mobilExpanded === item.label && (
                                <div
                                    className="ml-4 mt-1 space-y-1 pb-2"
                                    style={{ borderLeft: `1px solid ${accentBorderAlpha}` }}
                                >
                                    {item.children.map((child, childIdx) => (
                                        <Link
                                            key={child.href}
                                            to={child.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 px-6 py-2.5 rounded-lg transition-all duration-200"
                                            style={{
                                                fontFamily: MONO,
                                                color: mobileChildText,
                                                fontSize: '11px',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                animation: 'fadeInUp 0.3s ease forwards',
                                                animationDelay: `${childIdx * 50}ms`,
                                                opacity: 0,
                                            }}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Sidebar footer: theme toggle + auth + Admin */}
                <div
                    className="px-6 py-6 shrink-0"
                    style={{ borderTop: `1px solid ${dividerColor}` }}
                >
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 mb-4"
                        style={{ border: `1px solid ${accentBorderAlpha}` }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = mobileItemBg;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        }}
                    >
                        <span
                            className="text-[11px] font-bold tracking-widest uppercase"
                            style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                        >
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </span>
                        {isDark ? <Sun size={15} style={{ color: ACCENT_COLOR }} /> : <Moon size={15} style={{ color: ACCENT_COLOR }} />}
                    </button>

                    {isAuthenticated ? (
                        <div className="space-y-4">

                          <Link
                              to="/profile"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-opacity hover:opacity-80"
                              style={{ border: `1px solid ${accentBorderAlpha}`, background: mobileItemBg }}
                          >
                              <div
                                  className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                                  style={{ border: `1px solid ${accentBorderAlpha}` }}
                              >
                                  {user?.avatar
                                      ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                      : <User size={20} className="m-auto mt-2.5" style={{ color: ACCENT_COLOR }} />
                                  }
                              </div>
                              <div className="flex flex-col">
                                  <span
                                      className="text-sm font-bold uppercase tracking-widest"
                                      style={{ fontFamily: FONT, color: ACCENT_COLOR }}
                                  >
                                      {user?.username}
                                  </span>
                              </div>
                          </Link>

                            {/* <div
                                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                style={{ border: `1px solid ${accentBorderAlpha}`, background: mobileItemBg }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden"
                                    style={{ border: `1px solid ${accentBorderAlpha}` }}
                                >
                                    {user?.avatar
                                        ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        : <User size={20} className="m-auto mt-2.5" style={{ color: ACCENT_COLOR }} />
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-sm font-bold uppercase tracking-widest"
                                        style={{ fontFamily: FONT, color: ACCENT_COLOR }}
                                    >
                                        {user?.username}
                                    </span>
                                </div>
                            </div> */}
                            
                            {/* Integrated Admin Button (Mobile) */}
                            {user?.role === 'admin' && (
                                <a
                                    href="/admin/admin.html"
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300"
                                    style={{ border: `1px solid ${accentBorderAlpha}`, color: ACCENT_COLOR }}
                                >
                                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{ fontFamily: MONO }}>
                                        Admin Panel
                                    </span>
                                    <Shield size={15} />
                                </a>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                            >
                                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ fontFamily: MONO }}>
                                    Sign Out
                                </span>
                                <LogOut size={15} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300"
                            style={{ border: `1px solid ${accentBorderAlpha}` }}
                        >
                            <span
                                className="text-[11px] font-bold tracking-widest uppercase"
                                style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                            >
                                Sign In
                            </span>
                            <User size={15} style={{ color: ACCENT_COLOR }} />
                        </Link>
                    )}

                    <p
                        className="text-center mt-6 text-[10px] font-bold uppercase"
                        style={{ fontFamily: MONO, color: subtleText, letterSpacing: '0.2em' }}
                    >
                        © MARY'S MOONWALKER
                    </p>
                </div>
            </div>
        </>
    );
}
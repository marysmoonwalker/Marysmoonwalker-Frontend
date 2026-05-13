// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { Send } from 'lucide-react';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// // ─── Theme hook ───────────────────────────────────────────────────────────────

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

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function HeroSubscribe() {
//     const isDark = useTheme();
//     const [email, setEmail] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const validateEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleSubscribe = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!validateEmail(email)) {
//             toast.error("Please enter a valid email address");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             // Using your exact provided API endpoint
//             const response = await fetch("https://modion.onrender.com/api/subscribe", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.status === 409) {
//                 toast.info("You’re already subscribed!");
//                 return;
//             }

//             if (!response.ok) {
//                 const message = await response.text();
//                 throw new Error(message || "Failed to subscribe");
//             }

//             toast.success("Successfully subscribed! Check your inbox.");
//             setEmail(""); 
//         } catch (err: any) {
//             toast.error(err.message || "Subscription failed");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Theme Variables
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const mutedText = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
//     const inputBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
//     const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

//     return (
//         <section 
//             className="pt-32 pb-16 md:pt-40 md:pb-20 transition-colors duration-500"
//             style={{ backgroundColor: bg }}
//         >
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Hero Headline */}
//                 {/* <h1 
//                     className="text-5xl md:text-7xl lg:text-[85px] font-normal leading-[1.1] tracking-tight mb-12"
//                     style={{ color: textColor, fontFamily: FONT }}
//                 >
//                     Explore the Legacy. <br className="hidden md:block" />
//                     Read the stories, history, and impact of the King of Pop.
//                 </h1> */}

//                 {/* Subtext & Form Row */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-t pt-10" style={{ borderColor: inputBorder }}>
                    
//                     <p 
//                         className="text-lg md:text-xl md:w-1/2 leading-relaxed"
//                         style={{ color: mutedText, fontFamily: FONT }}
//                     >
//                         Subscribe to our editorial archive and be the first to receive exciting updates, exclusive media, and special features straight to your inbox.
//                     </p>

//                     <form 
//                         onSubmit={handleSubscribe} 
//                         className="w-full md:w-[45%] relative flex items-center"
//                     >
//                         <input
//                             type="email"
//                             placeholder="Your Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             autoComplete="email"
//                             disabled={isSubmitting}
//                             className="w-full pl-6 pr-[130px] py-5 rounded-full outline-none transition-all duration-300 disabled:opacity-50"
//                             style={{ 
//                                 backgroundColor: inputBg,
//                                 border: `1px solid ${inputBorder}`,
//                                 color: textColor,
//                                 fontFamily: MONO,
//                                 fontSize: '14px'
//                             }}
//                             onFocus={(e) => e.target.style.borderColor = ACCENT_COLOR}
//                             onBlur={(e) => e.target.style.borderColor = inputBorder}
//                         />
                        
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="absolute right-2 top-2 bottom-2 px-6 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
//                             style={{ 
//                                 backgroundColor: ACCENT_COLOR,
//                                 color: '#000000', // Black text pops best against bright orange
//                                 fontFamily: MONO,
//                                 fontSize: '11px'
//                             }}
//                         >
//                             {isSubmitting ? 'Sending...' : 'Subscribe'}
//                             {!isSubmitting && <Send size={14} strokeWidth={2.5} />}
//                         </button>
//                     </form>

//                 </div>
//             </div>
//         </section>
//     );
// }

























// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { Send } from 'lucide-react';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// // ─── Theme hook ───────────────────────────────────────────────────────────────

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

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function SubscribeSimple() {
//     const isDark = useTheme();
//     const [email, setEmail] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const validateEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleSubscribe = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!validateEmail(email)) {
//             toast.error("Please enter a valid email address");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await fetch("https://modion.onrender.com/api/subscribe", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.status === 409) {
//                 toast.info("You’re already subscribed!");
//                 return;
//             }

//             if (!response.ok) {
//                 const message = await response.text();
//                 throw new Error(message || "Failed to subscribe");
//             }

//             toast.success("Successfully subscribed! Check your inbox.");
//             setEmail(""); 
//         } catch (err: any) {
//             toast.error(err.message || "Subscription failed");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Theme Variables
//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const mutedText = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
//     const inputBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
//     const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

//     return (
//         <section 
//             // pt-32 gives space below navbar, pb-0 ensures it touches the next section seamlessly
//             className="pt-32 pb-0 md:pt-40 transition-colors duration-500"
//             style={{ backgroundColor: bg }}
//         >
//             <div className="max-w-2xl mx-auto px-6 flex flex-col items-center text-center">
                
//                 {/* Minimalist Headline */}
//                 <h2 
//                     className="text-3xl md:text-5xl font-normal mb-4 tracking-tight"
//                     style={{ color: textColor, fontFamily: FONT }}
//                 >
//                     Join the Archive
//                 </h2>

//                 {/* Subtext */}
//                 <p 
//                     className="text-sm md:text-base mb-8 max-w-md leading-relaxed"
//                     style={{ color: mutedText, fontFamily: FONT }}
//                 >
//                     Subscribe to receive exclusive stories, updates, and media directly to your inbox.
//                 </p>

//                 {/* Centered Form */}
//                 <form 
//                     onSubmit={handleSubscribe} 
//                     className="w-full max-w-md relative flex items-center"
//                 >
//                     <input
//                         type="email"
//                         placeholder="Your Email Address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         autoComplete="email"
//                         disabled={isSubmitting}
//                         className="w-full pl-6 pr-[120px] py-4 rounded-full outline-none transition-all duration-300 disabled:opacity-50"
//                         style={{ 
//                             backgroundColor: inputBg,
//                             border: `1px solid ${inputBorder}`,
//                             color: textColor,
//                             fontFamily: MONO,
//                             fontSize: '13px'
//                         }}
//                         onFocus={(e) => e.target.style.borderColor = ACCENT_COLOR}
//                         onBlur={(e) => e.target.style.borderColor = inputBorder}
//                     />
                    
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
//                         style={{ 
//                             backgroundColor: ACCENT_COLOR,
//                             color: '#000000', 
//                             fontFamily: MONO,
//                             fontSize: '10px'
//                         }}
//                     >
//                         {isSubmitting ? '...' : 'Subscribe'}
//                         {!isSubmitting && <Send size={13} strokeWidth={2.5} />}
//                     </button>
//                 </form>

//             </div>
//         </section>
//     );
// }





























import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubscribeBar() {
    const isDark = useTheme();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("https://modion.onrender.com/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 409) {
                toast.info("You’re already subscribed!");
                return;
            }

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to subscribe");
            }

            toast.success("Successfully subscribed! Check your inbox.");
            setEmail(""); 
        } catch (err: any) {
            toast.error(err.message || "Subscription failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Theme Variables
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const mutedText = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    const inputBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
    const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

    return (
        <section 
            // pt-32 clears the navbar. pb-0 makes it sit perfectly on top of the next section.
            className="pt-32 pb-0 transition-colors duration-500"
            style={{ backgroundColor: bg }}
        >
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Horizontal Layout: Text on Left, Stretched Input on Right */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
                    
                    {/* Left: Simple Text */}
                    <p 
                        className="text-base md:text-lg w-full md:w-[45%] leading-relaxed"
                        style={{ color: mutedText, fontFamily: FONT }}
                    >
                        Subscribe to receive exclusive stories, updates, and media directly to your inbox.
                    </p>

                    {/* Right: Stretched Form */}
                    <form 
                        onSubmit={handleSubscribe} 
                        className="w-full md:w-[55%] relative flex items-center"
                    >
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            disabled={isSubmitting}
                            className="w-full pl-6 pr-[140px] py-4 rounded-full outline-none transition-all duration-300 disabled:opacity-50"
                            style={{ 
                                backgroundColor: inputBg,
                                border: `1px solid ${inputBorder}`,
                                color: textColor,
                                fontFamily: MONO,
                                fontSize: '13px'
                            }}
                            onFocus={(e) => e.target.style.borderColor = ACCENT_COLOR}
                            onBlur={(e) => e.target.style.borderColor = inputBorder}
                        />
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                            style={{ 
                                backgroundColor: ACCENT_COLOR,
                                color: '#000000', 
                                fontFamily: MONO,
                                fontSize: '11px'
                            }}
                        >
                            {isSubmitting ? '...' : 'Subscribe'}
                            {!isSubmitting && <ArrowRight size={14} strokeWidth={2.5} />}
                        </button>
                    </form>

                </div>
                
            </div>
        </section>
    );
}
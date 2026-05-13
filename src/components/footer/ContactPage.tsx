import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

// ─── Main Contact Page Component ──────────────────────────────────────────────

export default function ContactPage() {
    const isDark = useTheme();
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            {/* Fixed: Restored max-w-7xl so it starts from the normal left edge */}
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-12 border-b pb-4" style={{ borderColor }}>
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Return to Homepage
                    </Link>
                </div>
                
                {/* ─── Clean Split Layout ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                    
                    {/* LEFT COLUMN: Text & Info */}
                    <div className="flex flex-col">
                        <span 
                            className="inline-block w-fit px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-5" 
                            style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                        >
                            Inquiry Desk
                        </span>
                        
                        <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-5" style={{ fontFamily: FONT, color: textColor }}>
                            Contact Mary's Moonwalker
                        </h1>
                        
                        <p className="text-base md:text-lg font-light leading-relaxed opacity-70 mb-10" style={{ fontFamily: FONT, color: textColor }}>
                            Whether you have rare archival footage to submit, a correction to our historical ledger, or a general inquiry, we are ready to listen.
                        </p>
                        
                        <div className="pt-8 border-t" style={{ borderColor }}>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2" style={{ fontFamily: MONO, color: textColor }}>
                                Direct Email
                            </h4>
                            <a 
                                href="mailto:hello@marysmoonwalker.com" 
                                className="text-lg transition-colors hover:text-orange-500" 
                                style={{ fontFamily: FONT, color: textColor }}
                            >
                                hello@marysmoonwalker.com
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Ultra-Simple Form */}
                    <div className="pt-2">
                        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                    Your Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                                    Your Message
                                </label>
                                <textarea 
                                    id="message" 
                                    rows={5} 
                                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base resize-none" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="group flex items-center justify-center gap-3 w-full mt-2 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90" 
                                style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                            >
                                Send Message 
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* ─── Bottom Navigation ─── */}
                <footer className="mt-24 pt-8 border-t flex justify-start" style={{ borderColor }}>
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
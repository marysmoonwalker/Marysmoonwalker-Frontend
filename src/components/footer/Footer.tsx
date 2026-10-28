import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, ArrowRight, Globe, Mail, Loader2 } from 'lucide-react';
import { outreachApi } from '../../services/outreach.service';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

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

function XIcon({ size = 18 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function Footer() {
    const isDark = useTheme();
    const textColor = '#FFFFFF';
    const mutedText = 'rgba(255,255,255,0.6)';
    const borderColor = 'rgba(255,255,255,0.15)';

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState({ text: '', type: '' });

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        setFeedbackMsg({ text: '', type: '' });

        try {
            await outreachApi.subscribe(email.trim());
            setFeedbackMsg({ text: 'You\'re in.', type: 'success' });
            setEmail('');
        } catch (error: any) {
            const status = error?.response?.status;
            if (status === 409) {
                setFeedbackMsg({ text: 'Already subscribed.', type: 'error' });
            } else {
                setFeedbackMsg({ text: 'Something went wrong.', type: 'error' });
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFeedbackMsg({ text: '', type: '' }), 4000);
        }
    };

    return (
        <footer className="relative w-full min-h-[800px] md:min-h-[900px] flex flex-col justify-end mt-20">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
                    alt="Michael Jackson Tribute"
                    className="w-full h-full object-cover object-top grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 pt-40">

                {/* Title */}
                <h2
                    className="text-5xl md:text-[7vw] leading-none mb-16 md:mb-24 opacity-90"
                    style={{ color: textColor, fontFamily: FONT }}
                >
                    Mary's Moonwalker
                </h2>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b" style={{ borderColor }}>

                    {/* COLUMN 1: Directory & Newsletter */}
                    <div className="md:col-span-4 flex flex-col justify-between gap-12">

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

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Stay Connected
                            </span>
                            <p className="text-xs leading-relaxed mb-4" style={{ color: '#FFFFFF', fontFamily: FONT }}>
                                Join our mailing list for exclusive archival deep-dives.
                            </p>
                            <form className="relative flex items-center w-full max-w-xs group" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="ENTER YOUR EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent border-b py-2 pl-0 pr-8 focus:outline-none text-[10px] uppercase tracking-widest transition-colors focus:border-orange-500 placeholder-white/40 disabled:opacity-50"
                                    style={{ borderColor, color: '#FFFFFF', fontFamily: MONO }}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="absolute right-0 text-white/40 group-hover:text-orange-500 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting
                                        ? <Loader2 size={14} className="animate-spin" />
                                        : <ArrowRight size={14} />
                                    }
                                </button>
                            </form>
                            {feedbackMsg.text && (
                                <p
                                    className="mt-2 text-[10px] uppercase tracking-widest"
                                    style={{
                                        fontFamily: MONO,
                                        color: feedbackMsg.type === 'success' ? ACCENT_COLOR : '#ff5050',
                                    }}
                                >
                                    {feedbackMsg.text}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* COLUMN 2: Donation */}
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

                    {/* COLUMN 3: Enquiries & Socials */}
                    <div className="md:col-span-4 flex flex-col justify-between gap-12 lg:pl-10">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Direct Enquiries
                            </span>
                            <p className="text-sm leading-relaxed mb-5" style={{ color: mutedText, fontFamily: FONT }}>
                                Have a question, a rare piece of media to share, or a story to tell? Our team is always listening.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all text-white hover:bg-white hover:text-black hover:border-white"
                                style={{ borderColor, fontFamily: MONO }}
                            >
                                <Mail size={14} /> Send a Message
                            </Link>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
                                Official Channels
                            </span>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={18} />, url: 'https://instagram.com' },
                                    { icon: <XIcon size={16} />, url: 'https://twitter.com' },
                                    { icon: <Youtube size={18} />, url: 'https://youtube.com' },
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
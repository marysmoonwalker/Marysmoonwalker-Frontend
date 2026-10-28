import { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { outreachApi } from '../services/outreach.service';
import { HalloweenHeroDeco } from './halloween/HalloweenHeroDeco';
import { useHalloween } from './halloween/HalloweenContext';

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

export default function SubscribeBar() {
    const isDark = useTheme();
    const { isHalloween } = useHalloween();

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const mutedText = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    const inputBg = isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF';
    const inputBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback({ text: '', type: '' });

        try {
            await outreachApi.subscribe(email.trim());
            setFeedback({ text: 'Subscribed. Check your inbox.', type: 'success' });
            setEmail('');
        } catch (error: any) {
            const status = error?.response?.status;
            if (status === 409) {
                setFeedback({ text: 'You\'re already subscribed.', type: 'error' });
            } else {
                setFeedback({ text: 'Something went wrong. Please try again.', type: 'error' });
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFeedback({ text: '', type: '' }), 4000);
        }
    };

    return (
        <section className="pt-28 pb-12 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6">
                <HalloweenHeroDeco />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">

                    {/* Left: Text */}
                    <p
                        className="text-base md:text-lg w-full md:w-[45%] leading-relaxed"
                        style={{ color: mutedText, fontFamily: FONT }}
                    >
                        {isHalloween
                            ? "Subscribe to receive exclusive Thriller stories, rare vault archives, and Michael Jackson Halloween specials directly to your inbox."
                            : "Subscribe to receive exclusive stories, updates, and media directly to your inbox."
                        }
                    </p>

                    {/* Right: Form + Feedback */}
                    <div className="w-full md:w-[55%] flex flex-col gap-2">
                        <form onSubmit={handleSubscribe} className="relative flex items-center">
                            <input
                                type="email"
                                placeholder={isHalloween ? "Enter your email... if you dare 🦇" : "Your Email Address"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                disabled={isSubmitting}
                                className="w-full pl-6 pr-[155px] py-4 rounded-full outline-none transition-all duration-300 disabled:opacity-50"
                                style={{
                                    backgroundColor: inputBg,
                                    border: isHalloween ? '1px solid rgba(255, 117, 24, 0.5)' : `1px solid ${inputBorder}`,
                                    color: textColor,
                                    fontFamily: MONO,
                                    fontSize: '13px',
                                    boxShadow: isHalloween ? '0 0 15px rgba(255, 117, 24, 0.2)' : 'none',
                                }}
                                onFocus={(e) => e.target.style.borderColor = ACCENT_COLOR}
                                onBlur={(e) => e.target.style.borderColor = isHalloween ? 'rgba(255, 117, 24, 0.5)' : inputBorder}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 rounded-full flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 whitespace-nowrap z-10"
                                style={{
                                    position: 'absolute',
                                    right: '6px',
                                    top: '6px',
                                    bottom: '6px',
                                    backgroundColor: ACCENT_COLOR,
                                    color: '#000000',
                                    fontFamily: MONO,
                                    fontSize: '11px',
                                    boxShadow: isHalloween ? '0 0 15px rgba(255, 117, 24, 0.7)' : 'none',
                                    border: 'none',
                                }}
                            >
                                {isSubmitting
                                    ? <Loader2 size={14} className="animate-spin" />
                                    : <><span>{isHalloween ? 'Join In 🎃' : 'Subscribe'}</span><ArrowRight size={14} strokeWidth={2.5} /></>
                                }
                            </button>
                        </form>

                        {feedback.text && (
                            <p
                                className="text-[10px] font-bold uppercase tracking-widest pl-2"
                                style={{
                                    fontFamily: MONO,
                                    color: feedback.type === 'success' ? ACCENT_COLOR : '#ff5050',
                                }}
                            >
                                {feedback.text}
                            </p>
                        )}
                    </div>

                </div>

            </div>
        </section>
    );
}
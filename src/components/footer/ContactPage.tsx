import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { outreachApi, ContactPayload } from '../../services/outreach.service';

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

interface ToastState {
    type:    'success' | 'error';
    message: string;
}

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
    useEffect(() => {
        const t = setTimeout(onDismiss, 4000);
        return () => clearTimeout(t);
    }, [onDismiss]);

    const isSuccess = toast.type === 'success';

    return (
        <div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-lg"
            style={{
                backgroundColor: '#0a0a0a',
                border:          `1px solid ${isSuccess ? 'rgba(255,140,0,0.4)' : 'rgba(255,80,80,0.4)'}`,
                fontFamily:      MONO,
                animation:       'slideUp 0.3s ease forwards',
            }}
        >
            {isSuccess
                ? <CheckCircle2 size={14} style={{ color: ACCENT_COLOR, flexShrink: 0 }} />
                : <XCircle      size={14} style={{ color: '#ff5050',     flexShrink: 0 }} />
            }
            <span
                className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                style={{ color: isSuccess ? ACCENT_COLOR : '#ff5050' }}
            >
                {toast.message}
            </span>
        </div>
    );
}

export default function ContactPage() {
    const isDark      = useTheme();
    const bg          = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor   = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const [form, setForm]                 = useState<ContactPayload>({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast]               = useState<ToastState | null>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await outreachApi.contact(form);
            setToast({ type: 'success', message: 'Message sent. We will be in touch shortly.' });
            setForm({ name: '', email: '', message: '' });
        } catch {
            setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">

                {/* ─── Top Navigation ─── */}
                <div className="mb-12 border-b pb-4" style={{ borderColor }}>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500"
                        style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}
                    >
                        <ArrowLeft size={14} /> Return to Homepage
                    </Link>
                </div>

                {/* ─── Split Layout ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

                    {/* LEFT: Text & Info */}
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

                    {/* RIGHT: Form */}
                    <div className="pt-2">
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b py-2.5 focus:outline-none focus:border-orange-500 transition-colors text-base"
                                    style={{ borderColor, color: textColor, fontFamily: FONT }}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b py-2.5 focus:outline-none focus:border-orange-500 transition-colors text-base"
                                    style={{ borderColor, color: textColor, fontFamily: FONT }}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b py-2.5 focus:outline-none focus:border-orange-500 transition-colors text-base resize-none"
                                    style={{ borderColor, color: textColor, fontFamily: FONT }}
                                    required
                                />
                            </div>

                            <div className="flex justify-end pt-1">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                                >
                                    {isSubmitting
                                        ? <><Loader2 size={12} className="animate-spin" /> Sending…</>
                                        : <>Send Message <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></>
                                    }
                                </button>
                            </div>

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

            {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translate(-50%, 16px); }
                    to   { opacity: 1; transform: translate(-50%, 0);     }
                }
            `}</style>
        </div>
    );
}
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, Home } from 'lucide-react';
import { AuthService } from '../../services/auth.service';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return setError('Please enter your email');

        setIsLoading(true);
        setError(null);
        try {
            await AuthService.forgotPassword(email);
            navigate('/reset-password-otp', { state: { email } });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    // Branding Tokens
    const brandGradient = 'linear-gradient(135deg, #FF8C00 0%, #FFA000 50%, #FF7518 100%)';
    const brandGlow     = 'rgba(255, 140, 0, 0.35)';

    return (
        <>
            {/* ===================== MOBILE LAYOUT ===================== */}
            <div className="lg:hidden min-h-screen w-full relative flex flex-col justify-center px-6 py-16 overflow-hidden bg-black">
                <img
                    src="https://i.pinimg.com/736x/7d/97/d1/7d97d16dbec260665d4ea02a6a4aeccb.jpg"
                    alt="Michael Jackson Performance"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />

                <div className="absolute inset-0 bg-black/60" />

                <Link
                    to="/"
                    className="absolute top-8 left-6 flex items-center gap-2 text-xs uppercase tracking-widest z-10 text-white hover:text-[#FF8C00] transition-colors"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    <Home size={15} /> Home
                </Link>

                <div className="relative z-10 w-full" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
                    <div className="text-center mb-8">
                        <h1
                            className="text-xl font-light tracking-[0.2em] mb-2"
                            style={{
                                fontFamily: 'Georgia, serif',
                                background: brandGradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            RECOVER ACCESS
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#FF8C00' }}>
                            Reset your password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                {error}
                            </div>
                        )}

                        {/* Email Address */}
                        <div>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white/50" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black group hover:scale-[0.99] active:scale-[0.98]"
                            style={{ fontFamily: 'Georgia, serif', background: brandGradient, boxShadow: `0 10px 40px ${brandGlow}` }}
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Send Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="text-center text-xs mt-10 text-white/80 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                        Remember your password? <Link to="/login" className="text-white border-b border-white hover:border-[#FF8C00] hover:text-[#FF8C00] pb-0.5 transition-all">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-[#FF8C00] transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/736x/7d/97/d1/7d97d16dbec260665d4ea02a6a4aeccb.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
                    <div className="absolute bottom-32 left-12">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'Georgia, serif', color: '#FF8C00' }}>Mary's Moonwalker</p>
                        <h2 className="text-white text-2xl font-light tracking-widest mt-2" style={{ fontFamily: 'Georgia, serif' }}>The King of Pop Lives Forever</h2>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center relative px-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 60%)', filter: 'blur(40px)' }} />

                    <div className="relative w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
                        
                        <div className="rounded-2xl px-8 py-10 bg-black/85 border border-white/10" style={{ backdropFilter: 'blur(24px)' }}>
                            <div className="text-center mb-8">
                                <h1 className="text-xl font-light tracking-[0.2em] mb-1" style={{ fontFamily: 'Georgia, serif', background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    RECOVER ACCESS
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ fontFamily: 'Georgia, serif', color: '#FF8C00' }}>
                                    Reset your password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                        {error}
                                    </div>
                                )}

                                {/* Email Address */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest ml-1 text-white/90 font-bold mb-2 block" style={{ fontFamily: 'Georgia, serif' }}>Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white/50" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 mt-6 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: brandGradient, boxShadow: `0 10px 40px ${brandGlow}` }}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Send Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>

                            <p className="text-center text-xs mt-10 text-white/80 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                                Remember your password? <Link to="/login" className="text-white hover:text-[#FF8C00] border-b border-white hover:border-[#FF8C00] pb-0.5 transition-all">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus {
                  -webkit-text-fill-color: white;
                  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
                  transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
        </>
    );
}
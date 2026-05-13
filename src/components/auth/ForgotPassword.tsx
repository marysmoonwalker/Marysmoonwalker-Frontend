// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Mail, ArrowRight, Loader2, Home } from 'lucide-react';
// import { AuthService } from '../../services/auth.service';

// export default function ForgotPassword() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!email) return setError('Please enter your email');

//         setIsLoading(true);
//         setError(null);
//         try {
//             await AuthService.forgotPassword(email);
//             navigate('/reset-password-otp', { state: { email } });
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="h-screen w-full flex overflow-hidden bg-black relative z-[100]">
            
//             <Link 
//                 to="/" 
//                 className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest z-[200]"
//                 style={{ fontFamily: 'Georgia, serif' }}
//             >
//                 <Home size={16} /> Home
//             </Link>

//             <div className="hidden lg:block lg:w-1/2 relative h-full">
//                 <img 
//                     src="https://i.pinimg.com/1200x/a6/87/df/a687df0bb5b7752ca9675f3cbbfb5331.jpg" 
//                     alt="Michael Jackson Performance" 
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black"></div>
                
//                 <div className="absolute bottom-32 left-12">
//                     <p className="text-amber-500/80 text-xs font-light tracking-[0.3em] uppercase" style={{ fontFamily: 'Georgia, serif' }}>
//                         Mary's Moonwalker
//                     </p>
//                     <h2 className="text-white/90 text-2xl font-light tracking-widest mt-2" style={{ fontFamily: 'Georgia, serif' }}>
//                         The King of Pop Lives Forever
//                     </h2>
//                 </div>
//             </div>

//             <div className="w-full lg:w-1/2 flex items-center justify-center relative px-4">
                
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
//                     style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 60%)', filter: 'blur(40px)' }}
//                 />

//                 <div className="relative w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
//                     <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #FFD700 30%, #FFA500 70%, transparent)', boxShadow: '0 0 12px rgba(255,215,0,0.4)' }} />

//                     <div className="rounded-b-2xl px-8 py-10" style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,215,0,0.15)', borderTop: 'none', backdropFilter: 'blur(24px)' }}>

//                         <div className="text-center mb-10">
//                             <h1 className="text-xl font-light tracking-[0.2em] mb-1" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(to right, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
//                                 RECOVER ACCESS
//                             </h1>
//                             <p className="text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
//                                 Enter your email to reset your password
//                             </p>
//                         </div>

//                         {error && (
//                             <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
//                                 {error}
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Email Address</label>
//                                 <div className="relative">
//                                     <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,215,0,0.3)' }} />
//                                     <input
//                                         type="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter your email"
//                                         className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-light bg-white/5 border border-white/10 outline-none focus:border-amber-500/50 transition-all text-white/90 placeholder-white/30"
//                                         style={{ fontFamily: 'Georgia, serif' }}
//                                     />
//                                 </div>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className="w-full py-3.5 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-light tracking-widest uppercase transition-all duration-500 disabled:opacity-60 bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-[0_10px_40px_rgba(255,215,0,0.15)] hover:shadow-[0_10px_50px_rgba(255,215,0,0.25)] hover:scale-[1.01]"
//                                 style={{ fontFamily: 'Georgia, serif' }}
//                             >
//                                 {isLoading ? (
//                                     <Loader2 size={18} className="animate-spin" />
//                                 ) : (
//                                     <>
//                                         Send Code <ArrowRight size={16} />
//                                     </>
//                                 )}
//                             </button>
//                         </form>

//                         <p className="text-center text-xs font-light mt-10" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Georgia, serif' }}>
//                             Remember your password? <Link to="/login" className="text-amber-500/80 hover:text-amber-500 transition-colors border-b border-amber-500/20 pb-0.5">Sign In</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes fadeInUp {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//             `}</style>
//         </div>
//     );
// }






























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
    const goldGradient = 'linear-gradient(to right, #FFD700, #FFA500)';
    const goldGlow     = 'rgba(255, 215, 0, 0.3)';

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
                    className="absolute top-8 left-6 flex items-center gap-2 text-xs uppercase tracking-widest z-10 text-white hover:text-[#FFD700] transition-colors"
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
                                background: goldGradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            RECOVER ACCESS
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>
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
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black group"
                            style={{ fontFamily: 'Georgia, serif', background: goldGradient, boxShadow: `0 10px 40px ${goldGlow}` }}
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Send Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="text-center text-xs mt-10 text-white font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                        Remember your password? <Link to="/login" className="text-white border-b border-white hover:border-[#FFD700] hover:text-[#FFD700] pb-0.5 transition-all">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/736x/7d/97/d1/7d97d16dbec260665d4ea02a6a4aeccb.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
                    <div className="absolute bottom-32 left-12">
                        <p className="text-white text-xs font-light tracking-[0.3em] uppercase" style={{ fontFamily: 'Georgia, serif' }}>Mary's Moonwalker</p>
                        <h2 className="text-white text-2xl font-light tracking-widest mt-2" style={{ fontFamily: 'Georgia, serif' }}>The King of Pop Lives Forever</h2>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center relative px-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 60%)', filter: 'blur(40px)' }} />

                    <div className="relative w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
                        
                        <div className="rounded-2xl px-8 py-10 bg-black/85 border border-white/10" style={{ backdropFilter: 'blur(24px)' }}>
                            <div className="text-center mb-8">
                                <h1 className="text-xl font-light tracking-[0.2em] mb-1" style={{ fontFamily: 'Georgia, serif', background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    RECOVER ACCESS
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] text-white uppercase" style={{ fontFamily: 'Georgia, serif' }}>
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
                                    <label className="text-[10px] uppercase tracking-widest ml-1 text-white mb-2 block" style={{ fontFamily: 'Georgia, serif' }}>Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 mt-6 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black shadow-[0_10px_40px_rgba(255,215,0,0.15)] hover:shadow-[0_10px_50px_rgba(255,215,0,0.25)] hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: goldGradient }}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Send Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>

                            <p className="text-center text-xs mt-10 text-white font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                                Remember your password? <Link to="/login" className="text-white hover:text-[#FFD700] border-b border-white hover:border-[#FFD700] pb-0.5 transition-all">Sign In</Link>
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
// import { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { ShieldCheck, ArrowLeft, Loader2, RefreshCcw, Home } from 'lucide-react';
// import { AuthService } from '../../services/auth.service';

// export default function VerifyOTP() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const email = location.state?.email || "";

//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isResending, setIsResending] = useState(false);
//     const [timer, setTimer] = useState(60);
//     const [error, setError] = useState<string | null>(null);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     useEffect(() => {
//         if (!email) {
//             navigate('/register');
//         }
//     }, [email, navigate]);

//     useEffect(() => {
//         let interval: ReturnType<typeof setInterval>;
//         if (timer > 0) {
//             interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//         }
//         return () => clearInterval(interval);
//     }, [timer]);

//     const handleChange = (index: number, value: string) => {
//         if (!/^\d*$/.test(value)) return;

//         const newOtp = [...otp];
//         newOtp[index] = value.slice(-1);
//         setOtp(newOtp);

//         if (value && index < 5) {
//             inputRefs.current[index + 1]?.focus();
//         }
//     };

//     const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//         if (e.key === 'Backspace' && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     const handleVerify = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const otpString = otp.join('');
//         if (otpString.length !== 6) {
//             setError('Please enter all 6 digits');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             await AuthService.verifyEmail(email, otpString);
//             navigate('/login', { state: { message: 'Email verified successfully! Please sign in.' } });
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Invalid or expired OTP');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleResend = async () => {
//         if (timer > 0 || isResending) return;

//         setIsResending(true);
//         setError(null);
//         try {
//             await AuthService.resendOtp(email);
//             setTimer(60);
//         } catch (err: any) {
//             setError('Failed to resend code. Please try again.');
//         } finally {
//             setIsResending(false);
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
//                     src="https://i.pinimg.com/736x/b3/32/e3/b332e3d601797f7a2a2cb312c3250cf2.jpg" 
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
//                     {/* <button
//                         onClick={() => navigate('/register')}
//                         className="flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors mb-8 text-xs uppercase tracking-widest"
//                         style={{ fontFamily: 'Georgia, serif' }}
//                     >
//                         <ArrowLeft size={14} /> Back to Register
//                     </button> */}

//                     <div className="rounded-2xl px-8 py-10" style={{
//                         background: 'rgba(0,0,0,0.85)',
//                         border: '1px solid rgba(255,215,0,0.15)',
//                         backdropFilter: 'blur(24px)',
//                         boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255,215,0,0.04)'
//                     }}>

//                         <div className="text-center mb-10">
//                             <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mx-auto mb-6 bg-amber-500/5 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
//                                 <ShieldCheck size={32} className="text-amber-500" />
//                             </div>
//                             <h1 className="text-2xl font-light tracking-widest mb-2" style={{
//                                 fontFamily: 'Georgia, serif',
//                                 background: 'linear-gradient(to right, #FFD700, #FFA500)',
//                                 WebkitBackgroundClip: 'text',
//                                 WebkitTextFillColor: 'transparent'
//                             }}>
//                                 VERIFY IDENTITY
//                             </h1>
//                             <p className="text-xs font-light tracking-wide leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.4)' }}>
//                                 We've sent a 6-digit security code to <br />
//                                 <span className="text-amber-500/80 font-normal">{email}</span>
//                             </p>
//                         </div>

//                         <form onSubmit={handleVerify} className="space-y-8">
//                             <div className="flex justify-between gap-2">
//                                 {otp.map((digit, index) => (
//                                     <input
//                                         key={index}
//                                         ref={(el) => (inputRefs.current[index] = el)}
//                                         type="text"
//                                         maxLength={1}
//                                         value={digit}
//                                         onChange={(e) => handleChange(index, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(index, e)}
//                                         className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-light rounded-xl border transition-all duration-300 outline-none"
//                                         style={{
//                                             fontFamily: 'Georgia, serif',
//                                             background: 'rgba(255,255,255,0.03)',
//                                             borderColor: error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)',
//                                             color: digit ? '#FFD700' : 'white',
//                                             boxShadow: digit ? '0 0 15px rgba(255,215,0,0.1)' : 'none'
//                                         }}
//                                         onFocus={(e) => (e.target.style.borderColor = '#FFD700')}
//                                         onBlur={(e) => (e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)')}
//                                     />
//                                 ))}
//                             </div>

//                             {error && (
//                                 <p className="text-center text-xs text-red-500 font-light" style={{ fontFamily: 'Georgia, serif' }}>
//                                     {error}
//                                 </p>
//                             )}

//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-light tracking-widest uppercase transition-all duration-300 disabled:opacity-60"
//                                 style={{
//                                     background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
//                                     color: '#000',
//                                     boxShadow: '0 8px 32px rgba(255,215,0,0.2)'
//                                 }}
//                             >
//                                 {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Verify Code"}
//                             </button>
//                         </form>

//                         <div className="mt-10 text-center">
//                             <button
//                                 onClick={handleResend}
//                                 disabled={timer > 0 || isResending}
//                                 className="inline-flex items-center gap-2 text-xs font-light tracking-widest uppercase transition-colors disabled:opacity-30"
//                                 style={{
//                                     color: timer > 0 ? 'rgba(255,255,255,0.2)' : '#FFD700',
//                                     fontFamily: 'Georgia, serif'
//                                 }}
//                             >
//                                 {isResending ? (
//                                     <Loader2 size={14} className="animate-spin" />
//                                 ) : (
//                                     <RefreshCcw size={14} />
//                                 )}
//                                 {timer > 0 ? `Resend Code in ${timer}s` : "Resend Security Code"}
//                             </button>
//                         </div>
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

























import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Loader2, RefreshCcw, Home, ArrowRight } from 'lucide-react';
import { AuthService } from '../../services/auth.service';

export default function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await AuthService.verifyEmail(email, otpString);
            navigate('/login', { state: { message: 'Email verified successfully! Please sign in.' } });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer > 0 || isResending) return;

        setIsResending(true);
        setError(null);
        try {
            await AuthService.resendOtp(email);
            setTimer(60);
        } catch (err: any) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setIsResending(false);
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
                    src="https://i.pinimg.com/736x/b3/32/e3/b332e3d601797f7a2a2cb312c3250cf2.jpg"
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
                    <div className="text-center mb-10">
                        <ShieldCheck size={40} className="mx-auto text-white mb-6" />
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
                            VERIFY EMAIL
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            Check Your Inbox
                        </p>
                        <p className="text-[10px] text-white/60" style={{ fontFamily: 'Georgia, serif' }}>
                            Verification code sent to<br/><span className="text-white">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-8">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                {error}
                            </div>
                        )}

                        <div className="flex justify-between gap-2">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => inputRefs.current[i] = el}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-14 text-center text-white text-xl font-bold bg-white/5 border border-white/20 rounded-xl outline-none focus:border-white focus:bg-white/10 transition-all"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black group"
                            style={{ fontFamily: 'Georgia, serif', background: goldGradient, boxShadow: `0 10px 40px ${goldGlow}` }}
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Verify Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <button
                            onClick={handleResend}
                            disabled={timer > 0 || isResending}
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 text-white hover:text-[#FFD700]"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            {isResending ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <RefreshCcw size={14} />
                            )}
                            {timer > 0 ? `Resend Code in ${timer}s` : "Resend Security Code"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/736x/b3/32/e3/b332e3d601797f7a2a2cb312c3250cf2.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
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
                            <div className="text-center mb-10">
                                <ShieldCheck size={40} className="mx-auto text-white mb-6" />
                                <h1 className="text-xl font-light tracking-[0.2em] mb-2" style={{ fontFamily: 'Georgia, serif', background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    VERIFY EMAIL
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                    Check Your Inbox
                                </p>
                                <p className="text-[10px] text-white/60" style={{ fontFamily: 'Georgia, serif' }}>
                                    Verification code sent to <span className="text-white">{email}</span>
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-8">
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-between gap-3">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            ref={el => inputRefs.current[i] = el}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(i, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(i, e)}
                                            className="w-12 h-14 lg:w-14 lg:h-14 text-center text-white text-xl font-bold bg-white/5 border border-white/20 rounded-xl outline-none focus:border-white focus:bg-white/10 transition-all"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black shadow-[0_10px_40px_rgba(255,215,0,0.15)] hover:shadow-[0_10px_50px_rgba(255,215,0,0.25)] hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: goldGradient }}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Verify Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>

                            <div className="mt-10 text-center">
                                <button
                                    onClick={handleResend}
                                    disabled={timer > 0 || isResending}
                                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors disabled:opacity-50 text-white hover:text-[#FFD700]"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {isResending ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <RefreshCcw size={14} />
                                    )}
                                    {timer > 0 ? `Resend Code in ${timer}s` : "Resend Security Code"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
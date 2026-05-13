// import { useState, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShieldAlert, Loader2 } from 'lucide-react';

// export default function ResetPasswordOTP() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const email = location.state?.email || "";

//     const [otp, setOtp] = useState(['', '', '', '', '', '']);
//     const [error, setError] = useState<string | null>(null);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     const handleVerify = (e: React.FormEvent) => {
//         e.preventDefault();
//         const code = otp.join('');
//         if (code.length !== 6) return setError('Enter full 6-digit code');
//         // Navigate to new password page, carrying both email and OTP
//         navigate('/new-password', { state: { email, otp: code } });
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 bg-black">
//             <div className="w-full max-w-md text-center">
//                 <div className="mb-10">
//                     <ShieldAlert size={48} className="mx-auto text-amber-500 mb-6" />
//                     <h2 className="text-xl text-white tracking-widest uppercase mb-2">Check Your Inbox</h2>
//                     <p className="text-white/40 text-xs">Verification code sent to {email}</p>
//                 </div>

//                 <form onSubmit={handleVerify} className="space-y-8">
//                     <div className="flex justify-between gap-2">
//                         {otp.map((digit, i) => (
//                             <input
//                                 key={i}
//                                 ref={el => inputRefs.current[i] = el}
//                                 type="text"
//                                 maxLength={1}
//                                 value={digit}
//                                 onChange={(e) => {
//                                     const val = e.target.value.slice(-1);
//                                     const newOtp = [...otp];
//                                     newOtp[i] = val;
//                                     setOtp(newOtp);
//                                     if (val && i < 5) inputRefs.current[i + 1]?.focus();
//                                 }}
//                                 className="w-12 h-14 text-center text-amber-500 text-xl bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500"
//                             />
//                         ))}
//                     </div>
//                     <button className="w-full py-4 rounded-xl uppercase tracking-widest bg-amber-500 text-black text-sm">Continue</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
























import { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowRight } from 'lucide-react';

export default function ResetPasswordOTP() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) return setError('Enter full 6-digit code');
        // Navigate to new password page, carrying both email and OTP
        navigate('/new-password', { state: { email, otp: code } });
    };

    // Branding Tokens
    const goldGradient = 'linear-gradient(to right, #FFD700, #FFA500)';
    const goldGlow     = 'rgba(255, 215, 0, 0.3)';

    return (
        <>
            {/* ===================== MOBILE LAYOUT ===================== */}
            <div className="lg:hidden min-h-screen w-full relative flex flex-col justify-center px-6 py-16 overflow-hidden bg-black">
                <img
                    src="https://i.pinimg.com/736x/28/4d/ab/284dab6fdcf988d58119c48c2c9fe234.jpg"
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
                        <ShieldAlert size={40} className="mx-auto text-white mb-6" />
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
                            VERIFY IDENTITY
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            Check Your Inbox
                        </p>
                        <p className="text-[10px] text-white/50" style={{ fontFamily: 'Georgia, serif' }}>
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
                                    onChange={(e) => {
                                        const val = e.target.value.slice(-1);
                                        const newOtp = [...otp];
                                        newOtp[i] = val;
                                        setOtp(newOtp);
                                        if (val && i < 5) inputRefs.current[i + 1]?.focus();
                                    }}
                                    className="w-12 h-14 text-center text-white text-xl font-bold bg-white/5 border border-white/20 rounded-xl outline-none focus:border-white focus:bg-white/10 transition-all"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 text-black group"
                            style={{ fontFamily: 'Georgia, serif', background: goldGradient, boxShadow: `0 10px 40px ${goldGlow}` }}
                        >
                            Verify Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-[#FFD700] transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/736x/28/4d/ab/284dab6fdcf988d58119c48c2c9fe234.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
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
                                <ShieldAlert size={40} className="mx-auto text-white mb-6" />
                                <h1 className="text-xl font-light tracking-[0.2em] mb-2" style={{ fontFamily: 'Georgia, serif', background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    VERIFY IDENTITY
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] text-white uppercase mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                    Check Your Inbox
                                </p>
                                <p className="text-[10px] text-white/50" style={{ fontFamily: 'Georgia, serif' }}>
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
                                            onChange={(e) => {
                                                const val = e.target.value.slice(-1);
                                                const newOtp = [...otp];
                                                newOtp[i] = val;
                                                setOtp(newOtp);
                                                if (val && i < 5) inputRefs.current[i + 1]?.focus();
                                            }}
                                            className="w-12 h-14 lg:w-14 lg:h-14 text-center text-white text-xl font-bold bg-white/5 border border-white/20 rounded-xl outline-none focus:border-white focus:bg-white/10 transition-all"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 text-black shadow-[0_10px_40px_rgba(255,215,0,0.15)] hover:shadow-[0_10px_50px_rgba(255,215,0,0.25)] hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: goldGradient }}
                                >
                                    Verify Code <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
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
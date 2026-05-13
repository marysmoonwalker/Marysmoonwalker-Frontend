// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
// import { AuthService } from '../../services/auth.service';

// export default function NewPassword() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { email, otp } = location.state || {};

//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPass, setShowPass] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) return setError('Passwords do not match');
//         if (newPassword.length < 8) return setError('Password must be at least 8 characters');

//         setIsLoading(true);
//         try {
//             await AuthService.resetPassword(email, otp, newPassword);
//             navigate('/login', { state: { message: 'Password reset successful! Sign in now.' } });
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Reset failed');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 bg-black">
//             <div className="w-full max-w-md p-8 border border-amber-500/15 rounded-2xl">
//                 <h2 className="text-2xl text-amber-500 tracking-widest text-center mb-8" style={{ fontFamily: 'Georgia, serif' }}>SET NEW PASSWORD</h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="relative">
//                         <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
//                         <input
//                             type={showPass ? 'text' : 'password'}
//                             placeholder="New Password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-500/50"
//                         />
//                         <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
//                             {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//                         </button>
//                     </div>

//                     <input
//                         type="password"
//                         placeholder="Confirm New Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-500/50"
//                     />

//                     {error && <p className="text-red-500 text-[10px] text-center">{error}</p>}

//                     <button disabled={isLoading} className="w-full py-4 rounded-xl bg-amber-500 text-black tracking-widest uppercase font-bold transition-transform hover:scale-[1.02]">
//                         {isLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Update Password"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }























import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, Loader2, Home, ArrowRight } from 'lucide-react';
import { AuthService } from '../../services/auth.service';

export default function NewPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, otp } = location.state || {};

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return setError('Passwords do not match');
        if (newPassword.length < 8) return setError('Password must be at least 8 characters');

        setIsLoading(true);
        setError(null);
        try {
            await AuthService.resetPassword(email, otp, newPassword);
            navigate('/login', { state: { message: 'Password reset successful! Sign in now.' } });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Reset failed');
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
                    src="https://i.pinimg.com/736x/a2/a8/35/a2a835045d2bcb8f7d8055c60a75f02d.jpg"
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
                            SECURE ACCOUNT
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                            Set your new password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                {error}
                            </div>
                        )}

                        {/* New Password */}
                        <div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#FFD700] transition-colors">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                <input
                                    type={showConfirmPass ? 'text' : 'password'}
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#FFD700] transition-colors">
                                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black group"
                            style={{ fontFamily: 'Georgia, serif', background: goldGradient, boxShadow: `0 10px 40px ${goldGlow}` }}
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Update Password <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
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
                    <img src="https://i.pinimg.com/736x/a2/a8/35/a2a835045d2bcb8f7d8055c60a75f02d.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
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
                                    SECURE ACCOUNT
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] text-white uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                                    Set your new password
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                        {error}
                                    </div>
                                )}

                                {/* New Password */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest ml-1 text-white mb-2 block" style={{ fontFamily: 'Georgia, serif' }}>New Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#FFD700] transition-colors">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest ml-1 text-white mb-2 block" style={{ fontFamily: 'Georgia, serif' }}>Confirm Password</label>
                                    <div className="relative">
                                        <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-white" />
                                        <input
                                            type={showConfirmPass ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-white"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#FFD700] transition-colors">
                                            {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 mt-6 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black shadow-[0_10px_40px_rgba(255,215,0,0.15)] hover:shadow-[0_10px_50px_rgba(255,215,0,0.25)] hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: goldGradient }}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Update Password <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
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
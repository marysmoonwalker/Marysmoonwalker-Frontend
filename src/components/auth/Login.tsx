// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, Home } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// export default function Login() {
//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [form, setForm] = useState({ email: '', password: '' });
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMsg, setSuccessMsg] = useState<string | null>(null);

//     useEffect(() => {
//         if (location.state?.message) {
//             setSuccessMsg(location.state.message);
//         }
//     }, [location]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccessMsg(null);

//         if (!form.email || !form.password) {
//             setError('Please fill in all fields');
//             return;
//         }

//         setIsLoading(true);
//         try {
//             await login(form.email, form.password);
//             navigate('/'); 
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Invalid email or password');
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
                
//                     src="https://i.pinimg.com/736x/44/2c/84/442c84e00d1ba6067b84eeca26e72dab.jpg"
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
//                                 SIGN IN
//                             </h1>
//                             <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: 'rgba(255,215,0,0.4)' }}>
//                                 Access the Archive
//                             </p>
//                         </div>

//                         {successMsg && (
//                             <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
//                                 {successMsg}
//                             </div>
//                         )}
//                         {error && (
//                             <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
//                                 {error}
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Email</label>
//                                 <div className="relative">
//                                     <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,215,0,0.3)' }} />
//                                     <input
//                                         type="email"
//                                         value={form.email}
//                                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                         placeholder="Enter your email"
//                                         className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-light bg-white/5 border border-white/10 outline-none focus:border-amber-500/50 transition-all text-white/90 placeholder-white/30"
//                                         style={{ fontFamily: 'Georgia, serif' }}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between items-center px-1">
//                                     <label className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Password</label>
//                                     <Link to="/forgot-password" className="text-[10px] text-amber-500/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
//                                         Forgot?
//                                     </Link>
//                                 </div>
//                                 <div className="relative">
//                                     <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,215,0,0.3)' }} />
//                                     <input
//                                         type={showPassword ? 'text' : 'password'}
//                                         value={form.password}
//                                         onChange={(e) => setForm({ ...form, password: e.target.value })}
//                                         placeholder="••••••••"
//                                         className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm font-light bg-white/5 border border-white/10 outline-none focus:border-amber-500/50 transition-all text-white/90 placeholder-white/30"
//                                         style={{ fontFamily: 'Georgia, serif' }}
//                                     />
//                                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors">
//                                         {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                                     </button>
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
//                                         Sign In <LogIn size={18} />
//                                     </>
//                                 )}
//                             </button>
//                         </form>

//                         <p className="text-center text-xs font-light mt-10" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Georgia, serif' }}>
//                             New to the Archive? <Link to="/register" className="text-amber-500/80 hover:text-amber-500 transition-colors border-b border-amber-500/20 pb-0.5">Create Account</Link>
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





















import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMsg(location.state.message);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const goldGradient = 'linear-gradient(to right, #FFD700, #FFA500)';

    return (
        <>
            {/* ===================== MOBILE LAYOUT ===================== */}
            <div className="lg:hidden min-h-screen w-full relative flex flex-col justify-center px-6 py-16 overflow-hidden bg-black">
                <img
                    src="https://i.pinimg.com/736x/44/2c/84/442c84e00d1ba6067b84eeca26e72dab.jpg"
                    alt="Michael Jackson Performance"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />

                <div className="absolute inset-0 bg-black/60" />

                <Link
                    to="/"
                    className="absolute top-8 left-6 flex items-center gap-2 text-xs uppercase tracking-widest z-10 transition-colors duration-300 text-white"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    <Home size={15} /> Home
                </Link>

                <div className="relative z-10 w-full" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
                    <div className="text-center mb-10">
                        <h1
                            className="text-2xl font-light tracking-[0.25em] mb-2"
                            style={{
                                fontFamily: 'Georgia, serif',
                                background: goldGradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            SIGN IN
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.4em] text-white" style={{ color: '#FFFFFF' }}>
                            Mary's Moonwalker
                        </p>
                    </div>

                    {successMsg && (
                        <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
                            {successMsg}
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Enter your email"
                                    className="w-full pl-11 pr-4 py-4 rounded-xl text-sm font-light outline-none transition-all border bg-white/10 border-white/20 text-white placeholder-white/40"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] uppercase tracking-widest font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-[11px] uppercase tracking-widest text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-4 rounded-xl text-sm font-light outline-none transition-all border bg-white/10 border-white/20 text-white placeholder-white/40"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-2 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase text-black"
                            style={{ fontFamily: 'Georgia, serif', background: goldGradient }}
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <> Sign In <LogIn size={17} /> </>}
                        </button>
                    </form>

                    <p className="text-center text-xs font-light mt-10 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        New to Mary's Moonwalker?{' '}
                        <Link to="/register" className="text-white border-b border-white pb-0.5">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-amber-500 transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/736x/44/2c/84/442c84e00d1ba6067b84eeca26e72dab.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
                    <div className="absolute bottom-32 left-12">
                        <p className="text-white text-xs font-light tracking-[0.3em] uppercase" style={{ fontFamily: 'Georgia, serif' }}>Mary's Moonwalker</p>
                        <h2 className="text-white text-2xl font-light tracking-widest mt-2" style={{ fontFamily: 'Georgia, serif' }}>The King of Pop Lives Forever</h2>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center relative px-4">
                    <div className="relative w-full max-w-md" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
                        <div className="h-px w-full" style={{ background: goldGradient }} />
                        <div className="rounded-b-2xl px-8 py-10 bg-black/85 border border-white/10 border-t-0" style={{ backdropFilter: 'blur(24px)' }}>
                            <div className="text-center mb-10">
                                <h1 className="text-xl font-light tracking-[0.2em] mb-1" style={{ fontFamily: 'Georgia, serif', background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SIGN IN</h1>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-white">Mary's Moonwalker</p>
                            </div>

                            {successMsg && (
                                <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
                                    {successMsg}
                                </div>
                            )}
                            {error && (
                                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-light" style={{ fontFamily: 'Georgia, serif' }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest ml-1 text-white">Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-light bg-white/5 border border-white/10 outline-none text-white placeholder-white/30" style={{ fontFamily: 'Georgia, serif' }} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] uppercase tracking-widest text-white">Password</label>
                                        <Link to="/forgot-password" className="text-[10px] text-white hover:text-[#FFD700] uppercase tracking-widest transition-colors">Forgot?</Link>
                                    </div>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                                        <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm font-light bg-white/5 border border-white/10 outline-none text-white placeholder-white/30" style={{ fontFamily: 'Georgia, serif' }} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase text-black" style={{ fontFamily: 'Georgia, serif', background: goldGradient }}>
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <> Sign In <LogIn size={18} /> </>}
                                </button>
                            </form>

                            <p className="text-center text-xs font-light mt-10 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                New to Mary's Moonwalker?{' '}
                                <Link to="/register" className="text-white border-b border-white hover:text-[#FFD700] transition-colors pb-0.5">Create Account</Link>
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
            `}</style>
        </>
    );
}
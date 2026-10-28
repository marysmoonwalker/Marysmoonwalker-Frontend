import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Loader2, CheckCircle, Home } from 'lucide-react';
import { AuthService } from '../../services/auth.service';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<typeof form & { api?: string }>>({});

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.fullName.trim()) e.fullName = 'Full name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 8) e.password = 'Minimum 8 characters';
        
        if (form.password !== form.confirmPassword) {
            e.confirmPassword = 'Passwords do not match';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await AuthService.register({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                username: form.fullName.replace(/\s+/g, '').toLowerCase()
            });
            navigate('/verify-otp', { state: { email: form.email } });
        } catch (err: any) {
            const message = err.response?.data?.message || 'Registration failed. Try again.';
            setErrors({ api: message });
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
                    src="https://i.pinimg.com/1200x/8e/cb/72/8ecb721fbc80ce1157f82f0ebf40f2f8.jpg"
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
                            MARY'S MOONWALKER
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.4em] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#FF8C00' }}>
                            Become a Moonwalker
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {errors.api && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                {errors.api}
                            </div>
                        )}

                        {/* Full Name */}
                        <div>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.fullName ? '#ef4444' : 'rgba(255,255,255,0.6)' }} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-[10px] mt-1.5 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.fullName}</p>}
                        </div>

                        {/* Email Address */}
                        <div>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.email ? '#ef4444' : 'rgba(255,255,255,0.6)' }} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] mt-1.5 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.email}</p>}
                        </div>

                        {/* Create Password */}
                        <div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.password ? '#ef4444' : 'rgba(255,255,255,0.6)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-12 pr-12 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#FF8C00] transition-colors">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] mt-1.5 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.confirmPassword ? '#ef4444' : 'rgba(255,255,255,0.6)' }} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    className="w-full pl-12 pr-12 py-4 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                    style={{ fontFamily: 'Georgia, serif', backdropFilter: 'blur(10px)' }}
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#FF8C00] transition-colors">
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1.5 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-2 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black group hover:scale-[0.99] active:scale-[0.98]"
                            style={{ fontFamily: 'Georgia, serif', background: brandGradient, boxShadow: `0 10px 40px ${brandGlow}` }}
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Create Account <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="text-center text-xs mt-8 text-white/80 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                        Already a member? <Link to="/login" className="text-white border-b border-white hover:border-[#FF8C00] hover:text-[#FF8C00] pb-0.5 transition-all">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* ===================== DESKTOP LAYOUT ===================== */}
            <div className="hidden lg:flex h-screen w-full overflow-hidden bg-black relative">
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-[#FF8C00] transition-colors text-xs uppercase tracking-widest z-[200]" style={{ fontFamily: 'Georgia, serif' }}>
                    <Home size={16} /> Home
                </Link>

                <div className="lg:w-1/2 relative h-full">
                    <img src="https://i.pinimg.com/1200x/8e/cb/72/8ecb721fbc80ce1157f82f0ebf40f2f8.jpg" alt="Michael Jackson" className="absolute inset-0 w-full h-full object-cover opacity-80" />
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
                                    MARY'S MOONWALKER
                                </h1>
                                <p className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ fontFamily: 'Georgia, serif', color: '#FF8C00' }}>
                                    Become a Moonwalker
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.api && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-light text-center" style={{ fontFamily: 'Georgia, serif' }}>
                                        {errors.api}
                                    </div>
                                )}

                                {/* Full Name */}
                                <div>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.fullName ? '#ef4444' : 'rgba(255,255,255,0.5)' }} />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={form.fullName}
                                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.fullName}</p>}
                                </div>

                                {/* Email Address */}
                                <div>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.email ? '#ef4444' : 'rgba(255,255,255,0.5)' }} />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.email}</p>}
                                </div>

                                {/* Create Password */}
                                <div>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.password ? '#ef4444' : 'rgba(255,255,255,0.5)' }} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create Password"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#FF8C00] transition-colors">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <div className="relative">
                                        <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: errors.confirmPassword ? '#ef4444' : 'rgba(255,255,255,0.5)' }} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            value={form.confirmPassword}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                            className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all border bg-white/5 border-white/20 text-white placeholder-white/30 focus:border-[#FF8C00] focus:ring-1 focus:ring-[#FF8C00]/30"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#FF8C00] transition-colors">
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>{errors.confirmPassword}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 mt-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 text-black hover:scale-[1.01] group"
                                    style={{ fontFamily: 'Georgia, serif', background: brandGradient, boxShadow: `0 10px 40px ${brandGlow}` }}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Create Account <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>

                            <p className="text-center text-xs mt-8 text-white/80 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                                Already a member? <Link to="/login" className="text-white hover:text-[#FF8C00] border-b border-white hover:border-[#FF8C00] pb-0.5 transition-all">Sign In</Link>
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
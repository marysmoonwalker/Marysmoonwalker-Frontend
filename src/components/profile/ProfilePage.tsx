// import { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, User, Shield, Clock, LogOut, MessageSquare, Heart, Archive, Camera, Loader2, CheckCircle2 } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { AuthService } from '../../services/auth.service';

// const FONT = 'Georgia, serif';
// const MONO = '"Courier New", Courier, monospace';
// const ACCENT_COLOR = '#FF8C00';

// // ─── Theme Hook ───────────────────────────────────────────────────────────────

// function useTheme() {
//     const [isDark, setIsDark] = useState<boolean>(() => {
//         const saved = localStorage.getItem('theme');
//         return saved ? saved === 'dark' : true;
//     });

//     useEffect(() => {
//         const observer = new MutationObserver(() => {
//             setIsDark(!document.documentElement.classList.contains('light-mode'));
//         });
//         observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//         const onStorage = (e: StorageEvent) => {
//             if (e.key === 'theme') setIsDark(e.newValue !== 'light');
//         };
//         window.addEventListener('storage', onStorage);
//         return () => { observer.disconnect(); window.removeEventListener('storage', onStorage); };
//     }, []);

//     return isDark;
// }

// // ─── Placeholder Data for Forums (Until your backend forum routes are ready) ──
// const placeholderActivity = [
//     { id: 1, type: 'thread', title: 'The hidden vocal layers in Smooth Criminal', category: 'Music Discussion', date: '2 days ago', icon: MessageSquare },
//     { id: 2, type: 'reply', title: 'Re: Favorite live performance of Billie Jean?', category: 'Memories', date: '5 days ago', icon: Archive },
//     { id: 3, type: 'like', title: 'Rare unseen photos from the Dangerous Tour', category: 'Rare Media', date: '1 week ago', icon: Heart },
// ];

// // ─── Main Profile Page Component ──────────────────────────────────────────────

// export default function ProfilePage() {
//     const isDark = useTheme();
//     const navigate = useNavigate();
    
//     // Pull the real user and functions from your AuthContext
//     const { user, setUser, logout } = useAuth();
    
//     const [activeTab, setActiveTab] = useState<'activity' | 'settings'>('activity');

//     // Profile Form State
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [fullName, setFullName] = useState('');
//     const [username, setUsername] = useState('');
//     const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
//     const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

//     // Password Form State
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
//     const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
//     const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     // Sync form state when the user data loads
//     useEffect(() => {
//         if (user) {
//             setFullName(user.fullName || '');
//             setUsername(user.username || '');
//         }
//     }, [user]);

//     const handleLogout = async () => {
//         await logout();
//         navigate('/');
//     };

//     // ─── Backend Actions ───

//     const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         try {
//             setIsUpdatingProfile(true);
//             await AuthService.updateProfile({ avatar: file });
            
//             // Refresh the user context to get the new avatar URL
//             const res = await AuthService.getProfile();
//             setUser(res.data);
            
//             setProfileMsg({ text: 'Avatar updated successfully', type: 'success' });
//         } catch (error) {
//             setProfileMsg({ text: 'Failed to upload avatar', type: 'error' });
//         } finally {
//             setIsUpdatingProfile(false);
//             setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
//         }
//     };

//     const handleUpdateProfile = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setIsUpdatingProfile(true);
//             await AuthService.updateProfile({ fullName, username });
            
//             // Refresh context
//             const res = await AuthService.getProfile();
//             setUser(res.data);

//             setProfileMsg({ text: 'Profile updated successfully', type: 'success' });
//         } catch (error) {
//             setProfileMsg({ text: 'Failed to update profile details', type: 'error' });
//         } finally {
//             setIsUpdatingProfile(false);
//             setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
//         }
//     };

//     const handleUpdatePassword = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setIsUpdatingPassword(true);
//             await AuthService.updatePassword(currentPassword, newPassword);
            
//             setPasswordMsg({ text: 'Password secured successfully', type: 'success' });
//             setCurrentPassword('');
//             setNewPassword('');
//         } catch (error) {
//             setPasswordMsg({ text: 'Failed to update. Check current password.', type: 'error' });
//         } finally {
//             setIsUpdatingPassword(false);
//             setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
//         }
//     };

//     if (!user) return null; // Fallback handled by ProtectedRoute

//     return (
//         <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">
                
//                 {/* ─── Top Navigation ─── */}
//                 <div className="mb-12 border-b pb-4" style={{ borderColor }}>
//                     <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
//                         <ArrowLeft size={14} /> Return to Homepage
//                     </Link>
//                 </div>

//                 {/* ─── Standard Flush-Left Header ─── */}
//                 <header className="mb-12 md:mb-16">
//                     <span 
//                         className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-4"
//                         style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                     >
//                         <User size={10} /> Patron Account
//                     </span>
//                     <h1 className="text-4xl md:text-5xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
//                         The Dossier
//                     </h1>
//                 </header>

//                 {/* ─── Split Layout Editorial Grid ─── */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
//                     {/* ─── LEFT COLUMN: The Patron Card (5 Columns) ─── */}
//                     <aside className="lg:col-span-5">
//                         <div className="sticky top-10 flex flex-col gap-6">
                            
//                             <div className="rounded-[24px] overflow-hidden border shadow-xl" style={{ borderColor, backgroundColor: cardBg }}>
                                
//                                 {/* Editable Avatar Container */}
//                                 <div className="relative w-full aspect-[4/3] bg-zinc-900 border-b group" style={{ borderColor }}>
//                                     <img 
//                                         src={user.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user._id}`} 
//                                         alt={user.username}
//                                         className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-50"
//                                     />
                                    
//                                     {/* Upload Overlay */}
//                                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                                         <button 
//                                             onClick={() => fileInputRef.current?.click()}
//                                             className="flex flex-col items-center gap-2 p-4 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-105 transition-transform"
//                                         >
//                                             <Camera size={24} className="text-orange-500" />
//                                         </button>
//                                         <input 
//                                             type="file" 
//                                             ref={fileInputRef} 
//                                             className="hidden" 
//                                             accept="image/*"
//                                             onChange={handleAvatarUpload}
//                                         />
//                                     </div>

//                                     <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-[6px] border border-white/10 pointer-events-none">
//                                         <Clock size={10} className="text-orange-500" />
//                                         <span className="text-[9px] text-white font-bold uppercase tracking-widest" style={{ fontFamily: MONO }}>
//                                             Active Patron
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="p-8">
//                                     <h2 className="text-2xl font-normal mb-1" style={{ fontFamily: FONT, color: textColor }}>
//                                         {user.fullName || user.username}
//                                     </h2>
//                                     <p className="text-[11px] font-bold uppercase tracking-widest opacity-40 mb-8" style={{ fontFamily: MONO, color: textColor }}>
//                                         {user.email}
//                                     </p>

//                                     {/* Navigation Tabs */}
//                                     <div className="flex flex-col gap-2">
//                                         <button 
//                                             onClick={() => setActiveTab('activity')}
//                                             className="flex items-center gap-3 px-5 py-3.5 rounded-[12px] text-[10px] font-bold uppercase tracking-widest transition-all"
//                                             style={{ 
//                                                 fontFamily: MONO, 
//                                                 backgroundColor: activeTab === 'activity' ? ACCENT_COLOR : 'transparent',
//                                                 color: activeTab === 'activity' ? '#000' : textColor,
//                                                 opacity: activeTab === 'activity' ? 1 : 0.6
//                                             }}
//                                         >
//                                             <Archive size={14} /> Ledger Activity
//                                         </button>
//                                         <button 
//                                             onClick={() => setActiveTab('settings')}
//                                             className="flex items-center gap-3 px-5 py-3.5 rounded-[12px] text-[10px] font-bold uppercase tracking-widest transition-all"
//                                             style={{ 
//                                                 fontFamily: MONO, 
//                                                 backgroundColor: activeTab === 'settings' ? ACCENT_COLOR : 'transparent',
//                                                 color: activeTab === 'settings' ? '#000' : textColor,
//                                                 opacity: activeTab === 'settings' ? 1 : 0.6
//                                             }}
//                                         >
//                                             <Shield size={14} /> Account Settings
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Logout Action */}
//                             <button 
//                                 onClick={handleLogout}
//                                 className="flex items-center justify-center gap-2 w-full py-4 rounded-[16px] border text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 hover:border-red-500 hover:text-red-500 transition-all"
//                                 style={{ fontFamily: MONO, color: textColor, borderColor }}
//                             >
//                                 <LogOut size={14} /> Terminate Session
//                             </button>

//                         </div>
//                     </aside>

//                     {/* ─── RIGHT COLUMN: Content Feed (7 Columns) ─── */}
//                     <div className="lg:col-span-7 pt-2">
                        
//                         {/* TAB 1: LEDGER ACTIVITY */}
//                         {activeTab === 'activity' && (
//                             <div className="animate-in flex flex-col">
//                                 <div className="flex items-center gap-3 mb-6 border-b pb-4" style={{ borderColor }}>
//                                     <Archive size={14} style={{ color: ACCENT_COLOR }} />
//                                     <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                         Recent Contributions
//                                     </h3>
//                                 </div>

//                                 <div className="flex flex-col">
//                                     {placeholderActivity.map((item) => (
//                                         <div 
//                                             key={item.id} 
//                                             className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b transition-colors hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 rounded-[16px]" 
//                                             style={{ borderColor }}
//                                         >
//                                             <div className="flex-1 min-w-0">
//                                                 <div className="flex items-center gap-3 mb-2">
//                                                     <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_COLOR, fontFamily: MONO }}>
//                                                         {item.category}
//                                                     </span>
//                                                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
//                                                     <span className="text-[9px] opacity-40 uppercase tracking-widest flex items-center gap-1.5" style={{ color: textColor, fontFamily: MONO }}>
//                                                         <item.icon size={10} /> 
//                                                         {item.type === 'thread' ? 'Created Thread' : item.type === 'reply' ? 'Replied' : 'Liked'}
//                                                     </span>
//                                                 </div>
                                                
//                                                 <h4 className="text-xl font-normal group-hover:text-orange-500 transition-colors line-clamp-1 leading-snug" style={{ color: textColor, fontFamily: FONT }}>
//                                                     {item.title}
//                                                 </h4>
//                                             </div>

//                                             <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest opacity-30 mt-2 sm:mt-0" style={{ fontFamily: MONO, color: textColor }}>
//                                                 {item.date}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* TAB 2: ACCOUNT SETTINGS */}
//                         {activeTab === 'settings' && (
//                             <div className="animate-in flex flex-col gap-16">
                                
//                                 {/* Form 1: Public Profile */}
//                                 <div>
//                                     <div className="flex items-center gap-3 mb-8 border-b pb-4" style={{ borderColor }}>
//                                         <User size={14} style={{ color: ACCENT_COLOR }} />
//                                         <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                             Public Profile
//                                         </h3>
//                                     </div>

//                                     <form className="flex flex-col gap-8" onSubmit={handleUpdateProfile}>
//                                         <div className="flex flex-col gap-2">
//                                             <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                 Full Name
//                                             </label>
//                                             <input 
//                                                 type="text" 
//                                                 value={fullName}
//                                                 onChange={(e) => setFullName(e.target.value)}
//                                                 className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
//                                                 style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                             />
//                                         </div>

//                                         <div className="flex flex-col gap-2">
//                                             <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                 Public Username
//                                             </label>
//                                             <input 
//                                                 type="text" 
//                                                 value={username}
//                                                 onChange={(e) => setUsername(e.target.value)}
//                                                 className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
//                                                 style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                             />
//                                         </div>

//                                         <div className="flex items-center gap-4 mt-4">
//                                             <button 
//                                                 type="submit" 
//                                                 disabled={isUpdatingProfile}
//                                                 className="flex items-center justify-center gap-3 w-fit px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
//                                                 style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                                             >
//                                                 {isUpdatingProfile ? <Loader2 size={14} className="animate-spin" /> : 'Save Profile'}
//                                             </button>
//                                             {profileMsg.text && (
//                                                 <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${profileMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
//                                                     {profileMsg.type === 'success' && <CheckCircle2 size={12} />}
//                                                     {profileMsg.text}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </form>
//                                 </div>

//                                 {/* Form 2: Security */}
//                                 <div>
//                                     <div className="flex items-center gap-3 mb-8 border-b pb-4" style={{ borderColor }}>
//                                         <Shield size={14} style={{ color: ACCENT_COLOR }} />
//                                         <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                             Security Credentials
//                                         </h3>
//                                     </div>

//                                     <form className="flex flex-col gap-8" onSubmit={handleUpdatePassword}>
//                                         <div className="flex flex-col gap-2">
//                                             <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                 Current Password
//                                             </label>
//                                             <input 
//                                                 type="password"
//                                                 value={currentPassword}
//                                                 onChange={(e) => setCurrentPassword(e.target.value)}
//                                                 className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
//                                                 style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                                 required 
//                                             />
//                                         </div>

//                                         <div className="flex flex-col gap-2">
//                                             <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
//                                                 New Password
//                                             </label>
//                                             <input 
//                                                 type="password" 
//                                                 value={newPassword}
//                                                 onChange={(e) => setNewPassword(e.target.value)}
//                                                 className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base" 
//                                                 style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                                 required 
//                                             />
//                                         </div>

//                                         <div className="flex items-center gap-4 mt-4">
//                                             <button 
//                                                 type="submit" 
//                                                 disabled={isUpdatingPassword}
//                                                 className="flex items-center justify-center gap-3 w-fit px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
//                                                 style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                                             >
//                                                 {isUpdatingPassword ? <Loader2 size={14} className="animate-spin" /> : 'Update Password'}
//                                             </button>
//                                             {passwordMsg.text && (
//                                                 <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${passwordMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
//                                                     {passwordMsg.type === 'success' && <CheckCircle2 size={12} />}
//                                                     {passwordMsg.text}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </form>
//                                 </div>

//                             </div>
//                         )}

//                     </div>
//                 </div>

//             </div>

//             <style>{`
//                 @keyframes fadeUp {
//                     from { opacity: 0; transform: translateY(8px); }
//                     to   { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-in { animation: fadeUp 0.4s ease forwards; }
//             `}</style>
//         </div>
//     );
// }




























import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/auth.service';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

// ─── Theme Hook ───────────────────────────────────────────────────────────────

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

// ─── Placeholder Activity Data ────────────────────────────────────────────────
const placeholderActivity = [
    { id: 1, action: 'Created Thread', title: 'The hidden vocal layers in Smooth Criminal', category: 'Music Discussion', date: '2 days ago' },
    { id: 2, action: 'Replied to', title: 'Favorite live performance of Billie Jean?', category: 'Memories', date: '5 days ago' },
    { id: 3, action: 'Liked', title: 'Rare unseen photos from the Dangerous Tour', category: 'Rare Media', date: '1 week ago' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
    const isDark = useTheme();
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuth();
    
    const [activeTab, setActiveTab] = useState<'activity' | 'profile' | 'security'>('activity');

    // Form States
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setUsername(user.username || '');
        }
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // ─── Backend Actions ───

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUpdatingProfile(true);
            await AuthService.updateProfile({ avatar: file });
            const res = await AuthService.getProfile();
            setUser(res.data);
            setProfileMsg({ text: 'Avatar updated', type: 'success' });
        } catch (error) {
            setProfileMsg({ text: 'Upload failed', type: 'error' });
        } finally {
            setIsUpdatingProfile(false);
            setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsUpdatingProfile(true);
            await AuthService.updateProfile({ fullName, username });
            const res = await AuthService.getProfile();
            setUser(res.data);
            setProfileMsg({ text: 'Profile updated', type: 'success' });
        } catch (error) {
            setProfileMsg({ text: 'Update failed', type: 'error' });
        } finally {
            setIsUpdatingProfile(false);
            setTimeout(() => setProfileMsg({ text: '', type: '' }), 3000);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsUpdatingPassword(true);
            await AuthService.updatePassword(currentPassword, newPassword);
            setPasswordMsg({ text: 'Password secured', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            setPasswordMsg({ text: 'Update failed. Check current password.', type: 'error' });
        } finally {
            setIsUpdatingPassword(false);
            setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pb-24 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Back to Homepage
                    </Link>
                </div>

                {/* ─── Minimalist Header ─── */}
                <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-20 pb-16 border-b" style={{ borderColor }}>
                    
                    {/* Clean Avatar */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border grayscale" style={{ borderColor }}>
                            <img 
                                src={user.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user._id}`} 
                                alt={user.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-orange-500 transition-colors"
                            style={{ fontFamily: MONO, color: textColor }}
                        >
                            Change Photo
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />
                    </div>

                    {/* Clean Identity Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                            Patron Dossier
                        </span>
                        <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-2" style={{ fontFamily: FONT, color: textColor }}>
                            {user.fullName || user.username}
                        </h1>
                        <p className="text-sm font-light opacity-50 mb-8" style={{ fontFamily: MONO, color: textColor }}>
                            {user.email}
                        </p>

                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-500 transition-colors"
                            style={{ fontFamily: MONO, color: textColor }}
                        >
                            <LogOut size={12} /> Sign Out
                        </button>
                    </div>
                </header>

                {/* ─── Clean Text Tabs ─── */}
                <div className="flex flex-wrap gap-8 md:gap-12 mb-16 border-b" style={{ borderColor }}>
                    {[
                        { id: 'activity', label: 'Ledger Activity' },
                        { id: 'profile', label: 'Public Profile' },
                        { id: 'security', label: 'Security' }
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative"
                            style={{ 
                                fontFamily: MONO, 
                                color: activeTab === tab.id ? ACCENT_COLOR : textColor, 
                                opacity: activeTab === tab.id ? 1 : 0.4 
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: ACCENT_COLOR }} />
                            )}
                        </button>
                    ))}
                </div>

                {/* ─── Main Content Area ─── */}
                <div className="animate-in max-w-3xl">
                    
                    {/* TAB: ACTIVITY */}
                    {activeTab === 'activity' && (
                        <div className="flex flex-col gap-2">
                            {placeholderActivity.map((item) => (
                                <div key={item.id} className="py-6 border-b" style={{ borderColor }}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                            {item.action}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                        <h4 className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
                                            {item.title}
                                        </h4>
                                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAB: PROFILE */}
                    {activeTab === 'profile' && (
                        <form className="flex flex-col gap-10" onSubmit={handleUpdateProfile}>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                    Full Name
                                </label>
                                <input 
                                    type="text" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                    Public Username
                                </label>
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                />
                            </div>

                            <div className="flex items-center gap-6 mt-6">
                                <button 
                                    type="submit" 
                                    disabled={isUpdatingProfile}
                                    className="px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
                                    style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                                >
                                    {isUpdatingProfile ? <Loader2 size={14} className="animate-spin" /> : 'Save Changes'}
                                </button>
                                {profileMsg.text && (
                                    <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${profileMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
                                        {profileMsg.type === 'success' && <CheckCircle2 size={14} />}
                                        {profileMsg.text}
                                    </span>
                                )}
                            </div>
                        </form>
                    )}

                    {/* TAB: SECURITY */}
                    {activeTab === 'security' && (
                        <form className="flex flex-col gap-10" onSubmit={handleUpdatePassword}>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                    Current Password
                                </label>
                                <input 
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                    New Password
                                </label>
                                <input 
                                    type="password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
                                    style={{ borderColor, color: textColor, fontFamily: FONT }} 
                                    required 
                                />
                            </div>

                            <div className="flex items-center gap-6 mt-6">
                                <button 
                                    type="submit" 
                                    disabled={isUpdatingPassword}
                                    className="px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
                                    style={{ border: `1px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR, fontFamily: MONO }}
                                >
                                    {isUpdatingPassword ? <Loader2 size={14} className="animate-spin" /> : 'Update Password'}
                                </button>
                                {passwordMsg.text && (
                                    <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${passwordMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
                                        {passwordMsg.type === 'success' && <CheckCircle2 size={14} />}
                                        {passwordMsg.text}
                                    </span>
                                )}
                            </div>
                        </form>
                    )}

                </div>
            </div>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-in { animation: fadeUp 0.5s ease forwards; }
            `}</style>
        </div>
    );
}
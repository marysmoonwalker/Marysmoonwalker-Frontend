// import { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Loader2, CheckCircle2, LogOut } from 'lucide-react';
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
//         return () => observer.disconnect();
//     }, []);

//     return isDark;
// }

// // ─── Placeholder Activity Data ────────────────────────────────────────────────
// const placeholderActivity = [
//     { id: 1, action: 'Created Thread', title: 'The hidden vocal layers in Smooth Criminal', category: 'Music Discussion', date: '2 days ago' },
//     { id: 2, action: 'Replied to', title: 'Favorite live performance of Billie Jean?', category: 'Memories', date: '5 days ago' },
//     { id: 3, action: 'Liked', title: 'Rare unseen photos from the Dangerous Tour', category: 'Rare Media', date: '1 week ago' },
// ];

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function ProfilePage() {
//     const isDark = useTheme();
//     const navigate = useNavigate();
//     const { user, setUser, logout } = useAuth();
    
//     const [activeTab, setActiveTab] = useState<'activity' | 'profile' | 'security'>('activity');

//     // Form States
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [fullName, setFullName] = useState('');
//     const [username, setUsername] = useState('');
//     const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
//     const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });

//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
//     const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });

//     const bg = isDark ? '#0A0A0A' : '#F8F9FA';
//     const textColor = isDark ? '#FFFFFF' : '#111111';
//     const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

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
//             const res = await AuthService.getProfile();
//             setUser(res.data);
//             setProfileMsg({ text: 'Avatar updated', type: 'success' });
//         } catch (error) {
//             setProfileMsg({ text: 'Upload failed', type: 'error' });
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
//             const res = await AuthService.getProfile();
//             setUser(res.data);
//             setProfileMsg({ text: 'Profile updated', type: 'success' });
//         } catch (error) {
//             setProfileMsg({ text: 'Update failed', type: 'error' });
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
//             setPasswordMsg({ text: 'Password secured', type: 'success' });
//             setCurrentPassword('');
//             setNewPassword('');
//         } catch (error) {
//             setPasswordMsg({ text: 'Update failed. Check current password.', type: 'error' });
//         } finally {
//             setIsUpdatingPassword(false);
//             setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
//         }
//     };

//     if (!user) return null;

//     return (
//         <div className="min-h-screen pb-24 transition-colors duration-500" style={{ backgroundColor: bg }}>
//             <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32">
                
//                 {/* ─── Top Navigation ─── */}
//                 <div className="mb-16">
//                     <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
//                         <ArrowLeft size={14} /> Back to Homepage
//                     </Link>
//                 </div>

//                 {/* ─── Minimalist Header ─── */}
//                 <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-20 pb-16 border-b" style={{ borderColor }}>
                    
//                     {/* Clean Avatar */}
//                     <div className="flex flex-col items-center gap-4 shrink-0">
//                         <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border grayscale" style={{ borderColor }}>
//                             <img 
//                                 src={user.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user._id}`} 
//                                 alt={user.username}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                         <button 
//                             onClick={() => fileInputRef.current?.click()}
//                             className="text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-orange-500 transition-colors"
//                             style={{ fontFamily: MONO, color: textColor }}
//                         >
//                             Change Photo
//                         </button>
//                         <input 
//                             type="file" 
//                             ref={fileInputRef} 
//                             className="hidden" 
//                             accept="image/*"
//                             onChange={handleAvatarUpload}
//                         />
//                     </div>

//                     {/* Clean Identity Info */}
//                     <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
//                         <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
//                             Patron Dossier
//                         </span>
//                         <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-2" style={{ fontFamily: FONT, color: textColor }}>
//                             {user.fullName || user.username}
//                         </h1>
//                         <p className="text-sm font-light opacity-50 mb-8" style={{ fontFamily: MONO, color: textColor }}>
//                             {user.email}
//                         </p>

//                         <button 
//                             onClick={handleLogout}
//                             className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-500 transition-colors"
//                             style={{ fontFamily: MONO, color: textColor }}
//                         >
//                             <LogOut size={12} /> Sign Out
//                         </button>
//                     </div>
//                 </header>

//                 {/* ─── Clean Text Tabs ─── */}
//                 <div className="flex flex-wrap gap-8 md:gap-12 mb-16 border-b" style={{ borderColor }}>
//                     {[
//                         { id: 'activity', label: 'Ledger Activity' },
//                         { id: 'profile', label: 'Public Profile' },
//                         { id: 'security', label: 'Security' }
//                     ].map((tab) => (
//                         <button 
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id as any)}
//                             className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative"
//                             style={{ 
//                                 fontFamily: MONO, 
//                                 color: activeTab === tab.id ? ACCENT_COLOR : textColor, 
//                                 opacity: activeTab === tab.id ? 1 : 0.4 
//                             }}
//                         >
//                             {tab.label}
//                             {activeTab === tab.id && (
//                                 <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: ACCENT_COLOR }} />
//                             )}
//                         </button>
//                     ))}
//                 </div>

//                 {/* ─── Main Content Area ─── */}
//                 <div className="animate-in max-w-3xl">
                    
//                     {/* TAB: ACTIVITY */}
//                     {activeTab === 'activity' && (
//                         <div className="flex flex-col gap-2">
//                             {placeholderActivity.map((item) => (
//                                 <div key={item.id} className="py-6 border-b" style={{ borderColor }}>
//                                     <div className="flex items-center gap-2 mb-3">
//                                         <span className="text-[9px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                             {item.action}
//                                         </span>
//                                         <span className="w-1 h-1 rounded-full bg-white/20" />
//                                         <span className="text-[9px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
//                                             {item.category}
//                                         </span>
//                                     </div>
//                                     <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//                                         <h4 className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
//                                             {item.title}
//                                         </h4>
//                                         <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: MONO, color: textColor }}>
//                                             {item.date}
//                                         </span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* TAB: PROFILE */}
//                     {activeTab === 'profile' && (
//                         <form className="flex flex-col gap-10" onSubmit={handleUpdateProfile}>
//                             <div className="flex flex-col gap-3">
//                                 <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                     Full Name
//                                 </label>
//                                 <input 
//                                     type="text" 
//                                     value={fullName}
//                                     onChange={(e) => setFullName(e.target.value)}
//                                     className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
//                                     style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                     Public Username
//                                 </label>
//                                 <input 
//                                     type="text" 
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
//                                     style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                 />
//                             </div>

//                             <div className="flex items-center gap-6 mt-6">
//                                 <button 
//                                     type="submit" 
//                                     disabled={isUpdatingProfile}
//                                     className="px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
//                                     style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
//                                 >
//                                     {isUpdatingProfile ? <Loader2 size={14} className="animate-spin" /> : 'Save Changes'}
//                                 </button>
//                                 {profileMsg.text && (
//                                     <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${profileMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
//                                         {profileMsg.type === 'success' && <CheckCircle2 size={14} />}
//                                         {profileMsg.text}
//                                     </span>
//                                 )}
//                             </div>
//                         </form>
//                     )}

//                     {/* TAB: SECURITY */}
//                     {activeTab === 'security' && (
//                         <form className="flex flex-col gap-10" onSubmit={handleUpdatePassword}>
//                             <div className="flex flex-col gap-3">
//                                 <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                     Current Password
//                                 </label>
//                                 <input 
//                                     type="password"
//                                     value={currentPassword}
//                                     onChange={(e) => setCurrentPassword(e.target.value)}
//                                     className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
//                                     style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                     required 
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <label className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
//                                     New Password
//                                 </label>
//                                 <input 
//                                     type="password" 
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors text-lg md:text-xl font-light" 
//                                     style={{ borderColor, color: textColor, fontFamily: FONT }} 
//                                     required 
//                                 />
//                             </div>

//                             <div className="flex items-center gap-6 mt-6">
//                                 <button 
//                                     type="submit" 
//                                     disabled={isUpdatingPassword}
//                                     className="px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50" 
//                                     style={{ border: `1px solid ${ACCENT_COLOR}`, color: ACCENT_COLOR, fontFamily: MONO }}
//                                 >
//                                     {isUpdatingPassword ? <Loader2 size={14} className="animate-spin" /> : 'Update Password'}
//                                 </button>
//                                 {passwordMsg.text && (
//                                     <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${passwordMsg.type === 'error' ? 'text-red-500' : 'text-green-500'}`} style={{ fontFamily: MONO }}>
//                                         {passwordMsg.type === 'success' && <CheckCircle2 size={14} />}
//                                         {passwordMsg.text}
//                                     </span>
//                                 )}
//                             </div>
//                         </form>
//                     )}

//                 </div>
//             </div>

//             <style>{`
//                 @keyframes fadeUp {
//                     from { opacity: 0; transform: translateY(12px); }
//                     to   { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-in { animation: fadeUp 0.5s ease forwards; }
//             `}</style>
//         </div>
//     );
// }



















import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/auth.service';
import { forumApi, IUserActivity } from '../../services/forum.service';

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACTION_LABEL: Record<IUserActivity['type'], string> = {
    thread: 'Created Thread',
    reply:  'Replied to',
    like:   'Liked',
};

const formatRelativeDate = (iso: string): string => {
    const diffMs      = Date.now() - new Date(iso).getTime();
    const diffMinutes = Math.floor(diffMs / 60_000);
    const diffHours   = Math.floor(diffMinutes / 60);
    const diffDays    = Math.floor(diffHours / 24);
    const diffWeeks   = Math.floor(diffDays / 7);
    const diffMonths  = Math.floor(diffDays / 30);

    if (diffMinutes < 60)  return `${diffMinutes}m ago`;
    if (diffHours   < 24)  return `${diffHours}h ago`;
    if (diffDays    < 7)   return `${diffDays}d ago`;
    if (diffWeeks   < 5)   return `${diffWeeks}w ago`;
    return `${diffMonths}mo ago`;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
    const isDark = useTheme();
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuth();

    const [activeTab, setActiveTab] = useState<'activity' | 'profile' | 'security'>('activity');

    // Activity state
    const [activity, setActivity]               = useState<IUserActivity[]>([]);
    const [isLoadingActivity, setIsLoadingActivity] = useState(false);
    const [activityError, setActivityError]     = useState('');

    // Form states
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fullName, setFullName]               = useState('');
    const [username, setUsername]               = useState('');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [profileMsg, setProfileMsg]           = useState({ text: '', type: '' });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword]         = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordMsg, setPasswordMsg]         = useState({ text: '', type: '' });

    const bg          = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor   = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setUsername(user.username || '');
        }
    }, [user]);

    // Fetch activity whenever the tab is selected
    const fetchActivity = useCallback(async () => {
        if (!user) return;
        setIsLoadingActivity(true);
        setActivityError('');
        try {
            const data = await forumApi.getUserActivity(user._id);
            setActivity(data);
        } catch {
            setActivityError('Could not load activity. Please try again.');
        } finally {
            setIsLoadingActivity(false);
        }
    }, [user]);

    useEffect(() => {
        if (activeTab === 'activity') {
            fetchActivity();
        }
    }, [activeTab, fetchActivity]);

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
        } catch {
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
        } catch {
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
        } catch {
            setPasswordMsg({ text: 'Update failed. Check current password.', type: 'error' });
        } finally {
            setIsUpdatingPassword(false);
            setTimeout(() => setPasswordMsg({ text: '', type: '' }), 4000);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pb-24 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-4xl mx-auto px-4 pt-24 md:pt-32">

                {/* ─── Top Navigation ─── */}
                <div className="mb-16">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-orange-500"
                        style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}
                    >
                        <ArrowLeft size={14} /> Back to Homepage
                    </Link>
                </div>

                {/* ─── Header ─── */}
                <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-20 pb-16 border-b" style={{ borderColor }}>

                    {/* Avatar — no grayscale or blur */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border" style={{ borderColor }}>
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

                    {/* Identity Info */}
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

                {/* ─── Tabs ─── */}
                <div className="flex flex-wrap gap-8 md:gap-12 mb-16 border-b" style={{ borderColor }}>
                    {[
                        { id: 'activity', label: 'Ledger Activity' },
                        { id: 'profile',  label: 'Public Profile'  },
                        { id: 'security', label: 'Security'        },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative"
                            style={{
                                fontFamily: MONO,
                                color:   activeTab === tab.id ? ACCENT_COLOR : textColor,
                                opacity: activeTab === tab.id ? 1 : 0.4,
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: ACCENT_COLOR }} />
                            )}
                        </button>
                    ))}
                </div>

                {/* ─── Content ─── */}
                <div className="animate-in">

                    {/* TAB: ACTIVITY */}
                    {activeTab === 'activity' && (
                        <div className="flex flex-col gap-2">

                            {/* Loading */}
                            {isLoadingActivity && (
                                <div className="flex items-center gap-3 py-12 opacity-40" style={{ color: textColor }}>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO }}>
                                        Loading activity…
                                    </span>
                                </div>
                            )}

                            {/* Error */}
                            {!isLoadingActivity && activityError && (
                                <div className="py-12">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-500" style={{ fontFamily: MONO }}>
                                        {activityError}
                                    </p>
                                </div>
                            )}

                            {/* Empty state */}
                            {!isLoadingActivity && !activityError && activity.length === 0 && (
                                <div className="py-12 opacity-40">
                                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                                        No forum activity yet.
                                    </p>
                                </div>
                            )}

                            {/* Activity list */}
                            {!isLoadingActivity && !activityError && activity.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/forum/${item.threadId}`}
                                    className="block py-6 border-b transition-opacity hover:opacity-80"
                                    style={{ borderColor }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                            {ACTION_LABEL[item.type]}
                                        </span>
                                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: textColor, opacity: 0.2 }} />
                                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                        <h4 className="text-xl md:text-2xl font-normal leading-snug" style={{ fontFamily: FONT, color: textColor }}>
                                            {item.title}
                                        </h4>
                                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                                            {formatRelativeDate(item.createdAt)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* TAB: PROFILE */}
                    {activeTab === 'profile' && (
                        <form className="flex flex-col gap-6" onSubmit={handleUpdateProfile}>
                            <div className="flex flex-col gap-2">
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

                            <div className="flex flex-col gap-2">
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

                            <div className="flex items-center gap-6 pt-2">
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
                        <form className="flex flex-col gap-6" onSubmit={handleUpdatePassword}>
                            <div className="flex flex-col gap-2">
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

                            <div className="flex flex-col gap-2">
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

                            <div className="flex items-center gap-6 pt-2">
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
// import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { 
//   ArrowLeft, 
//   ChevronRight, 
//   Pin, 
//   Flame, 
//   Search, 
//   X, 
//   Heart,
//   Loader2,
//   Image as ImageIcon
// } from 'lucide-react';
// import { forumApi, IForumThread, IForumReply } from '../services/forum.service';
// import { useAuth } from '../context/AuthContext';

// const FONT = 'Georgia, serif';

// const categories = [
//   { id: 'all', label: 'All Discussions' },
//   { id: 'News', label: 'News' },
//   { id: 'Rare Media', label: 'Rare Media' },
//   { id: 'Music Discussion', label: 'Music Discussion' },
//   { id: 'Family', label: 'Family' },
//   { id: 'Memories', label: 'Memories' },
//   { id: 'Tribute', label: 'Tribute' },
// ];

// export default function ForumPage() {
//   const { threadId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, isAuthenticated } = useAuth();

//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);
  
//   // --- STATE ---
//   const [activeThread, setActiveThread] = useState<IForumThread | null>(null);
//   const [replies, setReplies] = useState<IForumReply[]>([]);
//   const [threads, setThreads] = useState<IForumThread[]>([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [composing, setComposing] = useState(false);
//   const [newThread, setNewThread] = useState({ title: '', body: '', category: 'News' });
//   const [replyText, setReplyText] = useState('');
//   const [replyFile, setReplyFile] = useState<File | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   // --- AUTH REDIRECT HELPER ---
//   const redirectToLogin = () => {
//     // Save the current path so the login page knows where to send them back to
//     navigate('/login', { state: { from: location.pathname } });
//   };

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     const loadContent = async () => {
//       setLoading(true);
//       try {
//         if (threadId) {
//           const data = await forumApi.getThreadDetails(threadId);
//           setActiveThread(data.thread);
//           setReplies(data.replies);
//           // window.scrollTo(0, 0);
//         } else {
//           await fetchThreads(true);
//           setActiveThread(null);

//           // window.scrollTo(0, 0);
//         }
//       } catch (err) {
//         console.error("Content load error:", err);
//         if (!threadId) navigate('/forum');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadContent();
//   }, [threadId]);

//   const fetchThreads = useCallback(async (reset = false) => {
//     try {
//       const currentPage = reset ? 1 : page;
//       const data = await forumApi.getThreads({
//         category: activeCategory === 'all' ? undefined : activeCategory,
//         search: search || undefined,
//         page: currentPage,
//         limit: 10
//       });

//       setThreads(prev => reset ? data.threads : [...prev, ...data.threads]);
//       setHasMore(data.pagination.hasMore);
//       if (!reset) setPage(currentPage);
//     } catch (err) {
//       console.error("Error fetching threads:", err);
//     }
//   }, [activeCategory, search, page]);

//   useEffect(() => {
//     if (!threadId) fetchThreads(true);
//   }, [activeCategory, search]);

//   // --- ACTIONS ---
//   const handleNewDiscussionClick = () => {
//     if (!isAuthenticated) {
//       redirectToLogin();
//     } else {
//       setComposing(true);
//     }
//   };

//   const handleCreateThread = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!newThread.title || !newThread.body) return;
    
//     setSubmitting(true);
//     try {
//       const created = await forumApi.createThread(newThread);
//       setComposing(false);
//       setNewThread({ title: '', body: '', category: 'News' });
//       navigate(`/forum/${created._id}`); 
//     } catch (err) {
//       console.error("Thread creation failed:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePostReply = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!replyText || !activeThread) return;

//     setSubmitting(true);
//     try {
//       const addedReply = await forumApi.addReply(activeThread._id, replyText, replyFile || undefined);
//       setReplies(prev => [...prev, addedReply]);
//       setReplyText('');
//       setReplyFile(null);
//     } catch (err) {
//       console.error("Reply failed:", err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleToggleLike = async (replyId: string) => {
//     if (!isAuthenticated) return redirectToLogin();
//     try {
//       const result = await forumApi.toggleLike(replyId);
//       setReplies(prev => prev.map(r => 
//         r._id === replyId ? { ...r, likes: result.liked ? [...r.likes, user!._id] : r.likes.filter(id => id !== user!._id) } : r
//       ));
//     } catch (err) {
//       console.error("Like toggle failed:", err);
//     }
//   };

//   if (loading && !threads.length && !activeThread) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <Loader2 className="animate-spin text-amber-500" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
//       <style>{`
//         @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-in { animation: fadeIn 0.5s ease forwards; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//       `}</style>

//       {/* --- HEADER --- */}



//       <header className="pt-28 pb-10 px-6 border-b border-white/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div>
//               <h1 
//                 className="text-2xl md:text-2xl font-light tracking-[0.25em] uppercase mb-3"
//                 style={{ 
//                   fontFamily: FONT,
//                   background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent'
//                 }}
//               >
//                 COMMUNITY
//               </h1>
//             </div>

//             <button
//               onClick={handleNewDiscussionClick}
//               className="px-8 py-3 rounded-full border border-amber-500/40 bg-transparent hover:bg-amber-500/10 transition-all duration-500 text-amber-500 uppercase tracking-[0.3em] text-[10px] w-fit"
//               style={{ fontFamily: FONT }}
//             >
//               New Discussion
//             </button>
//           </div>

//           {!threadId && (
//             <div className="mt-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//               <nav className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.id}
//                     onClick={() => { setActiveCategory(cat.id); setPage(1); }}
//                     className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
//                       activeCategory === cat.id ? 'text-amber-500 font-bold' : 'text-white/60 hover:text-white'
//                     }`}
//                     style={{ fontFamily: FONT }}
//                   >
//                     {cat.label}
//                   </button>
//                 ))}
//               </nav>

//               <div className="relative w-full lg:w-64">
//                 <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40" size={12} />
//                 <input 
//                   type="text"
//                   placeholder="SEARCH FORUM"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full bg-transparent border-b border-white/20 pl-5 py-2 text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-amber-500 transition-colors placeholder:text-white/20"
//                   style={{ fontFamily: FONT }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {!threadId ? (
//           /* LIST VIEW */
//           <div className="flex flex-col">
//             {threads.map((thread) => (
//               <div 
//                 key={thread._id}
//                 onClick={() => navigate(`/forum/${thread._id}`)}
//                 className="group flex flex-col md:flex-row md:items-center py-12 border-b border-white/10 hover:bg-white/[0.02] transition-all duration-500 cursor-pointer"
//               >
//                 <div className="flex-grow min-w-0 md:pr-10">
//                   <div className="flex items-center gap-4 mb-3">
//                     <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold" style={{ fontFamily: FONT }}>
//                       {thread.category}
//                     </span>
//                     {thread.pinned && <Pin size={10} className="text-amber-500" />}
//                     {thread.hot && <Flame size={10} className="text-orange-500" />}
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-amber-200 transition-colors duration-300" style={{ fontFamily: FONT }}>
//                     {thread.title}
//                   </h3>
//                   <p className="text-sm text-white/50 font-light mt-3 italic line-clamp-1 max-w-3xl" style={{ fontFamily: FONT }}>
//                     {thread.excerpt}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between md:justify-end mt-8 md:mt-0 gap-10 shrink-0">
//                   <div className="flex items-center gap-3">
//                     <img src={thread.author.avatar} className="w-8 h-8 rounded-full border border-white/20 object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
//                     <div className="text-left">
//                       <p className="text-[10px] text-white/80 uppercase tracking-widest leading-none font-medium">{thread.author.username}</p>
//                       <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] mt-1">{thread.lastActive}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-6 text-white/20 group-hover:text-amber-500 transition-colors">
//                     <div className="text-center">
//                       <p className="text-xl font-light leading-none text-white">{thread.replyCount}</p>
//                       <p className="text-[8px] uppercase tracking-tighter mt-1 text-white/40">Replies</p>
//                     </div>
//                     <ChevronRight size={18} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {hasMore && (
//                <div className="py-20 flex justify-center">
//                  <button 
//                   onClick={() => setPage(p => p + 1)}
//                   className="px-10 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] hover:border-amber-500 transition-all"
//                  >
//                    Load More Discussions
//                  </button>
//                </div>
//             )}
//           </div>
//         ) : (
//           /* THREAD DETAIL VIEW */
//           <div className="animate-in max-w-4xl mx-auto py-10">
//             <button 
//               onClick={() => navigate('/forum')}
//               className="flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-[10px] mb-14"
//               style={{ fontFamily: FONT }}
//             >
//               <ArrowLeft size={14} /> Back to Conversations
//             </button>

//             {activeThread && (
//               <>
//                 <header className="mb-16">
//                   <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4" style={{ fontFamily: FONT }}>
//                     {activeThread.category}
//                   </span>
//                   <h2 className="text-3xl md:text-5xl font-light leading-snug mb-10 text-white" style={{ fontFamily: FONT }}>
//                     {activeThread.title}
//                   </h2>
//                   <div className="flex items-center gap-4 pt-8 border-t border-white/10">
//                     <img src={activeThread.author.avatar} className="w-10 h-10 rounded-full border border-white/20" alt="" />
//                     <div>
//                       <p className="text-sm text-white font-medium uppercase tracking-widest">{activeThread.author.username}</p>
//                       <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">{activeThread.lastActive}</p>
//                     </div>
//                   </div>
//                 </header>

//                 <div className="space-y-16 mb-20">
//                   <div className="pb-16 border-b border-white/10">
//                      <p className="text-xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: FONT }}>
//                         {activeThread.body}
//                       </p>
//                   </div>

//                   {replies.map((reply) => (
//                     <div key={reply._id} className="pb-16 border-b border-white/10">
//                       <div className="flex justify-between items-center mb-8">
//                         <div className="flex items-center gap-3">
//                           <img src={reply.author.avatar} className="w-7 h-7 rounded-full border border-white/10" alt="" />
//                           <span className="text-[11px] text-amber-400 uppercase tracking-widest font-bold">{reply.author.username}</span>
//                         </div>
//                         <span className="text-[10px] text-white/30 uppercase tracking-widest">Reply</span>
//                       </div>
                      
//                       {reply.imageUrl && (
//                         <img src={reply.imageUrl} className="max-w-full rounded-xl mb-6 border border-white/5" alt="" />
//                       )}

//                       <p className="text-xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: FONT }}>
//                         {reply.body}
//                       </p>
//                       <button 
//                         onClick={() => handleToggleLike(reply._id)}
//                         className={`flex items-center gap-2 transition-colors ${user && reply.likes.includes(user._id) ? 'text-red-500' : 'text-white/40 hover:text-red-400'}`}
//                       >
//                         <Heart size={12} fill={user && reply.likes.includes(user._id) ? 'currentColor' : 'none'} />
//                         <span className="text-[10px]">{reply.likes.length}</span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* --- REPLY BOX --- */}
//                 <div
//                     className="mt-12 border-t border-white/10 pt-10 animate-in"
//                     onClick={() => !isAuthenticated && redirectToLogin()}
//                 >
//                     <h4 className="text-[10px] uppercase tracking-[0.3em] text-white mb-4" style={{ fontFamily: FONT }}>Join the discussion</h4>

//                     <textarea
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         readOnly={!isAuthenticated}
//                         placeholder={isAuthenticated ? "What are your thoughts?" : "Click here to login and reply"}
//                         className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors h-28 resize-none mb-4 placeholder:text-white/30 text-base font-light cursor-pointer"
//                         style={{ fontFamily: FONT }}
//                     />

//                     <div className="flex items-center justify-between gap-4">
//                         <label className="flex items-center gap-2 cursor-pointer text-white hover:text-amber-500 transition-colors group">
//                             <input
//                                 type="file"
//                                 disabled={!isAuthenticated}
//                                 className="hidden"
//                                 accept="image/*"
//                                 onChange={(e) => setReplyFile(e.target.files ? e.target.files[0] : null)}
//                             />
//                             <div className="p-2 border border-white/10 rounded-full group-hover:border-amber-500/50">
//                                 <ImageIcon size={14} />
//                             </div>
//                             <span className="text-[10px] uppercase tracking-widest">
//                                 {replyFile ? replyFile.name : "Attach"}
//                             </span>
//                         </label>

//                         <button
//                             onClick={handlePostReply}
//                             disabled={submitting}
//                             className="flex items-center gap-2 px-8 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-amber-400 transition-all disabled:opacity-50"
//                         >
//                             {submitting ? <Loader2 className="animate-spin" size={14} /> : (isAuthenticated ? "Post Reply" : "Login to Reply")}
//                         </button>
//                     </div>
//                 </div>

//               </>
//             )}
//           </div>
//         )}
//       </main>

//       {/* --- NEW THREAD MODAL --- */}
//       {composing && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
//           <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setComposing(false)}></div>
//           <div className="relative w-full max-w-2xl bg-[#080808] border border-white/10 p-12 rounded-2xl shadow-2xl animate-in">
//             <button onClick={() => setComposing(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
//               <X size={18} />
//             </button>
//             <p className="text-[10px] text-amber-500/60 uppercase tracking-[0.5em] mb-2" style={{ fontFamily: FONT }}>Forum</p>
//             <h2 className="text-2xl font-light mb-10 uppercase tracking-widest text-white" style={{ fontFamily: FONT }}>New Discussion</h2>
//             <div className="space-y-8">
//               <input 
//                 type="text" 
//                 placeholder="SUBJECT TITLE" 
//                 value={newThread.title}
//                 onChange={(e) => setNewThread({...newThread, title: e.target.value})}
//                 className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-light text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-white/10"
//                 style={{ fontFamily: FONT }}
//               />
//               <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
//                 {categories.filter(c => c.id !== 'all').map(cat => (
//                   <button 
//                     key={cat.id} 
//                     onClick={() => setNewThread({...newThread, category: cat.id})}
//                     className={`shrink-0 px-4 py-2 border text-[9px] uppercase tracking-widest transition-all rounded-full ${
//                       newThread.category === cat.id ? 'border-amber-500 text-amber-500' : 'border-white/10 text-white/60'
//                     }`}
//                   >
//                     {cat.label}
//                   </button>
//                 ))}
//               </div>
//               <textarea 
//                 placeholder="What is on your mind?" 
//                 value={newThread.body}
//                 onChange={(e) => setNewThread({...newThread, body: e.target.value})}
//                 className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-6 h-40 text-lg font-light text-white focus:outline-none focus:border-amber-500/20 transition-colors placeholder:text-white/10"
//                 style={{ fontFamily: FONT }}
//               ></textarea>
//               <div className="flex justify-center pt-4">
//                 <button 
//                   onClick={handleCreateThread}
//                   disabled={submitting}
//                   className="px-16 py-4 bg-amber-500 text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-amber-400 hover:scale-[1.02] transition-all rounded-full disabled:opacity-50"
//                 >
//                   {submitting ? "Publishing..." : "Publish Discussion"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }























// import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {
//   ArrowLeft,
//   ChevronRight,
//   Pin,
//   Flame,
//   Search,
//   X,
//   Heart,
//   Loader2,
//   Image as ImageIcon,
//   SlidersHorizontal,
//   Plus,
// } from 'lucide-react';
// import { forumApi, IForumThread, IForumReply } from '../services/forum.service';
// import { useAuth } from '../context/AuthContext';

// const FONT = 'Georgia, serif';

// const categories = [
//   { id: 'all', label: 'All Discussions' },
//   { id: 'News', label: 'News' },
//   { id: 'Rare Media', label: 'Rare Media' },
//   { id: 'Music Discussion', label: 'Music Discussion' },
//   { id: 'Family', label: 'Family' },
//   { id: 'Memories', label: 'Memories' },
//   { id: 'Tribute', label: 'Tribute' },
// ];

// export default function ForumPage() {
//   const { threadId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, isAuthenticated } = useAuth();

//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   const [activeThread, setActiveThread] = useState<IForumThread | null>(null);
//   const [replies, setReplies] = useState<IForumReply[]>([]);
//   const [threads, setThreads] = useState<IForumThread[]>([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [composing, setComposing] = useState(false);
//   const [newThread, setNewThread] = useState({ title: '', body: '', category: 'News' });
//   const [replyText, setReplyText] = useState('');
//   const [replyFile, setReplyFile] = useState<File | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   const redirectToLogin = () => {
//     navigate('/login', { state: { from: location.pathname } });
//   };

//   useEffect(() => {
//     const loadContent = async () => {
//       setLoading(true);
//       try {
//         if (threadId) {
//           const data = await forumApi.getThreadDetails(threadId);
//           setActiveThread(data.thread);
//           setReplies(data.replies);
//         } else {
//           await fetchThreads(true);
//           setActiveThread(null);
//         }
//       } catch (err) {
//         console.error('Content load error:', err);
//         if (!threadId) navigate('/forum');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadContent();
//   }, [threadId]);

//   const fetchThreads = useCallback(
//     async (reset = false) => {
//       try {
//         const currentPage = reset ? 1 : page;
//         const data = await forumApi.getThreads({
//           category: activeCategory === 'all' ? undefined : activeCategory,
//           search: search || undefined,
//           page: currentPage,
//           limit: 10,
//         });
//         setThreads(prev => (reset ? data.threads : [...prev, ...data.threads]));
//         setHasMore(data.pagination.hasMore);
//         if (!reset) setPage(currentPage);
//       } catch (err) {
//         console.error('Error fetching threads:', err);
//       }
//     },
//     [activeCategory, search, page]
//   );

//   useEffect(() => {
//     if (!threadId) fetchThreads(true);
//   }, [activeCategory, search]);

//   const handleNewDiscussionClick = () => {
//     if (!isAuthenticated) redirectToLogin();
//     else setComposing(true);
//   };

//   const handleCreateThread = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!newThread.title || !newThread.body) return;
//     setSubmitting(true);
//     try {
//       const created = await forumApi.createThread(newThread);
//       setComposing(false);
//       setNewThread({ title: '', body: '', category: 'News' });
//       navigate(`/forum/${created._id}`);
//     } catch (err) {
//       console.error('Thread creation failed:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePostReply = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!replyText || !activeThread) return;
//     setSubmitting(true);
//     try {
//       const addedReply = await forumApi.addReply(activeThread._id, replyText, replyFile || undefined);
//       setReplies(prev => [...prev, addedReply]);
//       setReplyText('');
//       setReplyFile(null);
//     } catch (err) {
//       console.error('Reply failed:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleToggleLike = async (replyId: string) => {
//     if (!isAuthenticated) return redirectToLogin();
//     try {
//       const result = await forumApi.toggleLike(replyId);
//       setReplies(prev =>
//         prev.map(r =>
//           r._id === replyId
//             ? {
//                 ...r,
//                 likes: result.liked
//                   ? [...r.likes, user!._id]
//                   : r.likes.filter(id => id !== user!._id),
//               }
//             : r
//         )
//       );
//     } catch (err) {
//       console.error('Like toggle failed:', err);
//     }
//   };

//   if (loading && !threads.length && !activeThread) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <Loader2 className="animate-spin text-amber-500" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.97) translateY(10px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-in  { animation: fadeUp  0.45s ease forwards; }
//         .animate-modal{ animation: scaleIn 0.35s cubic-bezier(.16,1,.3,1) forwards; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .thread-row:hover .thread-arrow { transform: translateX(4px); }
//         .thread-arrow { transition: transform 0.3s ease; }
//         .gold-text {
//           background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .compose-area:focus { outline: none; }
//         .compose-area::placeholder { color: rgba(255,255,255,0.2); }
//       `}</style>

//       {/* ── HEADER ── */}
//       <header className="pt-24 pb-0 px-5 md:px-8 border-b border-white/[0.07]">
//         <div className="max-w-6xl mx-auto">

//           {/* Top row */}
//           <div className="flex items-center justify-between mb-8 md:mb-10">
//             <h1
//               className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase gold-text"
//               style={{ fontFamily: FONT }}
//             >
//               Community
//             </h1>

//             <button
//               onClick={handleNewDiscussionClick}
//               className="flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full border border-amber-500/30 hover:border-amber-500/70 hover:bg-amber-500/8 transition-all duration-300 text-amber-500"
//             >
//               <Plus size={13} strokeWidth={2} />
//               <span className="text-[9px] uppercase tracking-[0.25em]" style={{ fontFamily: FONT }}>
//                 New Discussion
//               </span>
//             </button>
//           </div>

//           {/* Filter bar — only on list view */}
//           {!threadId && (
//             <div className="pb-0">

//               {/* ── DESKTOP filter row ── */}
//               <div className="hidden md:flex items-center justify-between gap-6 pb-5">
//                 <nav className="flex gap-1 overflow-x-auto no-scrollbar">
//                   {categories.map(cat => (
//                     <button
//                       key={cat.id}
//                       onClick={() => { setActiveCategory(cat.id); setPage(1); }}
//                       className={`shrink-0 px-4 py-2 text-[9px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
//                         activeCategory === cat.id
//                           ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
//                           : 'text-white/40 hover:text-white/80 border border-transparent'
//                       }`}
//                       style={{ fontFamily: FONT }}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </nav>

//                 <div className="relative shrink-0 w-56">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={11} />
//                   <input
//                     type="text"
//                     placeholder="Search discussions…"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-8 pr-4 py-2 text-[10px] tracking-wide focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-white/20"
//                     style={{ fontFamily: FONT }}
//                   />
//                 </div>
//               </div>

//               {/* ── MOBILE filter row ── */}
//               <div className="flex md:hidden items-center justify-between gap-3 pb-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={11} />
//                   <input
//                     type="text"
//                     placeholder="Search…"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-8 pr-4 py-2.5 text-[10px] tracking-wide focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-white/20"
//                     style={{ fontFamily: FONT }}
//                   />
//                 </div>

//                 <button
//                   onClick={() => setFilterOpen(o => !o)}
//                   className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border transition-all duration-300 text-[9px] uppercase tracking-widest shrink-0 ${
//                     activeCategory !== 'all'
//                       ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
//                       : 'border-white/10 text-white/50 hover:border-white/30'
//                   }`}
//                 >
//                   <SlidersHorizontal size={11} />
//                   <span style={{ fontFamily: FONT }}>
//                     {activeCategory === 'all' ? 'Filter' : categories.find(c => c.id === activeCategory)?.label}
//                   </span>
//                 </button>
//               </div>

//               {/* Mobile filter drawer */}
//               {filterOpen && (
//                 <div className="flex md:hidden gap-2 flex-wrap pb-5 animate-in">
//                   {categories.map(cat => (
//                     <button
//                       key={cat.id}
//                       onClick={() => { setActiveCategory(cat.id); setPage(1); setFilterOpen(false); }}
//                       className={`px-4 py-2 text-[9px] uppercase tracking-widest rounded-full border transition-all ${
//                         activeCategory === cat.id
//                           ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
//                           : 'border-white/10 text-white/40'
//                       }`}
//                       style={{ fontFamily: FONT }}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ── MAIN ── */}
//       <main className="max-w-6xl mx-auto px-5 md:px-8 py-6">

//         {/* ── LIST VIEW ── */}
//         {!threadId ? (
//           <div className="flex flex-col divide-y divide-white/[0.06]">
//             {threads.map((thread, i) => (
//               <div
//                 key={thread._id}
//                 onClick={() => navigate(`/forum/${thread._id}`)}
//                 className="thread-row group flex flex-col md:flex-row md:items-center py-9 hover:bg-white/[0.015] -mx-5 md:-mx-8 px-5 md:px-8 transition-all duration-400 cursor-pointer animate-in"
//                 style={{ animationDelay: `${i * 40}ms` }}
//               >
//                 <div className="flex-grow min-w-0 md:pr-12">
//                   <div className="flex items-center gap-3 mb-2.5">
//                     <span
//                       className="text-[9px] uppercase tracking-[0.35em] text-amber-400/80 font-medium"
//                       style={{ fontFamily: FONT }}
//                     >
//                       {thread.category}
//                     </span>
//                     {thread.pinned && <Pin size={9} className="text-amber-500/60" />}
//                     {thread.hot && <Flame size={9} className="text-orange-500/70" />}
//                   </div>

//                   <h3
//                     className="text-xl md:text-2xl font-light text-white/90 group-hover:text-amber-100 transition-colors duration-300 leading-snug"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {thread.title}
//                   </h3>

//                   <p
//                     className="text-[13px] text-white/35 font-light mt-2 italic line-clamp-1 max-w-2xl"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {thread.excerpt}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between md:justify-end mt-6 md:mt-0 gap-8 shrink-0">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={thread.author.avatar}
//                       className="w-7 h-7 rounded-full border border-white/15 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//                       alt=""
//                     />
//                     <div>
//                       <p className="text-[9px] text-white/70 uppercase tracking-widest font-medium leading-none">
//                         {thread.author.username}
//                       </p>
//                       <p className="text-[8px] text-white/30 uppercase tracking-wider mt-1">
//                         {thread.lastActive}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-5">
//                     <div className="text-center">
//                       <p className="text-lg font-light leading-none text-white/80">{thread.replyCount}</p>
//                       <p className="text-[7px] uppercase tracking-widest mt-1 text-white/30">Replies</p>
//                     </div>
//                     <ChevronRight
//                       size={16}
//                       strokeWidth={1.5}
//                       className="thread-arrow text-white/20 group-hover:text-amber-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {hasMore && (
//               <div className="py-16 flex justify-center">
//                 <button
//                   onClick={() => setPage(p => p + 1)}
//                   className="px-10 py-3 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.25em] hover:border-amber-500/40 hover:text-amber-400 transition-all duration-300"
//                   style={{ fontFamily: FONT }}
//                 >
//                   Load More
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (

//           /* ── THREAD DETAIL VIEW ── */
//           <div className="animate-in max-w-3xl mx-auto py-10">
//             <button
//               onClick={() => navigate('/forum')}
//               className="flex items-center gap-2 text-white/30 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-[9px] mb-14"
//               style={{ fontFamily: FONT }}
//             >
//               <ArrowLeft size={13} /> Back
//             </button>

//             {activeThread && (
//               <>
//                 <header className="mb-14">
//                   <span
//                     className="text-amber-400/70 text-[9px] font-medium uppercase tracking-[0.5em] block mb-4"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {activeThread.category}
//                   </span>
//                   <h2
//                     className="text-3xl md:text-4xl font-light leading-snug mb-10 text-white"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {activeThread.title}
//                   </h2>
//                   <div className="flex items-center gap-4 pt-6 border-t border-white/[0.07]">
//                     <img src={activeThread.author.avatar} className="w-9 h-9 rounded-full border border-white/15" alt="" />
//                     <div>
//                       <p className="text-[10px] text-white font-medium uppercase tracking-widest">
//                         {activeThread.author.username}
//                       </p>
//                       <p className="text-[9px] text-white/30 uppercase tracking-wider mt-1">
//                         {activeThread.lastActive}
//                       </p>
//                     </div>
//                   </div>
//                 </header>

//                 <div className="space-y-14 mb-20">
//                   <div className="pb-14 border-b border-white/[0.07]">
//                     <p className="text-lg text-white/80 font-light leading-relaxed" style={{ fontFamily: FONT }}>
//                       {activeThread.body}
//                     </p>
//                   </div>

//                   {replies.map(reply => (
//                     <div key={reply._id} className="pb-14 border-b border-white/[0.07]">
//                       <div className="flex justify-between items-center mb-6">
//                         <div className="flex items-center gap-3">
//                           <img src={reply.author.avatar} className="w-7 h-7 rounded-full border border-white/10" alt="" />
//                           <span className="text-[10px] text-amber-400 uppercase tracking-widest font-medium">
//                             {reply.author.username}
//                           </span>
//                         </div>
//                         <span className="text-[8px] text-white/20 uppercase tracking-widest">Reply</span>
//                       </div>

//                       {reply.imageUrl && (
//                         <img
//                           src={reply.imageUrl}
//                           className="max-w-full rounded-xl mb-6 border border-white/[0.06]"
//                           alt=""
//                         />
//                       )}

//                       <p className="text-lg text-white/80 font-light leading-relaxed mb-6" style={{ fontFamily: FONT }}>
//                         {reply.body}
//                       </p>

//                       <button
//                         onClick={() => handleToggleLike(reply._id)}
//                         className={`flex items-center gap-2 transition-colors ${
//                           user && reply.likes.includes(user._id)
//                             ? 'text-red-400'
//                             : 'text-white/30 hover:text-red-400'
//                         }`}
//                       >
//                         <Heart size={12} fill={user && reply.likes.includes(user._id) ? 'currentColor' : 'none'} />
//                         <span className="text-[10px]">{reply.likes.length}</span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* ── REPLY COMPOSE BOX ── */}
//                 <div
//                   className="mt-12 border border-white/[0.08] rounded-2xl bg-white/[0.02] overflow-hidden"
//                   onClick={() => !isAuthenticated && redirectToLogin()}
//                 >
//                   <div className="px-6 pt-5 pb-2">
//                     <p
//                       className="text-[9px] uppercase tracking-[0.35em] text-white/30 mb-3"
//                       style={{ fontFamily: FONT }}
//                     >
//                       Join the discussion
//                     </p>
//                     <textarea
//                       value={replyText}
//                       onChange={e => setReplyText(e.target.value)}
//                       readOnly={!isAuthenticated}
//                       placeholder={isAuthenticated ? 'What are your thoughts?' : 'Sign in to join the discussion…'}
//                       rows={4}
//                       className="compose-area w-full bg-transparent text-white/80 font-light text-base resize-none placeholder:text-white/20 leading-relaxed"
//                       style={{ fontFamily: FONT }}
//                     />
//                   </div>

//                   <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06] bg-white/[0.015]">
//                     <label className="flex items-center gap-2 cursor-pointer text-white/40 hover:text-amber-400 transition-colors group">
//                       <input
//                         type="file"
//                         disabled={!isAuthenticated}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={e => setReplyFile(e.target.files ? e.target.files[0] : null)}
//                       />
//                       <ImageIcon size={14} />
//                       <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: FONT }}>
//                         {replyFile ? replyFile.name : 'Attach'}
//                       </span>
//                     </label>

//                     <button
//                       onClick={handlePostReply}
//                       disabled={submitting}
//                       className="flex items-center gap-2 px-7 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-widest text-[9px] rounded-full hover:bg-amber-400 transition-all disabled:opacity-50"
//                       style={{ fontFamily: FONT }}
//                     >
//                       {submitting ? (
//                         <Loader2 className="animate-spin" size={13} />
//                       ) : isAuthenticated ? (
//                         'Post Reply'
//                       ) : (
//                         'Login to Reply'
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </main>

//       {/* ── NEW THREAD MODAL ── */}
//       {composing && (
//         <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-0 md:px-6">
//           <div
//             className="absolute inset-0 bg-black/90 backdrop-blur-lg"
//             onClick={() => setComposing(false)}
//           />

//           <div className="relative w-full md:max-w-2xl bg-[#0a0a0a] border border-white/[0.08] md:rounded-2xl rounded-t-3xl shadow-2xl animate-modal overflow-hidden">

//             {/* Modal header */}
//             <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
//               <div>
//                 <p className="text-[8px] text-amber-500/50 uppercase tracking-[0.5em] mb-1" style={{ fontFamily: FONT }}>
//                   Community
//                 </p>
//                 <h2 className="text-lg font-light uppercase tracking-widest text-white" style={{ fontFamily: FONT }}>
//                   New Discussion
//                 </h2>
//               </div>
//               <button onClick={() => setComposing(false)} className="text-white/30 hover:text-white transition-colors p-1">
//                 <X size={17} />
//               </button>
//             </div>

//             {/* Compose area — mirrors the reply box style */}
//             <div className="px-7 pt-5 pb-3">
//               <input
//                 type="text"
//                 placeholder="Give your discussion a title…"
//                 value={newThread.title}
//                 onChange={e => setNewThread({ ...newThread, title: e.target.value })}
//                 className="w-full bg-transparent text-white text-xl font-light focus:outline-none placeholder:text-white/15 mb-5 border-b border-white/[0.07] pb-4"
//                 style={{ fontFamily: FONT }}
//               />

//               <textarea
//                 placeholder="What's on your mind?"
//                 value={newThread.body}
//                 onChange={e => setNewThread({ ...newThread, body: e.target.value })}
//                 rows={5}
//                 className="compose-area w-full bg-transparent text-white/80 font-light text-base resize-none placeholder:text-white/20 leading-relaxed"
//                 style={{ fontFamily: FONT }}
//               />
//             </div>

//             {/* Category + action row */}
//             <div className="px-7 py-4 border-t border-white/[0.06] bg-white/[0.015]">
//               <div className="flex items-center justify-between gap-4 flex-wrap">
//                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
//                   {categories
//                     .filter(c => c.id !== 'all')
//                     .map(cat => (
//                       <button
//                         key={cat.id}
//                         onClick={() => setNewThread({ ...newThread, category: cat.id })}
//                         className={`shrink-0 px-3.5 py-1.5 border text-[8px] uppercase tracking-widest transition-all rounded-full ${
//                           newThread.category === cat.id
//                             ? 'border-amber-500/60 text-amber-400 bg-amber-500/10'
//                             : 'border-white/10 text-white/40 hover:border-white/25'
//                         }`}
//                         style={{ fontFamily: FONT }}
//                       >
//                         {cat.label}
//                       </button>
//                     ))}
//                 </div>

//                 <button
//                   onClick={handleCreateThread}
//                   disabled={submitting}
//                   className="shrink-0 flex items-center gap-2 px-7 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-widest text-[9px] rounded-full hover:bg-amber-400 transition-all disabled:opacity-50"
//                   style={{ fontFamily: FONT }}
//                 >
//                   {submitting ? <Loader2 className="animate-spin" size={13} /> : 'Publish'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }































// import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {
//   ArrowLeft,
//   ChevronRight,
//   Pin,
//   Flame,
//   Search,
//   X,
//   Heart,
//   Loader2,
//   Image as ImageIcon,
//   SlidersHorizontal,
//   Plus,
// } from 'lucide-react';
// import { forumApi, IForumThread, IForumReply } from '../services/forum.service';
// import { useAuth } from '../context/AuthContext';

// const FONT = 'Georgia, serif';

// const categories = [
//   { id: 'all', label: 'All Discussions' },
//   { id: 'News', label: 'News' },
//   { id: 'Rare Media', label: 'Rare Media' },
//   { id: 'Music Discussion', label: 'Music Discussion' },
//   { id: 'Family', label: 'Family' },
//   { id: 'Memories', label: 'Memories' },
//   { id: 'Tribute', label: 'Tribute' },
// ];

// export default function ForumPage() {
//   const { threadId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, isAuthenticated } = useAuth();

//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   const [activeThread, setActiveThread] = useState<IForumThread | null>(null);
//   const [replies, setReplies] = useState<IForumReply[]>([]);
//   const [threads, setThreads] = useState<IForumThread[]>([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filterOpen, setFilterOpen] = useState(false);

//   const [composing, setComposing] = useState(false);
//   const [newThread, setNewThread] = useState({ title: '', body: '', category: 'News' });
//   const [replyText, setReplyText] = useState('');
//   const [replyFile, setReplyFile] = useState<File | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   const redirectToLogin = () => {
//     navigate('/login', { state: { from: location.pathname } });
//   };

//   useEffect(() => {
//     const loadContent = async () => {
//       setLoading(true);
//       try {
//         if (threadId) {
//           const data = await forumApi.getThreadDetails(threadId);
//           setActiveThread(data.thread);
//           setReplies(data.replies);
//         } else {
//           await fetchThreads(true);
//           setActiveThread(null);
//         }
//       } catch (err) {
//         console.error('Content load error:', err);
//         if (!threadId) navigate('/forum');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadContent();
//   }, [threadId]);

//   const fetchThreads = useCallback(
//     async (reset = false) => {
//       try {
//         const currentPage = reset ? 1 : page;
//         const data = await forumApi.getThreads({
//           category: activeCategory === 'all' ? undefined : activeCategory,
//           search: search || undefined,
//           page: currentPage,
//           limit: 10,
//         });
//         setThreads(prev => (reset ? data.threads : [...prev, ...data.threads]));
//         setHasMore(data.pagination.hasMore);
//         if (!reset) setPage(currentPage);
//       } catch (err) {
//         console.error('Error fetching threads:', err);
//       }
//     },
//     [activeCategory, search, page]
//   );

//   useEffect(() => {
//     if (!threadId) fetchThreads(true);
//   }, [activeCategory, search]);

//   const handleNewDiscussionClick = () => {
//     if (!isAuthenticated) redirectToLogin();
//     else setComposing(true);
//   };

//   const handleCreateThread = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!newThread.title || !newThread.body) return;
//     setSubmitting(true);
//     try {
//       const created = await forumApi.createThread(newThread);
//       setComposing(false);
//       setNewThread({ title: '', body: '', category: 'News' });
//       navigate(`/forum/${created._id}`);
//     } catch (err) {
//       console.error('Thread creation failed:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePostReply = async () => {
//     if (!isAuthenticated) return redirectToLogin();
//     if (!replyText || !activeThread) return;
//     setSubmitting(true);
//     try {
//       const addedReply = await forumApi.addReply(activeThread._id, replyText, replyFile || undefined);
//       setReplies(prev => [...prev, addedReply]);
//       setReplyText('');
//       setReplyFile(null);
//     } catch (err) {
//       console.error('Reply failed:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleToggleLike = async (replyId: string) => {
//     if (!isAuthenticated) return redirectToLogin();
//     try {
//       const result = await forumApi.toggleLike(replyId);
//       setReplies(prev =>
//         prev.map(r =>
//           r._id === replyId
//             ? {
//                 ...r,
//                 likes: result.liked
//                   ? [...r.likes, user!._id]
//                   : r.likes.filter(id => id !== user!._id),
//               }
//             : r
//         )
//       );
//     } catch (err) {
//       console.error('Like toggle failed:', err);
//     }
//   };

//   if (loading && !threads.length && !activeThread) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <Loader2 className="animate-spin text-amber-500" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.97) translateY(10px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-in  { animation: fadeUp  0.45s ease forwards; }
//         .animate-modal{ animation: scaleIn 0.35s cubic-bezier(.16,1,.3,1) forwards; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .thread-row:hover .thread-arrow { transform: translateX(4px); }
//         .thread-arrow { transition: transform 0.3s ease; }
//         .gold-text {
//           background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .compose-area:focus { outline: none; }
//         .compose-area::placeholder { color: rgba(255,255,255,0.2); }
//       `}</style>

//       {/* ── HEADER ── */}
//       <header className="pt-24 pb-0 px-5 md:px-8 border-b border-white/[0.07]">
//         <div className="max-w-6xl mx-auto">

//           {/* Top row */}
//           <div className="flex items-center justify-between mb-8 md:mb-10">
//             <h1
//               className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase gold-text"
//               style={{ fontFamily: FONT }}
//             >
//               Community
//             </h1>

//             <button
//               onClick={handleNewDiscussionClick}
//               className="flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full border border-amber-500/30 hover:border-amber-500/70 hover:bg-amber-500/8 transition-all duration-300 text-amber-500"
//             >
//               <Plus size={13} strokeWidth={2} />
//               <span className="text-[9px] uppercase tracking-[0.25em]" style={{ fontFamily: FONT }}>
//                 New 
//               </span>
//             </button>
//           </div>

//           {/* Filter bar — only on list view */}
//           {!threadId && (
//             <div className="pb-0">

//               {/* ── DESKTOP filter row ── */}
//               <div className="hidden md:flex items-center justify-between gap-6 pb-5">
//                 <nav className="flex gap-1 overflow-x-auto no-scrollbar">
//                   {categories.map(cat => (
//                     <button
//                       key={cat.id}
//                       onClick={() => { setActiveCategory(cat.id); setPage(1); }}
//                       className={`shrink-0 px-4 py-2 text-[9px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
//                         activeCategory === cat.id
//                           ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
//                           : 'text-white/40 hover:text-white/80 border border-transparent'
//                       }`}
//                       style={{ fontFamily: FONT }}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </nav>

//                 <div className="relative shrink-0 w-56">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={11} />
//                   <input
//                     type="text"
//                     placeholder="Search discussions…"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-8 pr-4 py-2 text-[10px] tracking-wide focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-white/20"
//                     style={{ fontFamily: FONT }}
//                   />
//                 </div>
//               </div>

//               {/* ── MOBILE filter row ── */}
//               <div className="flex md:hidden items-center justify-between gap-3 pb-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={11} />
//                   <input
//                     type="text"
//                     placeholder="Search…"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-8 pr-4 py-2.5 text-[10px] tracking-wide focus:outline-none focus:border-amber-500/40 transition-colors placeholder:text-white/20"
//                     style={{ fontFamily: FONT }}
//                   />
//                 </div>

//                 <button
//                   onClick={() => setFilterOpen(o => !o)}
//                   className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border transition-all duration-300 text-[9px] uppercase tracking-widest shrink-0 ${
//                     activeCategory !== 'all'
//                       ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
//                       : 'border-white/10 text-white/50 hover:border-white/30'
//                   }`}
//                 >
//                   <SlidersHorizontal size={11} />
//                   <span style={{ fontFamily: FONT }}>
//                     {activeCategory === 'all' ? 'Filter' : categories.find(c => c.id === activeCategory)?.label}
//                   </span>
//                 </button>
//               </div>

//               {/* Mobile filter drawer */}
//               {filterOpen && (
//                 <div className="flex md:hidden gap-2 flex-wrap pb-5 animate-in">
//                   {categories.map(cat => (
//                     <button
//                       key={cat.id}
//                       onClick={() => { setActiveCategory(cat.id); setPage(1); setFilterOpen(false); }}
//                       className={`px-4 py-2 text-[9px] uppercase tracking-widest rounded-full border transition-all ${
//                         activeCategory === cat.id
//                           ? 'border-amber-500/50 text-amber-400 bg-amber-500/10'
//                           : 'border-white/10 text-white/40'
//                       }`}
//                       style={{ fontFamily: FONT }}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ── MAIN ── */}
//       <main className="max-w-6xl mx-auto px-5 md:px-8 py-6">

//         {/* ── LIST VIEW ── */}
//         {!threadId ? (
//           <div className="flex flex-col divide-y divide-white/[0.06]">
//             {threads.map((thread, i) => (
//               <div
//                 key={thread._id}
//                 onClick={() => navigate(`/forum/${thread._id}`)}
//                 className="thread-row group flex flex-col md:flex-row md:items-center py-9 hover:bg-white/[0.015] -mx-5 md:-mx-8 px-5 md:px-8 transition-all duration-400 cursor-pointer animate-in"
//                 style={{ animationDelay: `${i * 40}ms` }}
//               >
//                 <div className="flex-grow min-w-0 md:pr-12">
//                   <div className="flex items-center gap-3 mb-2.5">
//                     <span
//                       className="text-[9px] uppercase tracking-[0.35em] text-amber-400/80 font-medium"
//                       style={{ fontFamily: FONT }}
//                     >
//                       {thread.category}
//                     </span>
//                     {thread.pinned && <Pin size={9} className="text-amber-500/60" />}
//                     {thread.hot && <Flame size={9} className="text-orange-500/70" />}
//                   </div>

//                   <h3
//                     className="text-xl md:text-2xl font-light text-white/90 group-hover:text-amber-100 transition-colors duration-300 leading-snug"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {thread.title}
//                   </h3>

//                   <p
//                     className="text-[13px] text-white/35 font-light mt-2 italic line-clamp-1 max-w-2xl"
//                     style={{ fontFamily: FONT }}
//                   >
//                     {thread.excerpt}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between md:justify-end mt-6 md:mt-0 gap-8 shrink-0">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={thread.author.avatar}
//                       className="w-7 h-7 rounded-full border border-white/15 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//                       alt=""
//                     />
//                     <div>
//                       <p className="text-[9px] text-white/70 uppercase tracking-widest font-medium leading-none">
//                         {thread.author.username}
//                       </p>
//                       <p className="text-[8px] text-white/30 uppercase tracking-wider mt-1">
//                         {thread.lastActive}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-5">
//                     <div className="text-center">
//                       <p className="text-lg font-light leading-none text-white/80">{thread.replyCount}</p>
//                       <p className="text-[7px] uppercase tracking-widest mt-1 text-white/30">Replies</p>
//                     </div>
//                     <ChevronRight
//                       size={16}
//                       strokeWidth={1.5}
//                       className="thread-arrow text-white/20 group-hover:text-amber-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {hasMore && (
//               <div className="py-16 flex justify-center">
//                 <button
//                   onClick={() => setPage(p => p + 1)}
//                   className="px-10 py-3 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.25em] hover:border-amber-500/40 hover:text-amber-400 transition-all duration-300"
//                   style={{ fontFamily: FONT }}
//                 >
//                   Load More
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (

//           /* ── THREAD DETAIL VIEW ── */
//           <div className="animate-in max-w-3xl mx-auto py-10">

//             <button 
//               onClick={() => navigate('/forum')}
//               className="flex items-center gap-2 text-white/40 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] text-[10px] mb-14"
//               style={{ fontFamily: FONT }}
//             >
//               <ArrowLeft size={14} /> Back to Conversations
//             </button>

//             {activeThread && (
//               <>
//                 <header className="mb-16">
//                   <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4" style={{ fontFamily: FONT }}>
//                     {activeThread.category}
//                   </span>
//                   <h2 className="text-3xl md:text-5xl font-light leading-snug mb-10 text-white" style={{ fontFamily: FONT }}>
//                     {activeThread.title}
//                   </h2>
//                   <div className="flex items-center gap-4 pt-8 border-t border-white/10">
//                     <img src={activeThread.author.avatar} className="w-10 h-10 rounded-full border border-white/20" alt="" />
//                     <div>
//                       <p className="text-sm text-white font-medium uppercase tracking-widest">{activeThread.author.username}</p>
//                       <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">{activeThread.lastActive}</p>
//                     </div>
//                   </div>
//                 </header>

//                 <div className="space-y-16 mb-20">
//                   <div className="pb-16 border-b border-white/10">
//                     <p className="text-xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: FONT }}>
//                       {activeThread.body}
//                     </p>
//                   </div>

//                   {replies.map((reply) => (
//                     <div key={reply._id} className="pb-16 border-b border-white/10">
//                       <div className="flex justify-between items-center mb-8">
//                         <div className="flex items-center gap-3">
//                           <img src={reply.author.avatar} className="w-7 h-7 rounded-full border border-white/10" alt="" />
//                           <span className="text-[11px] text-amber-400 uppercase tracking-widest font-bold">{reply.author.username}</span>
//                         </div>
//                         <span className="text-[10px] text-white/30 uppercase tracking-widest">Reply</span>
//                       </div>

//                       {reply.imageUrl && (
//                         <img src={reply.imageUrl} className="max-w-full rounded-xl mb-6 border border-white/5" alt="" />
//                       )}

//                       <p className="text-xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: FONT }}>
//                         {reply.body}
//                       </p>
//                       <button
//                         onClick={() => handleToggleLike(reply._id)}
//                         className={`flex items-center gap-2 transition-colors ${user && reply.likes.includes(user._id) ? 'text-red-500' : 'text-white/40 hover:text-red-400'}`}
//                       >
//                         <Heart size={12} fill={user && reply.likes.includes(user._id) ? 'currentColor' : 'none'} />
//                         <span className="text-[10px]">{reply.likes.length}</span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* ── REPLY BOX ── */}
//                 <div
//                   className="mt-12 border-t border-white/10 pt-10 animate-in"
//                   onClick={() => !isAuthenticated && redirectToLogin()}
//                 >
//                   <h4 className="text-[10px] uppercase tracking-[0.3em] text-white mb-4" style={{ fontFamily: FONT }}>Join the discussion</h4>

//                   <textarea
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     readOnly={!isAuthenticated}
//                     placeholder={isAuthenticated ? "What are your thoughts?" : "Click here to login and reply"}
//                     className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors h-28 resize-none mb-4 placeholder:text-white/30 text-base font-light cursor-pointer"
//                     style={{ fontFamily: FONT }}
//                   />

//                   <div className="flex items-center justify-between gap-4">
//                     <label className="flex items-center gap-2 cursor-pointer text-white hover:text-amber-500 transition-colors group">
//                       <input
//                         type="file"
//                         disabled={!isAuthenticated}
//                         className="hidden"
//                         accept="image/*"
//                         onChange={(e) => setReplyFile(e.target.files ? e.target.files[0] : null)}
//                       />
//                       <div className="p-2 border border-white/10 rounded-full group-hover:border-amber-500/50">
//                         <ImageIcon size={14} />
//                       </div>
//                       <span className="text-[10px] uppercase tracking-widest">
//                         {replyFile ? replyFile.name : "Attach"}
//                       </span>
//                     </label>

//                     <button
//                       onClick={handlePostReply}
//                       disabled={submitting}
//                       className="flex items-center gap-2 px-8 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-amber-400 transition-all disabled:opacity-50"
//                     >
//                       {submitting ? <Loader2 className="animate-spin" size={14} /> : (isAuthenticated ? "Post Reply" : "Login to Reply")}
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </main>

//       {/* ── NEW THREAD MODAL ── */}
//       {composing && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
//           <div
//             className="absolute inset-0 bg-black/90 backdrop-blur-lg"
//             onClick={() => setComposing(false)}
//           />

//           <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl animate-modal overflow-hidden">

//             {/* Modal header */}
//             <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
//               <div>
//                 <p className="text-[8px] text-amber-500/50 uppercase tracking-[0.5em] mb-1" style={{ fontFamily: FONT }}>
//                   Community
//                 </p>
//                 <h2 className="text-lg font-light uppercase tracking-widest text-white" style={{ fontFamily: FONT }}>
//                   New Discussion
//                 </h2>
//               </div>
//               <button onClick={() => setComposing(false)} className="text-white/30 hover:text-white transition-colors p-1">
//                 <X size={17} />
//               </button>
//             </div>

//             {/* Compose area — mirrors the reply box style */}
//             <div className="px-7 pt-5 pb-3">
//               <input
//                 type="text"
//                 placeholder="Give your discussion a title…"
//                 value={newThread.title}
//                 onChange={e => setNewThread({ ...newThread, title: e.target.value })}
//                 className="w-full bg-transparent text-white text-xl font-light focus:outline-none placeholder:text-white/15 mb-5 border-b border-white/[0.07] pb-4"
//                 style={{ fontFamily: FONT }}
//               />

//               <textarea
//                 placeholder="What's on your mind?"
//                 value={newThread.body}
//                 onChange={e => setNewThread({ ...newThread, body: e.target.value })}
//                 rows={5}
//                 className="compose-area w-full bg-transparent text-white/80 font-light text-base resize-none placeholder:text-white/20 leading-relaxed"
//                 style={{ fontFamily: FONT }}
//               />
//             </div>

//             {/* Category + action row */}
//             <div className="px-7 py-4 border-t border-white/[0.06] bg-white/[0.015]">
//               <div className="flex items-center justify-between gap-4 flex-wrap">
//                 <div className="flex gap-2 overflow-x-auto no-scrollbar">
//                   {categories
//                     .filter(c => c.id !== 'all')
//                     .map(cat => (
//                       <button
//                         key={cat.id}
//                         onClick={() => setNewThread({ ...newThread, category: cat.id })}
//                         className={`shrink-0 px-3.5 py-1.5 border text-[8px] uppercase tracking-widest transition-all rounded-full ${
//                           newThread.category === cat.id
//                             ? 'border-amber-500/60 text-amber-400 bg-amber-500/10'
//                             : 'border-white/10 text-white/40 hover:border-white/25'
//                         }`}
//                         style={{ fontFamily: FONT }}
//                       >
//                         {cat.label}
//                       </button>
//                     ))}
//                 </div>

//                 <button
//                   onClick={handleCreateThread}
//                   disabled={submitting}
//                   className="shrink-0 flex items-center gap-2 px-7 py-2.5 bg-amber-500 text-black font-bold uppercase tracking-widest text-[9px] rounded-full hover:bg-amber-400 transition-all disabled:opacity-50"
//                   style={{ fontFamily: FONT }}
//                 >
//                   {submitting ? <Loader2 className="animate-spin" size={13} /> : 'Publish'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



























import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Pin,
  Flame,
  Search,
  X,
  Heart,
  Loader2,
  Image as ImageIcon,
  SlidersHorizontal,
  Plus,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { forumApi, IForumThread, IForumReply } from '../services/forum.service';
import { useAuth } from '../context/AuthContext';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

const categories = [
  { id: 'all', label: 'All Discussions' },
  { id: 'News', label: 'News' },
  { id: 'Rare Media', label: 'Rare Media' },
  { id: 'Music Discussion', label: 'Music Discussion' },
  { id: 'Family', label: 'Family' },
  { id: 'Memories', label: 'Memories' },
  { id: 'Tribute', label: 'Tribute' },
];

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

// ─── Main Forum Component ─────────────────────────────────────────────────────

export default function ForumPage() {
  const isDark = useTheme();
  const bg = isDark ? '#0A0A0A' : '#F8F9FA';
  const textColor = isDark ? '#FFFFFF' : '#111111';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  const { threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [activeThread, setActiveThread] = useState<IForumThread | null>(null);
  const [replies, setReplies] = useState<IForumReply[]>([]);
  const [threads, setThreads] = useState<IForumThread[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [composing, setComposing] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', body: '', category: 'News' });
  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectToLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        if (threadId) {
          const data = await forumApi.getThreadDetails(threadId);
          setActiveThread(data.thread);
          setReplies(data.replies);
        } else {
          await fetchThreads(true);
          setActiveThread(null);
        }
      } catch (err) {
        console.error('Content load error:', err);
        if (!threadId) navigate('/forum');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [threadId]);

  const fetchThreads = useCallback(
    async (reset = false) => {
      try {
        const currentPage = reset ? 1 : page;
        const data = await forumApi.getThreads({
          category: activeCategory === 'all' ? undefined : activeCategory,
          search: search || undefined,
          page: currentPage,
          limit: 10,
        });
        setThreads(prev => (reset ? data.threads : [...prev, ...data.threads]));
        setHasMore(data.pagination.hasMore);
        if (!reset) setPage(currentPage);
      } catch (err) {
        console.error('Error fetching threads:', err);
      }
    },
    [activeCategory, search, page]
  );

  useEffect(() => {
    if (!threadId) fetchThreads(true);
  }, [activeCategory, search]);

  const handleNewDiscussionClick = () => {
    if (!isAuthenticated) redirectToLogin();
    else setComposing(true);
  };

  const handleCreateThread = async () => {
    if (!isAuthenticated) return redirectToLogin();
    if (!newThread.title || !newThread.body) return;
    setSubmitting(true);
    try {
      const created = await forumApi.createThread(newThread);
      setComposing(false);
      setNewThread({ title: '', body: '', category: 'News' });
      navigate(`/forum/${created._id}`);
    } catch (err) {
      console.error('Thread creation failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostReply = async () => {
    if (!isAuthenticated) return redirectToLogin();
    if (!replyText || !activeThread) return;
    setSubmitting(true);
    try {
      const addedReply = await forumApi.addReply(activeThread._id, replyText, replyFile || undefined);
      setReplies(prev => [...prev, addedReply]);
      setReplyText('');
      setReplyFile(null);
    } catch (err) {
      console.error('Reply failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLike = async (replyId: string) => {
    if (!isAuthenticated) return redirectToLogin();
    try {
      const result = await forumApi.toggleLike(replyId);
      setReplies(prev =>
        prev.map(r =>
          r._id === replyId
            ? {
                ...r,
                likes: result.liked
                  ? [...r.likes, user!._id]
                  : r.likes.filter(id => id !== user!._id),
              }
            : r
        )
      );
    } catch (err) {
      console.error('Like toggle failed:', err);
    }
  };

  if (loading && !threads.length && !activeThread) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: bg }}>
        <Loader2 className="animate-spin" size={40} style={{ color: ACCENT_COLOR }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: bg }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-in  { animation: fadeUp  0.45s ease forwards; }
        .animate-modal { animation: scaleIn 0.35s cubic-bezier(.16,1,.3,1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="pt-24 md:pt-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b pb-6" style={{ borderColor }}>
            <div>
              <span 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
              >
                  <MessageSquare size={10} /> The Ledger
              </span>
              {/* Reduced heading size */}
              <h1 className="text-3xl md:text-4xl font-normal leading-tight" style={{ fontFamily: FONT, color: textColor }}>
                Global Dialogue
              </h1>
            </div>

            <button
              onClick={handleNewDiscussionClick}
              className="mt-6 md:mt-0 flex items-center justify-center gap-2 pl-4 pr-5 py-3 md:py-2.5 rounded-full border transition-all duration-300 w-full md:w-auto hover:scale-105"
              style={{ borderColor: ACCENT_COLOR, color: ACCENT_COLOR }}
            >
              <Plus size={14} strokeWidth={2} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>
                New Entry
              </span>
            </button>
          </div>

          {/* Filter bar — only on list view */}
          {!threadId && (
            <div className="pb-8">

              {/* ── DESKTOP filter row ── */}
              <div className="hidden md:flex items-center justify-between gap-6 pb-2">
                <nav className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setPage(1); }}
                      className="shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 border"
                      style={{ 
                          fontFamily: MONO,
                          backgroundColor: activeCategory === cat.id ? ACCENT_COLOR : 'transparent',
                          color: activeCategory === cat.id ? '#000' : textColor,
                          borderColor: activeCategory === cat.id ? ACCENT_COLOR : borderColor,
                          opacity: activeCategory === cat.id ? 1 : 0.6
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </nav>

                <div className="relative shrink-0 w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={12} style={{ color: textColor }} />
                  <input
                    type="text"
                    placeholder="Search ledger..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border rounded-full pl-10 pr-4 py-2.5 text-[11px] font-bold uppercase tracking-widest focus:outline-none transition-colors"
                    style={{ fontFamily: MONO, color: textColor, backgroundColor: inputBg, borderColor }}
                  />
                </div>
              </div>

              {/* ── MOBILE filter row ── */}
              <div className="flex md:hidden items-center justify-between gap-3 pb-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={12} style={{ color: textColor }} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border rounded-full pl-10 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none transition-colors"
                    style={{ fontFamily: MONO, color: textColor, backgroundColor: inputBg, borderColor }}
                  />
                </div>

                <button
                  onClick={() => setFilterOpen(o => !o)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 text-[10px] font-bold uppercase tracking-widest shrink-0"
                  style={{ 
                      fontFamily: MONO,
                      backgroundColor: activeCategory !== 'all' ? ACCENT_COLOR : 'transparent',
                      color: activeCategory !== 'all' ? '#000' : textColor,
                      borderColor: activeCategory !== 'all' ? ACCENT_COLOR : borderColor,
                      opacity: activeCategory !== 'all' ? 1 : 0.6
                  }}
                >
                  <SlidersHorizontal size={12} />
                  <span>
                    {activeCategory === 'all' ? 'Filter' : categories.find(c => c.id === activeCategory)?.label}
                  </span>
                </button>
              </div>

              {/* Mobile filter drawer */}
              {filterOpen && (
                <div className="flex md:hidden gap-2 flex-wrap pt-4 animate-in">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setPage(1); setFilterOpen(false); }}
                      className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all"
                      style={{ 
                          fontFamily: MONO,
                          backgroundColor: activeCategory === cat.id ? ACCENT_COLOR : 'transparent',
                          color: activeCategory === cat.id ? '#000' : textColor,
                          borderColor: activeCategory === cat.id ? ACCENT_COLOR : borderColor,
                          opacity: activeCategory === cat.id ? 1 : 0.6
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">

        {/* ── LIST VIEW ── */}
        {!threadId ? (
          <div className="flex flex-col">
            {threads.map((thread, i) => (
              <div
                key={thread._id}
                onClick={() => navigate(`/forum/${thread._id}`)}
                className="group flex flex-col md:flex-row md:items-center py-7 border-b transition-all duration-400 cursor-pointer animate-in hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 rounded-[16px]"
                style={{ borderColor, animationDelay: `${i * 40}ms` }}
              >
                <div className="flex-grow min-w-0 md:pr-12">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.3em]"
                      style={{ fontFamily: MONO, color: ACCENT_COLOR }}
                    >
                      {thread.category}
                    </span>
                    {thread.pinned && <Pin size={10} style={{ color: ACCENT_COLOR }} />}
                    {thread.hot && <Flame size={10} style={{ color: ACCENT_COLOR }} />}
                  </div>

                  {/* Reduced thread title size */}
                  <h3
                    className="text-lg md:text-xl font-normal group-hover:text-orange-500 transition-colors duration-300 leading-snug mb-1.5"
                    style={{ fontFamily: FONT, color: textColor }}
                  >
                    {thread.title}
                  </h3>

                  <p
                    className="text-sm font-light opacity-60 line-clamp-1 max-w-3xl"
                    style={{ fontFamily: FONT, color: textColor }}
                  >
                    {thread.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end mt-5 md:mt-0 gap-8 shrink-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={thread.author.avatar}
                      className="w-8 h-8 rounded-full border object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      style={{ borderColor }}
                      alt=""
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ fontFamily: MONO, color: textColor }}>
                        {thread.author.username}
                      </p>
                      <p className="text-[9px] opacity-40 uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>
                        {thread.lastActive}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center pl-6 border-l" style={{ borderColor }}>
                      <p className="text-xl font-normal leading-none group-hover:text-orange-500 transition-colors" style={{ fontFamily: FONT, color: textColor }}>
                        {thread.replyCount}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest mt-1 opacity-40" style={{ fontFamily: MONO, color: textColor }}>Replies</p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="py-12 flex justify-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-10 py-3 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-orange-500 hover:text-orange-500"
                  style={{ fontFamily: MONO, borderColor, color: textColor }}
                >
                  Load More History
                </button>
              </div>
            )}
          </div>
        ) : (

          /* ── THREAD DETAIL VIEW ── */
          <div className="animate-in max-w-4xl mx-auto py-4">

            <button 
              onClick={() => navigate('/forum')}
              className="group flex items-center gap-3 uppercase font-bold tracking-[0.2em] text-[10px] mb-10 transition-all hover:text-orange-500"
              style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> 
              Back to Ledger
            </button>

            {activeThread && (
              <>
                <header className="mb-12">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-4" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                    {activeThread.category}
                  </span>
                  {/* Reduced thread detail title size */}
                  <h2 className="text-3xl md:text-4xl font-normal leading-tight mb-8" style={{ fontFamily: FONT, color: textColor }}>
                    {activeThread.title}
                  </h2>
                  <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor }}>
                    <img src={activeThread.author.avatar} className="w-10 h-10 rounded-full border grayscale" style={{ borderColor }} alt="" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: MONO, color: textColor }}>{activeThread.author.username}</p>
                      <p className="text-[9px] uppercase tracking-widest mt-1 opacity-40" style={{ fontFamily: MONO, color: textColor }}>{activeThread.lastActive}</p>
                    </div>
                  </div>
                </header>

                <div className="space-y-12 mb-20">
                  <div className="pb-12 border-b" style={{ borderColor }}>
                    <p className="text-lg font-light leading-relaxed whitespace-pre-wrap opacity-90" style={{ fontFamily: FONT, color: textColor }}>
                      {activeThread.body}
                    </p>
                  </div>

                  {replies.map((reply) => (
                    <div key={reply._id} className="pb-12 border-b" style={{ borderColor }}>
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <img src={reply.author.avatar} className="w-8 h-8 rounded-full border grayscale" style={{ borderColor }} alt="" />
                          <span className="text-[11px] uppercase tracking-widest font-bold" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                            {reply.author.username}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest opacity-30" style={{ fontFamily: MONO, color: textColor }}>
                            Ledger Entry
                        </span>
                      </div>

                      {reply.imageUrl && (
                        <div className="rounded-[20px] overflow-hidden border mb-6" style={{ borderColor }}>
                            <img src={reply.imageUrl} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Attachment" />
                        </div>
                      )}

                      <p className="text-[17px] font-light leading-relaxed mb-6 opacity-90" style={{ fontFamily: FONT, color: textColor }}>
                        {reply.body}
                      </p>
                      
                      <button
                        onClick={() => handleToggleLike(reply._id)}
                        className={`flex items-center gap-2 transition-colors ${user && reply.likes.includes(user._id) ? 'text-red-500' : 'opacity-40 hover:text-red-400'}`}
                        style={{ color: user && reply.likes.includes(user._id) ? '#ef4444' : textColor, fontFamily: MONO }}
                      >
                        <Heart size={14} fill={user && reply.likes.includes(user._id) ? 'currentColor' : 'none'} />
                        <span className="text-[11px] font-bold">{reply.likes.length}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* ── REPLY BOX ── */}
                <div
                  className="mt-8 pt-8 animate-in"
                  onClick={() => !isAuthenticated && redirectToLogin()}
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                    Add to the Ledger
                  </h4>

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    readOnly={!isAuthenticated}
                    placeholder={isAuthenticated ? "Write your contribution..." : "Click here to login and reply"}
                    className="w-full bg-transparent border-b py-3 focus:outline-none focus:border-orange-500 transition-colors h-24 resize-none mb-6 text-base font-light cursor-pointer"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-3 cursor-pointer opacity-50 hover:opacity-100 hover:text-orange-500 transition-all group" style={{ fontFamily: MONO, color: textColor }}>
                      <input
                        type="file"
                        disabled={!isAuthenticated}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setReplyFile(e.target.files ? e.target.files[0] : null)}
                      />
                      <ImageIcon size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">
                        {replyFile ? replyFile.name : "Attach Image"}
                      </span>
                    </label>

                    <button
                      onClick={handlePostReply}
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                      {submitting ? <Loader2 className="animate-spin" size={14} /> : (isAuthenticated ? "Post Contribution" : "Login to Reply")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* ── NEW THREAD MODAL ── */}
      {composing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 backdrop-blur-md transition-opacity"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setComposing(false)}
          />

          {/* Reduced Modal Container Size (max-w-2xl) */}
          <div className="relative w-full max-w-2xl border rounded-[20px] shadow-2xl animate-modal overflow-hidden" style={{ backgroundColor: bg, borderColor }}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-5 border-b" style={{ borderColor }}>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-1.5" style={{ fontFamily: MONO, color: ACCENT_COLOR }}>
                  Community Ledger
                </p>
                {/* Reduced Modal title size */}
                <h2 className="text-xl md:text-2xl font-normal" style={{ fontFamily: FONT, color: textColor }}>
                  Create New Entry
                </h2>
              </div>
              <button onClick={() => setComposing(false)} className="opacity-40 hover:opacity-100 hover:text-red-500 transition-colors" style={{ color: textColor }}>
                <X size={20} />
              </button>
            </div>

            {/* Compose area */}
            <div className="px-6 md:px-8 pt-6 pb-6">
                
              {/* Sleek Category Dropdown */}
              <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Category
                  </label>
                  <div className="relative">
                      <select
                        value={newThread.category}
                        onChange={e => setNewThread({ ...newThread, category: e.target.value })}
                        className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base font-normal appearance-none cursor-pointer"
                        style={{ fontFamily: FONT, color: textColor, borderColor }}
                      >
                        {categories.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id} style={{ backgroundColor: bg, color: textColor }}>
                                {cat.label}
                            </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" style={{ color: textColor }} />
                  </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Discussion Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a descriptive title..."
                    value={newThread.title}
                    onChange={e => setNewThread({ ...newThread, title: e.target.value })}
                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-lg font-normal"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />
              </div>

              <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50" style={{ fontFamily: MONO, color: textColor }}>
                      Your Thoughts
                  </label>
                  <textarea
                    placeholder="What would you like to discuss?"
                    value={newThread.body}
                    onChange={e => setNewThread({ ...newThread, body: e.target.value })}
                    rows={4} // Reduced rows to fit laptop screens better
                    className="w-full bg-transparent border-b py-2 focus:outline-none focus:border-orange-500 transition-colors text-base font-light resize-none leading-relaxed"
                    style={{ fontFamily: FONT, color: textColor, borderColor }}
                  />
              </div>
            </div>

            {/* Action footer */}
            <div className="px-6 md:px-8 py-5 bg-black/5 dark:bg-white/5 border-t flex justify-end" style={{ borderColor }}>
              <button
                onClick={handleCreateThread}
                disabled={submitting}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-all disabled:opacity-50"
                style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
              >
                {submitting ? <Loader2 className="animate-spin" size={14} /> : 'Publish Entry'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
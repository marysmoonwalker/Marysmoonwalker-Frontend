import { MessageCircle, Clock, MessageSquare } from 'lucide-react';

interface ForumThread {
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  lastActive: string;
}

const recentThreads: ForumThread[] = [
  {
    title: 'New Jaafar Biopic Trailer Released - What Did You Think?',
    author: 'MJFan88',
    avatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=100',
    category: 'News',
    replies: 47,
    lastActive: '2h ago',
  },
  {
    title: 'Rare Thriller Era Concert Footage Found - Discussion',
    author: 'Moonwalker2000',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    category: 'Rare Media',
    replies: 89,
    lastActive: '4h ago',
  },
  {
    title: 'Janet Jackson Tour 2025 - Who\'s Going?',
    author: 'JanetLover',
    avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=100',
    category: 'Music Discussion',
    replies: 156,
    lastActive: '1h ago',
  }
];

const categoryColors: Record<string, string> = {
  'News': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'Rare Media': 'bg-pink-500/20 text-pink-300 border-pink-500/40',
  'Music Discussion': 'bg-amber-500/30 text-amber-300 border-amber-500/40',
  'Fashion': 'bg-rose-500/20 text-rose-300 border-rose-500/40',
};

export default function ForumPreview() {
  return (
    <section className="py-16 px-4" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div>
            <h2 className="font-light text-3xl md:text-5xl mb-2" style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
              letterSpacing: '0.1em',
              filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.9))'
            }}>
              FORUM
            </h2>
          </div>
          
          {/* Right side with Chat icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => console.log('Open chat/discussion')}
              className="p-2 rounded-full border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' }}
              aria-label="Start new discussion"
              title="Start new discussion"
            >
              <MessageSquare size={24} />
            </button>
          </div>
        </div>

        {/* Forum Threads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentThreads.map((thread, index) => (
            <div key={index} className="group">
              <div 
                className="bg-black border-2 border-amber-500/40 hover:border-amber-400 rounded-lg p-6 transition-all duration-300 h-full cursor-pointer hover:scale-[1.02]"
                style={{ 
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.1)'
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={thread.avatar}
                    alt={thread.author}
                    className="w-12 h-12 rounded-full border-2 border-amber-500 object-cover flex-shrink-0"
                    style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                      <span className="text-amber-300 font-light text-sm truncate" style={{ fontFamily: 'Georgia, serif' }}>
                        {thread.author}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs uppercase font-light border whitespace-nowrap ${categoryColors[thread.category]}`} style={{ fontFamily: 'Georgia, serif' }}>
                        {thread.category}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg mb-4 line-clamp-2 group-hover:text-amber-300 transition-colors font-light" style={{
                  fontFamily: 'Georgia, serif',
                  color: '#FFD700',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                  {thread.title}
                </h3>

                <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-amber-500/30" style={{ fontFamily: 'Georgia, serif' }}>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-amber-400" />
                    <span className="font-light text-white/80">{thread.replies}</span>
                    <span className="text-white/50">replies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-amber-400" />
                    <span className="text-white/60">{thread.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enter Forum Button */}
        <div className="text-center mt-12">
          <a
            href="/forum"
            className="inline-flex items-center gap-3 border-2 border-amber-500/60 px-12 py-4 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 font-light text-xl uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 group"
            style={{
              fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 40px rgba(255, 215, 0, 0.1)'
            }}
          >
            ENTER THE FORUM
            <MessageCircle size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
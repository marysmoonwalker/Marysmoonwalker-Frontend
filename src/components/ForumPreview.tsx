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
  'News': 'bg-stone-700 text-stone-50',
  'Rare Media': 'bg-purple-900 text-purple-50',
  'Music Discussion': 'bg-amber-800 text-amber-50',
  'Fashion': 'bg-rose-900 text-rose-50',
};

export default function ForumPreview() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#E8D5B7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Flush left like FamilyTree */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl text-amber-950 mb-2">
              FORUM
            </h2>
          </div>
          
          {/* Right side with Chat icon */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => console.log('Open chat/discussion')}
              className="p-2 rounded-full border-2 border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-stone-50 transition-all duration-300"
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
              <div className="bg-stone-50 border-2 border-amber-700/30 hover:border-amber-700/60 rounded-lg p-6 transition-all duration-300 h-full cursor-pointer hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={thread.avatar}
                    alt={thread.author}
                    className="w-12 h-12 rounded-full border-2 border-yellow-700 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                      <span className="text-amber-950 font-semibold text-sm truncate">
                        {thread.author}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs uppercase font-semibold whitespace-nowrap ${categoryColors[thread.category]}`}>
                        {thread.category}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-amber-950 font-semibold text-lg mb-4 line-clamp-2 group-hover:text-amber-800 transition-colors">
                  {thread.title}
                </h3>

                <div className="flex items-center justify-between text-stone-700 text-sm mt-4 pt-4 border-t border-amber-700/20">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-yellow-700" />
                    <span className="font-medium">{thread.replies}</span>
                    <span className="text-stone-500">replies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-yellow-700" />
                    <span className="text-stone-600">{thread.lastActive}</span>
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
            className="inline-flex items-center gap-3 border-2 border-yellow-700 px-12 py-4 text-yellow-800 hover:bg-yellow-700 hover:text-stone-50 font-bold text-xl uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 group"
          >
            ENTER THE FORUM
            <MessageCircle size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
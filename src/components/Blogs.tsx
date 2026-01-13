import { ArrowRight, Bookmark, Search, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: number;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Making of Thriller: Behind the Scenes of the Most Iconic Album',
    excerpt:
      'Explore the creative genius and innovation that went into crafting the best-selling album of all time. From studio sessions to revolutionary production techniques.',
    category: 'Music',
    author: 'Emma Rodriguez',
    date: '2024-12-15',
    image: 'https://i.pinimg.com/1200x/58/cb/ab/58cbabdead1835bf647df36e2926dbec.jpg',
    readTime: 12,
    featured: true,
  },
  {
    id: '2',
    title: 'Janet Jackson\'s World Tour 2025: What Fans Can Expect',
    excerpt:
      'A comprehensive guide to Janet\'s upcoming tour dates, setlist predictions, and exclusive experiences. Don\'t miss the chance to witness the Velvet Rope legend live.',
    category: 'Events',
    author: 'Michael Fan',
    date: '2024-12-10',
    image: 'https://i.pinimg.com/1200x/2c/c0/d2/2cc0d2266cff0ddf55166c3871e2d2cc.jpg',
    readTime: 8,
    featured: false,
  },
  {
    id: '3',
    title: 'Jackson Family Legacy: The Impact on Modern Pop Culture',
    excerpt:
      'How the Jackson family transformed entertainment and influenced groups of artists. From the Jackson 5 to solo careers, their mark is timeless.',
    category: 'News',
    author: 'David Chen',
    date: '2024-12-08',
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: 15,
    featured: false,
  },
  {
    id: '4',
    title: 'Moonwalk Mastery: The Dance Move That Changed Everything',
    excerpt:
      'From the first iconic performance to tutorials and recreations, discover why the moonwalk remains the most copied dance move in history.',
    category: 'Music',
    author: 'Sarah Williams',
    date: '2024-12-05',
    image: 'https://i.pinimg.com/736x/fc/27/ac/fc27ac67c07a9e207d921cda16e43afe.jpg',
    readTime: 10,
    featured: false,
  },
  {
    id: '5',
    title: 'Jaafar Jackson\'s Biopic: The Story of the King Comes to Life in April 2025',
    excerpt:
      'Everything we know about the highly anticipated biopic starring Jaafar Jackson. Production insights, casting news, and what it means for the Jackson legacy.',
    category: 'Events',
    author: 'Lisa Park',
    date: '2024-12-01',
    image: 'https://i.pinimg.com/736x/fc/32/47/fc3247875ec6d761f6cecc93e1734ed9.jpg',
    readTime: 11,
    featured: false,
  },
  {
    id: '6',
    title: 'The Jackson 5: How It All Began',
    excerpt:
      'The story of the family band that started it all, from Gary, Indiana to Motown and international stardom.',
    category: 'Music',
    author: 'James Wilson',
    date: '2024-11-28',
    image: 'https://i.pinimg.com/736x/8a/e8/13/8ae813956f274ff0196dd87937e383cf.jpg',
    readTime: 9,
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Music: 'bg-amber-500/30 text-amber-300 border-amber-500/40',
  News: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  Events: 'bg-red-500/20 text-red-300 border-red-500/40',
};

export default function MJBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <section className="py-16 px-4" id="blogs">
        <div className="max-w-7xl mx-auto">
          <div 
            id="blogs-header"
            data-animate
            className={`flex justify-between items-center mb-8 px-4 transition-all duration-1000 ${
              visibleElements.has('blogs-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
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
                EVENTS
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              {showSearch ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="px-4 py-2 pr-10 rounded-lg border-2 border-amber-500/60 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 w-48 md:w-64 transition-all duration-300 backdrop-blur-sm"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      background: 'rgba(0, 0, 0, 0.4)'
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-amber-400 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 backdrop-blur-sm"
                  style={{ 
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                    background: 'rgba(0, 0, 0, 0.3)'
                  }}
                  aria-label="Search articles"
                >
                  <Search size={24} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={post.id} 
                id={`blog-card-${index}`}
                data-animate
                className={`group transition-all duration-1000 ${
                  visibleElements.has(`blog-card-${index}`) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div 
                  className="relative rounded-xl overflow-hidden border-2 border-amber-500/40 hover:border-amber-400 transition-all duration-500 h-full flex flex-col hover:scale-[1.02] backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.15)'
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow backdrop-blur-sm" style={{
                    background: 'rgba(0, 0, 0, 0.5)'
                  }}>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.featured && (
                        <span className="px-3 py-1 rounded-full text-xs uppercase font-light border" style={{
                          fontFamily: 'Georgia, serif',
                          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                          color: 'black',
                          boxShadow: '0 2px 10px rgba(255, 215, 0, 0.3)'
                        }}>
                          Featured
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs uppercase font-light border ${categoryColors[post.category]}`} style={{ fontFamily: 'Georgia, serif' }}>
                        {post.category}
                      </span>
                      <span className="text-xs text-white/50 ml-auto" style={{ fontFamily: 'Georgia, serif' }}>
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="font-light text-xl mb-3 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2" style={{
                      fontFamily: 'Georgia, serif',
                      color: '#FFD700',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      {post.title}
                    </h3>

                    <p className="text-white/70 mb-4 text-sm line-clamp-3 flex-grow" style={{ fontFamily: 'Georgia, serif' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-amber-500/30">
                      <div className="flex items-center gap-2 text-xs text-white/60" style={{ fontFamily: 'Georgia, serif' }}>
                        <span className="font-light">{post.author}</span>
                        <span className="text-amber-400">•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <button className="text-amber-400 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 group/read">
                        <ArrowRight size={18} className="group-hover/read:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            id="blogs-button"
            data-animate
            className={`text-center mt-16 transition-all duration-1000 delay-500 ${
              visibleElements.has('blogs-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <a
              href="/blog"
              className="inline-flex items-center gap-3 border-2 border-amber-500/60 px-10 py-4 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 font-light text-lg uppercase rounded-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'rgba(0, 0, 0, 0.3)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(255, 215, 0, 0.1)'
              }}
            >
              <Bookmark size={20} />
              View All Stories
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
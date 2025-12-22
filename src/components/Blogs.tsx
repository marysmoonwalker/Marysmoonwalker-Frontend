import { ArrowRight, Bookmark, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
  Music: 'bg-amber-800 text-amber-50',
  News: 'bg-stone-700 text-stone-50',
  Events: 'bg-red-900 text-red-50',
};

export default function MJBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8D5B7' }}>
      <section className="py-16 px-4" id="blogs">
        <div className="max-w-7xl mx-auto">
          {/* Updated Header - Flush left like FamilyTree */}
          <div className="flex justify-between items-center mb-8 px-4">
            <div>
              <h2 className="font-bold text-3xl md:text-4xl text-amber-950 mb-2">
                EVENTS
              </h2>
            </div>
            
            {/* Right side with Search icon/bar */}
            <div className="flex items-center gap-4">
              {showSearch ? (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="px-4 py-2 pr-10 rounded-lg border-2 border-yellow-700 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-48 md:w-64 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-yellow-700 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full border-2 border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-stone-50 transition-all duration-300"
                  aria-label="Search articles"
                >
                  <Search size={24} />
                </button>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="group">
                <div className="relative rounded-xl overflow-hidden border-2 border-amber-700/30 hover:border-amber-700/60 transition-all duration-500 h-full flex flex-col bg-stone-50 hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 sepia"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 to-transparent"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      {post.featured && (
                        <span className="px-3 py-1 rounded-full text-xs uppercase font-semibold bg-yellow-600 text-yellow-50">
                          Featured
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs uppercase font-semibold ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-500 ml-auto">
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-amber-950 group-hover:text-amber-800 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-stone-600 mb-4 text-sm line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-amber-700/20">
                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-yellow-700">•</span>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <button className="text-yellow-700 hover:text-yellow-900 transition-all duration-300 hover:translate-x-1 group/read">
                        <ArrowRight size={18} className="group-hover/read:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button - Centered at bottom */}
          <div className="text-center mt-16">
            <a
              href="/blog"
              className="inline-flex items-center gap-3 border-2 border-yellow-700 px-10 py-4 text-yellow-800 hover:bg-yellow-700 hover:text-stone-50 font-bold text-lg uppercase rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Bookmark size={20} />
              View All Stories
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LegacyItem {
  id: string;
  title: string;
  year: string;
  image: string;
  details: { name: string; info: string }[];
}

const legacyItems: LegacyItem[] = [
  {
    id: 'thriller',
    title: 'Thriller',
    year: '1982',
    image: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
    details: [
      { name: 'Best-Selling Album', info: 'Over 70 million copies worldwide' },
      { name: '8 Grammy Awards', info: 'Record-breaking night in 1984' },
      { name: '7 Top 10 Singles', info: 'Unprecedented chart success' },
      { name: 'Cultural Impact', info: 'Changed music industry forever' },
    ],
  },
  {
    id: 'moonwalk',
    title: 'The Moonwalk',
    year: '1983',
    image: 'https://i.pinimg.com/1200x/dd/d6/30/ddd6302d9db7c7e61e563a880329698d.jpg',
    details: [
      { name: 'Motown 25', info: 'Debuted during legendary performance' },
      { name: 'Global Phenomenon', info: 'Most imitated dance move in history' },
      { name: 'Billie Jean Performance', info: 'Iconic white glove and fedora' },
    ],
  },
  {
    id: 'dangerous-tour',
    title: 'Dangerous World Tour',
    year: '1992-1993',
    image: 'https://i.pinimg.com/1200x/a3/10/18/a310188a6c72e74fb2bd650c76e579f3.jpg',
    details: [
      { name: '69 Cities Worldwide', info: 'Massive global tour' },
      { name: '3.5 Million Fans', info: 'Broke attendance records' },
      { name: 'Groundbreaking Production', info: 'Revolutionary stage design' },
    ],
  },
  {
    id: 'billie-jean',
    title: 'Billie Jean',
    year: '1988',
    image: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
    details: [
      { name: 'MTV Breakthrough', info: 'First Black artist in heavy rotation' },
      { name: 'Iconic Music Video', info: 'Light-up sidewalk became legendary' },
      { name: 'Cultural Barrier Breaker', info: 'Changed music television forever' },
    ],
  },
  {
    id: 'we-are-the-world',
    title: 'We Are The World',
    year: '1985',
    image: 'https://i.pinimg.com/736x/39/89/f4/3989f464375ab101f40c09613825a6fe.jpg',
    details: [
      { name: 'Co-Written with Lionel Richie', info: 'USA for Africa project' },
      { name: '$60 Million Raised', info: 'African famine relief' },
      { name: 'All-Star Recording', info: '45 legendary artists participated' },
    ],
  },
  {
    id: 'bad-album',
    title: 'Bad',
    year: '1987',
    image: 'https://i.pinimg.com/736x/65/d8/e4/65d8e4743f4ad006f70be30180895aac.jpg',
    details: [
      { name: '5 #1 Singles', info: 'First album to achieve this feat' },
      { name: 'World Tour', info: 'Highest-grossing tour of the decade' },
      { name: 'Visual Storytelling', info: 'Revolutionary music videos' },
    ],
  },
];

export default function LegacyShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth > 768 ? 384 : 320;
      const gap = 24;
      const totalWidth = cardWidth + gap;
      
      const newIndex = Math.round(scrollLeft / totalWidth);
      setCurrentIndex(Math.min(newIndex, legacyItems.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth > 768 ? 384 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ 
        left: -(cardWidth + gap), 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth > 768 ? 384 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ 
        left: cardWidth + gap, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth > 768 ? 384 : 320;
      const gap = 24;
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const handleExploreDetails = (id: string) => {
    console.log(`Navigate to details page for: ${id}`);
  };

  return (
    <section className="py-16 px-4" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto">
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
              MJ'S LEGACY
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              style={{ 
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)'
              }}
              aria-label="Scroll left"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border-2 border-amber-500/60 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
              style={{ 
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)'
              }}
              aria-label="Scroll right"
              disabled={currentIndex === legacyItems.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-8 gap-6 px-4 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {legacyItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 md:w-96 snap-start"
              >
                <div
                  className="border-2 border-amber-500/40 hover:border-amber-400 rounded-lg overflow-hidden transition-all duration-300 h-full backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.15)'
                  }}
                >
                  <div 
                    className="aspect-square overflow-hidden relative"
                    onMouseEnter={() => setHoveredImage(item.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onTouchStart={() => setHoveredImage(item.id)}
                    onTouchEnd={() => setHoveredImage(null)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredImage === item.id ? 'opacity-60' : 'opacity-80'
                    }`}></div>
                  </div>

                  <div className="p-6 text-center h-40 flex flex-col justify-between backdrop-blur-sm" style={{
                    background: 'rgba(0, 0, 0, 0.5)'
                  }}>
                    <div>
                      <h3 className="font-light text-2xl md:text-3xl mb-1" style={{
                        fontFamily: 'Georgia, serif',
                        color: '#FFD700',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.2)'
                      }}>
                        {item.title}
                      </h3>
                      <p className="text-amber-400/80 text-sm mb-3" style={{ fontFamily: 'Georgia, serif' }}>{item.year}</p>
                    </div>
                    
                    <button
                      onClick={() => handleExploreDetails(item.id)}
                      className="flex items-center justify-center gap-2 text-amber-300 text-sm uppercase tracking-wider hover:text-amber-200 transition-colors duration-300 mx-auto font-light"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <span>Explore Details</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {legacyItems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-amber-500 shadow-[0_0_10px_rgba(255,215,0,0.5)]' : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
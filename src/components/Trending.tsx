import { useState, useRef, useEffect } from 'react';
import { Play, Music, Video, Mic, FileText } from 'lucide-react';

interface TrendingItem {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'music' | 'video' | 'podcast' | 'article';
  thumbnail: string;
  mediaUrl: string;
  stats?: string;
}

const trendingItems: TrendingItem[] = [
  {
    id: '1',
    year: '1982',
    title: 'Thriller',
    description: 'The best-selling album of all time',
    type: 'music',
    thumbnail: 'https://i.pinimg.com/736x/26/a6/4b/26a64bdc20dd22ea7c795b53ac1d33d9.jpg',
    mediaUrl: 'https://www.youtube.com/embed/sOnqjkJTMaA',
    stats: '70M+ Albums Sold',
  },
  {
    id: '2',
    year: '1988',
    title: 'Billie Jean - Motown 25',
    description: 'The moonwalk debut performance',
    type: 'video',
    thumbnail: 'https://m.media-amazon.com/images/M/MV5BN2Q1OTcxYzktMWY3Yi00Y2ZjLTk0OWEtOGIxNWMyNzcxOTU2XkEyXkFqcGc@._V1_.jpg',
    mediaUrl: 'https://www.youtube.com/embed/g3t6YDnGXAc',
    stats: '47M+ Views',
  },
  {
    id: '3',
    year: '2024',
    title: 'The Legacy Continues',
    description: 'A deep dive into Michael\'s influence on modern music',
    type: 'podcast',
    thumbnail: 'https://i.pinimg.com/736x/5d/e2/64/5de264d05cb658962d7a5a2a642fc0f4.jpg',
    mediaUrl: 'https://www.youtube.com/embed/sOnqjkJTMaA',
    stats: '2.5M+ Listens',
  },
  {
    id: '4',
    year: '1987',
    title: 'Bad Era Analysis',
    description: 'How Bad changed pop music forever',
    type: 'article',
    thumbnail: 'https://i.pinimg.com/1200x/83/3f/94/833f949ce214bb52c2f83d7efb6f0dac.jpg',
    mediaUrl: '/article/bad-era',
    stats: '1.2M+ Reads',
  },
  {
    id: '5',
    year: '1993',
    title: 'Super Bowl XXVII',
    description: 'Historic halftime performance',
    type: 'video',
    thumbnail: 'https://i.pinimg.com/736x/7e/8a/c6/7e8ac67fe5ab18f8c83ce77b1802daf2.jpg',
    mediaUrl: 'https://www.youtube.com/embed/wVXGJ2uz5fM',
    stats: '133M+ Viewers',
  },
  {
    id: '6',
    year: '1979',
    title: 'Off The Wall',
    description: 'The album that started it all',
    type: 'music',
    thumbnail: 'https://i.pinimg.com/736x/61/46/91/614691a5c6bba536698249705121b382.jpg',
    mediaUrl: 'https://www.youtube.com/embed/h_D3VFfhvs4',
    stats: '20M+ Albums Sold',
  },
  {
    id: '7',
    year: '2025',
    title: 'Jaafar\'s Journey',
    description: 'Behind the scenes of the biopic',
    type: 'podcast',
    thumbnail: 'https://i.pinimg.com/1200x/58/db/b4/58dbb4c0a4edfcc219d856bdd0500772.jpg',
    mediaUrl: 'https://www.youtube.com/embed/sOnqjkJTMaA',
    stats: '3M+ Listens',
  }
];

const typeIcons = {
  music: Music,
  video: Video,
  podcast: Mic,
  article: FileText,
};

export default function Trending() {
  const [selectedItem, setSelectedItem] = useState<TrendingItem>(trendingItems[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleItemClick = (item: TrendingItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (selectedItem.type === 'article') {
      window.location.href = selectedItem.mediaUrl;
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const Icon = typeIcons[selectedItem.type];

  return (
    <section className="min-h-screen py-16 md:py-20 px-3 md:px-4" style={{
      background: 'transparent',
    }}>
      <div className="max-w-7xl mx-auto">
        <div 
          id="trending-header"
          data-animate
          className={`text-center mb-12 md:mb-16 relative transition-all duration-1000 ${
            visibleElements.has('trending-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-block relative">
            <h2 className="relative text-5xl md:text-7xl font-light tracking-wider px-8 py-4" style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
              letterSpacing: '0.15em',
              filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.9))'
            }}>
              TRENDING
            </h2>
          </div>
          <p className="text-white/70 mt-6 text-sm tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif' }}>
            Curated Archives & Featured Media
          </p>
        </div>

        <div 
          id="trending-player"
          data-animate
          className={`mb-10 md:mb-14 transition-all duration-1000 delay-200 ${
            visibleElements.has('trending-player') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative group" style={{
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.3), inset 0 0 0 1px rgba(255, 215, 0, 0.4)'
          }}>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-600/40 via-amber-500/40 to-yellow-600/40"></div>

            <div className="relative bg-black">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-500/60"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-500/60"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-500/60"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-500/60"></div>

              <div className="relative w-full" style={{ paddingTop: '45%' }}>
                {isPlaying && selectedItem.type !== 'article' ? (
                  <iframe
                    src={`${selectedItem.mediaUrl}?autoplay=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={selectedItem.title}
                  />
                ) : (
                  <>
                    <img
                      src={selectedItem.thumbnail}
                      alt={selectedItem.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={handlePlayPause}
                          className="relative w-16 h-16 md:w-20 md:h-20 group/btn"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rotate-45 transition-all duration-500 group-hover/btn:rotate-[50deg] group-hover/btn:scale-110"
                            style={{ boxShadow: '0 8px 32px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)' }}></div>
                          <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-yellow-600 rotate-45"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            {selectedItem.type === 'article' ? (
                              <FileText size={20} className="text-black" style={{ filter: 'drop-shadow(1px 1px 2px rgba(255,215,0,0.5))' }} />
                            ) : (
                              <Play size={24} className="text-black ml-1" style={{ filter: 'drop-shadow(1px 1px 2px rgba(255,215,0,0.5))' }} />
                            )}
                          </div>
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className="border-l-3 border-amber-500 pl-3 md:pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/40">
                              <Icon size={12} className="text-amber-400" />
                              <span className="text-amber-300 text-xs uppercase tracking-wider font-light" style={{ fontFamily: 'Georgia, serif' }}>
                                {selectedItem.type}
                              </span>
                            </div>
                            <div className="px-2 py-1 bg-black/60 border border-amber-500/40">
                              <span className="text-amber-400 text-xs font-light tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
                                {selectedItem.year}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-xl md:text-3xl font-light mb-1 tracking-wide" style={{
                            fontFamily: 'Georgia, serif',
                            color: '#FFD700',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.3)'
                          }}>
                            {selectedItem.title}
                          </h3>
                          <p className="text-white/90 text-sm md:text-base mb-1 font-light italic" style={{ fontFamily: 'Georgia, serif' }}>
                            {selectedItem.description}
                          </p>
                          {selectedItem.stats && (
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-6 h-px bg-amber-500"></div>
                              <p className="text-amber-400 text-xs tracking-wider uppercase font-light" style={{ fontFamily: 'Georgia, serif' }}>
                                {selectedItem.stats}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div 
          id="trending-carousel"
          data-animate
          className={`relative mb-10 md:mb-12 transition-all duration-1000 delay-300 ${
            visibleElements.has('trending-carousel') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory scrollbar-hide px-3 md:px-4"
          >
            {trendingItems.map((item, index) => {
              const ItemIcon = typeIcons[item.type];
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item, index)}
                  className={`relative flex-shrink-0 w-32 md:w-40 transition-all duration-500 snap-start group/thumb ${
                    currentIndex === index ? 'scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    animation: `dropIn 0.6s ease-out ${index * 0.1}s backwards`
                  }}
                >
                  <div className="relative">
                    <div className={`absolute -inset-[2px] bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 transition-opacity duration-300 ${
                      currentIndex === index ? 'opacity-100' : 'opacity-0 group-hover/thumb:opacity-60'
                    }`} style={{
                      boxShadow: currentIndex === index ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none'
                    }}></div>

                    <div className="relative bg-black border border-amber-500/40" style={{ aspectRatio: '3/4' }}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                        <div className="absolute top-2 right-2 w-8 h-8 bg-amber-500/20 backdrop-blur-sm border border-amber-500/50 flex items-center justify-center">
                          <ItemIcon size={14} className="text-amber-400" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black to-transparent">
                          <div className="text-center border-t border-amber-500/40 pt-2">
                            <p className="text-amber-400 text-xs md:text-sm font-light tracking-widest mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                              {item.year}
                            </p>
                            <p className="text-white text-xs font-light line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div 
          id="trending-button"
          data-animate
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            visibleElements.has('trending-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-yellow-500/30 to-amber-600/30"></div>
            <a
              href="/trending"
              className="relative block px-12 py-4 border-2 border-amber-500/60 text-amber-300 hover:text-amber-200 hover:border-amber-400 font-light text-base md:text-lg uppercase tracking-widest transition-all duration-300 group"
              style={{
                fontFamily: 'Georgia, serif',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 40px rgba(255, 215, 0, 0.1)'
              }}
            >
              <span className="relative z-10">Explore Archives</span>
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300"></div>
            </a>
          </div>
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
        
        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
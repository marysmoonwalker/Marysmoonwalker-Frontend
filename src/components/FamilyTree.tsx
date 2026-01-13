import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface SubSection {
  name: string;
  link: string;
}

interface FamilyMember {
  id: string;
  name: string;
  image: string;
  subSections: SubSection[];
}

const familyMembers: FamilyMember[] = [
  {
    id: 'michael',
    name: 'Michael Jackson',
    image: 'https://i.pinimg.com/736x/5d/e2/64/5de264d05cb658962d7a5a2a642fc0f4.jpg',
    subSections: [
      { name: 'News', link: '/michael/news' },
      { name: 'Biopic', link: '/michael/biopic' },
      { name: 'Children (Paris, Prince, Blanket)', link: '/michael/children' },
      { name: 'Heal L.A. Foundation', link: 'https://healla.org' },
    ],
  },
  {
    id: 'janet',
    name: 'Janet Jackson',
    image: 'https://i.pinimg.com/1200x/97/51/c9/9751c9d5232918e4830a0b5e83775033.jpg',
    subSections: [
      { name: 'News', link: '/janet/news' },
      { name: 'World Tour 2025', link: '/janet/tour' },
      { name: 'Discography', link: '/janet/discography' },
      { name: 'Movies', link: '/janet/movies' },
    ],
  },
  {
    id: 'jaafar',
    name: 'Jaafar Jackson',
    image: 'https://i.pinimg.com/1200x/58/db/b4/58dbb4c0a4edfcc219d856bdd0500772.jpg',
    subSections: [
      { name: 'News', link: '/jaafar/news' },
      { name: 'Biopic (April 2025)', link: '/jaafar/biopic' },
    ],
  },
  {
    id: 'jermaine',
    name: 'Jermaine Jackson',
    image: 'https://i.pinimg.com/736x/9c/c4/27/9cc42799ac0c54ff93e4c239e2f8b236.jpg',
    subSections: [
      { name: 'News', link: '/jermaine/news' },
      { name: 'Art Museum', link: '/jermaine/museum' },
    ],
  },
  {
    id: 'austin',
    name: 'Austin Brown',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJCzPnsOvfe4UGOqvvDtDWUyrAnQXr91ZbDQ&s',
    subSections: [
      { name: 'News', link: '/austin/news' },
      { name: 'Discography', link: '/austin/discography' },
    ],
  },
  {
    id: 'tj',
    name: 'TJ Jackson',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFyreCv1B9o6wRm51T5sz4V_8NN-8ubOwSQ&s',
    subSections: [
      { name: 'News', link: '/tj/news' },
      { name: 'Discography', link: '/tj/discography' },
    ],
  },
];

export default function FamilyTree() {
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth > 768 ? 384 : 320;
      const gap = 24;
      const totalWidth = cardWidth + gap;
      
      const newIndex = Math.round(scrollLeft / totalWidth);
      setCurrentIndex(Math.min(newIndex, familyMembers.length - 1));
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
    console.log(`Navigate to family member page for: ${id}`);
  };

  return (
    <section className="py-16 px-4" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto">
        <div 
          id="family-header"
          data-animate
          className={`flex justify-between items-center mb-8 px-4 transition-all duration-1000 ${
            visibleElements.has('family-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
              MJ'S FAMILY
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
              disabled={currentIndex === familyMembers.length - 1}
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
            {familyMembers.map((member, index) => (
              <div
                key={member.id}
                id={`family-card-${index}`}
                data-animate
                className={`flex-shrink-0 w-80 md:w-96 snap-start transition-all duration-1000 ${
                  visibleElements.has(`family-card-${index}`) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div
                  className="border-2 border-amber-500/40 hover:border-amber-400 rounded-lg overflow-hidden transition-all duration-300 h-full backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.15)'
                  }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
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
                        {member.name}
                      </h3>
                    </div>
                    
                    <button
                      onClick={() => handleExploreDetails(member.id)}
                      className="flex items-center justify-center gap-2 text-amber-300 text-sm uppercase tracking-wider hover:text-amber-200 transition-colors duration-300 mx-auto font-light"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      <span>Explore More</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          id="family-dots"
          data-animate
          className={`flex justify-center mt-8 gap-2 transition-all duration-1000 delay-300 ${
            visibleElements.has('family-dots') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {familyMembers.map((_, index) => (
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
import { Newspaper, Video, BookOpen, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  accent: string;
  subItems: string[];
}

const features: Feature[] = [
  {
    icon: <Newspaper size={56} />,
    title: 'BREAKING NEWS & UPDATES',
    description:
      'Latest headlines, announcements, tour dates, biopic updates, and real-time coverage of everything happening in the Jackson universe. From Janet\'s world tours to family milestones and legacy projects.',
    link: '/news',
    accent: 'from-amber-600 to-yellow-500',
    subItems: ['Tour Announcements', 'Biopic News', 'Family Updates', 'Legacy Projects', 'Exclusive Reports']
  },
  {
    icon: <Video size={56} />,
    title: 'MEDIA & ENTERTAINMENT VAULT',
    description:
      'Complete collection of concerts, music videos, rare interviews, documentaries, podcasts, and visual content. Relive legendary performances, discover unreleased footage, and stream exclusive MJ content.',
    link: '/media',
    accent: 'from-red-600 to-rose-500',
    subItems: ['Full Concerts', 'Music Videos', 'Interviews', 'Documentaries', 'Podcasts', 'Rare Footage']
  },
  {
    icon: <BookOpen size={56} />,
    title: 'ARCHIVES & COMMUNITY',
    description:
      'In-depth articles, historical deep dives, fan stories, forum discussions, and educational content. Explore Michael\'s artistry, cultural impact, fashion evolution, and connect with the global Moonwalker community.',
    link: '/archive',
    accent: 'from-purple-600 to-pink-500',
    subItems: ['Biographical Articles', 'Music Analysis', 'Fan Tributes', 'Historical Research', 'Community Forum']
  },
];

export default function SiteFeatures() {
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
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'transparent' }}>
      
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" style={{
        background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" style={{
        background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              id={`feature-${index}`}
              data-animate
              className={`group transition-all duration-1000 ${
                visibleElements.has(`feature-${index}`) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/40 transition-all duration-500 h-full p-6 md:p-8 hover:border-amber-400 hover:scale-[1.01] backdrop-blur-sm" style={{
                background: 'rgba(0, 0, 0, 0.3)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.15)'
              }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)'
                }}></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-20 h-20 rounded-xl p-4 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    <div className="text-black">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="font-light text-2xl text-center mb-4 group-hover:text-amber-300 transition-colors duration-300" style={{
                    fontFamily: 'Georgia, serif',
                    color: '#FFD700',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.2)'
                  }}>
                    {feature.title}
                  </h3>

                  <p className="text-white/80 leading-relaxed mb-6 text-center text-base" style={{ fontFamily: 'Georgia, serif' }}>
                    {feature.description}
                  </p>

                  <div className="mb-8 flex-grow">
                    <div className="flex flex-wrap justify-center gap-2">
                      {feature.subItems.map((item, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/30 transition-colors duration-200"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={feature.link}
                    className="inline-flex items-center justify-center gap-3 text-amber-400 hover:text-amber-300 transition-all duration-300 font-light uppercase tracking-wider text-sm group-hover:gap-4 border-t border-amber-500/30 pt-6"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Explore Category
                    <span className="text-xl font-bold">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          id="features-button"
          data-animate
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${
            visibleElements.has('features-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <a
            href="/explore"
            className="inline-flex items-center gap-3 border-2 border-amber-500/60 px-10 py-4 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-200 font-light text-lg uppercase rounded-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'rgba(0, 0, 0, 0.3)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 0 40px rgba(255, 215, 0, 0.1)'
            }}
          >
            <Users size={20} />
            Explore Complete Collection
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { Newspaper, Video, BookOpen, Users } from 'lucide-react';

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
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Gradient Background - Much darker cream at top, light cream at bottom */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #A89070 0%, #E8D5B7 100%)'
        }}
      ></div>
      
      {/* Subtle decorative elements - contained within viewport */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header matching other sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl overflow-hidden border-2 border-amber-700/30 transition-all duration-500 h-full p-6 md:p-8 hover:border-amber-700/60 hover:shadow-2xl hover:scale-[1.01]">
                {/* Subtle glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with gradient - dark cream tones */}
                  <motion.div
                    className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-800 to-amber-700 p-4 text-amber-50 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-bold text-2xl text-amber-950 text-center mb-4 group-hover:text-amber-800 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-700 leading-relaxed mb-6 text-center text-base">
                    {feature.description}
                  </p>

                  {/* Sub-items tags */}
                  <div className="mb-8 flex-grow">
                    <div className="flex flex-wrap justify-center gap-2">
                      {feature.subItems.map((item, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full border border-amber-300 hover:border-amber-500 hover:bg-amber-200 transition-colors duration-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore link */}
                  <motion.a
                    href={feature.link}
                    className="inline-flex items-center justify-center gap-3 text-yellow-700 hover:text-yellow-900 transition-colors duration-300 font-semibold uppercase tracking-wider text-sm group-hover:gap-4 border-t border-amber-700/20 pt-6"
                    whileHover={{ x: 5 }}
                  >
                    Explore Category
                    <span className="text-xl font-bold">→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.a
            href="/explore"
            className="inline-flex items-center gap-3 border-2 border-yellow-700 px-10 py-4 text-yellow-800 hover:bg-yellow-700 hover:text-stone-50 font-bold text-lg uppercase rounded-lg transition-all duration-300 hover:scale-105 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users size={20} />
            Explore Complete Collection
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';

interface ExternalSite {
  name: string;
  description: string;
  url: string;
  icon?: string;
}

const externalSites: ExternalSite[] = [
  {
    name: 'MJVibe',
    description: 'Latest Michael Jackson news, updates, and community discussions',
    url: 'https://mjvibe.com',
  },
  {
    name: 'MJinnocent',
    description: 'Funding and advocacy supporting Michael Jackson\'s innocence and legacy',
    url: 'https://mjinnocent.com',
  },
];

export default function ExternalLinks() {
  return (
    <section className="py-24 px-4 bg-black" id="links">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="font-playfair font-bold text-5xl md:text-6xl text-center text-white mb-2">
          TRUSTED MJ COMMUNITIES
        </h2>
        <div className="w-32 h-1 bg-gold mx-auto mb-4"></div>
        <p className="text-silver text-center uppercase-spaced font-inter mb-16">
          Connect With Fellow Fans
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {externalSites.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="link-card"
            >
              <div className="bg-white border-2 border-gold rounded-lg p-8 text-center transition-all duration-300 gold-glow-hover h-full flex flex-col">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-playfair font-bold text-3xl text-black">
                    {site.name.charAt(0)}
                  </span>
                </div>

                <h3 className="font-playfair font-bold text-2xl text-black mb-4">
                  {site.name}
                </h3>

                <p className="text-gray-700 font-inter leading-relaxed mb-6 flex-grow">
                  {site.description}
                </p>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black border-2 border-gold px-6 py-3 text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded uppercase-spaced text-sm font-inter"
                >
                  Visit Site <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="link-card"
          >
            <div className="bg-white border-2 border-gold border-dashed rounded-lg p-8 text-center transition-all duration-300 hover:border-solid gold-glow-hover h-full flex flex-col items-center justify-center cursor-pointer">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={32} className="text-black" />
              </div>

              <h3 className="font-playfair font-bold text-2xl text-black mb-4">
                Add More Sites
              </h3>

              <p className="text-gray-700 font-inter leading-relaxed">
                Emma can add more trusted links
              </p>

              <p className="text-gold text-sm font-inter uppercase-spaced mt-4">
                Contact Admin
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

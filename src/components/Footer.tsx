import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Users } from 'lucide-react';

export default function Footer() {
  const [onlineCount, setOnlineCount] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-mj-red">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-12">
          <motion.a
            href="/donate"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block liquid-fill bg-mj-red border-4 border-gold px-12 py-8 text-center rounded-lg mb-12 mx-auto max-w-4xl"
          >
            <span className="text-gold hover:text-black font-playfair font-bold text-3xl md:text-4xl uppercase-spaced transition-colors duration-300 relative z-10">
              KEEP THE LEGACY ALIVE - DONATE
            </span>
          </motion.a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-gold font-playfair font-bold text-xl mb-6 uppercase-spaced">
                Site Map
              </h3>
              <ul className="space-y-3 font-inter">
                <li>
                  <a
                    href="#family"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Family
                  </a>
                </li>
                <li>
                  <a
                    href="/news"
                    className="text-white hover:text-gold transition-colors"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/media"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Media
                  </a>
                </li>
                <li>
                  <a
                    href="/forum"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#links"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Links
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-white hover:text-gold transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#forward"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Forward
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-black/30 px-6 py-4 rounded-lg border-2 border-gold">
                <Users size={24} className="text-gold" />
                <div className="text-left">
                  <p className="text-gold text-xs uppercase-spaced font-inter">
                    Moonwalkers Online
                  </p>
                  <p className="text-white font-playfair font-bold text-3xl">{onlineCount}</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-gold font-playfair font-bold text-xl mb-6 uppercase-spaced">
                Connect
              </h3>
              <div className="flex justify-center md:justify-end gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 border-2 border-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gold/30 py-8 text-center">
          <p className="text-white font-inter mb-2">
            &copy; 2025 Mary's Moonwalker &bull; www.marys-moonwalker.com
          </p>
          <p className="text-gold text-sm font-inter mb-2">
            Made with love by a devoted fan since 1988
          </p>
          <p className="text-white/60 text-xs font-inter">
            Domain available - Emma to register &bull; Admin panel coming soon for easy content
            management
          </p>
        </div>
      </div>
    </footer>
  );
}

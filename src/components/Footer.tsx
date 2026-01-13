import { useState, useEffect } from 'react';
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
    <footer className="bg-black" style={{ 
      borderTop: '2px solid rgba(255, 215, 0, 0.3)',
      boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.8)'
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-12">
          <a
            href="/donate"
            className="block border-2 border-amber-500/60 hover:border-amber-400 px-12 py-8 text-center rounded-lg mb-12 mx-auto max-w-4xl transition-all duration-300 hover:scale-[1.02] hover:bg-amber-500/10 group"
            style={{ 
              boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 40px rgba(255, 215, 0, 0.1)'
            }}
          >
            <span className="text-3xl md:text-4xl uppercase tracking-wider font-light group-hover:text-amber-300 transition-colors duration-300" style={{
              fontFamily: 'Georgia, serif',
              color: '#FFD700',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.2)',
              letterSpacing: '0.1em'
            }}>
              KEEP THE LEGACY ALIVE - DONATE
            </span>
          </a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl mb-6 uppercase tracking-wider font-light" style={{
                fontFamily: 'Georgia, serif',
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '0.1em'
              }}>
                Site Map
              </h3>
              <ul className="space-y-3" style={{ fontFamily: 'Georgia, serif' }}>
                <li>
                  <a
                    href="#family"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    Family
                  </a>
                </li>
                <li>
                  <a
                    href="/news"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/media"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    Media
                  </a>
                </li>
                <li>
                  <a
                    href="/forum"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#links"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    Links
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#forward"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    Forward
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-black/50 px-6 py-4 rounded-lg border-2 border-amber-500/60" style={{ 
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
              }}>
                <Users size={24} className="text-amber-400" />
                <div className="text-left">
                  <p className="text-amber-400 text-xs uppercase tracking-wider font-light" style={{ fontFamily: 'Georgia, serif' }}>
                    Moonwalkers Online
                  </p>
                  <p className="font-light text-3xl" style={{
                    fontFamily: 'Georgia, serif',
                    color: '#FFD700',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}>{onlineCount}</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-xl mb-6 uppercase tracking-wider font-light" style={{
                fontFamily: 'Georgia, serif',
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '0.1em'
              }}>
                Connect
              </h3>
              <div className="flex justify-center md:justify-end gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
                  style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
                  style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black border-2 border-amber-500/60 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
                  style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-amber-500/30 py-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          <p className="text-white/80 mb-2">
            &copy; 2025 Mary's Moonwalker &bull; www.marys-moonwalker.com
          </p>
          <p className="text-amber-400 text-sm mb-2">
            Made by Mary's Moonwalker a devoted fan since 1988
          </p>
        </div>
      </div>
    </footer>
  );
}

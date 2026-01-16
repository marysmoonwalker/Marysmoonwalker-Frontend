import { ChevronDown, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopImage = "/image2.jpg";
  const mobileImage = "/image2.jpg";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute top-6 right-6 z-20">
        <button
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm border-2 border-amber-500/60 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 group"
          style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' }}
          aria-label="Profile"
        >
          <User size={20} className="text-amber-400 group-hover:text-amber-300" />
        </button>
      </div>

      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="block md:hidden absolute inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* MOBILE LAYOUT */}
      {isMobile ? (
        <div className="relative z-10 h-full w-full flex flex-col px-4">
          {/* Top Section - Between MARY'S MOONWALKER and MJ's face */}
          <div className="absolute top-[20%] left-0 right-0 flex flex-col items-center space-y-2 px-4">
            <p
              className="text-sm font-bold text-center leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,1)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.6))',
                animation: "fadeInUp 1.2s ease-out 0.5s backwards",
                letterSpacing: "0.05em",
              }}
            >
              From the Imagination of a Devoted Fan
              <br />
              Comes a Website Like No Other
            </p>

            <div
              className="h-px w-40"
              style={{
                background: 'linear-gradient(to right, transparent, #FFD700 20%, #FFA500 50%, #FFD700 80%, transparent)',
                animation: "fadeInScale 1.2s ease-out 0.7s backwards",
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
              }}
            />
          </div>

          {/* Bottom Section - Below MJ's chest */}
          <div className="absolute bottom-[25%] left-0 right-0 flex flex-col items-center space-y-2 px-4">
            <p
              className="text-sm font-bold text-center leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 35px rgba(255, 215, 0, 0.8)',
                filter: 'drop-shadow(0 5px 18px rgba(0,0,0,1)) drop-shadow(0 0 55px rgba(255, 165, 0, 0.6))',
                animation: "fadeInUp 1.2s ease-out 0.9s backwards",
                letterSpacing: "0.05em",
              }}
            >
              Protecting His Extraordinary Legacy
            </p>

            <p
              className="text-xs font-bold text-center leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(192, 192, 192, 0.8)',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,1)) drop-shadow(0 0 50px rgba(200, 200, 200, 0.5))',
                animation: "fadeInUp 1.2s ease-out 1.1s backwards",
                letterSpacing: "0.06em",
              }}
            >
              In Defense of the King
            </p>
          </div>

          {/* Discover More - Bottom */}
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              animation: "fadeInUp 1.2s ease-out 1.3s backwards",
            }}
          >
            <span
              className="text-amber-400/90 text-xs tracking-wide font-medium"
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: '2px 2px 6px rgba(0,0,0,0.9)'
              }}
            >
              Discover More
            </span>

            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ animation: "bounce 2s infinite" }}
            >
              <ChevronDown size={24} className="text-amber-400" style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))'
              }} />
            </div>
          </div>
        </div>
      ) : (
        /* DESKTOP LAYOUT */
        <div className="relative z-10 h-full w-full flex flex-col px-4 py-12">
          {/* Top Section - Between title and face */}
          <div className="absolute top-[23%] left-0 right-0 flex flex-col items-center space-y-4">
            <p
              className="text-2xl font-light text-center max-w-4xl"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,1)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.6))',
                animation: "fadeInUp 1.2s ease-out 0.5s backwards",
                letterSpacing: "0.08em",
                lineHeight: "1.5",
              }}
            >
              From the Imagination of a Devoted Fan
              <br />
              Comes a Website Like No Other
            </p>

            <div
              className="h-px w-96"
              style={{
                background: 'linear-gradient(to right, transparent, #FFD700 20%, #FFA500 50%, #FFD700 80%, transparent)',
                animation: "fadeInScale 1.2s ease-out 0.7s backwards",
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
              }}
            />
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-[20%] left-0 right-0 flex flex-col items-center space-y-4">
            <p
              className="text-3xl font-light text-center"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 35px rgba(255, 215, 0, 0.8)',
                filter: 'drop-shadow(0 5px 18px rgba(0,0,0,1)) drop-shadow(0 0 55px rgba(255, 165, 0, 0.6))',
                animation: "fadeInUp 1.2s ease-out 0.9s backwards",
                letterSpacing: "0.06em",
              }}
            >
              Protecting His Extraordinary Legacy
            </p>

            <p
              className="text-2xl font-light text-center"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(192, 192, 192, 0.8)',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,1)) drop-shadow(0 0 50px rgba(200, 200, 200, 0.5))',
                animation: "fadeInUp 1.2s ease-out 1.1s backwards",
                letterSpacing: "0.08em",
              }}
            >
              In Defense of the King
            </p>
          </div>

          {/* Discover More */}
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
            style={{
              animation: "fadeInUp 1.2s ease-out 1.3s backwards",
            }}
          >
            <span
              className="text-amber-400/90 text-xs tracking-wide font-medium"
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: '2px 2px 6px rgba(0,0,0,0.9)'
              }}
            >
              Discover More
            </span>

            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ animation: "bounce 2s infinite" }}
            >
              <ChevronDown size={28} className="text-amber-400" style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))'
              }} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
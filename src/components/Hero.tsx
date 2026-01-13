import { ChevronDown, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
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

      <div className="relative z-10 h-full flex flex-col justify-between text-center px-4 py-8 md:py-12">
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-6">
          <p
            className="text-sm md:text-xl lg:text-2xl font-light max-w-3xl px-4"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(180deg, #E8E8E8 0%, #B0B0B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(200, 200, 200, 0.4))',
              animation: "fadeInUp 1.2s ease-out 0.5s backwards",
              letterSpacing: "0.08em",
              lineHeight: "1.5",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            From the Imagination of a Devoted Fan
            <br />
            Comes a Website Like No Other
          </p>

          <div
            className="h-px w-48 md:w-80 lg:w-96"
            style={{
              background: 'linear-gradient(to right, transparent, #FFD700 20%, #FFA500 50%, #FFD700 80%, transparent)',
              animation: "fadeInScale 1.2s ease-out 0.7s backwards",
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
              margin: "1rem 0",
            }}
          />

          <p
            className="text-lg md:text-2xl lg:text-3xl font-light"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 25px rgba(255, 215, 0, 0.5)',
              filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(255, 165, 0, 0.4))',
              animation: "fadeInUp 1.2s ease-out 0.9s backwards",
              letterSpacing: "0.06em",
              lineHeight: "1.4",
              margin: "0.5rem 0",
            }}
          >
            Protecting His Extraordinary Legacy
          </p>

          <p
            className="text-base md:text-xl lg:text-2xl font-light"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(180deg, #C0C0C0 0%, #909090 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(160, 160, 160, 0.3))',
              animation: "fadeInUp 1.2s ease-out 1.1s backwards",
              letterSpacing: "0.08em",
              lineHeight: "1.4",
              marginTop: "0.5rem",
            }}
          >
            In Defense of the King
          </p>
        </div>

        <div
          className="flex flex-col items-center gap-3 pb-8"
          style={{
            animation: "fadeInUp 1.2s ease-out 1.3s backwards",
          }}
        >
          <span
            className="text-amber-400/80 text-xs tracking-wide font-light"
            style={{ 
              fontFamily: 'Georgia, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Discover More
          </span>

          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ animation: "bounce 2s infinite" }}
          >
            <ChevronDown size={28} className="text-amber-400" style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
import { ChevronDown, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const desktopFallbackImage =
    "https://i.pinimg.com/1200x/0e/30/2b/0e302b3b391897605d1421dd01e68aad.jpg";
  const mobileFallbackImage =
    "https://i.pinimg.com/1200x/0f/fa/0f/0ffa0fb9c06bf05a81ce3c80128782a4.jpg";

  // Detect mobile ONCE (prevents resize reload issues)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const videoSrc = isMobile ? "/jackson.mp4" : "/jackson2.mp4";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Profile Icon */}
      <div className="absolute top-6 right-6 z-20">
        <button
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm border border-amber-600/30 hover:bg-black/60 hover:border-amber-500 transition-all duration-300 group"
          aria-label="Profile"
        >
          <User size={20} className="text-amber-300 group-hover:text-amber-200" />
        </button>
      </div>

      {/* Video Background */}
      {!videoError && (
        <>
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70 z-0" />
        </>
      )}

      {/* Fallback Images */}
      {videoError && (
        <>
          <div
            className="hidden md:block absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${desktopFallbackImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "sepia(0.15) contrast(1.1)",
            }}
          />

          <div
            className="block md:hidden absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${mobileFallbackImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "sepia(0.15) contrast(1.1)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70 z-0" />
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-center px-4 py-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="text-4xl md:text-7xl font-light tracking-wider text-amber-50 mb-3 md:mb-6"
            style={{
              fontFamily: "Georgia, serif",
              textShadow: "3px 3px 8px rgba(0,0,0,0.8)",
              letterSpacing: "0.15em",
              animation: "fadeInDown 1s ease-out 0.2s backwards",
            }}
          >
            LEGEND LIVES
          </h1>

          <p
            className="text-amber-300/90 text-sm md:text-lg font-light tracking-widest"
            style={{
              fontFamily: "Georgia, serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              animation: "fadeInUp 1s ease-out 0.5s backwards",
            }}
          >
            Preserving the Extraordinary Legacy
          </p>

          <div
            className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent max-w-xs mx-auto mt-6 md:mt-8"
            style={{
              animation: "fadeInUp 1s ease-out 0.7s backwards",
            }}
          />
        </div>

        <div
          className="flex flex-col items-center gap-3 pb-8"
          style={{
            animation: "fadeInUp 1s ease-out 0.8s backwards",
          }}
        >
          <span
            className="text-amber-300/70 text-xs uppercase tracking-widest font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover
          </span>

          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ animation: "bounce 2s infinite" }}
          >
            <ChevronDown size={28} className="text-amber-400" />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
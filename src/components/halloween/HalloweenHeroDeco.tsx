import React, { useState, useEffect } from 'react';
import { useHalloween } from './HalloweenContext';
import { JackOLantern, BatIcon, GhostIcon } from './HalloweenIcons';
import { Volume2, Sparkles } from 'lucide-react';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';

function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : !document.documentElement.classList.contains('light-mode');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light-mode'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') setIsDark(e.newValue !== 'light');
    };
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return isDark;
}

export const HalloweenHeroDeco: React.FC = () => {
  const { isHalloween } = useHalloween();
  const isDark = useTheme();
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [laughPlaying, setLaughPlaying] = useState(false);

  if (!isHalloween) return null;

  const triggerThrillerMagic = () => {
    setEasterEggActive(true);
    setLaughPlaying(true);

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.3);
    } catch {
      // AudioContext unavailable in current browser environment
    }

    setTimeout(() => {
      setEasterEggActive(false);
      setLaughPlaying(false);
    }, 3500);
  };

  const bannerBg = isDark
    ? 'linear-gradient(135deg, rgba(255, 117, 24, 0.16) 0%, rgba(157, 78, 221, 0.12) 50%, rgba(10, 10, 15, 0.85) 100%)'
    : 'linear-gradient(135deg, rgba(255, 243, 230, 0.96) 0%, rgba(246, 238, 255, 0.94) 50%, rgba(255, 255, 255, 0.98) 100%)';

  const bannerBorder = isDark
    ? '1.5px solid rgba(255, 117, 24, 0.45)'
    : '1.5px solid rgba(255, 117, 24, 0.5)';

  const bannerShadow = isDark
    ? '0 0 35px rgba(255, 117, 24, 0.25), inset 0 0 25px rgba(157, 78, 221, 0.15)'
    : '0 10px 30px rgba(255, 117, 24, 0.16), 0 2px 8px rgba(0, 0, 0, 0.04)';

  const titleColor = isDark ? '#FFFFFF' : '#111827';
  const orangeAccent = isDark ? '#FF7518' : '#EA580C';
  const quoteTextColor = isDark ? 'rgba(255, 255, 255, 0.85)' : '#374151';
  const authorTextColor = isDark ? '#FF8C00' : '#C2410C';
  const batCornerColor = isDark ? 'rgba(255, 117, 24, 0.3)' : 'rgba(234, 88, 12, 0.3)';

  return (
    <div className="w-full relative z-20 mb-14 md:mb-16 pt-2">
      <div
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500"
        style={{
          background: bannerBg,
          border: bannerBorder,
          boxShadow: bannerShadow,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="absolute -top-3 -right-3 pointer-events-none" style={{ color: batCornerColor }}>
          <BatIcon size={56} />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div
              onClick={triggerThrillerMagic}
              className="cursor-pointer transition-transform hover:scale-115 active:scale-95 shrink-0"
              title="Click to summon Thriller Magic! 🎃"
            >
              <JackOLantern size={52} glow={true} />
            </div>

            <h2
              className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider leading-tight text-center md:text-left transition-colors duration-300"
              style={{ fontFamily: FONT, letterSpacing: '0.08em', color: titleColor }}
            >
              Thriller <span style={{ color: orangeAccent, textShadow: isDark ? '0 0 20px #FF7518' : 'none' }}>Halloween</span> Night
            </h2>
          </div>

          <div className="max-w-md text-center lg:text-left">
            <p
              className="text-xs md:text-sm italic leading-relaxed transition-colors duration-300"
              style={{ fontFamily: FONT, color: quoteTextColor }}
            >
              "Darkness falls across the land, the midnight hour is close at hand... Creatures crawl in search of blood, to terrorize y'awl's neighbourhood!"
            </p>
            <p
              className="text-[10px] uppercase font-bold tracking-widest mt-1.5 transition-colors duration-300"
              style={{ fontFamily: MONO, color: authorTextColor }}
            >
              — Michael Jackson's Thriller (1982)
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={triggerThrillerMagic}
              type="button"
              className="halloween-btn flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all"
              style={{ fontFamily: MONO }}
            >
              <Volume2 size={15} />
              <span>{laughPlaying ? 'Summoning...' : 'Summon Thriller'}</span>
              <Sparkles size={14} />
            </button>
          </div>
        </div>

        {easterEggActive && (
          <div className="mt-5 p-3 rounded-2xl bg-black/90 border border-[#FF7518] shadow-2xl flex items-center justify-center gap-3 animate-pulse">
            <GhostIcon size={24} />
            <span
              className="text-sm md:text-base font-bold uppercase tracking-widest text-[#FFA333]"
              style={{ fontFamily: MONO }}
            >
              🦇 "Hee-Hee! No mere mortal can resist the evil of the Thriller!" 🎃
            </span>
            <JackOLantern size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

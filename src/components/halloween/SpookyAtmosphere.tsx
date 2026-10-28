import React from 'react';
import { useHalloween } from './HalloweenContext';
import { CobwebSVG, BatIcon, GhostIcon } from './HalloweenIcons';

/**
 * Full Immersion Atmospheric Overlay for the Halloween Thriller season.
 * Features floating ghosts, bat swarms, rising embers, and cobwebs.
 * Completely non-blocking (pointer-events: none) and GPU accelerated.
 */
export const SpookyAtmosphere: React.FC = () => {
  const { isHalloween } = useHalloween();

  if (!isHalloween) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      <div className="absolute top-0 left-0 opacity-60 transition-opacity duration-700">
        <CobwebSVG className="w-36 h-36 md:w-56 md:h-56" />
      </div>

      <div className="absolute top-0 right-0 opacity-60 transition-opacity duration-700">
        <CobwebSVG flip className="w-36 h-36 md:w-56 md:h-56" />
      </div>

      <div className="absolute top-[35%] left-[8%] ghost-float-1 hidden md:block">
        <GhostIcon size={56} />
      </div>

      <div className="absolute top-[60%] right-[10%] ghost-float-2 hidden md:block">
        <GhostIcon size={46} />
      </div>

      <div className="absolute top-0 left-0 text-white/55 bat-flight-1">
        <BatIcon size={38} />
      </div>

      <div className="absolute top-0 right-0 text-white/45 bat-flight-2">
        <BatIcon size={28} />
      </div>

      <div className="absolute bottom-0 left-0 text-white/40 bat-flight-3">
        <BatIcon size={32} />
      </div>

      <div
        className="absolute bottom-10 left-[20%] w-2 h-2 rounded-full bg-[#FF7518] ember-particle"
        style={{ boxShadow: '0 0 10px #FF7518, 0 0 20px #FFA333', animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-12 left-[45%] w-1.5 h-1.5 rounded-full bg-[#FFA333] ember-particle"
        style={{ boxShadow: '0 0 8px #FFA333', animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-8 right-[25%] w-2 h-2 rounded-full bg-[#FF5500] ember-particle"
        style={{ boxShadow: '0 0 10px #FF5500', animationDelay: '6s' }}
      />
      <div
        className="absolute bottom-14 right-[40%] w-1.5 h-1.5 rounded-full bg-[#9D4EDD] ember-particle"
        style={{ boxShadow: '0 0 10px #9D4EDD', animationDelay: '4.5s' }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(7, 7, 9, 0.9) 0%, rgba(157, 78, 221, 0.08) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

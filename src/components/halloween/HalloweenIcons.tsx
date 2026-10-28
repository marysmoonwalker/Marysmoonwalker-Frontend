import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * High-detail Glowing Jack-o'-Lantern SVG
 */
export const JackOLantern: React.FC<IconProps> = ({ size = 32, className = '', glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'pumpkin-glow' : ''}`}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <radialGradient id="pumpkinBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9F1C" />
          <stop offset="65%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#B33900" />
        </radialGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9A6" />
          <stop offset="45%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF3D00" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#558B2F" />
          <stop offset="100%" stopColor="#2E4F18" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path
        d="M32 14 C32 8, 37 5, 41 3 C39 7, 36 11, 34 14 Z"
        fill="url(#stemGrad)"
        stroke="#1F3510"
        strokeWidth="1"
      />

      {/* Pumpkin Outer Ribs */}
      <ellipse cx="18" cy="36" rx="14" ry="19" fill="url(#pumpkinBodyGrad)" opacity="0.95" />
      <ellipse cx="46" cy="36" rx="14" ry="19" fill="url(#pumpkinBodyGrad)" opacity="0.95" />
      <ellipse cx="25" cy="36" rx="13" ry="20" fill="url(#pumpkinBodyGrad)" />
      <ellipse cx="39" cy="36" rx="13" ry="20" fill="url(#pumpkinBodyGrad)" />
      <ellipse cx="32" cy="37" rx="11" ry="20" fill="url(#pumpkinBodyGrad)" />

      {/* Carved Left Eye (Glowing) */}
      <polygon
        points="22,25 28,33 17,33"
        fill="url(#flameGlow)"
        stroke="#5C1600"
        strokeWidth="0.8"
      />

      {/* Carved Right Eye (Glowing) */}
      <polygon
        points="42,25 47,33 36,33"
        fill="url(#flameGlow)"
        stroke="#5C1600"
        strokeWidth="0.8"
      />

      {/* Carved Nose */}
      <polygon
        points="32,33 35,38 29,38"
        fill="url(#flameGlow)"
      />

      {/* Carved Sinister Smile with Jagged Teeth */}
      <path
        d="M17 41 Q32 56 47 41 Q43 46 39 42 Q37 47 34 43 Q32 47 30 43 Q27 47 25 42 Q21 45 17 41 Z"
        fill="url(#flameGlow)"
        stroke="#5C1600"
        strokeWidth="1"
      />
    </svg>
  );
};

/**
 * Animated Bat Silhouette SVG with flapping wings
 */
export const BatIcon: React.FC<IconProps> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 100 55"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} bat-wings`}
    >
      <path
        d="M50 25 
           C46 16, 36 8, 20 12 
           C12 14, 4 20, 0 30 
           C10 28, 20 33, 26 42 
           C32 34, 41 38, 46 47 
           C48 42, 49 32, 50 30 
           C51 32, 52 42, 54 47 
           C59 38, 68 34, 74 42 
           C80 33, 90 28, 100 30 
           C96 20, 88 14, 80 12 
           C64 8, 54 16, 50 25 Z"
      />
      {/* Ears & Head */}
      <polygon points="48,22 46,12 49,17" />
      <polygon points="52,22 54,12 51,17" />
    </svg>
  );
};

/**
 * Floating Ethereal Ghost SVG
 */
export const GhostIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 64 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: 'drop-shadow(0 0 16px rgba(157, 78, 221, 0.7)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))',
      }}
    >
      <defs>
        <radialGradient id="ghostGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E2D4F0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9D4EDD" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Ghost Body Sheet */}
      <path
        d="M32 6 
           C16 6, 8 20, 8 38 
           C8 50, 12 58, 14 70 
           C16 74, 20 71, 24 67 
           C28 63, 31 72, 36 71 
           C41 70, 44 63, 48 68 
           C52 73, 56 68, 56 55 
           C56 38, 48 6, 32 6 Z"
        fill="url(#ghostGrad)"
      />

      {/* Ghost Eyes */}
      <ellipse cx="26" cy="28" rx="3.5" ry="5.5" fill="#1A0933" />
      <ellipse cx="40" cy="28" rx="3.5" ry="5.5" fill="#1A0933" />

      {/* O-shaped spooked mouth */}
      <ellipse cx="33" cy="40" rx="3" ry="4.5" fill="#1A0933" />

      {/* Arm Wisps */}
      <path
        d="M10 38 Q2 44 6 52 Q12 46 12 40 Z"
        fill="url(#ghostGrad)"
      />
      <path
        d="M54 38 Q62 44 58 52 Q52 46 52 40 Z"
        fill="url(#ghostGrad)"
      />
    </svg>
  );
};

/**
 * Harvest Blood Moon with atmospheric glow
 */
export const BloodMoonSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} blood-moon`}
    >
      <defs>
        <radialGradient id="bloodMoonGrad" cx="38%" cy="36%" r="62%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="35%" stopColor="#FFA000" />
          <stop offset="75%" stopColor="#E65100" />
          <stop offset="100%" stopColor="#BF360C" />
        </radialGradient>
      </defs>

      {/* Moon Disc */}
      <circle cx="100" cy="100" r="92" fill="url(#bloodMoonGrad)" />

      {/* Craters */}
      <circle cx="65" cy="70" r="14" fill="#B71C1C" opacity="0.3" />
      <circle cx="55" cy="120" r="18" fill="#B71C1C" opacity="0.25" />
      <circle cx="115" cy="65" r="12" fill="#B71C1C" opacity="0.2" />
      <circle cx="135" cy="115" r="22" fill="#B71C1C" opacity="0.28" />
      <circle cx="105" cy="145" r="10" fill="#B71C1C" opacity="0.25" />
      <circle cx="150" cy="80" r="8" fill="#B71C1C" opacity="0.2" />
    </svg>
  );
};

/**
 * Gothic Skull SVG Accent
 */
export const SkullIcon: React.FC<IconProps> = ({ size = 24, className = '', glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: glow ? 'drop-shadow(0 0 10px rgba(255, 117, 24, 0.8))' : 'none',
      }}
    >
      {/* Cranium */}
      <path
        d="M24 6 C13 6 8 14 8 24 C8 29 11 33 14 35 L14 41 C14 42 16 43 18 43 L30 43 C32 43 34 42 34 41 L34 35 C37 33 40 29 40 24 C40 14 35 6 24 6 Z"
        fill="currentColor"
        stroke="#4B5563"
        strokeWidth="1.2"
      />
      {/* Eye Sockets */}
      <ellipse cx="17" cy="22" rx="4.5" ry="6" fill="#0A0A0A" />
      <ellipse cx="31" cy="22" rx="4.5" ry="6" fill="#0A0A0A" />
      {/* Nose Cavity */}
      <polygon points="24,28 22,33 26,33" fill="#0A0A0A" />
      {/* Teeth Lines */}
      <line x1="20" y1="38" x2="20" y2="43" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="24" y1="38" x2="24" y2="43" stroke="#0A0A0A" strokeWidth="1.5" />
      <line x1="28" y1="38" x2="28" y2="43" stroke="#0A0A0A" strokeWidth="1.5" />
    </svg>
  );
};

/**
 * Delicately crafted Corner Cobweb SVG
 */
export const CobwebSVG: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = '',
}) => {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: flip ? 'scaleX(-1)' : 'none',
        pointerEvents: 'none',
      }}
    >
      {/* Radial Anchor Spokes */}
      <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="0" y1="0" x2="170" y2="45" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
      <line x1="0" y1="0" x2="150" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
      <line x1="0" y1="0" x2="110" y2="140" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
      <line x1="0" y1="0" x2="60" y2="165" stroke="rgba(255,255,255,0.25)" strokeWidth="0.9" />
      <line x1="0" y1="0" x2="0" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Concentric Arcs */}
      <path
        d="M35 0 Q31 12 27 24 Q18 30 9 35 Q3 36 0 37"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.85"
        fill="none"
      />
      <path
        d="M70 0 Q62 23 54 44 Q38 56 20 66 Q9 70 0 71"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.85"
        fill="none"
      />
      <path
        d="M110 0 Q96 35 82 66 Q59 86 31 101 Q15 107 0 109"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.85"
        fill="none"
      />
      <path
        d="M150 0 Q129 46 110 88 Q79 116 43 137 Q21 145 0 147"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.85"
        fill="none"
      />
      <path
        d="M180 0 Q159 56 137 108 Q99 143 52 169 Q26 178 0 180"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.85"
        fill="none"
      />
    </svg>
  );
};

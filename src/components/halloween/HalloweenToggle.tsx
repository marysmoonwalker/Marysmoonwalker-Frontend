import React from 'react';
import { useHalloween } from './HalloweenContext';
import { JackOLantern } from './HalloweenIcons';

interface ToggleProps {
  className?: string;
  variant?: 'icon-only' | 'drawer-row';
}

export const HalloweenToggle: React.FC<ToggleProps> = ({
  className = '',
  variant = 'icon-only',
}) => {
  const { isHalloween, toggleHalloween } = useHalloween();

  if (variant === 'drawer-row') {
    return (
      <button
        onClick={toggleHalloween}
        type="button"
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 ${className}`}
        style={{
          border: isHalloween ? '1px solid rgba(255, 117, 24, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
          background: isHalloween ? 'rgba(255, 117, 24, 0.15)' : 'rgba(255, 255, 255, 0.03)',
        }}
        aria-label="Toggle Halloween Mode"
      >
        <div className="flex items-center gap-3">
          <JackOLantern size={22} glow={isHalloween} />
          <span
            className="text-[11px] font-bold tracking-widest uppercase"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              color: isHalloween ? '#FF7518' : 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Halloween Thriller Mode
          </span>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            backgroundColor: isHalloween ? '#FF7518' : 'rgba(255, 255, 255, 0.1)',
            color: isHalloween ? '#000000' : 'rgba(255, 255, 255, 0.6)',
          }}
        >
          {isHalloween ? 'ON' : 'OFF'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleHalloween}
      type="button"
      className={`relative group flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${className}`}
      style={{
        border: isHalloween
          ? '1.5px solid #FF7518'
          : '1px solid rgba(255, 255, 255, 0.15)',
        backgroundColor: isHalloween
          ? 'rgba(255, 117, 24, 0.2)'
          : 'transparent',
        boxShadow: isHalloween
          ? '0 0 16px rgba(255, 117, 24, 0.6), inset 0 0 8px rgba(255, 117, 24, 0.3)'
          : 'none',
      }}
      title={
        isHalloween
          ? 'Halloween Theme Active — Click to switch to Classic'
          : 'Switch to Halloween Thriller Theme'
      }
      aria-label="Toggle Halloween theme"
    >
      <JackOLantern size={isHalloween ? 20 : 18} glow={isHalloween} />

      {/* Floating dot indicator */}
      {isHalloween && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
          style={{ backgroundColor: '#FF7518', boxShadow: '0 0 6px #FF7518' }}
        />
      )}
    </button>
  );
};

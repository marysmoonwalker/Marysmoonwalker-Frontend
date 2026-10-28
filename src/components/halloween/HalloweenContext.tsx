import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HalloweenContextType {
  isHalloween: boolean;
  toggleHalloween: () => void;
  setHalloween: (active: boolean) => void;
}

const HalloweenContext = createContext<HalloweenContextType | undefined>(undefined);

// Enabled by default as requested. After Halloween season, simply switch this to false.
export const DEFAULT_HALLOWEEN_ENABLED = true;
const STORAGE_KEY = 'mary_halloween_theme';

export const HalloweenProvider = ({ children }: { children: ReactNode }) => {
  const [isHalloween, setIsHalloween] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'disabled') return false;
      if (saved === 'enabled') return true;
      return DEFAULT_HALLOWEEN_ENABLED;
    } catch {
      return DEFAULT_HALLOWEEN_ENABLED;
    }
  });

  useEffect(() => {
    try {
      if (isHalloween) {
        document.documentElement.classList.add('halloween-active');
        localStorage.setItem(STORAGE_KEY, 'enabled');
      } else {
        document.documentElement.classList.remove('halloween-active');
        localStorage.setItem(STORAGE_KEY, 'disabled');
      }
    } catch (e) {
      console.warn('Failed to update Halloween theme storage:', e);
    }

    return () => {
      document.documentElement.classList.remove('halloween-active');
    };
  }, [isHalloween]);

  const toggleHalloween = () => setIsHalloween((prev) => !prev);
  const setHalloween = (active: boolean) => setIsHalloween(active);

  return (
    <HalloweenContext.Provider value={{ isHalloween, toggleHalloween, setHalloween }}>
      {children}
    </HalloweenContext.Provider>
  );
};

export const useHalloween = () => {
  const context = useContext(HalloweenContext);
  if (!context) {
    console.warn('useHalloween was called outside of a HalloweenProvider. Falling back to default disabled state.');
    return {
      isHalloween: false,
      toggleHalloween: () => {},
      setHalloween: () => {},
    };
  }
  return context;
};


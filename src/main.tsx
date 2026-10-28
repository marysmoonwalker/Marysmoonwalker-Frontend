import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/halloween.css';
import { AuthProvider } from './context/AuthContext';
import { HalloweenProvider } from './components/halloween/HalloweenContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HalloweenProvider>
        <App />
      </HalloweenProvider>
    </AuthProvider>
  </StrictMode>
);
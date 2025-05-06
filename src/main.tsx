// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { reportWebVitals } from './lib/vitals';
import './styles/critical.css';
import './index.css';

// Google Analytics Typdefinitionen
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (command: string, ...args: unknown[]) => void;
    }
}

// Container holen und Root erstellen
const container = document.getElementById('root');
if (!container) throw new Error('Root-Element nicht gefunden!');

const root = createRoot(container);

// App rendern
root.render(
    <StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StrictMode>
);

// Web Vitals melden
reportWebVitals();
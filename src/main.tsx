// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { reportWebVitals } from './lib/vitals';
import './styles/critical.css';
import './index.css';

// Google Analytics Setup
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (command: string, ...args: unknown[]) => void;
    }
}

// Container holen und Root erstellen
const container = document.getElementById('root');
if (!container) throw new Error('Root-Element nicht gefunden!');

// Google Analytics initialisieren
const loadGoogleAnalytics = () => {
    // Script-Tag erstellen und einfügen
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-HKZ64S51GN";
    document.head.appendChild(script);

    // Globale dataLayer-Variable definieren
    window.dataLayer = window.dataLayer || [];
    // gtag-Funktion definieren
    window.gtag = function(command, ...rest) {
        window.dataLayer.push([command, ...rest]);
    };

    // Analytics initialisieren
    window.gtag('js', new Date());
    window.gtag('config', 'G-HKZ64S51GN');
};

// Google Analytics laden
loadGoogleAnalytics();

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
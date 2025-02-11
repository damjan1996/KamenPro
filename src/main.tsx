// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { reportWebVitals } from './lib/vitals';
import './styles/critical.css';
import './index.css';

// Preload kritische Ressourcen
const preloadLinks = [
    {
        rel: 'preload',
        href: '/fonts/inter-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
    },
];

// Füge Preload-Links dynamisch hinzu
preloadLinks.forEach(({ rel, href, as, type, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StrictMode>
);

reportWebVitals();
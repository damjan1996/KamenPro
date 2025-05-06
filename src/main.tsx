// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { reportWebVitals } from './lib/vitals';
import performanceUtils from './lib/performance';
import './styles/critical.css';
import './index.css';

// Google Analytics Typdefinitionen
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (command: string, ...args: unknown[]) => void;
        hj?: (command: string, ...args: unknown[]) => void;
    }
}

// Performance-Markierung für App-Start
performanceUtils.createPerformanceMark('app-start');

// Performance-Monitoring initialisieren
const cleanupPerformance = performanceUtils.initPerformanceMonitoring();

// Seiten-Sichtbarkeitsänderungen überwachen
const cleanupVisibility = performanceUtils.monitorPageVisibility();

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

// Initiales Laden-Performance messen
window.addEventListener('load', () => {
    performanceUtils.markInitialLoadPerformance();
    performanceUtils.createPerformanceMark('app-ready');
    performanceUtils.measurePerformance('app-load-time', 'app-start', 'app-ready');
});

// Web Vitals melden
reportWebVitals();

// Error Tracking für unbehandelte Fehler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    if (window.hj) {
        window.hj('event', 'unhandled_error', {
            error: event.reason?.toString(),
            type: 'unhandledrejection'
        });
    }
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);

    if (window.hj) {
        window.hj('event', 'global_error', {
            error: event.error?.toString(),
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    }
});

// Mobile Debug Helper
if (performanceUtils.isMobile()) {
    document.body.classList.add('mobile-device');

    // Mobile-spezifisches Debugging
    console.log('Mobile device detected - enhanced logging enabled');

    // Touch-Events tracken für Debug-Zwecke
    let touchStartTime: number;

    document.addEventListener('touchstart', () => {
        touchStartTime = performance.now();
    });

    document.addEventListener('touchend', () => {
        const touchDuration = performance.now() - touchStartTime;
        if (touchDuration > 300) { // Long touch
            console.log(`Long touch detected: ${touchDuration}ms`);
        }
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    cleanupPerformance();
    cleanupVisibility();
});
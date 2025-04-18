// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Korrektes Lazy Loading für vorhandene Komponenten
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const References = lazy(() => import('./pages/References'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// Neue ProductDetail Komponente mit Lazy Loading
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'));

// Google Analytics nur laden, wenn Zustimmung gegeben wurde
function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-HKZ64S51GN";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(command, ...args) {
        window.dataLayer.push([command, ...args]);
    };

    window.gtag('js', new Date());
    window.gtag('config', 'G-HKZ64S51GN');
}

// RouteTracker Komponente für Analytics
function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', 'G-HKZ64S51GN', {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}

function App() {
    const [cookieConsent, setCookieConsent] = useState(false);

    // Prüfen ob bereits Zustimmung gegeben wurde
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent') === 'true';
        setCookieConsent(consent);

        if (consent) {
            loadGoogleAnalytics();
        }
    }, []);

    return (
        <Router>
            <ErrorBoundary>
                {cookieConsent && <RouteTracker />}
                <Header />
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Učitavanje...</div>}>
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/o-nama" element={<About />} />
                            <Route path="/proizvodi" element={<Products />} />
                            <Route path="/proizvodi/:productId" element={<ProductDetail />} />
                            <Route path="/reference" element={<References />} />
                            <Route path="/kontakt" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </Suspense>
                <Footer />

                <CookieConsent
                    location="bottom"
                    buttonText="Prihvati"
                    cookieName="cookieConsent"
                    style={{
                        background: "rgba(0, 0, 0, 0.85)",
                        backdropFilter: "blur(8px)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "16px"
                    }}
                    buttonStyle={{
                        background: "#d97706", // amber-600 (ähnlich wie der Seiten-Button)
                        color: "#111827", // gray-900
                        fontSize: "14px",
                        borderRadius: "2px",
                        padding: "8px 20px",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase"
                    }}
                    expires={150} // 150 Tage
                    onAccept={() => {
                        localStorage.setItem('cookieConsent', 'true');
                        setCookieConsent(true);
                        loadGoogleAnalytics();
                    }}
                    enableDeclineButton
                    declineButtonText="Odbij"
                    declineButtonStyle={{
                        fontSize: "14px",
                        padding: "8px 20px",
                        borderRadius: "2px",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        background: "transparent",
                        color: "white",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase"
                    }}
                    onDecline={() => {
                        localStorage.setItem('cookieConsent', 'false');
                        setCookieConsent(false);
                    }}
                    cookieSecurity={true}
                    contentStyle={{
                        flex: "1 0 300px",
                        margin: "8px 0"
                    }}
                    buttonWrapperClasses="flex flex-wrap gap-3 items-center"
                >
          <span className="text-base font-light tracking-wide">
            Ova web stranica koristi kolačiće kako bi vam pružila bolje korisničko iskustvo.
          </span>
                    <span className="text-sm opacity-80 block mt-2 font-light tracking-wide">
            Koristimo kolačiće za osnovne funkcije web stranice i za analitičke svrhe. Možete prihvatiti sve kolačiće ili ih odbiti.
          </span>
                </CookieConsent>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
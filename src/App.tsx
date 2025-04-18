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
                    buttonText="Prihvati sve"
                    cookieName="cookieConsent"
                    style={{
                        background: "rgba(0, 0, 0, 0.85)",
                        backdropFilter: "blur(8px)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "16px"
                    }}
                    buttonStyle={{
                        background: "#d97706",
                        color: "#111827",
                        fontSize: "14px",
                        borderRadius: "2px",
                        padding: "8px 20px",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase"
                    }}
                    expires={150}
                    onAccept={() => {
                        localStorage.setItem('cookieConsent', 'true');
                        localStorage.setItem('analyticsCookies', 'true');
                        setCookieConsent(true);
                        loadGoogleAnalytics();
                    }}
                    enableDeclineButton
                    declineButtonText="Samo neophodni"
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
                        localStorage.setItem('analyticsCookies', 'false');
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
                    <div className="text-sm opacity-80 block mt-3 font-light tracking-wide">
                        <div className="mb-2 flex items-start">
                            <div className="w-5 h-5 rounded-sm border border-white/30 flex items-center justify-center mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong className="font-medium">Neophodni kolačići:</strong> Omogućavaju osnovne funkcije web stranice (uključujući Supabase za autentikaciju i osnovne funkcije).
                            </div>
                        </div>
                        <div className="mb-2 flex items-start">
                            <div className="w-5 h-5 rounded-sm border border-white/30 flex items-center justify-center mr-2 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <strong className="font-medium">Analitički kolačići:</strong> Pomažu nam da razumemo kako koristite našu web stranicu (Google Analytics).
                            </div>
                        </div>
                    </div>
                    <a
                        href="/privatnost"
                        className="text-sm underline hover:text-amber-400 transition-colors block mt-2 tracking-wide"
                    >
                        Saznajte više u našoj politici privatnosti
                    </a>
                </CookieConsent>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
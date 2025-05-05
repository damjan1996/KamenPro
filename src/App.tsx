// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { Analytics } from "@vercel/analytics/react";
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

// Cookie-Kategorien und Einstellungen
type CookieSettings = {
    necessary: boolean;
    analytics: boolean;
}

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
    window.gtag('config', 'G-HKZ64S51GN', {
        anonymize_ip: true // DSGVO-konforme IP-Anonymisierung
    });
}

// RouteTracker Komponente für Analytics
function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', 'G-HKZ64S51GN', {
                page_path: location.pathname + location.search,
                anonymize_ip: true
            });
        }
    }, [location]);

    return null;
}

function App() {
    const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
        necessary: true, // Immer true, da notwendig
        analytics: false
    });

    // Prüfen ob bereits Zustimmung gegeben wurde
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem('cookieSettings');
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings) as CookieSettings;
                setCookieSettings(parsedSettings);

                // Nur Analytics laden, wenn zugestimmt wurde
                if (parsedSettings.analytics) {
                    loadGoogleAnalytics();
                }
            }
        } catch (error) {
            console.error('Error loading cookie settings:', error);
        }
    }, []);

    // Hilfsfunktion zum Speichern der Cookie-Einstellungen
    const saveCookieSettings = (settings: CookieSettings) => {
        localStorage.setItem('cookieSettings', JSON.stringify(settings));
        setCookieSettings(settings);
    };

    // Alle Cookies akzeptieren
    const acceptAllCookies = () => {
        const settings = {
            necessary: true,
            analytics: true
        };
        saveCookieSettings(settings);
        loadGoogleAnalytics();
    };

    // Nur notwendige Cookies akzeptieren
    const acceptNecessaryCookies = () => {
        const settings = {
            necessary: true,
            analytics: false
        };
        saveCookieSettings(settings);
    };

    return (
        <Router>
            <ErrorBoundary>
                {cookieSettings.analytics && <RouteTracker />}
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

                {/* Vercel Analytics Komponente */}
                <Analytics />

                <CookieConsent
                    location="bottom"
                    buttonText="Prihvati sve"
                    cookieName="cookieConsent"
                    style={{
                        background: "rgba(0, 0, 0, 0.95)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        position: "fixed",
                        bottom: "0",
                        left: "0",
                        right: "0",
                        zIndex: 99999,
                        padding: "24px",
                        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(8px)"
                    }}
                    buttonStyle={{
                        background: "#d97706",
                        color: "#111827",
                        fontSize: "14px",
                        borderRadius: "2px",
                        padding: "12px 32px",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginLeft: "16px"
                    }}
                    contentStyle={{
                        flex: "1",
                        textAlign: "left"
                    }}
                    expires={150}
                    onAccept={acceptAllCookies}
                    enableDeclineButton
                    declineButtonText="Samo neophodni"
                    declineButtonStyle={{
                        fontSize: "14px",
                        padding: "12px 32px",
                        borderRadius: "2px",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        background: "transparent",
                        color: "white",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginLeft: "12px"
                    }}
                    onDecline={acceptNecessaryCookies}
                    cookieSecurity={true}
                    buttonWrapperClasses="flex items-center justify-end mt-4"
                    disableButtonStyles={false}
                    overlay={false}
                    hideOnAccept={true}
                    acceptOnScroll={false}
                >
                    <div style={{ color: "white", fontSize: "16px", fontWeight: "300" }}>
                        <span className="block mb-4">
                            Ova web stranica koristi kolačiće kako bi vam pružila bolje korisničko iskustvo.
                        </span>
                        <div className="text-sm opacity-80 mb-6">
                            <div className="mb-2 flex items-start">
                                <div className="w-5 h-5 rounded-sm border border-white/30 flex items-center justify-center mr-2 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium">Neophodni kolačići:</strong> Omogućavaju osnovne funkcije web stranice.
                                </div>
                            </div>
                            <div className="mb-2 flex items-start">
                                <div className="w-5 h-5 rounded-sm border border-white/30 flex items-center justify-center mr-2 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium">Analitički kolačići:</strong> Pomažu nam da razumemo kako koristite našu web stranicu.
                                </div>
                            </div>
                        </div>
                    </div>
                </CookieConsent>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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
    return (
        <Router>
            <ErrorBoundary>
                <RouteTracker />
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
            </ErrorBoundary>
        </Router>
    );
}

export default App;
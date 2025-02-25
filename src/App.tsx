// src/App.tsx - Änderung

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Korrektes Lazy Loading
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const References = lazy(() => import('./pages/References'));
const Contact = lazy(() => import('./pages/Contact')); // Stelle sicher, dass Contact importiert wird

// Falls die NotFound Komponente im Projekt ist
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Učitavanje...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/o-nama" element={<About />} />
                        <Route path="/proizvodi" element={<Products />} />
                        <Route path="/reference" element={<References />} />
                        <Route path="/kontakt" element={<Contact />} /> {/* Füge Route für Contact hinzu */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
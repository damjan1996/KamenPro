import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Enhanced lazy loading with preload capability
const lazyWithPreload = (importFn) => {
  const Component = lazy(importFn);
  Component.preload = importFn;
  return Component;
};

// Lazy load pages with preload support
const Home = lazyWithPreload(() =>
    import('./pages/Home').then(module => ({ default: module.Home }))
);
const About = lazyWithPreload(() =>
    import('./pages/About').then(module => ({ default: module.About }))
);
const Products = lazyWithPreload(() =>
    import('./pages/Products').then(module => ({ default: module.Products }))
);
const References = lazyWithPreload(() =>
    import('./pages/References').then(module => ({ default: module.References }))
);
const Contact = lazyWithPreload(() =>
    import('./pages/Contact').then(module => ({ default: module.Contact }))
);
const NotFound = lazyWithPreload(() =>
    import('./pages/NotFound').then(module => ({ default: module.NotFound }))
);

// Enhanced loading component with ARIA support
function PageLoader() {
  return (
      <div
          className="min-h-screen flex items-center justify-center"
          role="progressbar"
          aria-label="Učitavanje stranice"
      >
        <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"
            aria-hidden="true"
        />
      </div>
  );
}

function App() {
  // Preload critical routes on idle
  useEffect(() => {
    const preloadCriticalRoutes = () => {
      requestIdleCallback(() => {
        Home.preload();
        Products.preload();
      });
    };

    preloadCriticalRoutes();
  }, []);

  return (
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/references" element={<References />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
  );
}

export default App;
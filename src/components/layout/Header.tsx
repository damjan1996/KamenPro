// src/components/layout/Header.tsx
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrolled(true);
    const checkScrollPosition = () => {
      setScrolled(window.scrollY > 20);
      setInitialized(true);
    };
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!initialized) return;
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialized]);

  const navigation = [
    { name: 'POČETNA', href: '/' },
    { name: 'O NAMA', href: '/o-nama' },
    { name: 'PROIZVODI', href: '/proizvodi' },
    { name: 'REFERENCE', href: '/reference' }
  ];

  return (
      <>
        <div className="overflow-x-hidden w-full">
          <header
              ref={headerRef}
              className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
                  scrolled
                      ? 'bg-gray-900 shadow-md'
                      : 'bg-black bg-opacity-70 backdrop-blur-sm'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <div className="max-w-full mx-auto px-3 sm:px-6 lg:container lg:px-8">
              <nav className="flex items-center justify-between h-14 sm:h-16 md:h-18">
                <div className="flex-shrink-0">
                  <a
                      href="/"
                      className="flex items-center text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white"
                  >
                    <span className="text-amber-500">KAMEN</span>
                    <span className="ml-1">PRO</span>
                  </a>
                </div>

                <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 overflow-x-auto">
                  {navigation.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className="relative text-white hover:text-amber-400 transition-all duration-300 font-light tracking-wider text-sm whitespace-nowrap after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {item.name}
                      </a>
                  ))}
                  <a
                      href="/kontakt"
                      className="px-4 sm:px-5 py-2 bg-amber-500 text-gray-900 text-sm rounded-sm hover:bg-amber-400 transition-all duration-300 font-light tracking-wider whitespace-nowrap"
                  >
                    KONTAKTIRAJTE NAS
                  </a>
                </div>

                <button
                    className="lg:hidden p-1.5 sm:p-2 rounded-sm hover:bg-gray-800 transition-colors duration-300 z-60"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                    type="button"
                >
                  {isMenuOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  )}
                </button>
              </nav>
            </div>
          </header>
        </div>

        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />
        )}

        <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gray-900 z-50 shadow-xl overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigacioni meni"
        >
          <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 z-60"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Zatvori meni"
              type="button"
          >
            <X className="h-5 w-5 text-white" aria-hidden="true" />
          </button>

          <div className="flex flex-col h-full pt-16 pb-6 px-4">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <a
                  href="/"
                  className="flex items-center text-xl font-light tracking-wide text-white ml-4"
              >
                <span className="text-amber-500">KAMEN</span>
                <span className="ml-1">PRO</span>
              </a>
            </div>
            <nav className="flex-1" aria-label="Glavni meni">
              {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-800">
                    <a
                        href={item.href}
                        className="block py-3 px-4 text-white hover:text-amber-400 hover:bg-gray-800 transition-colors font-light tracking-wider text-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </div>
              ))}
            </nav>
            <div className="pt-6 border-t border-gray-800">
              <a
                  href="/kontakt"
                  className="px-6 py-3 bg-amber-500 text-gray-900 rounded-sm hover:bg-amber-400 transition-all duration-300 block w-full text-center font-light tracking-wider text-sm"
                  onClick={() => setIsMenuOpen(false)}
              >
                KONTAKTIRAJTE NAS
              </a>
            </div>
          </div>
        </div>
      </>
  );
}
// src/components/layout/Header.tsx
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true); // Initial auf true setzen
  const [initialized, setInitialized] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialisierung des Headers
  useEffect(() => {
    // Setze den Header initial auf "scrolled" für korrekte Positionierung
    setScrolled(true);

    // Nach dem ersten Render die korrekte Scroll-Position berechnen
    const checkScrollPosition = () => {
      setScrolled(window.scrollY > 20);
      setInitialized(true);
    };

    // Verzögerung, um sicherzustellen, dass der DOM vollständig geladen ist
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle body scroll when menu is open - VERBESSERT
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.touchAction = 'none'; // Verhindert Scrolling auf Touch-Geräten
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Handle scroll effect for header
  useEffect(() => {
    if (!initialized) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Passive listener für bessere Performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialized]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [activeDropdown]);

  // Navigation items - Nur die Hauptnavigationseinträge behalten
  const navigation: NavigationItem[] = [
    { name: 'POČETNA', href: '/' },
    { name: 'O NAMA', href: '/o-nama' },
    { name: 'PROIZVODI', href: '/proizvodi' },
    // { 
    //   name: 'LOKACIJE', 
    //   href: '#',
    //   submenu: [
    //     { name: 'Bijeljina', href: '/lokacije/bijeljina' },
    //     { name: 'Brčko', href: '/lokacije/brcko' },
    //     { name: 'Tuzla', href: '/lokacije/tuzla' }
    //   ]
    // },
    { name: 'REFERENCE', href: '/reference' }
  ];

  // Touch event handlers für verbesserte mobile Navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    // Swipe zum Schließen der Sidebar
    if (diff > 50 && isMenuOpen) {
      setIsMenuOpen(false);
    }

    touchStartRef.current = null;
  };

  return (
      <>
        <header
            ref={headerRef}
            className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
                scrolled
                    ? 'bg-gray-900 shadow-md'
                    : 'bg-black bg-opacity-70 backdrop-blur-sm'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* Angepasster Container für Mobile */}
            <div className="max-w-full mx-auto px-3 sm:px-6 lg:container lg:px-8">
              <nav className="flex items-center justify-between h-14 sm:h-16 md:h-18" role="navigation" aria-label="Glavna navigacija">
                {/* Logo - mit angepasster Größe für Mobile */}
                <div className="flex-shrink-0">
                  <a
                      href="/"
                      className="flex items-center text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm"
                      aria-label="KamenPro početna stranica"
                  >
                    <span className="text-amber-500">KAMEN</span>
                    <span className="ml-1">PRO</span>
                  </a>
                </div>

                {/* Desktop Navigation - Now with dropdown support */}
                <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                  {navigation.map((item) => (
                      item.submenu ? (
                          <div
                              key={item.name}
                              className="relative group"
                              ref={item.submenu ? dropdownRef : null}
                              onMouseEnter={() => setActiveDropdown(item.name)}
                              onMouseLeave={() => setActiveDropdown(null)}
                          >
                              <button
                                  className="relative text-white hover:text-amber-400 transition-all duration-300 font-light tracking-wider text-sm whitespace-nowrap after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center py-2"
                                  aria-expanded={activeDropdown === item.name}
                                  aria-haspopup="true"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                                  }}
                              >
                                  {item.name}
                                  <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                              </button>
                              <div className={`absolute top-full left-0 pt-1 transition-all duration-200 z-50 ${
                                  activeDropdown === item.name 
                                      ? 'opacity-100 visible translate-y-0' 
                                      : 'opacity-0 invisible -translate-y-2'
                              }`}>
                                  <div className="bg-gray-900 rounded-sm shadow-xl overflow-hidden border border-gray-800 min-w-[200px]">
                                      {item.submenu.map((subitem) => (
                                          <a
                                              key={subitem.name}
                                              href={subitem.href}
                                              className="block px-4 py-3 text-sm text-white hover:bg-gray-800 hover:text-amber-400 transition-colors duration-200 border-b border-gray-800 last:border-b-0"
                                              onClick={() => setActiveDropdown(null)}
                                          >
                                              {subitem.name}
                                          </a>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <a
                              key={item.name}
                              href={item.href}
                              className="relative text-white hover:text-amber-400 transition-all duration-300 font-light tracking-wider text-sm whitespace-nowrap after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                              aria-current={window.location.pathname === item.href ? 'page' : undefined}
                          >
                              {item.name}
                          </a>
                      )
                  ))}
                  <a
                      href="/kontakt"
                      className="px-4 sm:px-5 py-2 bg-amber-500 text-gray-900 text-sm rounded-sm hover:bg-amber-400 transition-all duration-300 font-light tracking-wider whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    KONTAKTIRAJTE NAS
                  </a>
                </div>

                {/* Mobile Menu Button - immer sichtbar */}
                <button
                    className="lg:hidden p-1.5 sm:p-2 rounded-sm hover:bg-gray-800 transition-colors duration-300 z-60 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
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

        {/* Mobile Sidebar Overlay - verbessert mit Swipe-Unterstützung */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />
        )}

        {/* Mobile Sidebar - verbessert mit Touch-Unterstützung */}
        <div
            id="mobile-menu"
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gray-900 z-50 shadow-xl overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
        >
          {/* Schließen-Button oben rechts in der Sidebar */}
          <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 z-60 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Zatvori meni"
          >
            <X className="h-5 w-5 text-white" aria-hidden="true" />
          </button>

          <div className="flex flex-col h-full pt-16 pb-6 px-4">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <a
                  href="/"
                  className="flex items-center text-xl font-light tracking-wide text-white ml-4 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm"
                  aria-label="KamenPro početna stranica"
              >
                <span className="text-amber-500">KAMEN</span>
                <span className="ml-1">PRO</span>
              </a>
            </div>
            <nav className="flex-1 space-y-1" role="navigation" aria-label="Mobile navigacija">
              {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-800">
                    {item.submenu ? (
                        <>
                          <div className="py-3 px-4 text-white font-light tracking-wider text-sm">
                            {item.name}
                          </div>
                          <div className="pl-4">
                            {item.submenu.map((subitem) => (
                                <a
                                    key={subitem.name}
                                    href={subitem.href}
                                    className="block py-2 px-4 text-stone-300 hover:text-amber-400 hover:bg-gray-800 transition-colors font-light text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                  {subitem.name}
                                </a>
                            ))}
                          </div>
                        </>
                    ) : (
                        <a
                            href={item.href}
                            className="block py-3 px-4 text-white hover:text-amber-400 hover:bg-gray-800 transition-colors font-light tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onClick={() => setIsMenuOpen(false)}
                            aria-current={window.location.pathname === item.href ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                    )}
                  </div>
              ))}
            </nav>
            <div className="pt-6 border-t border-gray-800">
              <a
                  href="/kontakt"
                  className="px-6 py-3 bg-amber-500 text-gray-900 rounded-sm hover:bg-amber-400 transition-all duration-300 block w-full text-center font-light tracking-wider text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
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
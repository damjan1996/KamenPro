// src/components/layout/Header.tsx
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true); // Initial auf true setzen
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Handle body scroll when menu is open
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialized]);

  // Navigation items
  const navigation = [
    { name: 'POČETNA', href: '/' },
    {
      name: 'O NAMA',
      href: '/o-nama',
      dropdown: [
        { name: 'NAŠA PRIČA', href: '/o-nama/nasa-prica' },
        { name: 'TIM', href: '/o-nama/tim' },
        { name: 'MISIJA I VIZIJA', href: '/o-nama/misija-i-vizija' }
      ]
    },
    {
      name: 'PROIZVODI',
      href: '/proizvodi',
      dropdown: [
        { name: 'KAMENE OBLOGE', href: '/proizvodi/kamene-obloge' },
        { name: 'DEKORATIVNA CIGLA', href: '/proizvodi/dekorativna-cigla' },
        { name: 'UGAONI ELEMENTI', href: '/proizvodi/ugaoni-elementi' }
      ]
    },
    { name: 'REFERENCE', href: '/reference' },
    { name: 'KONTAKT', href: '/kontakt' },
  ];

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

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
            {/* Angepasster Container für Mobile */}
            <div className="max-w-full mx-auto px-3 sm:px-6 lg:container lg:px-8">
              <nav className="flex items-center justify-between h-14 sm:h-16 md:h-18"> {/* Erhöhte Header-Höhe */}
                {/* Logo - mit angepasster Größe für Mobile */}
                <div className="flex-shrink-0">
                  <a
                      href="/"
                      className="flex items-center text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white"
                  >
                    <span className="text-amber-500">KAMEN</span>
                    <span className="ml-1">PRO</span>
                  </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                  {navigation.map((item) => (
                      <div key={item.name} className="relative group">
                        {item.dropdown ? (
                            <>
                              <div className="flex items-center">
                                <a
                                    href={item.href}
                                    className="relative text-white hover:text-amber-400 transition-all duration-300 font-light tracking-wider text-sm after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
                                >
                                  {item.name}
                                </a>
                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className="ml-1 text-white hover:text-amber-400 transition-all duration-300"
                                >
                                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:rotate-180" />
                                </button>
                              </div>
                              <div className="absolute left-0 mt-2 w-auto min-w-56 bg-gray-900 rounded-sm shadow-lg overflow-hidden z-10 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                                {item.dropdown.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem.name}
                                        href={dropdownItem.href}
                                        className="block px-4 py-3 text-xs text-gray-300 hover:bg-gray-800 hover:text-amber-400 transition-colors duration-200 tracking-wider whitespace-nowrap"
                                    >
                                      {dropdownItem.name}
                                    </a>
                                ))}
                              </div>
                            </>
                        ) : (
                            <a
                                href={item.href}
                                className="relative text-white hover:text-amber-400 transition-all duration-300 font-light tracking-wider text-sm after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
                            >
                              {item.name}
                            </a>
                        )}
                      </div>
                  ))}
                  <a
                      href="/kontakt"
                      className="px-4 sm:px-5 py-2 bg-amber-500 text-gray-900 text-sm rounded-sm hover:bg-amber-400 transition-all duration-300 font-light tracking-wider whitespace-nowrap"
                  >
                    KONTAKTIRAJTE NAS
                  </a>
                </div>

                {/* Mobile Menu Button - immer sichtbar */}
                <button
                    className="lg:hidden p-1.5 sm:p-2 rounded-sm hover:bg-gray-800 transition-colors duration-300 z-60"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
                >
                  {isMenuOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  )}
                </button>
              </nav>
            </div>
          </header>
        </div>

        {/* Mobile Sidebar Overlay - beim Klick wird die Sidebar geschlossen */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Mobile Sidebar - Neu positioniert und mit zusätzlichem Schließen-Button */}
        <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-gray-900 z-50 shadow-xl overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Schließen-Button oben rechts in der Sidebar */}
          <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 z-60"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Zatvori meni"
          >
            <X className="h-5 w-5 text-white" />
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
            <div className="flex-1 space-y-1">
              {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-800">
                    {item.dropdown ? (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <a
                                href={item.href}
                                className="flex-1 py-4 px-4 text-white hover:text-amber-400 transition-colors font-light tracking-wider text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                            <button
                                onClick={() => toggleDropdown(item.name)}
                                className="p-4 text-white hover:text-amber-400 transition-colors"
                            >
                              <ChevronDown
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                      activeDropdown === item.name ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>
                          </div>
                          {activeDropdown === item.name && (
                              <div className="pl-4 pb-2 bg-gray-800 rounded-sm mb-2">
                                {item.dropdown.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem.name}
                                        href={dropdownItem.href}
                                        className="block py-3 px-4 text-xs text-gray-300 hover:text-amber-400 transition-colors font-light tracking-wider"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                      {dropdownItem.name}
                                    </a>
                                ))}
                              </div>
                          )}
                        </div>
                    ) : (
                        <a
                            href={item.href}
                            className="block py-4 px-4 text-white hover:text-amber-400 hover:bg-gray-800 transition-colors font-light tracking-wider text-sm"
                            onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                    )}
                  </div>
              ))}
            </div>
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
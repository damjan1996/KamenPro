// src/components/layout/Header.tsx
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Container } from '../ui/Container';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle scroll effect for header
  useEffect(() => {
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
  }, []);

  // Navigation items
  const navigation = [
    { name: 'Početna', href: '/' },
    {
      name: 'O nama',
      href: '/o-nama',
      dropdown: [
        { name: 'Naša priča', href: '/o-nama/nasa-prica' },
        { name: 'Tim', href: '/o-nama/tim' },
        { name: 'Misija i vizija', href: '/o-nama/misija-i-vizija' }
      ]
    },
    {
      name: 'Proizvodi',
      href: '/proizvodi',
      dropdown: [
        { name: 'Kamene obloge', href: '/proizvodi/kamene-obloge' },
        { name: 'Mermerne ploče', href: '/proizvodi/mermerne-ploce' },
        { name: 'Dekorativni elementi', href: '/proizvodi/dekorativni-elementi' }
      ]
    },
    { name: 'Reference', href: '/reference' },
    { name: 'Kontakt', href: '/kontakt' },
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
        <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
          <Container>
            <nav className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <a
                    href="/"
                    className="flex items-center text-2xl font-bold text-gray-800 transition-all duration-300 hover:text-amber-700"
                >
                  <span className="mr-2 text-amber-700">Kamen</span>Pro
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => (
                    <div key={item.name} className="relative group">
                      {item.dropdown ? (
                          <>
                            <button
                                onClick={() => toggleDropdown(item.name)}
                                className="flex items-center text-gray-700 hover:text-amber-700 transition-all duration-300 font-medium"
                            >
                              {item.name}
                              <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200 ease-in-out group-hover:rotate-180" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                              {item.dropdown.map((dropdownItem) => (
                                  <a
                                      key={dropdownItem.name}
                                      href={dropdownItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                                  >
                                    {dropdownItem.name}
                                  </a>
                              ))}
                            </div>
                          </>
                      ) : (
                          <a
                              href={item.href}
                              className="relative text-gray-700 hover:text-amber-700 transition-all duration-300 font-medium after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full"
                          >
                            {item.name}
                          </a>
                      )}
                    </div>
                ))}
                <a
                    href="/kontakt"
                    className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Kontaktirajte nas
                </a>
                <div className="flex items-center space-x-3 ml-4">
                  <button className="text-gray-700 hover:text-amber-700 transition-colors">SR</button>
                  <span className="text-gray-400">|</span>
                  <button className="text-gray-500 hover:text-amber-700 transition-colors">EN</button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 z-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
              >
                {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </nav>
          </Container>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Mobile Sidebar */}
        <div
            className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-4">
            <div className="flex-1 space-y-1">
              {navigation.map((item) => (
                  <div key={item.name} className="border-b border-gray-100">
                    {item.dropdown ? (
                        <div>
                          <button
                              onClick={() => toggleDropdown(item.name)}
                              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-amber-700 transition-colors"
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    activeDropdown === item.name ? 'rotate-180' : ''
                                }`}
                            />
                          </button>
                          {activeDropdown === item.name && (
                              <div className="pl-4 pb-2">
                                {item.dropdown.map((dropdownItem) => (
                                    <a
                                        key={dropdownItem.name}
                                        href={dropdownItem.href}
                                        className="block py-2 px-4 text-sm text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
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
                            className="block py-3 px-4 text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                    )}
                  </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-center space-x-6 mb-6">
                <button className="text-gray-700 hover:text-amber-700 transition-colors">SR</button>
                <button className="text-gray-500 hover:text-amber-700 transition-colors">EN</button>
              </div>
              <a
                  href="/kontakt"
                  className="px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-all duration-300 block w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
              >
                Kontaktirajte nas
              </a>
            </div>
          </div>
        </div>
      </>
  );
}
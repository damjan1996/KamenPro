// Header.tsx
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Container } from '../ui/Container';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navigation = [
    { name: 'Početna', href: '/' },
    { name: 'O nama', href: '/about' },
    { name: 'Proizvodi', href: '/products' },
    { name: 'Reference', href: '/references' },
    { name: 'Kontakt', href: '/contact' },
  ];

  return (
      <>
        <header className="header">
          <Container>
            <nav className="header-nav">
              <div className="flex items-center">
                <a href="/" className="header-logo">
                  KamenPro
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.name}
                    </a>
                ))}
                <a href="/contact" className="btn-primary">
                  Kontaktirajte nas
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 z-50"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
                className="mobile-sidebar-overlay"
                onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Mobile Sidebar */}
        <div
            className={`mobile-sidebar ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-4">
            <div className="flex-1 space-y-2">
              {navigation.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-100">
              <a
                  href="/contact"
                  className="btn-primary block w-full text-center"
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
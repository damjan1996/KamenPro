// src/components/layout/Footer.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../ui/Container';
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';

export function Footer() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = footerRef.current;
    const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const navigation = {
    main: [
      { name: 'Početna', href: '/' },
      { name: 'O nama', href: '/o-nama' },
      { name: 'Proizvodi', href: '/proizvodi' },
      { name: 'Reference', href: '/reference' },
      { name: 'Kontakt', href: '/kontakt' },
    ],
    products: [
      { name: 'Dolomite - White', href: '/proizvodi/d94aaee3-08fc-4c7f-b4f7-0066aab85532' },
      { name: 'Dolomite - Anthracite', href: '/proizvodi/c7938607-e6e2-4bd7-8234-5266f7264ee4' },
      { name: 'Kamen - White', href: '/proizvodi/2e6a102f-dd4e-4674-a913-ce7838e5103d' },
      { name: 'Kamen - Black', href: '/proizvodi/956a220c-70ab-48af-9318-19261198a582' },
      { name: 'Cigla - Rustik - White', href: '/proizvodi/d0e33ce8-2b22-4231-8157-9ef419da7e30' },
    ],
    legal: [
      { name: 'Uslovi korišćenja', href: '/uslovi-koriscenja' },
      { name: 'Politika privatnosti', href: '/politika-privatnosti' },
    ],
    social: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61575722519014',
        icon: Facebook,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: Instagram,
      },
    ],
  };

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
      <footer
          ref={footerRef}
          className="bg-white border-t border-stone-200 text-stone-700 font-sans overflow-hidden"
      >
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {/* About Section */}
              <div
                  className={`transition-all duration-700 transform ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
              >
                <h3 className="text-lg font-medium text-amber-600 mb-4">O nama</h3>
                <p className="mb-5 text-stone-600 font-light leading-relaxed">
                  KamenPro je samostalna zanatska radnja osnovana 2019. godine u Bijeljini,
                  specijalizovana za proizvodnju visokokvalitetnih dekorativnih kamenih obloga
                  koje spajaju estetiku prirodnog kamena sa praktičnošću savremenih materijala.
                </p>
                <div className="flex space-x-3 mt-6">
                  {navigation.social.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                          aria-label={item.name}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <item.icon className="h-4 w-4" strokeWidth={2} />
                      </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div
                  className={`transition-all duration-700 transform ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: '200ms' }}
              >
                <h3 className="text-lg font-medium text-amber-600 mb-4">Brzi linkovi</h3>
                <ul className="space-y-2">
                  {navigation.main.map((item) => (
                      <li key={item.name}>
                        <a
                            href={item.href}
                            className={`inline-block text-stone-600 font-light hover:text-amber-600 hover:translate-x-1 transition-all duration-300 py-1 ${
                                activeSection === item.name ? 'text-amber-600' : ''
                            }`}
                            onMouseEnter={() => setActiveSection(item.name)}
                            onMouseLeave={() => setActiveSection(null)}
                        >
                          {item.name}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Products */}
              <div
                  className={`transition-all duration-700 transform ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: '400ms' }}
              >
                <h3 className="text-lg font-medium text-amber-600 mb-4">Proizvodi</h3>
                <ul className="space-y-2">
                  {navigation.products.map((item) => (
                      <li key={item.name}>
                        <a
                            href={item.href}
                            className={`inline-block text-stone-600 font-light hover:text-amber-600 hover:translate-x-1 transition-all duration-300 py-1 ${
                                activeSection === item.name ? 'text-amber-600' : ''
                            }`}
                            onMouseEnter={() => setActiveSection(item.name)}
                            onMouseLeave={() => setActiveSection(null)}
                        >
                          {item.name}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div
                  className={`transition-all duration-700 transform ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: '600ms' }}
              >
                <h3 className="text-lg font-medium text-amber-600 mb-4">Kontaktirajte nas</h3>
                <ul className="space-y-5 text-stone-600">
                  <li className="flex items-start group">
                  <span className="mr-3 mt-1">
                    <Mail className="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </span>
                    <a href="mailto:info@kamenpro.net" className="font-light hover:text-amber-600 transition-colors">info@kamenpro.net</a>
                  </li>
                  <li className="flex items-start group">
                  <span className="mr-3 mt-1">
                    <Phone className="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </span>
                    <a href="tel:+38765678634" className="font-light hover:text-amber-600 transition-colors">+387 65 678 634</a>
                  </li>
                  <li className="group">
                    <div className="flex items-start">
                    <span className="mr-3 mt-1">
                      <MapPin className="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                    </span>
                      <div>
                        <p className="mb-1 font-medium text-stone-700">Lokacija:</p>
                        <p className="font-light">Bijeljina</p>
                        <p className="font-light">Republika Srpska, BiH</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <p className="mb-1 font-medium text-stone-700">Radno vreme:</p>
                    <p className="font-light">Pon - Sub: 09:00 - 18:00</p>
                    <p className="font-light">Ned: Zatvoreno</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-stone-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-stone-500 text-sm font-light">
                &copy; {currentYear} KamenPro. Sva prava zadržana.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
                {navigation.legal.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-sm text-stone-500 hover:text-amber-600 transition-colors font-light"
                    >
                      {item.name}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll to top button */}
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 z-50 opacity-90 hover:opacity-100"
            aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </footer>
  );
}
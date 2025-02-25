// src/components/layout/Footer.tsx
import { Container } from '../ui/Container';
import { Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const navigation = {
    main: [
      { name: 'Početna', href: '/' },
      { name: 'O nama', href: '/o-nama' },
      { name: 'Proizvodi', href: '/proizvodi' },
      { name: 'Reference', href: '/reference' },
      { name: 'Kontakt', href: '/kontakt' },
    ],
    products: [
      { name: 'Zidne obloge', href: '/proizvodi/zidne-obloge' },
      { name: 'Dekorativni paneli', href: '/proizvodi/dekorativni-paneli' },
      { name: 'Mermer', href: '/proizvodi/mermer' },
      { name: 'Travertin', href: '/proizvodi/travertin' },
      { name: 'Fasadne obloge', href: '/proizvodi/fasadne-obloge' },
    ],
    legal: [
      { name: 'Uslovi korišćenja', href: '/uslovi-koriscenja' },
      { name: 'Politika privatnosti', href: '/politika-privatnosti' },
      { name: 'Cookie politika', href: '/cookie-politika' },
    ],
    social: [
      {
        name: 'Facebook',
        href: 'https://facebook.com',
        icon: Facebook,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: Instagram,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: Linkedin,
      },
      {
        name: 'YouTube',
        href: 'https://youtube.com',
        icon: Youtube,
      },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-gray-900 text-white">
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="footer-title">O nama</h3>
                <p className="mb-4 text-gray-400">
                  KamenPro je specijalizovan za proizvodnju i distribuciju
                  visokokvalitetnih dekorativnih kamenih obloga koje
                  transformišu svaki enterijer u umetničko delo.
                </p>
                <div className="flex space-x-4 mt-6">
                  {navigation.social.map((item) => (
                      <a
                          key={item.name}
                          href={item.href}
                          className="social-icon"
                          aria-label={item.name}
                      >
                        <item.icon className="h-5 w-5" />
                      </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="footer-title">Brzi linkovi</h3>
                <ul className="space-y-2">
                  {navigation.main.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="footer-link">
                          {item.name}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="footer-title">Proizvodi</h3>
                <ul className="space-y-2">
                  {navigation.products.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="footer-link">
                          {item.name}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="footer-title">Kontaktirajte nas</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start">
                  <span className="mr-3 mt-1">
                    <Mail className="h-5 w-5 text-amber-500" />
                  </span>
                    <span>info@kamenpro.rs</span>
                  </li>
                  <li>
                    <p className="mb-1">Radno vreme:</p>
                    <p>Pon - Pet: 09:00 - 17:00</p>
                    <p>Sub: 09:00 - 14:00</p>
                  </li>
                  <li>
                    <p className="mb-1">Adresa:</p>
                    <p>Bulevar Oslobođenja 123</p>
                    <p>11000 Beograd, Srbija</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} KamenPro. Sva prava zadržana.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {navigation.legal.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </footer>
  );
}
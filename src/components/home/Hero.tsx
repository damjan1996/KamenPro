// Hero.tsx
import { Container } from '../ui/Container';
import { Image } from '../ui/Image';

export function Hero() {
  return (
      <div className="hero">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
              src="public/images/hero.png"
              alt="Dekorativne kamene obloge"
              className="w-full h-full object-cover"
              sizes="100vw"
              priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <Container>
          <div className="hero-content">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="hero-title">
                Dekorativne zidne obloge najvišeg kvaliteta
              </h1>
              <p className="hero-description animate-fade-in animation-delay-200">
                Pretvorite vaš prostor u bezvremensko umetničko delo sa našim
                ručno izrađenim kamenim oblogama
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in animation-delay-400">
                <a href="/products" className="btn-primary">
                  Otkrijte proizvode
                </a>
                <a href="/contact" className="btn-secondary">
                  Kontaktirajte nas
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
}
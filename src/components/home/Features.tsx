import { Container } from '../ui/Container';
import { Shield, Timer, Trophy, Palette } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Vrhunski kvalitet',
    description: 'Koristimo samo odabrani prirodni kamen i obrađujemo ga prema najvišim standardima kvaliteta.'
  },
  {
    icon: Timer,
    title: 'Dugotrajnost',
    description: 'Naše zidne obloge su napravljene da traju generacijama i zadržavaju svoju lepotu decenijama.'
  },
  {
    icon: Trophy,
    title: 'Stručnost',
    description: 'Sa dugogodišnjim iskustvom garantujemo savršenu zanatsku izradu i stručnu montažu.'
  },
  {
    icon: Palette,
    title: 'Individualni dizajn',
    description: 'Svaki projekat se individualno dizajnira prema vašim željama i zamislima.'
  }
];

export function Features() {
  return (
      <section className="features-section">
        <Container>
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Zašto KamenPro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4 md:px-0">
              Otkrijte prednosti naših visokokvalitetnih zidnih obloga od prirodnog kamena
              i našeg profesionalnog zanatskog rada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
            {features.map((feature, index) => (
                <div
                    key={feature.title}
                    className="feature-card animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="feature-icon-wrapper">
                      <feature.icon className="feature-icon" />
                    </div>
                    <h3 className="feature-title">
                      {feature.title}
                    </h3>
                    <p className="feature-description">
                      {feature.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="flex md:hidden justify-center mt-8 animate-fade-in animation-delay-400">
            <div className="flex space-x-1">
              {[0, 1, 2, 3].map((dot) => (
                  <div
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full bg-stone-300"
                  />
              ))}
            </div>
          </div>
        </Container>
      </section>
  );
}
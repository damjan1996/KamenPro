import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { Shield, Timer, Trophy, Palette } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: Shield,
    title: 'Vrhunski kvalitet',
    description: 'Koristimo samo odabrani prirodni kamen i obrađujemo ga prema najvišim standardima kvaliteta.'
  },
  {
    id: 2,
    icon: Timer,
    title: 'Dugotrajnost',
    description: 'Naše zidne obloge su napravljene da traju generacijama i zadržavaju svoju lepotu decenijama.'
  },
  {
    id: 3,
    icon: Trophy,
    title: 'Stručnost',
    description: 'Sa dugogodišnjim iskustvom garantujemo savršenu zanatsku izradu i stručnu montažu.'
  },
  {
    id: 4,
    icon: Palette,
    title: 'Individualni dizajn',
    description: 'Svaki projekat se individualno dizajnira prema vašim željama i zamislima.'
  }
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
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

  // Simulate mobile scrolling for the indicator
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveDot((prevDot) => (prevDot + 1) % 4);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
      <section
          ref={sectionRef}
          className="py-16 md:py-24 bg-white font-sans overflow-hidden"
      >
        <Container>
          {/* Section Header */}
          <div
              className={`text-center mb-12 md:mb-16 transition-all duration-700 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
              Zašto <span className="font-medium">KamenPro</span>?
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto px-4 md:px-0 font-light">
              Otkrijte prednosti naših visokokvalitetnih zidnih obloga od prirodnog kamena
              i našeg profesionalnog zanatskog rada.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
            {features.map((feature, index) => (
                <div
                    key={feature.id}
                    className={`bg-white rounded-lg p-6 shadow-sm border border-stone-100 transition-all duration-500 ${
                        hoveredFeature === feature.id
                            ? "transform -translate-y-2 shadow-md border-amber-200"
                            : "hover:shadow-md hover:-translate-y-1 hover:border-amber-100"
                    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-300 ${
                            hoveredFeature === feature.id
                                ? "bg-amber-500 text-white"
                                : "bg-amber-50 text-amber-600"
                        }`}
                    >
                      <feature.icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <h3 className={`text-xl font-medium mb-3 transition-colors duration-300 ${
                        hoveredFeature === feature.id ? "text-amber-700" : "text-stone-800"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator */}
          <div
              className={`flex md:hidden justify-center mt-8 transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2, 3].map((dot) => (
                  <div
                      key={dot}
                      className={`h-1.5 ${dot === activeDot ? "w-6" : "w-1.5"} rounded-full transition-all duration-300 ${
                          dot === activeDot ? "bg-amber-500" : "bg-stone-300"
                      }`}
                      onClick={() => setActiveDot(dot)}
                  />
              ))}
            </div>
          </div>
        </Container>
      </section>
  );
}
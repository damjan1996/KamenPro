// src/pages/products/components/ProductAdvantages.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { Shield, Clock, Leaf, ThumbsUp } from "lucide-react";

export function ProductAdvantages() {
    const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('advantages-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Advantages data
    const advantages = [
        {
            id: 1,
            icon: Shield,
            title: 'Vrhunski kvalitet',
            description: 'Svaki proizvod prolazi stroge kontrole kvaliteta. Koristimo samo najbolje sirovine i savremene proizvodne procese.'
        },
        {
            id: 2,
            icon: Clock,
            title: 'Dugotrajnost',
            description: 'Naši kameni proizvodi dizajnirani su da traju decenijama uz minimalno održavanje, što ih čini izuzetno isplativom investicijom.'
        },
        {
            id: 3,
            icon: Leaf,
            title: 'Ekološki prihvatljivo',
            description: 'Koristimo prirodne materijale i održive proizvodne procese kako bismo minimizirali uticaj na životnu sredinu.'
        },
        {
            id: 4,
            icon: ThumbsUp,
            title: 'Lako održavanje',
            description: 'Kamene obloge zahtevaju minimalno održavanje - jednostavno čišćenje i povremena zaštita su sve što je potrebno.'
        }
    ];

    return (
        <section id="advantages-section" className="py-16 md:py-24">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Prednosti naših proizvoda</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Zašto izabrati kamene obloge KamenPro za vaš sledeći projekat
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantages.map((advantage, index) => {
                        const Icon = advantage.icon;
                        return (
                            <div
                                key={advantage.id}
                                className={`bg-white p-6 rounded-lg shadow-md border border-stone-100 hover:border-amber-300 transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                onMouseEnter={() => setActiveAdvantage(advantage.id)}
                                onMouseLeave={() => setActiveAdvantage(null)}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${activeAdvantage === advantage.id ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-600'}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                                <p className="text-stone-600">{advantage.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
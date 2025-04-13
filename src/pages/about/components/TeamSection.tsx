// src/components/about/components/TeamSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { Phone } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image?: string;
    contact?: string;
}

export function TeamSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredMember, setHoveredMember] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const team: TeamMember[] = [
        {
            name: 'Željko',
            role: 'Osnivač',
            bio: 'Sa jasnom vizijom kvaliteta i profesionalnosti, Željko je osnovao KamenPro 2019. godine, fokusirajući se na ručnu izradu i pažljiv odabir materijala za dekorativne kamene obloge.',
            image: 'https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Team/zeljko-savic.jpg',
            contact: '+38165678634'
        },
        {
            name: 'Tim za proizvodnju',
            role: 'Stručni majstori',
            bio: 'Naš proizvodni tim kombinuje tradicionalne zanatske tehnike sa savremenim materijalima, osiguravajući najviši kvalitet svake obloge koja napusti našu radionicu.',
            image: 'https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Team/production-team.jpg'
        },
        {
            name: 'Tim za podršku',
            role: 'Korisnički servis',
            bio: 'Uvek dostupni za savete i tehničku podršku pre, tokom i nakon kupovine, naš tim za podršku osigurava da svaki klijent dobije personalizovano iskustvo.',
            image: 'https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Team/support-team.jpg'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Hilfsfunktion zum Rendern eines Teammitglieds
    const renderTeamMember = (member: TeamMember, index: number) => (
        <div
            key={index}
            className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${
                hoveredMember === index ? 'border-l-2 border-amber-500' : 'border-l-2 border-transparent'
            }`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
            onMouseEnter={() => setHoveredMember(index)}
            onMouseLeave={() => setHoveredMember(null)}
        >
            <div className="h-64 relative overflow-hidden">
                {member.image ? (
                    <>
                        <img
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover transition-transform duration-700 ${
                                hoveredMember === index ? 'scale-105' : 'scale-100'
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                        <div className="text-center">
                            <div className="text-4xl mb-2">👤</div>
                            <div className="text-sm">Fotografija nije dostupna</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-medium text-stone-800 mb-1">{member.name}</h3>
                <p className="text-amber-600 mb-3 font-light">{member.role}</p>
                <p className="text-stone-600 text-sm font-light mb-4">{member.bio}</p>

                {member.contact && (
                    <div className="mt-4 flex items-center text-stone-600 hover:text-amber-600 transition-colors duration-300">
                        <Phone className="h-4 w-4 mr-2" />
                        <a href={`tel:${member.contact}`} className="text-sm">{member.contact}</a>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        <span className="text-stone-400">Upoznajte</span> <span className="font-medium">naš tim</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 font-light">
                        Iza svakog izuzetnog proizvoda stoje posvećeni ljudi koji sa strašću i preciznošću stvaraju
                        dekorativne obloge koje krase vaše prostore.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map(renderTeamMember)}
                </div>

                <div className={`mt-16 text-center transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Leerer Container für zukünftige Inhalte */}
                </div>
            </Container>
        </section>
    );
}
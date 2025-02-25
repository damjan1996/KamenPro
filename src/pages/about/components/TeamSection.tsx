// src/components/about/components/TeamSection.tsx
import { Container } from '../../../components/ui/Container';

export function TeamSection() {
    const team = [
        {
            name: 'Milan Petrović',
            role: 'Osnivač i direktor',
            bio: 'Sa više od 25 godina iskustva u industriji kamena, Milan je izgradio KamenPro od malog porodičnog posla do vodećeg proizvođača u regionu.',
            image: '/images/team-1.jpg'
        },
        {
            name: 'Ana Jovanović',
            role: 'Glavni dizajner',
            bio: 'Ana kombinuje svoje obrazovanje u arhitekturi sa strašću prema prirodnim materijalima kako bi stvorila inovativne dizajne kamenih obloga.',
            image: '/images/team-2.jpg'
        },
        {
            name: 'Nikola Stojanović',
            role: 'Šef proizvodnje',
            bio: 'Nikola vodi naš proizvodni proces sa fokusom na kvalitet i efikasnost, osiguravajući da svaki proizvod zadovoljava najviše standarde.',
            image: '/images/team-3.jpg'
        },
        {
            name: 'Jelena Marković',
            role: 'Menadžer za odnose sa klijentima',
            bio: 'Jelena osigurava da svaki klijent dobije personalizovano iskustvo i stručno vođenje kroz ceo proces odabira i instalacije.',
            image: '/images/team-4.jpg'
        }
    ];

    return (
        <section className="py-16 bg-stone-100">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-stone-800 mb-4">Naš tim</h2>
                    <p className="text-stone-600">
                        Upoznajte stručnjake koji stoje iza KamenPro-a
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="h-64 bg-stone-300">
                                {/* Image placeholder - replace with actual images */}
                                <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                                    Fotografija
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-stone-800 mb-1">{member.name}</h3>
                                <p className="text-amber-500 mb-3">{member.role}</p>
                                <p className="text-stone-600 text-sm">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
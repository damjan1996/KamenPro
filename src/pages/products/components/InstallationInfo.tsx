// src/pages/products/components/InstallationInfo.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";

export function InstallationInfo() {
    const [activeStep, setActiveStep] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('installation-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Installation steps data
    const steps = [
        {
            id: 1,
            title: 'Priprema površine',
            description: 'Pre postavljanja kamenih obloga, potrebno je obezbediti čistu, ravnu i stabilnu površinu. Ovo može uključivati uklanjanje stare obloge, popravku oštećenja i ravnanje zida ili poda.',
            image: '/images/surface-preparation.jpg'
        },
        {
            id: 2,
            title: 'Postavljanje lepka',
            description: 'Koristimo specijalizovane lepkove visokog kvaliteta za kamen koji obezbeđuju snažnu i dugotrajnu vezu. Lepak se nanosi nazubljenom gletericom kako bi se obezbedila ravnomerna pokrivenost.',
            image: '/images/adhesive-application.jpg'
        },
        {
            id: 3,
            title: 'Postavljanje kamenih obloga',
            description: 'Kamene obloge se pažljivo postavljaju na pripremljenu površinu, uz korišćenje distancera za održavanje ravnomernih razmaka. Svaki komad se precizno pozicionira prema dizajnu.',
            image: '/images/stone-placement.jpg'
        },
        {
            id: 4,
            title: 'Fugovanje i završna obrada',
            description: 'Nakon što lepak očvrsne, popunjavamo spojeve između kamenih ploča fug masom. Završni korak uključuje čišćenje površine i nanošenje zaštitnog sredstva koje poboljšava otpornost i dugotrajnost.',
            image: '/images/grouting-finishing.jpg'
        }
    ];

    return (
        <section id="installation-section" className="py-16 md:py-24 bg-stone-50">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Proces ugradnje</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Kako izgleda profesionalna ugradnja naših kamenih obloga
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className={`block w-full text-left p-4 rounded-lg transition-all duration-300 ${
                                        activeStep === step.id
                                            ? 'bg-amber-600 text-white shadow-md'
                                            : 'bg-white hover:bg-amber-50 text-stone-800'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold ${
                                            activeStep === step.id ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                            {step.id}
                                        </span>
                                        <span className="font-medium">{step.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-2/3">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`transition-all duration-500 ${
                                    activeStep === step.id ? 'opacity-100 block' : 'opacity-0 hidden'
                                }`}
                            >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                                        <p className="text-stone-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`mt-12 text-center transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="text-lg text-stone-600 mb-4">Želite profesionalnu ugradnju?</p>
                    <a
                        href="/kontakt"
                        className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                        Kontaktirajte nas
                    </a>
                </div>
            </Container>
        </section>
    );
}
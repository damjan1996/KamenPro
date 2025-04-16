// src/pages/products/components/InstallationInfo.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight, Check } from "lucide-react";

export function InstallationInfo() {
    const [activeStep, setActiveStep] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Auto-rotacija kroz korake
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveStep(prev => prev < steps.length ? prev + 1 : 1);
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible]);

    const steps = [
        {
            id: 1,
            title: "Priprema površine",
            description: "Pre postavljanja obloga potrebno je pravilno pripremiti površinu. Površina treba biti čista i grundirana pre nego što se postavlja lepak za kamen."
        },
        {
            id: 2,
            title: "Izbor lepka",
            description: "Izbor odgovarajućeg lepka zavisi od toga da li se obloge lepe na vanjske ili unutrašnje zidove. Preporučićemo vam najadekvatniji lepak za vašu situaciju."
        },
        {
            id: 3,
            title: "Postavljanje obloga",
            description: "Obloge se postavljaju pažljivo, vodeći računa o razmaku između elemenata. Za unutrašnje uglove, obloge se seku pod odgovarajućim uglom."
        },
        {
            id: 4,
            title: "Završna obrada",
            description: "Nakon ugradnje, obloge je potrebno premazati zaštitnim prajmerom koji se može kupiti u svim bolje opremljenim prodavnicama boja i lakova."
        }
    ];

    // Alati potrebni za ugradnju
    const tools = [
        "Špatla",
        "Brusilica za sečenje kamena",
        "Libela",
        "Merna traka",
        "Olovka za obeležavanje",
        "Lepak za kamen/ciglu"
    ];

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-stone-50 overflow-hidden font-sans"
            id="ugradnja"
        >
            <Container>
                {/* Zaglavlje */}
                <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Proces <span className="font-medium">ugradnje</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Naše dekorativne obloge su dizajnirane za jednostavnu ugradnju. Ovde možete pronaći osnovne korake procesa i informacije za uspešnu instalaciju.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Leva strana - Koraci ugradnje */}
                    <div className={`transition-all duration-700 delay-200 ease-out transform ${
                        isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    }`}>
                        <div className="space-y-4">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 
                                        ${activeStep === step.id
                                        ? 'bg-white shadow-md border-l-4 border-amber-500'
                                        : 'bg-white/50 hover:bg-white hover:shadow-sm hover:border-l-4 hover:border-amber-300'
                                    }`}
                                    onClick={() => setActiveStep(step.id)}
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 mr-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors duration-300
                                            ${activeStep === step.id || hoveredStep === step.id
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-stone-100 text-stone-500'
                                        }`}>
                                            {step.id}
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-medium mb-2 transition-colors
                                                ${activeStep === step.id ? 'text-amber-600' : 'text-stone-800'}`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-stone-600 font-light">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Indikatori */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {steps.map((step) => (
                                <button
                                    key={`indicator-${step.id}`}
                                    onClick={() => setActiveStep(step.id)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeStep === step.id
                                            ? 'w-8 bg-amber-500'
                                            : 'w-4 bg-stone-300 hover:bg-stone-400'
                                    }`}
                                    aria-label={`Korak ${step.id}: ${step.title}`}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Desna strana - Slika i dodatne informacije */}
                    <div className={`transition-all duration-700 delay-400 ease-out transform ${
                        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                    }`}>
                        <div className="relative rounded-lg overflow-hidden mb-8 shadow-md group">
                            <img
                                src="/images/products/proces%20ugradnje.jpg"
                                alt="Proces ugradnje dekorativnih obloga"
                                className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <p className="text-sm font-light">
                                        Stručna ugradnja naših dekorativnih obloga
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dodatne informacije */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow duration-300">
                            <h4 className="text-lg font-medium text-stone-800 mb-4">Dodatne informacije</h4>
                            <ul className="space-y-3 mb-4">
                                <li className="flex items-start">
                                    <Check className="flex-shrink-0 h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                                    <p className="text-stone-600 font-light">Prosečna potrošnja lepka je 5 kg po m², zavisno od površine.</p>
                                </li>
                                <li className="flex items-start">
                                    <Check className="flex-shrink-0 h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                                    <p className="text-stone-600 font-light">Vreme ugradnje zavisi od iskustva - profesionalni majstori rade znatno brže.</p>
                                </li>
                                <li className="flex items-start">
                                    <Check className="flex-shrink-0 h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                                    <p className="text-stone-600 font-light">Nudimo uslugu ugradnje po dogovoru i stručnu podršku za one koji sami ugrađuju.</p>
                                </li>
                            </ul>
                            <a
                                href="/kontakt"
                                className="inline-flex items-center text-amber-600 hover:text-amber-700 group font-light"
                            >
                                Kontaktirajte nas za više informacija
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Alati za ugradnju */}
                <div className={`bg-white p-8 rounded-lg shadow-sm border border-stone-200 mt-12 ${getAnimationClasses('delay-600')}`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-light text-stone-800 mb-4">
                                Potreban <span className="font-medium">alat</span>
                            </h3>
                            <p className="text-stone-600 mb-6 font-light">
                                Za samostalnu ugradnju naših obloga potreban vam je osnovni alat koji se koristi u građevinarstvu:
                            </p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {tools.map((tool, index) => (
                                    <li key={index} className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-stone-700 font-light">{tool}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img
                                src="/images/products/alat.jpg"
                                alt="Alat potreban za ugradnju"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA sekcija */}
                <div className={`mt-12 text-center ${getAnimationClasses('delay-800')}`}>
                    <p className="text-stone-600 font-light mb-6">
                        Potrebna vam je pomoć prilikom ugradnje ili imate dodatna pitanja?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/kontakt"
                            className="px-6 py-3 bg-amber-500 text-stone-900 rounded-sm hover:bg-amber-400 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg group"
                        >
                            Zakazati konsultaciju
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="tel:+38765678634"
                            className="px-6 py-3 border border-stone-400 text-stone-800 rounded-sm hover:bg-stone-50 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light"
                        >
                            Pozvati: +387 65 678 634
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
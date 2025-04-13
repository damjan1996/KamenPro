// src/pages/references/components/FeaturedProjects.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';

export const FeaturedProjectsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Projekti sa podacima relevantnim za KamenPro
    const projects = [
        {
            id: 1,
            title: "Vila sa kamenim fasadnim detaljima",
            description: "Moderan stambeni objekat sa dekorativnim kamenim oblogama koje ističu ulaz i spoljne zidove.",
            category: "Stambeni objekat",
            location: "Bijeljina",
            year: "2023",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/stambeni-2.jpg"
        },
        {
            id: 2,
            title: "Poslovni prostor sa kamenim akcentima",
            description: "Elegantna kancelarija sa dekorativnim kamenim oblogama koje stvaraju profesionalni i upečatljiv ambijent.",
            category: "Poslovni prostor",
            location: "Bijeljina",
            year: "2022",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/poslovni-2.jpg"
        },
        {
            id: 3,
            title: "Dnevna soba sa kaminom",
            description: "Topao porodični prostor sa kamenim oblogama oko kamina koje stvaraju fokusnu tačku u dnevnoj sobi.",
            category: "Stambeni objekat",
            location: "Bijeljina",
            year: "2023",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/stambeni-3.jpg"
        },
        {
            id: 4,
            title: "Restoran sa rustičnim ambijentom",
            description: "Ugostiteljski objekat sa dekorativnim ciglama koje stvaraju autentičan i topao ambijent za goste.",
            category: "Ugostiteljski objekat",
            location: "Bijeljina",
            year: "2022",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/ugostiteljski-2.jpg"
        },
        {
            id: 5,
            title: "Hodnik sa dekorativnim kamenom",
            description: "Ulazni prostor stambenog objekta sa elegantnim kamenim oblogama koje stvaraju upečatljiv prvi utisak.",
            category: "Stambeni objekat",
            location: "Brčko",
            year: "2023",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/stambeni-4.jpg"
        },
        {
            id: 6,
            title: "Prostor za odmor sa kamenim zidom",
            description: "Kutak za opuštanje sa akcentnim kamenim zidom koji daje karakter i toplinu prostoru.",
            category: "Stambeni objekat",
            location: "Bijeljina",
            year: "2022",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Projects/stambeni-5.jpg"
        }
    ];

    // Observer za animaciju pri skrolovanju
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    // Automatsko menjanje aktivnog projekta na mobilnom prikazu
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            if (window.innerWidth < 768) {
                setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible, projects.length]);

    // Funkcija za navigaciju kroz projekte na mobilnom
    const nextProject = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const prevProject = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="istaknuti-projekti"
            className="py-16 md:py-24 bg-stone-50 overflow-hidden font-sans"
        >
            <Container>
                {/* Zaglavlje */}
                <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Istaknuti <span className="font-medium">projekti</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pogledajte našu kolekciju pažljivo odabranih projekata koji predstavljaju
                        naš jedinstveni pristup dekorativnim kamenim oblogama u različitim prostorima.
                    </p>
                </div>

                {/* Projekti - Desktop prikaz (grid) */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ${getAnimationClasses(`delay-${200 + index * 100}`)}`}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Slika projekta */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300"></div>

                                {/* Kategorija projekta */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 text-stone-800 text-xs font-medium rounded-sm">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Informacije o projektu */}
                            <div className="p-6 relative">
                                {/* Godina projekta */}
                                <div className={`absolute -top-10 right-6 w-14 h-14 rounded-full flex items-center justify-center transform transition-all duration-300 ${
                                    hoveredProject === project.id ? 'bg-amber-500 text-white scale-110' : 'bg-white text-stone-800 border border-stone-200'
                                }`}>
                                    <span className="text-sm font-medium">{project.year}</span>
                                </div>

                                {/* Naslov i opis */}
                                <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                                    hoveredProject === project.id ? 'text-amber-600' : 'text-stone-800'
                                }`}>
                                    {project.title}
                                </h3>
                                <p className="text-stone-600 text-sm font-light mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Lokacija i dugme */}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-stone-500 flex items-center font-light">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {project.location}
                                    </span>

                                    <a
                                        href={`#projekat-${project.id}`}
                                        className="group inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-light"
                                    >
                                        <span>Detaljnije</span>
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projekti - Mobilni prikaz (carousel) */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`flex-shrink-0 w-full px-4 transition-opacity duration-500 ${
                                        activeIndex === index ? 'opacity-100' : 'opacity-30'
                                    }`}
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                                        {/* Slika projekta */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                            {/* Kategorija projekta */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 text-stone-800 text-xs font-medium rounded-sm">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Informacije o projektu */}
                                        <div className="p-6 relative">
                                            {/* Godina projekta */}
                                            <div className="absolute -top-10 right-6 w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center">
                                                <span className="text-sm font-medium">{project.year}</span>
                                            </div>

                                            {/* Naslov i opis */}
                                            <h3 className="text-lg font-medium mb-2 text-stone-800">
                                                {project.title}
                                            </h3>
                                            <p className="text-stone-600 text-sm font-light mb-4">
                                                {project.description}
                                            </p>

                                            {/* Lokacija i dugme */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-stone-500 flex items-center font-light">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {project.location}
                                                </span>

                                                <a
                                                    href={`#projekat-${project.id}`}
                                                    className="inline-flex items-center text-amber-600 text-sm font-light"
                                                >
                                                    <span>Detaljnije</span>
                                                    <ArrowRight className="ml-1 h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kontrole za carousel */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={prevProject}
                            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                            aria-label="Prethodni projekat"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Indikatori */}
                        <div className="flex items-center space-x-2">
                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeIndex === index
                                            ? 'w-8 bg-amber-500'
                                            : 'w-4 bg-stone-300 hover:bg-stone-400'
                                    }`}
                                    aria-label={`Prikaži projekat ${index + 1}`}
                                ></button>
                            ))}
                        </div>

                        <button
                            onClick={nextProject}
                            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                            aria-label="Sledeći projekat"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* CTA Dugme */}
                <div className={`mt-12 text-center ${getAnimationClasses('delay-700')}`}>
                    <a
                        href="/reference/projekti"
                        className="group inline-flex items-center bg-stone-800 text-white px-6 py-3 rounded-sm hover:bg-stone-700 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-sm hover:shadow-md"
                    >
                        <span>Pogledajte sve projekte</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Statistike */}
                <div className={`mt-16 flex flex-wrap justify-center gap-8 md:gap-16 ${getAnimationClasses('delay-800')}`}>
                    <div className="text-center">
                        <div className="text-3xl font-medium text-amber-600 mb-1">6+</div>
                        <div className="text-sm text-stone-600 font-light">Godina iskustva</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-medium text-amber-600 mb-1">50+</div>
                        <div className="text-sm text-stone-600 font-light">Realizovanih projekata</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-medium text-amber-600 mb-1">100%</div>
                        <div className="text-sm text-stone-600 font-light">Zadovoljnih klijenata</div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
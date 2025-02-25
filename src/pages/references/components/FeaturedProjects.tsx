// src/pages/references/components/FeaturedProjects.tsx
import { useState, useEffect, useRef } from 'react';

export const FeaturedProjectsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);

    // Primer projekata sa realističnim podacima
    const projects = [
        {
            id: 1,
            title: "Minimalistički stan u centru grada",
            description: "Savršen spoj funkcionalnosti i elegancije za moderan urbani život.",
            category: "Stambeni prostor",
            location: "Novi Beograd",
            year: "2023",
            image: "/images/project1.jpg"
        },
        {
            id: 2,
            title: "Boutique kancelarija sa pogledom",
            description: "Inspirirajući radni prostor koji promoviše kreativnost i produktivnost.",
            category: "Poslovni prostor",
            location: "Vračar",
            year: "2023",
            image: "/images/project2.jpg"
        },
        {
            id: 3,
            title: "Penthouse apartman sa terasom",
            description: "Luksuzni stambeni prostor sa panoramskim pogledom i zelenim detaljima.",
            category: "Stambeni prostor",
            location: "Savski Venac",
            year: "2022",
            image: "/images/project3.jpg"
        },
        {
            id: 4,
            title: "Kafe sa etno modernim stilom",
            description: "Spoj tradicije i savremenosti u ugodnom ambijentu za druženje.",
            category: "Ugostiteljstvo",
            location: "Dorćol",
            year: "2022",
            image: "/images/project4.jpg"
        },
        {
            id: 5,
            title: "Zen spa & wellness centar",
            description: "Umirujući prostor za opuštanje tela i duha uz prirodne materijale.",
            category: "Wellness",
            location: "Dedinje",
            year: "2023",
            image: "/images/project5.jpg"
        },
        {
            id: 6,
            title: "Vila sa bazenom i vrtom",
            description: "Harmoničan spoj unutrašnjeg i spoljašnjeg prostora za porodični život.",
            category: "Stambeni prostor",
            location: "Avala",
            year: "2022",
            image: "/images/project6.jpg"
        }
    ];

    // Observer za animaciju pri skrolovanju
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
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
        const interval = setInterval(() => {
            if (window.innerWidth < 768) {
                setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [projects.length]);

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-stone-50 relative overflow-hidden"
        >
            {/* Dekorativni elementi */}
            <div className="absolute w-72 h-72 bg-green-50 rounded-full -top-20 -left-20 opacity-40"></div>
            <div className="absolute w-96 h-96 bg-amber-50 rounded-full -bottom-32 -right-32 opacity-40"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Naslov sekcije */}
                <div className={`mb-16 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                        Istaknuti <span className="text-emerald-800">Projekti</span>
                    </h2>
                    <p className="text-center max-w-2xl mx-auto text-stone-600">
                        Pogledajte našu kolekciju pažljivo odabranih projekata koji predstavljaju
                        naš jedinstveni pristup dizajnu enterijera.
                    </p>
                    <div className="w-24 h-1 bg-emerald-800 mx-auto mt-6"></div>
                </div>

                {/* Projekti - Desktop prikaz (2x3 mreža) */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Slika projekta */}
                            <div className="relative h-64 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-stone-700/10 group-hover:bg-stone-700/0 transition-colors duration-300"
                                ></div>
                                <div
                                    className="w-full h-full bg-stone-200 transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${project.image || '/api/placeholder/800/600'})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>

                                {/* Kategorija projekta */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 text-emerald-800 text-xs font-medium rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Informacije o projektu */}
                            <div className="p-6 relative">
                                {/* Godina projekta */}
                                <div className="absolute -top-10 right-6 w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-sm font-semibold">{project.year}</span>
                                </div>

                                {/* Naslov i opis */}
                                <h3 className="text-xl font-semibold mb-2 text-stone-900 group-hover:text-emerald-800 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-stone-600 mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Lokacija i dugme */}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-stone-500 flex items-center">
                                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {project.location}
                                    </span>

                                    <button className="group flex items-center text-emerald-800 font-medium text-sm">
                                        <span className="mr-1">Detaljnije</span>
                                        <svg
                                            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
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
                                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                                        {/* Slika projekta */}
                                        <div className="relative h-64 overflow-hidden">
                                            <div
                                                className="w-full h-full bg-stone-200"
                                                style={{
                                                    backgroundImage: `url(${project.image || '/api/placeholder/800/600'})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                }}
                                            ></div>

                                            {/* Kategorija projekta */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 text-emerald-800 text-xs font-medium rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Informacije o projektu */}
                                        <div className="p-6 relative">
                                            {/* Godina projekta */}
                                            <div className="absolute -top-10 right-6 w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                                                <span className="text-sm font-semibold">{project.year}</span>
                                            </div>

                                            {/* Naslov i opis */}
                                            <h3 className="text-xl font-semibold mb-2 text-stone-900">
                                                {project.title}
                                            </h3>
                                            <p className="text-stone-600 mb-4">
                                                {project.description}
                                            </p>

                                            {/* Lokacija i dugme */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-stone-500 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    {project.location}
                                                </span>

                                                <button className="flex items-center text-emerald-800 font-medium text-sm">
                                                    <span className="mr-1">Detaljnije</span>
                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indikatori za carousel */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                        ? 'w-8 bg-emerald-800'
                                        : 'bg-stone-300 hover:bg-stone-400'
                                }`}
                                aria-label={`Prikaži projekat ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Dugme "Pogledaj sve projekte" */}
                <div className={`flex justify-center mt-16 transition-all duration-700 delay-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <button className="group relative bg-emerald-800 text-white py-3 px-8 rounded-full overflow-hidden transition-all duration-300 hover:bg-emerald-900">
                        <span className="relative z-10 flex items-center font-medium">
                            Pogledaj sve projekte
                            <svg
                                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
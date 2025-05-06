// src/components/home/components/ProjectsSection.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

// Projekti/Reference
const projects = [
    {
        id: 1,
        title: "Stambeni objekti",
        subtitle: "Uređenje domova",
        description:
            "Nudimo rešenja za enterijer stambenih objekata, obezbeđujući da svaki prostor odražava stil i ličnost vlasnika. Od izbora materijala i završne obrade do planiranja prostora i osvetljenja, brinemo o svakom detalju kako bismo stvorili gostoprimljivo i udobno okruženje.",
        image: "/images/home/stambeni-prostor.jpg",
    },
    {
        id: 2,
        title: "Poslovni objekti",
        subtitle: "Profesionalna okruženja",
        description:
            "Naše kamene obloge stvaraju upečatljiv utisak u poslovnim prostorima, od elegantnih recepcija do reprezentativnih sala za sastanke. Kombinujemo estetiku i funkcionalnost za stvaranje produktivnog radnog okruženja.",
        image: "/images/home/poslovni-prostor.jpg",
    },
    {
        id: 3,
        title: "Ugostiteljski objekti",
        subtitle: "Hoteli i restorani",
        description:
            "Specijalizovani smo za stvaranje jedinstvenih ambijenata u hotelima i restoranima, gde naše kamene obloge doprinose autentičnom doživljaju. Svaki projekat odražava karakter i viziju brenda.",
        image: "/images/home/ugostiteljski-prostor.jpg",
    },
];

export function ProjectsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeProject, setActiveProject] = useState(0);
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const nextProject = () => {
        setActiveProject((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-white text-stone-800 font-sans overflow-hidden relative"
            id="reference"
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                ></div>
            </div>

            <Container>
                {/* Section heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light mb-4">Naši projekti</h2>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Pogledajte kako naši proizvodi transformišu različite prostore - od
                        stambenih i poslovnih objekata do ugostiteljskih prostora.
                    </p>
                </div>

                {/* Main Feature Project */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                    {/* Project Image */}
                    <div
                        className={`transition-all duration-700 ease-out ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-md group">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`absolute inset-0 transition-all duration-500 ${
                                        activeProject === index
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-full"
                                    }`}
                                >
                                    <img
                                        src={project.image}
                                        alt={`Projekat ${project.title} - ${project.subtitle}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ))}

                            {/* Navigation Controls */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    onClick={prevProject}
                                    className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    aria-label="Prethodni projekat"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    aria-label="Sledeći projekat"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Project Info */}
                    <div
                        className={`transition-all duration-700 ease-out ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    >
                        <div className="max-w-xl">
                            <div className="mb-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-0.5 bg-amber-500 mr-3"></div>
                                    <h3 className="text-sm uppercase tracking-wider font-medium text-amber-600">
                                        {projects[activeProject].subtitle}
                                    </h3>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                                    {projects[activeProject].title}
                                </h2>

                                <p className="text-stone-600 mb-6 leading-relaxed">
                                    {projects[activeProject].description}
                                </p>

                                <a
                                    href="/reference"
                                    className="inline-flex items-center px-5 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors duration-300 group"
                                >
                                    <span>Saznajte više</span>
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Project Tabs */}
                            <div className="mt-8 border-t border-stone-200 pt-6">
                                <div className="flex flex-wrap gap-6">
                                    {projects.map((project, index) => (
                                        <button
                                            key={project.id}
                                            onClick={() => setActiveProject(index)}
                                            className={`py-2 relative transition-all duration-300 ${
                                                activeProject === index
                                                    ? "text-amber-600 font-medium"
                                                    : "text-stone-500 hover:text-stone-800"
                                            }`}
                                            aria-label={`Prikaži projekat ${project.title}`}
                                        >
                                            <span className="text-sm">{project.title}</span>
                                            <span
                                                className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 ${
                                                    activeProject === index
                                                        ? "bg-amber-500 opacity-100"
                                                        : "bg-stone-200 opacity-0"
                                                }`}
                                            ></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Grid */}
                <div
                    className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-lg shadow-md bg-white"
                            onMouseEnter={() => setIsHovered(project.id)}
                            onMouseLeave={() => setIsHovered(null)}
                            ref={(el) => {
                                projectRefs.current[index] = el;
                            }}
                        >
                            <img
                                src={project.image}
                                alt={`${project.title} projekat`}
                                className={`w-full h-64 object-cover transition-all duration-500 ${
                                    isHovered === project.id ? "scale-105 brightness-90" : "scale-100"
                                }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end transition-all duration-300">
                                <div className="p-6 w-full">
                                    <h3 className="text-xl font-medium mb-1 text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-stone-200 text-sm">{project.subtitle}</p>
                                </div>
                            </div>
                            <div
                                className={`absolute inset-0 bg-white/90 flex items-center justify-center transition-all duration-500 ${
                                    isHovered === project.id ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <div
                                    className={`text-center p-6 transition-all duration-500 ${
                                        isHovered === project.id
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-4 opacity-0"
                                    }`}
                                >
                                    <h3 className="text-xl font-medium mb-3 text-stone-800">
                                        {project.title}
                                    </h3>
                                    <p className="text-stone-600 mb-4 text-sm">
                                        {project.subtitle}
                                    </p>
                                    <a
                                        href={`/reference#${project.id}`}
                                        className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors duration-300 group"
                                    >
                                        <span>Pogledajte projekat</span>
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Projects Link */}
                <div
                    className={`flex justify-center mt-12 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                >
                    <a
                        href="/reference"
                        className="inline-flex items-center px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors duration-300 group"
                    >
                        <span>Pogledajte sve projekte</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </Container>
        </section>
    );
}
// src/components/home/components/ProjectsSection.tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

// Projekti/Reference
const projects = [
    {
        id: 1,
        title: 'Luksuzne vile',
        subtitle: 'Ekskluzivni enterijeri',
        description: 'Nudimo rešenja za enterijer luksuznih vila, obezbeđujući da svaki prostor odražava stil i ličnost vlasnika. Od izbora materijala i završne obrade do planiranja prostora i osvetljenja, brinemo o svakom detalju kako bismo stvorili gostoprimljivo i luksuzno okruženje.',
        image: '/images/luxury-villa.jpg'
    },
    {
        id: 2,
        title: 'Poslovni prostori',
        subtitle: 'Profesionalna okruženja',
        description: 'Naše kamene obloge stvaraju upečatljiv utisak u poslovnim prostorima, od elegantnih recepcija do reprezentativnih sala za sastanke. Kombinujemo estetiku i funkcionalnost za stvaranje produktivnog radnog okruženja.',
        image: '/images/office-space.jpg'
    },
    {
        id: 3,
        title: 'Ugostiteljski objekti',
        subtitle: 'Hoteli i restorani',
        description: 'Specijalizovani smo za stvaranje jedinstvenih ambijenata u hotelima i restoranima, gde naše kamene obloge doprinose autentičnom doživljaju. Svaki projekat odražava karakter i viziju brenda.',
        image: '/images/hotel-project.jpg'
    }
];

export function ProjectsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeProject, setActiveProject] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('projects-section');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="projects-section" className="py-20 md:py-32 bg-black text-white">
            <Container>
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                            <img
                                src={projects[activeProject].image}
                                alt={projects[activeProject].title}
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                        </div>
                    </div>

                    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="max-w-xl">
                            <div className="mb-8">
                                <div className="flex items-center mb-10">
                                    <div className="w-12 h-[1px] bg-gray-500 mr-6"></div>
                                    <h2 className="text-2xl uppercase tracking-widest font-light text-gray-300">
                                        {projects[activeProject].subtitle}
                                    </h2>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-light mb-8">
                                    {projects[activeProject].title}
                                </h3>

                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    {projects[activeProject].description}
                                </p>

                                <a
                                    href="/reference"
                                    className="inline-flex items-center text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
                                >
                                    Saznajte više
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </div>

                            <div className="mt-12">
                                <div className="flex space-x-6">
                                    {projects.map((project, index) => (
                                        <button
                                            key={project.id}
                                            onClick={() => setActiveProject(index)}
                                            className={`py-2 relative ${activeProject === index ? 'text-white' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
                                        >
                                            <span className="text-sm font-medium">{project.title}</span>
                                            {activeProject === index && (
                                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-24 grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-lg">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                                    <a
                                        href={`/reference/${project.id}`}
                                        className="inline-flex items-center text-white underline"
                                    >
                                        Pogledajte projekat
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`flex justify-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <a
                        href="/reference"
                        className="border-b border-white pb-1 inline-flex items-center text-white font-medium hover:border-opacity-50 transition-all"
                    >
                        Pogledajte sve projekte
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </Container>
        </section>
    );
}
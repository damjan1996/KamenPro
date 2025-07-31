// src/pages/lokacije/components/LocalProjects.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight, Calendar } from "lucide-react";
import { Image } from "../../../components/ui/Image";
import { LocationData } from "../../../lib/locationData";

interface Project {
    name: string;
    description: string;
    image: string;
    year: string;
}

interface LocalProjectsProps {
    city?: string;
    projects?: Project[];
    locationData?: LocationData;
}

export function LocalProjects({ city, projects, locationData }: LocalProjectsProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeProject, setActiveProject] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Use data from locationData if available, otherwise use direct props
    const currentCity = city || locationData?.city || '';
    const currentProjects = projects || (locationData?.content?.localProjects?.map((project, index) => ({
        name: project.split(' - ')[0] || project,
        description: project.split(' - ')[1] || project,
        image: `/images/projekti/${locationData.citySlug}-${index + 1}.jpg`,
        year: '2024'
    })) || []);

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

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className={`text-center mb-12 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        Projekti u <span className="font-medium text-amber-600">{currentCity}</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pogledajte naše uspešno realizovane projekte u {currentCity} i okolini
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden border border-stone-100 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            onMouseEnter={() => setActiveProject(index)}
                        >
                            <div className="aspect-video overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.name} - KamenPro projekat u ${currentCity}`}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${
                                        activeProject === index ? 'scale-105' : 'scale-100'
                                    }`}
                                    width={400}
                                    height={300}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                    fallbackSrc="/images/placeholder-project.jpg"
                                />
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-stone-800 group-hover:text-amber-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <div className="flex items-center text-stone-500 text-sm">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {project.year}
                                    </div>
                                </div>
                                
                                <p className="text-stone-600 font-light text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                
                                <a
                                    href="/reference"
                                    className="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors group"
                                >
                                    Pogledajte više
                                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/reference"
                        className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-sm font-medium transition-colors"
                    >
                        Svi naši projekti
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </Container>
        </section>
    );
}
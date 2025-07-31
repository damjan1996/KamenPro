// src/pages/lokacije/components/LocalTestimonials.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { Star, Quote, MapPin } from "lucide-react";
import { LocationData } from "../../../lib/locationData";

interface Testimonial {
    name: string;
    location?: string;
    text: string;
    rating: number;
    project?: string;
}

interface LocalTestimonialsProps {
    city?: string;
    testimonials?: Testimonial[];
    locationData?: LocationData;
}

export function LocalTestimonials({ city, testimonials, locationData }: LocalTestimonialsProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Use data from locationData if available, otherwise use direct props
    const currentCity = city || locationData?.city || '';
    const currentTestimonials = testimonials || (locationData?.content?.testimonials?.map(testimonial => ({
        name: testimonial.name,
        location: currentCity, // Default to current city if location not provided
        text: testimonial.text,
        rating: testimonial.rating,
        project: testimonial.project || 'Nespecifikovano'
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

        // Auto rotate testimonials
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % currentTestimonials.length);
        }, 5000);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            clearInterval(interval);
        };
    }, [currentTestimonials.length]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className={`text-center mb-12 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        Zadovoljni klijenti iz <span className="font-medium text-amber-600">{currentCity}</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pogledajte šta kažu naši klijenti o kvalitetu naše usluge u {currentCity}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 border border-stone-100 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            } ${activeTestimonial === index ? 'ring-2 ring-amber-500 ring-opacity-50' : ''}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            onClick={() => setActiveTestimonial(index)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Quote className="h-8 w-8 text-amber-500 opacity-50" />
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star 
                                            key={starIndex}
                                            className={`h-4 w-4 ${
                                                starIndex < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <blockquote className="text-stone-600 font-light leading-relaxed mb-4 italic">
                                "{testimonial.text}"
                            </blockquote>

                            <div className="border-t border-stone-100 pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-stone-800">{testimonial.name}</div>
                                        <div className="flex items-center text-stone-500 text-sm mt-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {testimonial.location || currentCity}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-stone-500">Projekat:</div>
                                        <div className="text-sm font-medium text-amber-600">{testimonial.project}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center mt-8 space-x-2">
                    {currentTestimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeTestimonial === index 
                                    ? 'bg-amber-500 w-8' 
                                    : 'bg-stone-300 hover:bg-stone-400'
                            }`}
                            aria-label={`Testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="text-center mt-8">
                    <div className="inline-flex items-center bg-white px-6 py-3 rounded-lg shadow-sm border border-stone-200">
                        <div className="flex items-center mr-4">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium text-stone-800">4.8/5</span>
                        </div>
                        <div className="text-stone-600 text-sm">
                            Prosečna ocena naših klijenata u {currentCity}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
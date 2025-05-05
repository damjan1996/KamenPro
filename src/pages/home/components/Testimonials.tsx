// src/components/home/components/TestimonialsSection.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Ana Jovanović',
        role: 'Dizajner enterijera',
        content: 'KamenPro je naš prvi izbor za projekte koji zahtevaju kvalitetne kamene obloge. Raznovrsnost dezena i tekstura koje nude je impresivna. Njihova sposobnost da ispune i najzahtevnije dizajnerske ideje je izuzetna.',
        rating: 5,
        image: '/images/home/ana-jovanovic.jpg'
    },
    {
        id: 2,
        name: 'Stefan Petrović',
        role: 'Vlasnik restorana',
        content: 'Naš restoran je dobio potpuno novi izgled zahvaljujući dekorativnim panelima. Gosti često komentarišu koliko je ambijent autentičan. KamenPro obloge doprinele su jedinstvenom identitetu našeg prostora.',
        rating: 4,
        image: '/images/home/stefan-petrovic.jpg'
    },
    {
        id: 3,
        name: 'Marko Nikolić',
        role: 'Arhitekta',
        content: 'Saradnja sa KamenPro timom je bila izvanredna. Njihovi proizvodi su vrhunskog kvaliteta i instalacija je bila brza i profesionalna. Posebno sam impresioniran pažnjom koja se posvećuje detaljima i završnoj obradi.',
        rating: 5,
        image: '/images/home/marko-nikolic.jpg'
    }
];

export function TestimonialsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleSlideChange = useCallback((newIndex: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(newIndex);
        setTimeout(() => {
            setIsTransitioning(false);
        }, 700);
    }, [isTransitioning]);

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

    useEffect(() => {
        if (isVisible && isPlaying && !isTransitioning) {
            intervalRef.current = setInterval(() => {
                handleSlideChange((activeIndex + 1) % testimonials.length);
            }, 8000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isVisible, isPlaying, activeIndex, isTransitioning, handleSlideChange]);

    const handleMouseEnter = () => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(true);
    };

    const nextTestimonial = () => {
        handleSlideChange((activeIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        handleSlideChange((activeIndex - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating: number, size = 'small') => {
        const starSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`${starSize} ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`}
                aria-hidden="true"
            />
        ));
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 bg-stone-50 font-sans overflow-hidden"
            aria-labelledby="testimonials-heading"
        >
            <Container>
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2
                            id="testimonials-heading"
                            className="text-3xl md:text-4xl font-light mb-4 text-center tracking-wide text-stone-800"
                        >
                            Šta klijenti <br />
                            <span className="font-medium">kažu o nama</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6" aria-hidden="true"></div>
                        <p className="mb-8 text-stone-600 max-w-lg mx-auto text-center font-light">
                            Poverenje naših klijenata je naš najveći uspeh. Njihova iskustva su najbolji pokazatelj kvaliteta naših proizvoda i usluga.
                        </p>
                    </div>
                </div>

                <div
                    className={`mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: '300ms' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-6 md:p-10"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Istaknute recenzije klijenata"
                    >
                        <div className="absolute top-8 left-8 text-stone-100" aria-hidden="true">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.5 4.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H11v1.5c0 1.25.75 2.5 2 3l-.5 1.5c-2-.5-3.5-2.5-3.5-4.5V9C9 6.5 11 4.5 13.5 4.5h-2z" />
                                <path d="M4.5 4.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H4v1.5c0 1.25.75 2.5 2 3l-.5 1.5c-2-.5-3.5-2.5-3.5-4.5V9C2 6.5 4 4.5 6.5 4.5h-2z" />
                            </svg>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center mb-6 relative z-10">
                            <div className="w-full md:w-1/3 relative h-64 md:h-64">
                                {testimonials.map((testimonial, index) => (
                                    activeIndex === index && (
                                        <div
                                            key={testimonial.id}
                                            className="w-full h-full rounded-lg overflow-hidden shadow-md"
                                        >
                                            <img
                                                src={testimonial.image}
                                                alt={`${testimonial.name}, ${testimonial.role}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )
                                ))}
                            </div>

                            <div className="w-full md:w-2/3 relative min-h-[200px]">
                                {testimonials.map((testimonial, index) => (
                                    activeIndex === index && (
                                        <div
                                            key={testimonial.id}
                                            className="h-full"
                                            aria-live="polite"
                                        >
                                            <div className="flex items-center mb-4" aria-label={`Ocena: ${testimonial.rating} od 5`}>
                                                {renderStars(testimonial.rating, 'large')}
                                            </div>

                                            <blockquote className="text-lg md:text-xl text-stone-700 mb-6 leading-relaxed font-light">
                                                "{testimonial.content}"
                                            </blockquote>

                                            <div>
                                                <p className="font-medium text-lg text-stone-800">{testimonial.name}</p>
                                                <p className="text-stone-500 font-light">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 relative z-20">
                            <div className="flex gap-2" role="group" aria-label="Navigacija recenzija">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSlideChange(index)}
                                        className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                                            activeIndex === index ? 'bg-amber-500 w-10' : 'bg-stone-200 hover:bg-stone-300'
                                        }`}
                                        aria-label={`Prikaži recenziju ${index + 1} od ${testimonials.length}`}
                                        aria-pressed={activeIndex === index}
                                        type="button"
                                        disabled={isTransitioning}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 text-stone-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300 relative z-20"
                                    aria-label="Prethodna recenzija"
                                    type="button"
                                    disabled={isTransitioning}
                                >
                                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 text-stone-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300 relative z-20"
                                    aria-label="Sledeća recenzija"
                                    type="button"
                                    disabled={isTransitioning}
                                >
                                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-300 ${
                                hoveredCard === testimonial.id
                                    ? 'shadow-md -translate-y-1 border-l-4 border-amber-500'
                                    : 'hover:shadow-md hover:-translate-y-1 hover:border-l-4 hover:border-amber-500'
                            } ${activeIndex === testimonials.findIndex(t => t.id === testimonial.id)
                                ? 'ring-1 ring-amber-200' : ''}`}
                            onMouseEnter={() => setHoveredCard(testimonial.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => handleSlideChange(testimonials.findIndex(t => t.id === testimonial.id))}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSlideChange(testimonials.findIndex(t => t.id === testimonial.id));
                                }
                            }}
                            aria-label={`Klikni za prikaz recenzije od ${testimonial.name}`}
                        >
                            <div className="flex items-center mb-4" aria-label={`Ocena: ${testimonial.rating} od 5`}>
                                {renderStars(testimonial.rating)}
                            </div>

                            <p className="text-stone-600 mb-6 line-clamp-4 font-light">{testimonial.content}</p>

                            <div className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${
                                        hoveredCard === testimonial.id
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-stone-100 text-stone-700'
                                    }`}
                                    aria-hidden="true"
                                >
                                    <span className="font-medium">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-stone-800">{testimonial.name}</p>
                                    <p className="text-sm text-stone-500 font-light">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
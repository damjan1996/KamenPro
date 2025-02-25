// src/components/home/components/TestimonialsSection.tsx
import { useState, useEffect } from "react";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Container } from "../../../components/ui/Container";

// Recenzije klijenata
const testimonials = [
    {
        id: 1,
        name: 'Marko Nikolić',
        role: 'Arhitekta',
        content: 'Saradnja sa KamenPro timom je bila izvanredna. Njihovi proizvodi su vrhunskog kvaliteta i instalacija je bila brza i profesionalna. Posebno sam impresioniran pažnjom koja se posvećuje detaljima i završnoj obradi.',
        rating: 5,
        image: '/images/testimonial-1.jpg'
    },
    {
        id: 2,
        name: 'Ana Jovanović',
        role: 'Dizajner enterijera',
        content: 'KamenPro je naš prvi izbor za projekte koji zahtevaju kvalitetne kamene obloge. Raznovrsnost dezena i tekstura koje nude je impresivna. Njihova sposobnost da ispune i najzahtevnije dizajnerske ideje je izuzetna.',
        rating: 5,
        image: '/images/testimonial-2.jpg'
    },
    {
        id: 3,
        name: 'Stefan Petrović',
        role: 'Vlasnik restorana',
        content: 'Naš restoran je dobio potpuno novi izgled zahvaljujući dekorativnim panelima. Gosti često komentarišu koliko je ambijent autentičan. KamenPro obloge doprinele su jedinstvenom identitetu našeg prostora.',
        rating: 4,
        image: '/images/testimonial-3.jpg'
    }
];

export function TestimonialsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('testimonials-section');
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

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [isVisible]);

    return (
        <section id="testimonials-section" className="py-20 md:py-32 bg-gray-50">
            <Container>
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-center">
                            Šta klijenti <br />
                            <span className="font-semibold">kažu o nama</span>
                        </h2>

                        <p className="mb-8 text-gray-600 max-w-lg mx-auto text-center">
                            Poverenje naših klijenata je naš najveći uspeh. Njihova iskustva su najbolji pokazatelj kvaliteta naših proizvoda i usluga.
                        </p>
                    </div>
                </div>

                <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white p-8 md:p-12">
                        <div className="absolute top-10 left-10 text-gray-200">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.5 4.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H11v1.5c0 1.25.75 2.5 2 3l-.5 1.5c-2-.5-3.5-2.5-3.5-4.5V9C9 6.5 11 4.5 13.5 4.5h-2z" />
                                <path d="M4.5 4.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5H4v1.5c0 1.25.75 2.5 2 3l-.5 1.5c-2-.5-3.5-2.5-3.5-4.5V9C2 6.5 4 4.5 6.5 4.5h-2z" />
                            </svg>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-6 relative z-10">
                            <div className="w-full md:w-1/3">
                                <div className="aspect-square rounded-lg overflow-hidden">
                                    <img
                                        src={testimonials[activeIndex].image}
                                        alt={testimonials[activeIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-2/3">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>

                                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                                    "{testimonials[activeIndex].content}"
                                </blockquote>

                                <div>
                                    <p className="font-semibold text-lg">{testimonials[activeIndex].name}</p>
                                    <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${activeIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                                    aria-label={`Prikaži recenziju ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${activeIndex === index ? 'border-l-4 border-black' : ''}`}
                        >
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 line-clamp-4">{testimonial.content}</p>
                            <div className="flex items-center">
                                <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                                    <span className="text-gray-700 font-medium">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`flex justify-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <a
                        href="/recenzije"
                        className="border-b border-gray-800 pb-1 inline-flex items-center text-gray-800 font-medium hover:border-opacity-50 transition-all"
                    >
                        Pročitajte sve recenzije
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </Container>
        </section>
    );
}
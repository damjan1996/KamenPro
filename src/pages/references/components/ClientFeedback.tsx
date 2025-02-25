// src/pages/references/components/ClientFeedback.tsx
import { useState, useEffect, useRef } from 'react';

export const ClientFeedbackSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionRef = useRef(null);

    // Stvarni podaci o klijentima
    const testimonials = [
        {
            name: "Milan Petrović",
            project: "Apartman na Zlatiboru",
            image: "/images/client1.jpg",
            role: "Vlasnik",
            testimonial: "Saradnja sa vašim timom je bila izvanredna. Od prvog dana su pokazali potpuno razumevanje za moje želje i pretvorili ih u prostor koji prevazilazi sva moja očekivanja. Svaki detalj je savršeno uklopljen.",
            rating: 5
        },
        {
            name: "Ana Jovanović",
            project: "Poslovni prostor u Beogradu",
            image: "/images/client2.jpg",
            role: "Direktor",
            testimonial: "Impresionirana sam profesionalnošću i preciznošću. Naš novi kancelarijski prostor je funkcionalan i estetski besprekoran. Klijenti često komentarišu koliko je prostor prijatan i dobro organizovan.",
            rating: 5
        },
        {
            name: "Nikola Marković",
            project: "Vila na Fruškoj gori",
            image: "/images/client3.jpg",
            role: "Investitor",
            testimonial: "Od idejnog rešenja do poslednjeg detalja, sve je sprovedeno sa izuzetnom pažnjom. Kvalitet materijala i izrade je na najvišem nivou. Naša vila je sada mesto gde se spajaju luksuz i priroda.",
            rating: 5
        },
        {
            name: "Jelena Đorđević",
            project: "Restoran u centru grada",
            image: "/images/client4.jpg",
            role: "Vlasnik",
            testimonial: "Dizajn našeg restorana privlači goste i stvara jedinstvenu atmosferu koja se savršeno uklapa sa našom kuhinjom. Svaki element je pažljivo odabran i uklapa se u celinu na izvanredan način.",
            rating: 5
        }
    ];

    // Vidljivost sekcije za animaciju
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
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

    // Automatska promena slajda na mobilnom prikazu
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            if (window.innerWidth < 768) {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [isVisible, testimonials.length]);

    // Funkcija za prikaz zvezdica za ocenu
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #3e2723 0%, #5d4037 100%)",
                color: "white"
            }}
        >
            {/* Dekorativni elementi */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-0 left-0 w-1/2 h-full" style={{
                    backgroundImage: "url('/images/wood-texture.jpg')",
                    backgroundSize: "cover",
                    mixBlendMode: "overlay"
                }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-50" style={{
                    backgroundImage: "url('/images/wood-pattern.jpg')",
                    backgroundSize: "cover",
                    mixBlendMode: "overlay"
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Naslov sekcije */}
                <div className={`mb-16 transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
                        Šta Kažu Naši <span className="text-amber-400">Klijenti</span>
                    </h2>
                    <div className="flex justify-center items-center">
                        <div className="w-16 h-px bg-amber-400 mx-2"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <div className="w-16 h-px bg-amber-400 mx-2"></div>
                    </div>
                </div>

                {/* Desktop prikaz - grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`group bg-white bg-opacity-10 backdrop-blur-sm rounded-md p-6 border border-white border-opacity-10 hover:border-amber-400 transition-all duration-500 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                            } hover:-translate-y-2 hover:shadow-xl`}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                                backdropFilter: "blur(8px)"
                            }}
                        >
                            {/* Ocena */}
                            <div className="flex mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            {/* Testimonial tekst */}
                            <p className="text-white text-opacity-90 italic mb-6 text-sm leading-relaxed min-h-[100px]">
                                "{testimonial.testimonial}"
                            </p>

                            {/* Detalji o klijentu */}
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-900 border-2 border-amber-400 group-hover:scale-110 transition-transform duration-500">
                                    <div className="w-full h-full bg-cover bg-center" style={{
                                        backgroundImage: `url(${testimonial.image || '/api/placeholder/100/100'})`,
                                    }}></div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-amber-400 group-hover:text-white transition-colors duration-300">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-white text-opacity-70 text-xs">
                                        {testimonial.project} · {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobilni prikaz - carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-full px-4"
                                >
                                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-md p-6 border border-white border-opacity-10">
                                        {/* Ocena */}
                                        <div className="flex mb-4">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Testimonial tekst */}
                                        <p className="text-white text-opacity-90 italic mb-6 text-sm leading-relaxed">
                                            "{testimonial.testimonial}"
                                        </p>

                                        {/* Detalji o klijentu */}
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-900 border-2 border-amber-400">
                                                <div className="w-full h-full bg-cover bg-center" style={{
                                                    backgroundImage: `url(${testimonial.image || '/api/placeholder/100/100'})`,
                                                }}></div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-semibold text-amber-400">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-white text-opacity-70 text-xs">
                                                    {testimonial.project} · {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indikatori za carousel */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? 'w-8 bg-amber-400'
                                        : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                                }`}
                                aria-label={`Pregledaj testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* CTA sekcija */}
                <div className={`mt-16 text-center transition-all duration-1000 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-amber-400 text-amber-900 font-medium rounded-sm overflow-hidden transition-all duration-300 hover:bg-amber-500">
                        <span className="relative z-10 flex items-center">
                            Pogledajte sve projekte
                            <svg
                                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};
// src/pages/lokacije/components/LocalBusinessHero.tsx
import { useState, useEffect } from "react";
import { ArrowRight, Phone, MapPin, Clock, Star } from "lucide-react";
import { Container } from "../../../components/ui/Container";
import { Image } from "../../../components/ui/Image";

interface LocalBusinessHeroProps {
    city: string;
    region: string;
    description: string;
    backgroundImage: string;
    phone: string;
    address: string;
    isMainLocation?: boolean;
}

export function LocalBusinessHero({
    city,
    region,
    description,
    backgroundImage,
    phone,
    address,
    isMainLocation = false
}: LocalBusinessHeroProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const scrollToServices = () => {
        const servicesSection = document.getElementById('local-services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden font-sans">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50 z-10"></div>
                <Image
                    src={backgroundImage}
                    alt={`KamenPro ${city} - kamene obloge i montaža u ${region}`}
                    className="w-full h-full object-cover object-center z-0"
                    priority={true}
                    width={1920}
                    height={1080}
                    sizes="100vw"
                    fallbackSrc="/images/about/pozadina.jpg"
                />
            </div>

            {/* Content container */}
            <Container className="relative z-20 px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left column - Main content */}
                    <div className={`lg:col-span-8 text-white transform transition-all duration-1000 ease-out ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}>
                        {/* Location badge */}
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="h-[2px] w-12 bg-amber-500"></div>
                            <span className="text-sm uppercase tracking-widest text-amber-100 font-light">
                                {region}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-wide leading-tight">
                            <span className="block overflow-hidden">
                                <span className="block">KamenPro</span>
                            </span>
                            <span className="block overflow-hidden mt-2">
                                <span className="block font-medium text-amber-400">{city}</span>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed font-light">
                            {description}
                            {isMainLocation && (
                                <span className="block mt-2 text-amber-200 font-medium">
                                    Naš glavni centar sa kompletnim uslugama
                                </span>
                            )}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href={`tel:${phone}`}
                                className="group bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-medium shadow-md hover:shadow-lg"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Pozovite odmah
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button
                                onClick={scrollToServices}
                                className="px-6 py-3 rounded-sm border border-white/70 text-white hover:bg-white/10 transition-all duration-300 text-center text-sm uppercase tracking-wider font-light"
                            >
                                Naše usluge
                            </button>
                        </div>

                        {/* Key stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">6+</div>
                                <div className="text-xs text-white/80 font-light">Godina iskustva</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">100+</div>
                                <div className="text-xs text-white/80 font-light">Projekata</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">4.8</div>
                                <div className="text-xs text-white/80 font-light flex items-center justify-center">
                                    <Star className="h-3 w-3 mr-1" />
                                    Ocena
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">24h</div>
                                <div className="text-xs text-white/80 font-light">Odziv</div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Contact card */}
                    <div className={`lg:col-span-4 transition-all duration-1000 delay-500 ${
                        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                    }`}>
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-medium text-white mb-2">Kontakt informacije</h3>
                                <div className="h-[1px] w-16 bg-amber-500 mx-auto"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-medium">{address}</div>
                                        <div className="text-white/70 text-sm">{city}, {region}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                                    <a
                                        href={`tel:${phone}`}
                                        className="text-white hover:text-amber-400 transition-colors font-medium"
                                    >
                                        {phone}
                                    </a>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                                    <div className="text-white/90 text-sm">
                                        <div>Pon-Pet: 08:00-17:00</div>
                                        <div>Subota: 08:00-14:00</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/20">
                                <a
                                    href="/kontakt"
                                    className="w-full bg-white/10 hover:bg-amber-500 text-white hover:text-stone-900 py-3 px-4 rounded-sm transition-all duration-300 text-center text-sm font-medium flex items-center justify-center"
                                >
                                    Pošaljite upit
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Floating elements */}
            <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full border border-white/10 opacity-30 animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-1/4 left-[12%] w-32 h-32 rounded-full border border-white/5 opacity-20 animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
        </section>
    );
}
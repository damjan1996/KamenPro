// src/pages/lokacije/components/LocalContact.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

interface LocalContactProps {
    city: string;
    region: string;
    address: string;
    phone: string;
    email: string;
    coordinates: { lat: number; lng: number };
    workingHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    };
    mapEmbedUrl: string;
    additionalInfo?: string;
}

export function LocalContact({
    city,
    region,
    address,
    phone,
    email,
    coordinates,
    workingHours,
    mapEmbedUrl,
    additionalInfo
}: LocalContactProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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
        <section ref={sectionRef} className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className={`text-center mb-12 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        Kontakt za <span className="font-medium text-amber-600">{city}</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Kontaktirajte nas za sve informacije o uslugama u {city} i {region}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Contact Information */}
                    <div className={`lg:col-span-5 transition-all duration-700 delay-200 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                            <h3 className="text-xl font-medium text-stone-800 mb-6">Informacije</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-amber-100 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-stone-800 mb-1">Adresa</h4>
                                        <p className="text-stone-600 font-light">
                                            {address}<br />
                                            {city}, {region}
                                        </p>
                                        <p className="text-stone-500 text-sm mt-1">
                                            {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-amber-100 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-stone-800 mb-1">Telefon</h4>
                                        <a
                                            href={`tel:${phone}`}
                                            className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                        >
                                            {phone}
                                        </a>
                                        <p className="text-stone-500 text-sm mt-1">
                                            Pozovite za brže informacije
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-amber-100 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-stone-800 mb-1">Email</h4>
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                        >
                                            {email}
                                        </a>
                                        <p className="text-stone-500 text-sm mt-1">
                                            Pošaljite upit putem email-a
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-amber-100 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-stone-800 mb-1">Radno vreme</h4>
                                        <div className="text-stone-600 font-light space-y-1">
                                            <div>Pon - Pet: {workingHours.weekdays}</div>
                                            <div>Subota: {workingHours.saturday}</div>
                                            <div>Nedelja: {workingHours.sunday}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {additionalInfo && (
                                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <p className="text-amber-700 text-sm font-light">
                                        {additionalInfo}
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-stone-200">
                                <a
                                    href="/kontakt"
                                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-sm transition-colors text-center font-medium flex items-center justify-center"
                                >
                                    Pošaljite upit
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className={`lg:col-span-7 transition-all duration-700 delay-400 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}>
                        <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                            <div className="h-96 relative">
                                <iframe
                                    src={mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`KamenPro lokacija u ${city}`}
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                            
                            <div className="p-4 bg-stone-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-stone-800">KamenPro {city}</h4>
                                        <p className="text-stone-600 text-sm">{address}</p>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center"
                                    >
                                        Navigacija
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <a
                                href={`tel:${phone}`}
                                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition-colors"
                            >
                                <Phone className="h-6 w-6 mx-auto mb-2" />
                                <div className="font-medium">Pozovite</div>
                                <div className="text-sm opacity-90">Direktan poziv</div>
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition-colors"
                            >
                                <Mail className="h-6 w-6 mx-auto mb-2" />
                                <div className="font-medium">Email</div>
                                <div className="text-sm opacity-90">Pošaljite upit</div>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
// src/pages/contact/components/Map.tsx
import { useState, useEffect } from 'react';
import { MapPin, Navigation, Maximize, ExternalLink } from 'lucide-react';

export const MapSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mapInteracted, setMapInteracted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector('.map-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    const handleMapInteraction = () => {
        setMapInteracted(true);
    };

    const locationDetails = [
        { icon: <MapPin size={18} />, text: "Ulica i broj, Grad, Poštanski broj" },
        { icon: <Navigation size={18} />, text: "Koordinate: 44.8125° N, 20.4612° E" }
    ];

    return (
        <section className="map-section py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Decorative elements */}
            <div
                className={`absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl transition-transform duration-1000 ${
                    isVisible ? 'translate-x-1/2 -translate-y-1/2' : 'translate-x-full -translate-y-full'
                }`}
            ></div>
            <div
                className={`absolute bottom-0 left-0 w-80 h-80 bg-amber-50 rounded-full opacity-30 blur-3xl transition-transform duration-1000 ${
                    isVisible ? '-translate-x-1/2 translate-y-1/2' : '-translate-x-full translate-y-full'
                }`}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-10 transition-all duration-700 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}>
                    <span className="inline-block text-blue-600 text-sm font-medium tracking-wider uppercase mb-2">Gde nas pronaći</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Naša Lokacija</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nalazimo se u centru grada, lako dostupni svim prevoznim sredstvima. Posetite nas i istražite naš izložbeni salon.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div
                        className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-700 ${
                            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                        } ${isHovered ? 'shadow-xl' : 'shadow-md'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleMapInteraction}
                    >
                        {/* Map container */}
                        <div className="relative w-full">
                            {/* Placeholder for actual map */}
                            <div className={`w-full h-96 md:h-[28rem] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-transform duration-700 ${
                                isHovered && !mapInteracted ? 'scale-[1.02]' : 'scale-100'
                            }`}>
                                {/* This would be replaced with an actual map implementation */}
                                <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm max-w-md">
                                    <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                    <p className="text-gray-700 mb-4">Mapa će biti prikazana ovde. Kliknite za interakciju.</p>
                                    <div className="flex justify-center space-x-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm">
                                            <Navigation size={16} />
                                            <span>Navigacija</span>
                                        </button>
                                        <button className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg flex items-center space-x-2 hover:bg-blue-50 transition-colors shadow-sm">
                                            <Maximize size={16} />
                                            <span>Uvećaj</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Map interaction layer */}
                                <div className={`absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] transition-opacity duration-300 ${
                                    mapInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                }`}></div>
                            </div>

                            {/* Floating information card */}
                            <div className={`absolute top-6 left-6 bg-white shadow-xl rounded-lg p-4 md:p-6 max-w-xs transition-all duration-500 ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">KamenPro Salon</h3>
                                <div className="space-y-3 mb-4">
                                    {locationDetails.map((detail, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <div className="text-blue-600 mt-1 flex-shrink-0">{detail.icon}</div>
                                            <p className="text-gray-600 text-sm">{detail.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="https://goo.gl/maps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                                >
                                    <span>Otvori u Google Maps</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>

                            {/* Mobile information bar - visible only on small screens */}
                            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 shadow-md">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">KamenPro Salon</h3>
                                        <p className="text-xs text-gray-600 truncate">Ulica i broj, Grad</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <a
                                            href="https://maps.google.com/navigation"
                                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                        >
                                            <Navigation size={18} />
                                        </a>
                                        <a
                                            href="https://goo.gl/maps"
                                            className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional location information */}
                    <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-300 ${
                        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                    }`}>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-gray-800 font-medium mb-2 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                                    <span className="text-sm">1</span>
                                </span>
                                Prevoz
                            </h3>
                            <p className="text-sm text-gray-600">Autobuske linije: 16, 23, 95. Tramvaj: 7, 9. Parking dostupan ispred objekta.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-gray-800 font-medium mb-2 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                                    <span className="text-sm">2</span>
                                </span>
                                Orijentiri
                            </h3>
                            <p className="text-sm text-gray-600">Nalazimo se u blizini tržnog centra, pored glavnog gradskog trga.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-gray-800 font-medium mb-2 flex items-center">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                                    <span className="text-sm">3</span>
                                </span>
                                Pristupačnost
                            </h3>
                            <p className="text-sm text-gray-600">Naš objekt je potpuno pristupačan osobama sa invaliditetom i ima rampu za pristup.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated decorative elements */}
            <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-amber-400/20 animate-pulse" style={{ animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-blue-400/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
        </section>
    );
};
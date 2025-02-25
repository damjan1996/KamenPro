// src/components/about/components/CompanyHistory.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

interface HistoryItem {
    year: string;
    title: string;
    description: string;
    image?: string;
}

export function CompanyHistory() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const historyItems: HistoryItem[] = [
        {
            year: '2008',
            title: 'Početak',
            description: 'KamenPro je započeo kao mali porodični biznis u radionici veličine 50m². Sa samo dva zaposlena, započeli smo rad sa osnovnim alatima i velikom strašću prema prirodnom kamenu.',
            image: '/images/history/2008.jpg'
        },
        {
            year: '2012',
            title: 'Širenje proizvodnje',
            description: 'Nakon četiri godine uspešnog poslovanja, proširili smo kapacitete na novu lokaciju sa modernom proizvodnom halom od 500m² i najsavremenijom opremom za obradu kamena.',
            image: '/images/history/2012.jpg'
        },
        {
            year: '2016',
            title: 'Nacionalno priznanje',
            description: 'Nagrađeni smo priznanjem za najboljeg proizvođača dekorativnog kamena u Srbiji. Naš tim je narastao na 15 stručnjaka specijalizovanih za različite aspekte obrade kamena.',
            image: '/images/history/2016.jpg'
        },
        {
            year: '2023',
            title: 'Lider u industriji',
            description: 'KamenPro je danas prepoznat kao vodeći proizvođač kamenih obloga u regionu sa preko 500 uspešno realizovanih projekata i saradnjom sa najpoznatijim arhitektama i dizajnerima enterijera.',
            image: '/images/history/today.jpg'
        }
    ];

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

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                            <span className="text-gray-400">Naša</span> <span className="font-medium">istorija</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl">
                            Od malog porodičnog biznisa do vodećeg proizvođača kamenih obloga u regionu -
                            pogledajte našu transformaciju kroz godine.
                        </p>
                    </div>

                    {/* Desktop timeline (horizontalni) */}
                    <div className="hidden md:block mb-16">
                        <div className="relative">
                            {/* Timeline linja */}
                            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 transform -translate-y-1/2"></div>

                            {/* Timeline tačke */}
                            <div className="relative flex justify-between">
                                {historyItems.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`relative z-10 flex flex-col items-center group transition-all duration-300 ${
                                            index === activeIndex ? 'scale-110' : 'opacity-70 hover:opacity-100'
                                        }`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            index === activeIndex
                                                ? 'bg-[#FF5722] text-white shadow-lg'
                                                : 'bg-white text-gray-400 border-2 border-gray-200 group-hover:border-[#FF5722] group-hover:text-[#FF5722]'
                                        }`}>
                                            <span className="text-lg font-semibold">{item.year}</span>
                                        </div>
                                        <span className={`text-sm font-medium transition-all duration-300 ${
                                            index === activeIndex ? 'text-[#FF5722]' : 'text-gray-500'
                                        }`}>
                      {item.title}
                    </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Glavni prikaz sadržaja */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Tekstualni sadržaj */}
                        <div className={`order-2 md:order-1 transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            {/* Mobile timeline (vertikalni) */}
                            <div className="md:hidden mb-8">
                                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {historyItems.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 ${
                                                index === activeIndex
                                                    ? 'bg-[#FF5722] text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            {item.year}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 md:p-8 rounded-lg transform transition-all duration-500">
                                <div className="flex items-center mb-4">
                                    <div className="mr-4 hidden md:block">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-[#FF5722] text-white`}>
                                            <span className="text-lg font-semibold">{historyItems[activeIndex].year}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-medium text-gray-800">
                                            {historyItems[activeIndex].title}
                                        </h3>
                                        <div className="h-1 w-12 bg-[#FF5722] mt-2"></div>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {historyItems[activeIndex].description}
                                </p>

                                <a
                                    href={`/o-nama/istorija/${historyItems[activeIndex].year.toLowerCase()}`}
                                    className="group inline-flex items-center text-[#FF5722] hover:text-[#E64A19] transition-colors duration-300"
                                >
                                    <span className="mr-2">Saznajte više</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FF5722] transition-all duration-300">
                                        <ArrowRight className="h-4 w-4 text-[#FF5722] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Slika */}
                        <div className={`order-1 md:order-2 h-64 md:h-96 relative rounded-lg overflow-hidden transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            {historyItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ${
                                        index === activeIndex
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-110'
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    <img
                                        src={item.image || '/images/placeholder.jpg'}
                                        alt={`${item.year} - ${item.title}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                            {/* Image overlay with stats */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <div className="text-3xl font-bold">15+</div>
                                        <div className="text-sm text-white/80">Godina iskustva</div>
                                    </div>
                                    <div className="h-10 w-px bg-white/30"></div>
                                    <div>
                                        <div className="text-3xl font-bold">500+</div>
                                        <div className="text-sm text-white/80">Projekata</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigacija */}
                    <div className="mt-12 flex justify-center md:justify-end space-x-2">
                        <button
                            onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-all duration-300 ${
                                activeIndex > 0
                                    ? 'hover:border-[#FF5722] hover:text-[#FF5722]'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={activeIndex === 0}
                        >
                            <ArrowRight className="h-4 w-4 transform rotate-180" />
                        </button>
                        <button
                            onClick={() => setActiveIndex(prev => (prev < historyItems.length - 1 ? prev + 1 : prev))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-all duration-300 ${
                                activeIndex < historyItems.length - 1
                                    ? 'hover:border-[#FF5722] hover:text-[#FF5722]'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={activeIndex === historyItems.length - 1}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Mobile page indicator */}
                    <div className="md:hidden mt-6 flex justify-center">
                        <div className="flex space-x-1">
                            {historyItems.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === activeIndex ? 'bg-[#FF5722] w-4' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
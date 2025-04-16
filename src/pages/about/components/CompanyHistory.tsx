// src/components/about/components/CompanyHistory.tsx
import { useState, useEffect, useRef } from 'react';
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
            year: '2019',
            title: 'Osnivanje',
            description: 'KamenPro je osnovan kao samostalna zanatska radnja u Bijeljini. Sa jasnom vizijom kvaliteta i profesionalnosti, započeli smo proizvodnju dekorativnih kamenih obloga fokusirajući se na ručnu izradu i pažljiv odabir materijala.',
            image: '/images/about/osnivanje.jpg'
        },
        {
            year: '2020',
            title: 'Razvoj asortimana',
            description: 'Proširili smo naš asortiman proizvoda dodajući nove vrste dekorativnih obloga i boja. Pored kamena, počeli smo sa proizvodnjom rustik cigle koja je brzo postala popularna među našim klijentima.',
            image: '/images/about/asortiman.jpg'
        },
        {
            year: '2022',
            title: 'Uspostavljanje partnerstava',
            description: 'Uspostavili smo partnerstva sa građevinskim firmama i prodavnicama, šireći našu mrežu distribucije. Naši proizvodi su postali prepoznatljivi po kvalitetu i izdržljivosti, a klijentska baza je kontinuirano rasla.',
            image: '/images/about/partnerstva.jpg'
        },
        {
            year: '2025',
            title: 'Danas',
            description: 'Danas je KamenPro vodeći proizvođač dekorativnih kamenih obloga u regionu Bijeljine. Radimo na proširenju kapaciteta proizvodnje i kontinuirano unapređujemo kvalitet naših proizvoda, trudeći se da ispunimo i premašimo očekivanja naših klijenata.',
            image: '/images/about/danas.jpg'
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

        const currentSectionRef = sectionRef.current;

        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, []);

    // Shared timeline button styles to avoid duplication
    const getTimelineButtonStyles = (index: number) => {
        const isActive = index === activeIndex;
        return {
            yearCircle: `${
                isActive
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-stone-500 border-2 border-stone-200 group-hover:border-amber-500 group-hover:text-amber-600'
            }`,
            yearText: `${
                isActive ? 'text-amber-600' : 'text-stone-500'
            }`
        };
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white font-sans">
            <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                            <span className="text-stone-400">Naša</span> <span className="text-stone-800 font-medium">istorija</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mb-8"></div>
                        <p className="text-stone-600 max-w-3xl font-light">
                            Od osnivanja 2019. godine, KamenPro se razvio u prepoznatljivog proizvođača
                            visokokvalitetnih dekorativnih kamenih obloga. Pogledajte ključne trenutke našeg razvoja.
                        </p>
                    </div>

                    {/* Desktop timeline (horizontalna linija sa godinama) */}
                    <div className="hidden md:block mb-16">
                        <div className="relative">
                            {/* Timeline linija */}
                            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-stone-200 transform -translate-y-1/2"></div>

                            {/* Timeline tačke i godine */}
                            <div className="relative flex justify-between">
                                {historyItems.map((item, index) => {
                                    const styles = getTimelineButtonStyles(index);
                                    return (
                                        <button
                                            key={index}
                                            className={`relative z-10 flex flex-col items-center group transition-all duration-300 ${
                                                index === activeIndex ? 'scale-110' : 'opacity-70 hover:opacity-100'
                                            }`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${styles.yearCircle}`}>
                                                <span className="text-lg font-medium">{item.year}</span>
                                            </div>
                                            <span className={`text-sm font-medium transition-all duration-300 ${styles.yearText}`}>
                                                {item.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Mobile timeline (horizontalna linija sa godinama za mobilni prikaz) */}
                    <div className="md:hidden mb-8 overflow-x-auto pb-2">
                        <div className="flex space-x-6 min-w-max">
                            {historyItems.map((item, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col items-center"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className={`w-14 h-14 mb-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        index === activeIndex
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-white text-stone-500 border border-stone-200'
                                    }`}>
                                        <span className="text-base font-medium">{item.year}</span>
                                    </div>
                                    <span className={`text-xs font-medium transition-all duration-300 ${
                                        index === activeIndex ? 'text-amber-600' : 'text-stone-500'
                                    }`}>
                                        {item.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Aktivni period - detaljan prikaz */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Leva kolona sa tekstom - zauzima 2/5 na desktop-u */}
                        <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="p-6 md:p-8 bg-stone-50 rounded-lg shadow-sm border border-stone-100 h-full">
                                <div className="flex items-start mb-6">
                                    <div className="mr-4">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-500 text-white shadow-sm">
                                            <span className="text-lg font-medium">{historyItems[activeIndex].year}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-medium text-stone-800">
                                            {historyItems[activeIndex].title}
                                        </h3>
                                        <div className="h-1 w-12 bg-amber-500 mt-2"></div>
                                    </div>
                                </div>

                                <p className="text-stone-600 leading-relaxed mb-8 font-light">
                                    {historyItems[activeIndex].description}
                                </p>

                                <a
                                    href="/o-nama"
                                    className="group inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
                                >
                                    <span className="mr-2 font-light">Naša priča</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>

                        {/* Desna kolona sa slikom - zauzima 3/5 na desktop-u */}
                        <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
                                {historyItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-700 ${
                                            index === activeIndex
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-110'
                                        }`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <img
                                            src={item.image || 'https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/workshop-default.jpg'}
                                            alt={`${item.year} - ${item.title}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                                {/* Image overlay with stats */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                                    <div className="flex items-center space-x-12">
                                        <div>
                                            <div className="text-3xl font-bold">6+</div>
                                            <div className="text-sm text-white/90 font-light">Godina iskustva</div>
                                        </div>
                                        <div className="h-10 w-px bg-white/30"></div>
                                        <div>
                                            <div className="text-3xl font-bold">100+</div>
                                            <div className="text-sm text-white/90 font-light">Projekata</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigacija */}
                    <div className="mt-12 flex justify-center space-x-4">
                        <button
                            onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 transition-all duration-300 ${
                                activeIndex > 0
                                    ? 'hover:border-amber-500 hover:text-amber-600'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={activeIndex === 0}
                            aria-label="Prethodna godina"
                        >
                            <ArrowRight className="h-4 w-4 transform rotate-180" />
                        </button>
                        <div className="flex space-x-2">
                            {historyItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === activeIndex ? 'bg-amber-500 w-4' : 'bg-stone-300 hover:bg-stone-400'
                                    }`}
                                    aria-label={`Godina ${historyItems[index].year}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setActiveIndex(prev => (prev < historyItems.length - 1 ? prev + 1 : prev))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 transition-all duration-300 ${
                                activeIndex < historyItems.length - 1
                                    ? 'hover:border-amber-500 hover:text-amber-600'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={activeIndex === historyItems.length - 1}
                            aria-label="Sledeća godina"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
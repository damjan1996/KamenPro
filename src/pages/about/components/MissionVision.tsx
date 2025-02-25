// src/components/about/components/MissionVision.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

export function MissionVision() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('mission');
    const sectionRef = useRef<HTMLElement>(null);

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
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Left column with title */}
                    <div className="lg:w-5/12">
                        <div className={`transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
                                <span className="block">LOVE YOUR</span>
                                <span className="block font-serif italic">Home Again</span>
                            </h2>

                            <div className="flex items-center space-x-4 mb-8">
                                <div className="h-px w-12 bg-black"></div>
                                <span className="text-sm uppercase tracking-widest">O nama</span>
                            </div>

                            <div className="relative overflow-hidden mb-8">
                                <img
                                    src="/images/stone-texture.jpg"
                                    alt="Kameni detalj"
                                    className="w-full h-64 object-cover rounded hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                                        <span className="text-sm font-medium mr-2">Pogledajte našu galeriju</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Number display */}
                            <div className="hidden lg:block relative mt-16">
                                <div className="h-40 w-40 rounded-full border border-black/20 flex items-center justify-center">
                                    <div className="text-5xl font-serif">01</div>
                                    <div className="absolute top-1/2 left-full h-px w-24 bg-black/30 -translate-y-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column with content */}
                    <div className={`lg:w-7/12 transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-8 border-b border-gray-200">
                            <button
                                className={`px-6 py-3 font-medium text-lg transition-all duration-300 ${
                                    activeTab === 'mission'
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                                onClick={() => setActiveTab('mission')}
                            >
                                Naša misija
                            </button>
                            <button
                                className={`px-6 py-3 font-medium text-lg transition-all duration-300 ${
                                    activeTab === 'vision'
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                                onClick={() => setActiveTab('vision')}
                            >
                                Naša vizija
                            </button>
                        </div>

                        {/* Mission content */}
                        <div className={`transition-all duration-500 ${
                            activeTab === 'mission' ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                        }`}>
                            <div className="text-xl md:text-2xl font-light text-gray-800 mb-6 leading-relaxed">
                                Spajamo tradicionalno kamenorezačko zanatsko umeće sa savremenim
                                tehnologijama kako bismo stvorili izuzetne kamene obloge koje
                                izdržavaju test vremena.
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Mi smo strastveni tim dizajnera posvećen stvaranju izuzetnih prostora koji
                                odražavaju jedinstveni ukus i stil naših klijenata. Sa izraženim osećajem za detalje i
                                dubokim razumevanjem principa dizajna, transformišemo obične prostore u
                                izvanredne ambijente, besprekorno spajajući estetiku i funkcionalnost.
                            </p>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Bilo da tražite kompletno renoviranje doma ili jednostavno osveženje, naši
                                talentovani dizajneri su tu da ožive vašu viziju i stvore okruženje koje zaista
                                inspiriše.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                                    <div className="text-lg font-medium mb-2">Posvećenost kvalitetu</div>
                                    <p className="text-gray-600">Koristimo isključivo najkvalitetniji prirodni kamen za naše proizvode.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
                                    <div className="text-lg font-medium mb-2">Inovativni pristup</div>
                                    <p className="text-gray-600">Kontinuirano unapređujemo naše tehnike i procese obrade kamena.</p>
                                </div>
                            </div>

                            <a
                                href="/o-nama/misija"
                                className="inline-flex items-center space-x-2 group"
                            >
                                <span className="text-black font-medium group-hover:underline">Pročitajte više o našoj misiji</span>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center border border-black transform transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </a>
                        </div>

                        {/* Vision content */}
                        <div className={`transition-all duration-500 ${
                            activeTab === 'vision' ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                        }`}>
                            <div className="text-xl md:text-2xl font-light text-gray-800 mb-6 leading-relaxed">
                                Težimo da budemo globalno prepoznati kao sinonim za vrhunske kamene
                                obloge koje kombinuju estetiku, funkcionalnost i održivost.
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Verujemo u stvaranje prostora koji odišu lepotom i karakterom. Sa dubokim
                                razumevanjem kako fizičko okruženje utiče na naše raspoloženje i produktivnost,
                                dizajniramo prostore koji su ne samo vizuelno zadivljujući, već i praktični i
                                funkcionalni.
                            </p>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Želimo da inspirišemo nov način razmišljanja o kamenu kao materijalu koji može
                                transformisati običan prostor u izvanredno iskustvo, povezujući ljude sa prirodom
                                kroz bezvremenski dizajn.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">15+</div>
                                    <div className="text-gray-600 text-sm">Godina iskustva</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">500+</div>
                                    <div className="text-gray-600 text-sm">Projekata</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold mb-1">50+</div>
                                    <div className="text-gray-600 text-sm">Nagrada</div>
                                </div>
                            </div>

                            <a
                                href="/o-nama/vizija"
                                className="inline-flex items-center space-x-2 group"
                            >
                                <span className="text-black font-medium group-hover:underline">Pročitajte više o našoj viziji</span>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center border border-black transform transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Demo Call to Action */}
            <div className={`mt-16 md:mt-24 bg-gray-50 py-12 transition-all duration-700 delay-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-medium mb-2">Spremni da transformišete vaš prostor?</h3>
                            <p className="text-gray-600">Zakažite konsultaciju sa našim timom dizajnera</p>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Vaš email"
                                className="px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-black w-64"
                            />
                            <button className="bg-black text-white px-6 py-3 rounded-r-full hover:bg-gray-800 transition-colors duration-300 flex items-center">
                                <span className="mr-2">Zakažite demo</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
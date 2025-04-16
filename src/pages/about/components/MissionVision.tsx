// src/components/about/components/MissionVision.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, Check } from 'lucide-react';

type TabType = 'mission' | 'vision' | 'values';

interface TabButtonProps {
    label: string;
    tabId: TabType;
    activeTab: string;
    onClick: (tab: TabType) => void;
}

interface ValueCardProps {
    title: string;
    description: string;
}

interface ChecklistItemProps {
    text: string;
}

export function MissionVision() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('mission');
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

    // Hilfsfunktionen für wiederverwendbare Komponenten
    const TabButton = ({ label, tabId, activeTab, onClick }: TabButtonProps) => (
        <button
            className={`px-6 py-3 font-medium text-base transition-all duration-300 ${
                activeTab === tabId
                    ? 'text-amber-600 border-b-2 border-amber-500'
                    : 'text-stone-500 hover:text-stone-700'
            }`}
            onClick={() => onClick(tabId)}
        >
            {label}
        </button>
    );

    const ValueCard = ({ title, description }: ValueCardProps) => (
        <div className="bg-white p-6 rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-200">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Check className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium mb-2 text-stone-800">{title}</div>
            <p className="text-stone-600 font-light">{description}</p>
        </div>
    );

    const ChecklistItem = ({ text }: ChecklistItemProps) => (
        <li className="flex items-start">
            <Check className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-stone-600 font-light">{text}</span>
        </li>
    );

    // Hilfsfunktion für CTAs
    const LinkWithArrow = ({ href, text }: { href: string; text: string }) => (
        <a href={href} className="inline-flex items-center group">
            <span className="text-amber-600 font-medium group-hover:text-amber-700 mr-2">{text}</span>
            <div className="h-8 w-8 rounded-full flex items-center justify-center border border-amber-600 text-amber-600 transform transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
            </div>
        </a>
    );

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Leva kolona sa naslovom */}
                    <div className="lg:w-5/12">
                        <div className={`transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 text-stone-800">
                                <span className="block">PROSTOR KOJI</span>
                                <span className="block font-medium text-amber-600">inspiriše</span>
                            </h2>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-1 w-12 bg-amber-500"></div>
                                <span className="text-sm uppercase tracking-wider text-stone-500 font-light">Naše vrednosti</span>
                            </div>

                            <div className="relative overflow-hidden mb-8 rounded-lg shadow-md">
                                <img
                                    src="/images/about/radionica%20ii.jpg"
                                    alt="KamenPro radionica"
                                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <a
                                        href="/reference"
                                        className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm px-4 py-3 rounded-sm hover:bg-amber-500 hover:text-white transition-all duration-300 text-stone-800 text-sm font-medium shadow-sm hover:shadow-md"
                                    >
                                        <span className="mr-2">Pogledajte naše projekte</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Brojčani prikaz */}
                            <div className="hidden lg:grid grid-cols-2 gap-6 mt-8">
                                <div className="p-5 bg-stone-50 rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="text-3xl font-bold text-amber-600 mb-2">6+</div>
                                    <div className="text-stone-600 text-sm font-light">Godina iskustva</div>
                                </div>
                                <div className="p-5 bg-stone-50 rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="text-3xl font-bold text-amber-600 mb-2">100+</div>
                                    <div className="text-stone-600 text-sm font-light">Realizovanih projekata</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desna kolona sa sadržajem */}
                    <div className={`lg:w-7/12 transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-8 border-b border-stone-200">
                            <TabButton label="Naša misija" tabId="mission" activeTab={activeTab} onClick={setActiveTab} />
                            <TabButton label="Naša vizija" tabId="vision" activeTab={activeTab} onClick={setActiveTab} />
                            <TabButton label="Vrednosti" tabId="values" activeTab={activeTab} onClick={setActiveTab} />
                        </div>

                        {/* Tabs container with fixed height to prevent layout shifts */}
                        <div className="relative">
                            {/* Sadržaj misije */}
                            <div className={activeTab === 'mission' ? 'block' : 'hidden'}>
                                <div className="text-xl md:text-2xl font-light text-stone-800 mb-6 leading-relaxed">
                                    Stvaramo visokokvalitetne dekorativne kamene obloge koje transformišu svaki prostor u
                                    jedinstveno i upečatljivo okruženje, dostupno svakom domu i poslovnom prostoru.
                                </div>

                                <p className="text-stone-600 mb-6 leading-relaxed font-light">
                                    KamenPro je posvećen proizvodnji kamenih obloga koje kombinuju prirodnu estetiku
                                    kamena sa praktičnošću savremenih materijala. Svaki naš proizvod rezultat je pažljivog
                                    ručnog rada i posvećenosti, što garantuje jedinstven izgled i dugotrajnost svake obloge.
                                </p>

                                <p className="text-stone-600 mb-8 leading-relaxed font-light">
                                    Kroz stalno unapređenje procesa proizvodnje i fokus na kvalitet, nastojimo da nadmašimo
                                    očekivanja naših klijenata i postavimo nove standarde u industriji dekorativnih obloga.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 hover:shadow-md transition-all duration-300 hover:border-amber-200">
                                        <div className="text-lg font-medium mb-2 text-stone-800">Posvećenost kvalitetu</div>
                                        <p className="text-stone-600 font-light">Koristimo isključivo najkvalitetnije materijale za naše proizvode, sa posebnim fokusom na beli cement i pažljivo odabrane aditive.</p>
                                    </div>
                                    <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 hover:shadow-md transition-all duration-300 hover:border-amber-200">
                                        <div className="text-lg font-medium mb-2 text-stone-800">Individualni pristup</div>
                                        <p className="text-stone-600 font-light">Svaki projekat posmatramo kroz prizmu jedinstvenih želja i potreba klijenta, pružajući personalizovana rešenja za svaki prostor.</p>
                                    </div>
                                </div>

                                <LinkWithArrow
                                    href="/kontakt"
                                    text="Kontaktirajte nas za više informacija"
                                />
                            </div>

                            {/* Sadržaj vizije */}
                            <div className={activeTab === 'vision' ? 'block' : 'hidden'}>
                                <div className="text-xl md:text-2xl font-light text-stone-800 mb-6 leading-relaxed">
                                    Postati prepoznatljiv lider u proizvodnji dekorativnih kamenih obloga u regionu,
                                    stalno unapređujući kvalitet i asortiman proizvoda prema potrebama naših klijenata.
                                </div>

                                <p className="text-stone-600 mb-6 leading-relaxed font-light">
                                    Naša vizija je da KamenPro postane sinonim za kvalitet i pouzdanost u oblasti
                                    dekorativnih kamenih obloga. Težimo da budemo prvi izbor za klijente koji traže
                                    savršen balans između estetike, funkcionalnosti i pristupačnosti.
                                </p>

                                <p className="text-stone-600 mb-8 leading-relaxed font-light">
                                    U narednim godinama planiramo proširenje kapaciteta proizvodnje i asortimana proizvoda,
                                    kako bismo mogli da ponudimo još više mogućnosti za uređenje enterijera i eksterijera,
                                    odgovarajući na rastuće potrebe tržišta.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="p-6 rounded-lg bg-amber-50 border border-amber-100">
                                        <h4 className="text-lg font-medium mb-4 text-amber-700">Dugoročni ciljevi</h4>
                                        <ul className="space-y-3">
                                            <ChecklistItem text="Proširenje proizvodnih kapaciteta" />
                                            <ChecklistItem text="Razvoj novih vrsta dekorativnih obloga" />
                                            <ChecklistItem text="Uspostavljanje šire distribucione mreže" />
                                        </ul>
                                    </div>

                                    <div className="p-6 rounded-lg bg-amber-50 border border-amber-100">
                                        <h4 className="text-lg font-medium mb-4 text-amber-700">Naša obećanja</h4>
                                        <ul className="space-y-3">
                                            <ChecklistItem text="Kontinuirano unapređenje kvaliteta" />
                                            <ChecklistItem text="Fokus na zadovoljstvo klijenata" />
                                            <ChecklistItem text="Poštovanje dogovorenih rokova i uslova" />
                                        </ul>
                                    </div>
                                </div>

                                <LinkWithArrow
                                    href="/proizvodi"
                                    text="Pogledajte naš asortiman proizvoda"
                                />
                            </div>

                            {/* Sadržaj vrednosti */}
                            <div className={activeTab === 'values' ? 'block' : 'hidden'}>
                                <div className="text-xl md:text-2xl font-light text-stone-800 mb-6 leading-relaxed">
                                    Naše temeljne vrednosti koje usmeravaju svaku odluku i svaki
                                    proizvod koji izlazi iz naše radionice.
                                </div>

                                <p className="text-stone-600 mb-8 leading-relaxed font-light">
                                    U KamenPro-u verujemo da je uspeh rezultat doslednog pridržavanja ključnih vrednosti
                                    koje nas definišu kao kompaniju. One su vodilja za sve što radimo i način na koji poslujemo.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <ValueCard
                                        title="Kvalitet bez kompromisa"
                                        description="Koristimo samo proverene materijale najvišeg kvaliteta i posvećujemo posebnu pažnju svakom detalju proizvodnog procesa."
                                    />
                                    <ValueCard
                                        title="Poštovanje dogovora"
                                        description="Trudimo se da ispunimo svaki dogovor sa našim klijentima, od rokova isporuke do kvaliteta finalnog proizvoda."
                                    />
                                    <ValueCard
                                        title="Fleksibilnost i prilagodljivost"
                                        description="Spremni smo da se prilagodimo specifičnim zahtevima svakog projekta i pronađemo optimalna rešenja."
                                    />
                                    <ValueCard
                                        title="Podrška klijentima"
                                        description="Uvek smo dostupni za savete i tehničku podršku pre, tokom i nakon kupovine."
                                    />
                                </div>

                                <LinkWithArrow
                                    href="/kontakt"
                                    text="Saznajte više o našem pristupu"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* CTA sekcija */}
            <div className={`mt-16 md:mt-24 bg-stone-50 py-12 transition-all duration-700 delay-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-medium mb-2 text-stone-800">Spremni da transformišete vaš prostor?</h3>
                            <p className="text-stone-600 font-light">Kontaktirajte nas za besplatnu konsultaciju</p>
                        </div>
                        <div className="flex">
                            <a
                                href="/kontakt"
                                className="bg-amber-500 text-white px-6 py-3 rounded-sm hover:bg-amber-600 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                            >
                                <span className="mr-2 font-light">Kontaktirajte nas</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
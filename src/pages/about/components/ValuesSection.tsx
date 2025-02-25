// src/components/about/components/ValuesSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { Shield, Heart, Leaf, Users } from 'lucide-react';

export function ValuesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeValue, setActiveValue] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const values = [
        {
            icon: Shield,
            title: 'Kvalitet',
            description: 'Beskompromisna posvećenost kvalitetu u svakom koraku procesa proizvodnje.',
            color: '#000000'
        },
        {
            icon: Heart,
            title: 'Strast',
            description: 'Ljubav prema kamenu i zanatskom umeću koje se prenosi generacijama.',
            color: '#000000'
        },
        {
            icon: Leaf,
            title: 'Održivost',
            description: 'Posvećenost odgovornom nabavljanju materijala i ekološkim proizvodnim procesima.',
            color: '#000000'
        },
        {
            icon: Users,
            title: 'Saradnja',
            description: 'Izgradnja snažnih partnerstava sa klijentima, dobavljačima i zajednicom.',
            color: '#000000'
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

        // Automatsko rotiranje aktivne vrednosti svakih 3 sekunde
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % values.length);
        }, 3000);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            clearInterval(interval);
        };
    }, [values.length]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Leva kolona - Naslov i opis */}
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <h2 className="text-3xl md:text-5xl font-light text-black mb-6 tracking-tight">
                            GALLERY
                            <span className="block mt-2 text-lg uppercase tracking-widest text-gray-500 font-light">NAŠE VREDNOSTI</span>
                        </h2>

                        <div className="h-px w-16 bg-black mb-8"></div>

                        <p className="text-gray-600 mb-12 text-lg">
                            Principi koji vode svaku našu odluku i oblikuju našu kompanijsku kulturu. Verujemo da
                            kvalitet, strast, održivost i saradnja čine temelj našeg uspešnog poslovanja.
                        </p>

                        {/* Navigacija za vrednosti - vidljiva samo na mobilnim uređajima */}
                        <div className="flex space-x-2 mb-8 lg:hidden">
                            {values.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === activeValue ? 'bg-black w-8' : 'bg-gray-300'
                                    }`}
                                    onClick={() => setActiveValue(index)}
                                />
                            ))}
                        </div>

                        {/* Slika koja prikazuje vrednosti u akciji */}
                        <div className="hidden lg:block relative overflow-hidden rounded-md mt-12">
                            <img
                                src="/images/values-in-action.jpg"
                                alt="Naše vrednosti u akciji"
                                className="w-full h-72 object-cover hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                <p className="text-white font-light">Transformišite vaš prostor uz naše vrednosti kao vodilju</p>
                            </div>
                        </div>
                    </div>

                    {/* Desna kolona - Vrednosti */}
                    <div className={`transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Na desktop prikazujemo sve vrednosti u grid layout-u */}
                        <div className="hidden lg:grid grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-md group"
                                    onMouseEnter={() => setActiveValue(index)}
                                >
                                    <div className="mb-4 flex justify-between items-start">
                                        <value.icon
                                            className="w-8 h-8 text-black transition-all duration-300 group-hover:scale-110"
                                        />
                                        <span className="text-sm text-gray-400">0{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-medium text-black mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Na mobilnim uređajima prikazujemo samo aktivnu vrednost */}
                        <div className="lg:hidden">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className={`p-6 bg-gray-50 rounded-md transition-all duration-500 ${
                                        index === activeValue
                                            ? 'opacity-100 transform translate-x-0'
                                            : 'opacity-0 absolute pointer-events-none'
                                    }`}
                                >
                                    <div className="mb-4 flex justify-between items-start">
                                        <value.icon className="w-8 h-8 text-black" />
                                        <span className="text-sm text-gray-400">0{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-medium text-black mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dodatni sadržaj - Ready Stock sekcija */}
                        <div className="mt-12 pt-12 border-t border-gray-200">
                            <h3 className="text-xl md:text-2xl font-medium mb-6">READY STOCK</h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Stolica', 'Lanterna', 'Stalak', 'Jastuk'].map((item, index) => (
                                    <div key={index} className="group">
                                        <div className="bg-gray-100 aspect-square rounded overflow-hidden mb-2 transition-all duration-300 group-hover:shadow-md">
                                            <img
                                                src={`/images/products/${item.toLowerCase()}.jpg`}
                                                alt={item}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase">{index % 2 === 0 ? 'KLITEN' : 'NORDIN'}</div>
                                                <div className="text-sm">{item}</div>
                                            </div>
                                            <div className="text-sm">€ 99.00</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <a
                                    href="/products"
                                    className="inline-flex items-center px-6 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    <span className="mr-2">Pogledajte sve proizvode</span>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
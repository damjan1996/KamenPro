// src/pages/references/components/FeaturedProjects.tsx
import React from 'react';

export const FeaturedProjectsSection: React.FC = () => {
    return (
        <section className="py-16 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Istaknuti <span className="font-medium">projekti</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 font-light">
                        Pogledajte odabrane projekte koje smo uspešno realizovali za naše klijente
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Projekt 1 */}
                    <div className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-stone-800 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-medium text-stone-800 mb-2">Luksuzno kupatilo</h3>
                            <p className="text-stone-600 text-sm mb-4">
                                Prirodni mermer kao glavna obloga u luksuznom kupatilu privatne rezidencije.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-amber-600 uppercase">Beograd</span>
                                <span className="text-xs text-stone-500">2023</span>
                            </div>
                        </div>
                    </div>

                    {/* Projekt 2 */}
                    <div className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-stone-800 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-medium text-stone-800 mb-2">Fasada poslovnog objekta</h3>
                            <p className="text-stone-600 text-sm mb-4">
                                Ventilisana fasada sa prirodnim kamenom za modernu poslovnu zgradu.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-amber-600 uppercase">Novi Sad</span>
                                <span className="text-xs text-stone-500">2022</span>
                            </div>
                        </div>
                    </div>

                    {/* Projekt 3 */}
                    <div className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-stone-800 bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <h3 className="text-xl font-medium text-stone-800 mb-2">Hotel enterijer</h3>
                            <p className="text-stone-600 text-sm mb-4">
                                Luksuzne kamene obloge u enterijeru hotela visoke kategorije.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-amber-600 uppercase">Sarajevo</span>
                                <span className="text-xs text-stone-500">2023</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="inline-flex items-center bg-transparent border border-amber-500 text-amber-600 px-6 py-3 rounded-sm hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-light">
                        <span>Pogledajte sve projekte</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsSection;
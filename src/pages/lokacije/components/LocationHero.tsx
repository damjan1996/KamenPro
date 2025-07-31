import { LocationData } from '../../../lib/locationData';
import { motion } from 'framer-motion';

interface LocationHeroProps {
    locationData: LocationData;
}

export function LocationHero({ locationData }: LocationHeroProps) {
    const { city, cityGenitive } = locationData;

    return (
        <section className="relative bg-stone-950 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url('/images/kamene-obloge-pattern.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)'
                }} />
            </div>

            <div className="container mx-auto px-4 py-24 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Dekorativni Kamen {city}
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-300 mb-8">
                            Najbolji izbor kamenih obloga u {cityGenitive}
                        </p>
                        <p className="text-lg text-stone-400 mb-10 max-w-3xl mx-auto">
                            Transformišite svoj prostor sa našim vrhunskim dekorativnim kamenom. 
                            Besplatna dostava i profesionalna montaža za sve narudžbe preko 500 KM.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="#proizvodi"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-amber-600 text-white px-8 py-4 rounded-sm hover:bg-amber-700 transition-colors duration-300 font-medium"
                            >
                                Pogledajte Proizvode
                            </motion.a>
                            <motion.a
                                href="#kontakt"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block bg-transparent border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-sm hover:bg-amber-600 hover:text-white transition-all duration-300 font-medium"
                            >
                                Besplatna Procjena
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Key Benefits */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
                    >
                        <div className="text-center">
                            <div className="text-4xl text-amber-600 mb-3">🚚</div>
                            <h3 className="text-lg font-semibold mb-2">Besplatna Dostava</h3>
                            <p className="text-stone-400 text-sm">Za narudžbe preko 500 KM u {cityGenitive} i okolini</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-amber-600 mb-3">👷</div>
                            <h3 className="text-lg font-semibold mb-2">Stručna Montaža</h3>
                            <p className="text-stone-400 text-sm">Profesionalni tim sa preko 10 godina iskustva</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-amber-600 mb-3">✓</div>
                            <h3 className="text-lg font-semibold mb-2">Garancija Kvaliteta</h3>
                            <p className="text-stone-400 text-sm">5 godina garancije na sve proizvode</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
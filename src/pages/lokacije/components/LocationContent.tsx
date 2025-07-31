import { LocationData } from '../../../lib/locationData';
import { motion } from 'framer-motion';

interface LocationContentProps {
    locationData: LocationData;
}

export function LocationContent({ locationData }: LocationContentProps) {
    const { city, cityGenitive, content } = locationData;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                            KamenPro - Vaš Partner za Dekorativni Kamen u {cityGenitive}
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                            {content.localInfo}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold text-stone-900 mb-6">
                                Zašto Odabrati KamenPro {city}?
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-amber-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong className="text-stone-900">Najširi Izbor:</strong>
                                        <p className="text-stone-600">Preko 50 različitih modela dekorativnog kamena</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-amber-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong className="text-stone-900">Lokalna Podrška:</strong>
                                        <p className="text-stone-600">Tim stručnjaka uvijek dostupan u {cityGenitive}</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-amber-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong className="text-stone-900">Brza Isporuka:</strong>
                                        <p className="text-stone-600">Dostava unutar 24-48 sati</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-amber-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong className="text-stone-900">Konkurentne Cijene:</strong>
                                        <p className="text-stone-600">Najbolji odnos cijene i kvaliteta</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-stone-50 p-8 rounded-lg"
                        >
                            <h3 className="text-2xl font-bold text-stone-900 mb-6">
                                Područja Dostave
                            </h3>
                            <p className="text-stone-600 mb-4">
                                Vršimo besplatnu dostavu dekorativnog kamena u sljedeća područja:
                            </p>
                            <p className="text-lg font-medium text-stone-800">
                                {content.deliveryArea}
                            </p>
                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded">
                                <p className="text-sm text-amber-800">
                                    <strong>Napomena:</strong> Za ostala područja, kontaktirajte nas za informacije o dostavi.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Services Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20"
                    >
                        <h3 className="text-2xl font-bold text-stone-900 text-center mb-12">
                            Naše Usluge u {cityGenitive}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📋</span>
                                </div>
                                <h4 className="text-xl font-semibold text-stone-900 mb-2">
                                    Besplatna Procjena
                                </h4>
                                <p className="text-stone-600">
                                    Stručna procjena vašeg projekta bez obaveze
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🚚</span>
                                </div>
                                <h4 className="text-xl font-semibold text-stone-900 mb-2">
                                    Dostava i Transport
                                </h4>
                                <p className="text-stone-600">
                                    Sigurna dostava direktno na vašu adresu
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🔨</span>
                                </div>
                                <h4 className="text-xl font-semibold text-stone-900 mb-2">
                                    Profesionalna Montaža
                                </h4>
                                <p className="text-stone-600">
                                    Kompletna usluga montaže od naših stručnjaka
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
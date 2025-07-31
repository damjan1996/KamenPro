import { LocationData } from '../../../lib/locationData';
import { motion } from 'framer-motion';

interface LocalProjectsProps {
    locationData: LocationData;
}

export function LocalProjects({ locationData }: LocalProjectsProps) {
    const { city, content } = locationData;

    return (
        <section className="py-20 bg-stone-50">
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
                            Naši Projekti u {city}
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                            Ponosni smo na brojne uspješne projekte koje smo realizovali širom grada
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {content.localProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="text-amber-600 font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-stone-900 mb-2">
                                            {project}
                                        </h3>
                                        <p className="text-stone-600">
                                            Uspješno realizovan projekat sa vrhunskim dekorativnim kamenom
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <p className="text-lg text-stone-700 mb-6">
                            Želite vidjeti više naših projekata?
                        </p>
                        <a
                            href="/reference"
                            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-sm hover:bg-amber-700 transition-colors duration-300 font-medium"
                        >
                            Pogledajte Sve Reference
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
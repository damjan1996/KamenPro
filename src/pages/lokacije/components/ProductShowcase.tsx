import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductImage } from '../../../components/OptimizedImage';

interface ProductShowcaseProps {
    city: string;
}

const popularProducts = [
    {
        id: 'travertin',
        name: 'Travertin Kamen',
        description: 'Elegantni prirodni kamen idealn za unutrašnje i vanjske površine',
        image: '/images/proizvodi/travertin.jpg',
        price: 'od 45 KM/m²'
    },
    {
        id: 'cigla',
        name: 'Dekorativna Cigla',
        description: 'Rustični izgled koji daje karakter svakom prostoru',
        image: '/images/proizvodi/cigla.jpg',
        price: 'od 35 KM/m²'
    },
    {
        id: 'prirodni-kamen',
        name: 'Prirodni Kamen',
        description: 'Autentičan prirodni kamen za fasade i enterijere',
        image: '/images/proizvodi/prirodni-kamen.jpg',
        price: 'od 55 KM/m²'
    },
    {
        id: 'mozaik',
        name: 'Kameni Mozaik',
        description: 'Dekorativni mozaik za kreativne dizajnerske rješenja',
        image: '/images/proizvodi/mozaik.jpg',
        price: 'od 65 KM/m²'
    }
];

export function ProductShowcase({ city }: ProductShowcaseProps) {
    return (
        <section id="proizvodi" className="py-20 bg-stone-50">
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
                            Popularni Proizvodi u {city}
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                            Otkrijte naš izbor najtraženijih dekorativnih kamenih obloga
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-w-16 aspect-h-12 bg-stone-200">
                                    <ProductImage
                                        src={product.image}
                                        productName={product.name}
                                        location={city.toLowerCase()}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-stone-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-600 text-sm mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-amber-600">
                                            {product.price}
                                        </span>
                                        <Link
                                            to={`/proizvodi/${product.id}`}
                                            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                                        >
                                            Saznaj više →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/proizvodi"
                            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-sm hover:bg-amber-700 transition-colors duration-300 font-medium"
                        >
                            Pogledajte Sve Proizvode
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
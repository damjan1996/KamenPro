import React, { useState } from 'react';
import { Product, Category, ProductInventory } from '../../../lib/api';

interface ProductInfoProps {
    product: Product;
    category: Category;
    inventory: ProductInventory;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, category, inventory }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [isInquirySent, setIsInquirySent] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `Zainteresovan/a sam za proizvod ${product.naziv} (šifra: ${product.sifra}). Molim vas za više informacija.`
    });

    // Prüfen, ob das Produkt auf Lager ist
    const isInStock = inventory && inventory.kolicina_m2 > 0 && inventory.status === 'dostupno';

    // Formatiert den Preis mit der entsprechenden Währung
    const formatPrice = (price: number, currency: string) => {
        return `${price.toFixed(2)} ${currency}`;
    };

    // Erhöht die Anzahl der m²
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    // Verringert die Anzahl der m²
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Berechnet den Gesamtpreis
    const totalPrice = product.cena_po_m2 * quantity;

    // Behandelt Änderungen im Formular
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Behandelt das Absenden des Formulars
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier würden Sie die Anfrage an Ihr Backend senden
        console.log('Sending inquiry:', { ...formData, product: product.id, quantity });
        // Bestätigung anzeigen
        setIsInquirySent(true);
        // Formular zurücksetzen (optional)
        setTimeout(() => {
            setIsInquirySent(false);
            setFormData({
                ...formData,
                message: `Zainteresovan/a sam za proizvod ${product.naziv} (šifra: ${product.sifra}). Molim vas za više informacija.`
            });
        }, 5000);
    };

    return (
        <div>
            {/* Kategorie und Produktname */}
            <div className="mb-4">
                <h3 className="text-sm text-gray-500 uppercase">{category.naziv}</h3>
                <h1 className="text-3xl font-bold">{product.naziv}</h1>
            </div>

            {/* Produktcode */}
            <div className="mb-4 text-sm text-gray-600">
                <span>Šifra proizvoda: {product.sifra}</span>
            </div>

            {/* Preis pro m² */}
            <div className="mb-6">
                <p className="text-2xl font-semibold">
                    {formatPrice(product.cena_po_m2, product.valuta)} / m²
                </p>
            </div>

            {/* Lagerbestand */}
            <div className="mb-6">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    isInStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                    {isInStock ? 'Na stanju' : 'Nije na stanju'}
                </div>

                {isInStock && inventory.kolicina_m2 < inventory.min_zaliha && (
                    <div className="mt-2 text-sm text-amber-600">
                        Ograničene zalihe.
                    </div>
                )}
            </div>

            {/* Kurze Beschreibung */}
            <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                    {product.opis.length > 200
                        ? `${product.opis.substring(0, 200)}...`
                        : product.opis}
                </p>
            </div>

            {/* Dimensionen und Gewicht */}
            <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Debljina</h3>
                    <p className="mt-1">
                        {product.debljina_min === product.debljina_max
                            ? `${product.debljina_min} mm`
                            : `${product.debljina_min} - ${product.debljina_max} mm`}
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Težina po m²</h3>
                    <p className="mt-1">{product.tezina_po_m2} kg</p>
                </div>
            </div>

            {/* Mengenauswahl und Gesamtpreis */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900">Količina (m²)</h3>
                <div className="flex items-center mt-2">
                    <button
                        onClick={decrementQuantity}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-10 border-t border-b border-gray-300 text-center"
                    />
                    <button
                        onClick={incrementQuantity}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r"
                    >
                        +
                    </button>
                    <div className="ml-8">
            <span className="text-lg font-medium">
              Ukupno: {formatPrice(totalPrice, product.valuta)}
            </span>
                    </div>
                </div>
            </div>

            {/* Anfrage senden */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Pošaljite upit</h3>

                {isInquirySent ? (
                    <div className="text-green-600 py-2">
                        Vaš upit je uspešno poslat. Kontaktiraćemo vas uskoro.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-3 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Ime i prezime *"
                                value={formData.name}
                                onChange={handleFormChange}
                                className="px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email adresa *"
                                value={formData.email}
                                onChange={handleFormChange}
                                className="px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Broj telefona *"
                                value={formData.phone}
                                onChange={handleFormChange}
                                className="px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                            <textarea
                                name="message"
                                rows={2}
                                placeholder="Poruka *"
                                value={formData.message}
                                onChange={handleFormChange}
                                className="px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
                        >
                            Pošalji upit
                        </button>
                    </form>
                )}
            </div>

            {/* Direkte Kontaktoptionen */}
            <div className="mt-6">
                <div className="flex flex-wrap gap-3">
                    <a
                        href="tel:+38765678634"
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +387 65 678 634
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
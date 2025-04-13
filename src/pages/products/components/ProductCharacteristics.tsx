import React from 'react';
import { ProductCharacteristic } from '../../../lib/api';

interface ProductCharacteristicsProps {
    characteristics: ProductCharacteristic[];
}

const ProductCharacteristics: React.FC<ProductCharacteristicsProps> = ({ characteristics }) => {
    // Wenn keine Eigenschaften vorhanden sind
    if (!characteristics || characteristics.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Karakteristike proizvoda</h2>

            <div className="border-t border-gray-200">
                {characteristics.map((characteristic) => (
                    <div
                        key={characteristic.id}
                        className="py-3 flex justify-between border-b border-gray-200"
                    >
                        <div className="font-medium text-gray-900">{characteristic.naziv_karakteristike}</div>
                        <div className="text-gray-700">{characteristic.vrednost_karakteristike}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCharacteristics;
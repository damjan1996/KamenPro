// Diese Datei stellt eine Implementierung der API mit lokalen Mock-Daten bereit
// für den Fall, dass keine Datenbank-Verbindung möglich ist

import {
    Product,
    ProductCharacteristic,
    ProductImage,
    ProductInventory,
    Category,
    ProductDetail
} from './api';

// Mock-Daten basierend auf der Datenbankstruktur
const mockProducts: Product[] = [
    {
        id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        sifra: 'DOL-WHT',
        naziv: 'Dolomite - White',
        cena_po_m2: 33.0,
        valuta: 'KM',
        opis: 'Visokokvalitetne dekorativne kamene ploče u beloj boji za unutrašnje i spoljašnje zidove. Izrađene od belog cementa sa specijalno razvijenim aditivima za maksimalnu izdržljivost i otpornost na vremenske uslove. Idealno za unutrašnje i spoljašnje zidove, kamine, akcentne zidove i dekorativne elemente.',
        kategorija_id: '2be995c1-2c44-4d31-a62e-eed3afc2bb10',
        tezina_po_m2: 32.5,
        debljina_min: 15.0,
        debljina_max: 20.0,
        datum_kreiranja: '2025-03-09T20:11:56.054528+00:00',
        datum_azuriranja: '2025-03-09T20:11:56.054528+00:00'
    },
    {
        id: '1b2b9f32-932d-42e3-8be9-6a9cdd628808',
        sifra: 'DOL-GRY',
        naziv: 'Dolomite - Grey',
        cena_po_m2: 35.0,
        valuta: 'KM',
        opis: 'Visokokvalitetne dekorativne kamene ploče u sivoj boji za unutrašnje i spoljašnje zidove. Izrađene od belog cementa sa specijalno razvijenim aditivima za maksimalnu izdržljivost i otpornost na vremenske uslove. Idealno za unutrašnje i spoljašnje zidove, kamine, akcentne zidove i dekorativne elemente.',
        kategorija_id: '2be995c1-2c44-4d31-a62e-eed3afc2bb10',
        tezina_po_m2: 32.5,
        debljina_min: 15.0,
        debljina_max: 20.0,
        datum_kreiranja: '2025-03-09T20:11:56.054528+00:00',
        datum_azuriranja: '2025-03-09T20:11:56.054528+00:00'
    },
    // Weitere Mock-Produkte hier...
];

const mockCategories: Category[] = [
    {
        id: '2be995c1-2c44-4d31-a62e-eed3afc2bb10',
        naziv: 'Dekorativni kamen',
        opis: 'Visokokvalitetne dekorativne kamene ploče za zidove',
        datum_kreiranja: '2025-03-09T20:10:22.204744+00:00'
    },
    {
        id: '88600ee1-28de-4385-a9ce-1c158d0f85ce',
        naziv: 'Dekorativna rustik cigla',
        opis: 'Rustik cigle za unutrašnje i spoljašnje zidove',
        datum_kreiranja: '2025-03-09T20:10:22.204744+00:00'
    },
    // Weitere Mock-Kategorien hier...
];

const mockCharacteristics: ProductCharacteristic[] = [
    {
        id: 'a8056ef3-d2cf-448a-bae9-45c5e28d3a51',
        proizvod_id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        naziv_karakteristike: 'Materijal',
        vrednost_karakteristike: 'Beli cement sa aditivima i sredstvima za očvršćivanje',
        redosled_prikaza: 1
    },
    {
        id: '5da25536-19b8-4ff3-8c35-b35b0566e266',
        proizvod_id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        naziv_karakteristike: 'Standardne dimenzije',
        vrednost_karakteristike: '44cm x 8.5cm',
        redosled_prikaza: 2
    },
    // Weitere Mock-Eigenschaften hier...
];

const mockImages: ProductImage[] = [
    {
        id: 'cebbe477-0bfd-4451-bb2d-366397bbecfb',
        proizvod_id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        url_slike: '/proizvodi/dolomite-white/proizvod.jpg',
        tip_slike: 'product',
        alt_tekst: 'Dolomite White dekorativni kamen',
        glavna_slika: true,
        redosled_prikaza: 1,
        datum_kreiranja: '2025-03-09T20:11:56.054528+00:00'
    },
    {
        id: '9b69ae7e-0d7f-42f9-bd88-48720d1bf722',
        proizvod_id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        url_slike: '/proizvodi/dolomite-white/dimenzije.jpg',
        tip_slike: 'dimensions',
        alt_tekst: 'Dimenzije Dolomite White proizvoda',
        glavna_slika: false,
        redosled_prikaza: 2,
        datum_kreiranja: '2025-03-09T20:11:56.054528+00:00'
    },
    // Weitere Mock-Bilder hier...
];

const mockInventory: ProductInventory[] = [
    {
        id: 'a2d2329e-a75d-4282-9fc1-8becd80c0394',
        proizvod_id: 'd94aaee3-08fc-4c7f-b4f7-0066aab85532',
        kolicina_m2: 50.0,
        min_zaliha: 10.0,
        poslednje_azuriranje: '2025-03-09T20:11:56.054528+00:00',
        napomena: 'Početno stanje',
        status: 'dostupno'
    },
    {
        id: 'd4100f53-0607-4686-ba2a-e5b2365d0226',
        proizvod_id: '1b2b9f32-932d-42e3-8be9-6a9cdd628808',
        kolicina_m2: 45.0,
        min_zaliha: 10.0,
        poslednje_azuriranje: '2025-03-09T20:11:56.054528+00:00',
        napomena: 'Početno stanje',
        status: 'dostupno'
    },
    // Weitere Mock-Lagerbestände hier...
];

// Simulate delay to mimic API requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API-Funktionen mit Mock-Daten

// Produkt anhand der ID abrufen
export async function getMockProductById(id: string): Promise<ProductDetail | null> {
    await delay(500); // Simulate network request

    const product = mockProducts.find(p => p.id === id);
    if (!product) return null;

    const characteristics = mockCharacteristics.filter(c => c.proizvod_id === id);
    const images = mockImages.filter(i => i.proizvod_id === id);
    const inventory = mockInventory.find(i => i.proizvod_id === id);
    const category = mockCategories.find(c => c.id === product.kategorija_id);

    if (!inventory || !category) return null;

    return {
        product,
        characteristics,
        images,
        inventory,
        category
    };
}

// Alle Produkte abrufen
export async function getMockAllProducts(): Promise<Product[]> {
    await delay(300); // Simulate network request
    return [...mockProducts];
}

// Produkte nach Kategorie abrufen
export async function getMockProductsByCategory(categoryId: string): Promise<Product[]> {
    await delay(300); // Simulate network request
    return mockProducts.filter(p => p.kategorija_id === categoryId);
}

// Alle Kategorien abrufen
export async function getMockAllCategories(): Promise<Category[]> {
    await delay(300); // Simulate network request
    return [...mockCategories];
}

// Exportiere diese Funktionen als Standard-API-Funktionen
export {
    getMockProductById as getProductById,
    getMockAllProducts as getAllProducts,
    getMockProductsByCategory as getProductsByCategory,
    getMockAllCategories as getAllCategories
};
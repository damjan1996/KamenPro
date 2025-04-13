// Für den Zugriff auf Supabase nutzen wir die offizielle Supabase-Client-Bibliothek
import { createClient } from '@supabase/supabase-js';

// Typdefinitionen
export interface Product {
    id: string;
    sifra: string;
    naziv: string;
    cena_po_m2: number;
    valuta: string;
    opis: string;
    kategorija_id: string;
    tezina_po_m2: number;
    debljina_min: number;
    debljina_max: number;
    datum_kreiranja: string;
    datum_azuriranja: string;
}

export interface ProductCharacteristic {
    id: string;
    proizvod_id: string;
    naziv_karakteristike: string;
    vrednost_karakteristike: string;
    redosled_prikaza: number;
}

export interface ProductImage {
    id: string;
    proizvod_id: string;
    url_slike: string;
    tip_slike: string;
    alt_tekst: string;
    glavna_slika: boolean;
    redosled_prikaza: number;
    datum_kreiranja: string;
}

export interface ProductInventory {
    id: string;
    proizvod_id: string;
    kolicina_m2: number;
    min_zaliha: number;
    poslednje_azuriranje: string;
    napomena: string;
    status: string;
}

export interface Category {
    id: string;
    naziv: string;
    opis: string;
    datum_kreiranja: string;
}

export interface ProductDetail {
    product: Product;
    characteristics: ProductCharacteristic[];
    images: ProductImage[];
    inventory: ProductInventory;
    category: Category;
}

// Supabase Konfiguration mit den korrekten Zugangsdaten
const supabaseUrl = 'https://yodddwoxxifcuawbmzop.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZGRkd294eGlmY3Vhd2Jtem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTQ0ODAsImV4cCI6MjA1NzA5MDQ4MH0.yfHzfWYzUxR-YDxThj_8pbnDvaJ2yIekUe4NUG0V5b0';

// Erstellen des Supabase-Clients
const supabase = createClient(supabaseUrl, supabaseKey);

// Produkt anhand der ID abrufen
export async function getProductById(id: string): Promise<ProductDetail | null> {
    try {
        console.log("Fetching product with ID:", id);

        // 1. Produkt abrufen
        const { data: product, error: productError } = await supabase
            .from('proizvodi')
            .select('*')
            .eq('id', id)
            .single();

        if (productError) {
            console.error("Error fetching product:", productError);
            return null;
        }

        if (!product) {
            console.error("Product not found for ID:", id);
            return null;
        }

        console.log("Product found:", product.naziv);

        // 2. Kategorie abrufen
        const { data: category, error: categoryError } = await supabase
            .from('kategorije')
            .select('*')
            .eq('id', product.kategorija_id)
            .single();

        if (categoryError) {
            console.error("Error fetching category:", categoryError);
            return null;
        }

        // 3. Bilder abrufen
        const { data: images, error: imagesError } = await supabase
            .from('slike_proizvoda')
            .select('*')
            .eq('proizvod_id', id)
            .order('redosled_prikaza');

        if (imagesError) {
            console.error("Error fetching images:", imagesError);
            return null;
        }

        // 4. Eigenschaften abrufen
        const { data: characteristics, error: characteristicsError } = await supabase
            .from('karakteristike_proizvoda')
            .select('*')
            .eq('proizvod_id', id)
            .order('redosled_prikaza');

        if (characteristicsError) {
            console.error("Error fetching characteristics:", characteristicsError);
            return null;
        }

        // 5. Lagerbestand abrufen
        const { data: inventories, error: inventoryError } = await supabase
            .from('zalihe')
            .select('*')
            .eq('proizvod_id', id);

        if (inventoryError) {
            console.error("Error fetching inventory:", inventoryError);
            return null;
        }

        // Standardwerte für leere Ergebnisse
        const defaultInventory: ProductInventory = {
            id: `inv-${id}`,
            proizvod_id: id,
            kolicina_m2: 0,
            min_zaliha: 0,
            poslednje_azuriranje: new Date().toISOString(),
            napomena: 'Nema na stanju',
            status: 'nedostupno'
        };

        // Alle Daten in einem Objekt zusammenführen
        return {
            product,
            category,
            images: images || [],
            characteristics: characteristics || [],
            inventory: inventories && inventories.length > 0 ? inventories[0] : defaultInventory
        };
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
}

// Alle Produkte abrufen
export async function getAllProducts(): Promise<Product[]> {
    try {
        console.log("Fetching all products");

        const { data, error } = await supabase
            .from('proizvodi')
            .select('*')
            .order('naziv');

        if (error) {
            console.error("Error fetching all products:", error);
            return [];
        }

        console.log(`Found ${data?.length || 0} products`);
        return data || [];
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
}

// Alle Kategorien abrufen
export async function getAllCategories(): Promise<Category[]> {
    try {
        console.log("Fetching all categories");

        const { data, error } = await supabase
            .from('kategorije')
            .select('*')
            .order('naziv');

        if (error) {
            console.error("Error fetching all categories:", error);
            return [];
        }

        console.log(`Found ${data?.length || 0} categories`);
        return data || [];
    } catch (error) {
        console.error('Error fetching all categories:', error);
        return [];
    }
}
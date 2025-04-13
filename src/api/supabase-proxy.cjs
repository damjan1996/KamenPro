const { createClient } = require('@supabase/supabase-js');

// Supabase Konfiguration aus Umgebungsvariablen
const supabaseUrl = process.env.SUPABASE_URL || 'https://yodddwoxxifcuawbmzop.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

// Erstellen des Supabase-Clients
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Serverless-Funktion für den Supabase Proxy
 *
 * @param {Object} event - Die HTTP-Anfrage
 * @param {Object} context - Der Netlify-Kontext
 * @returns {Promise<Object>} Die HTTP-Antwort
 */
exports.handler = async (event, context) => {
    // CORS-Headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    // CORS-Preflight-Anfragen behandeln
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({}),
        };
    }

    // Nur POST-Anfragen erlauben
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const payload = JSON.parse(event.body);
        const { path, id } = payload;

        // Je nach Pfad unterschiedliche Aktionen ausführen
        switch (path) {
            case 'products':
                // Alle Produkte abrufen
                const { data: products, error: productsError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .order('naziv');

                if (productsError) throw new Error(productsError.message);

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(products),
                };

            case 'product':
                // Ein einzelnes Produkt mit allen Details abrufen
                // 1. Produkt abrufen
                const { data: product, error: productError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (productError) throw new Error(productError.message);
                if (!product) throw new Error('Proizvod nije pronađen');

                // 2. Kategorie abrufen
                const { data: category, error: categoryError } = await supabase
                    .from('kategorije')
                    .select('*')
                    .eq('id', product.kategorija_id)
                    .single();

                if (categoryError) throw new Error(categoryError.message);

                // 3. Bilder abrufen
                const { data: images, error: imagesError } = await supabase
                    .from('slike_proizvoda')
                    .select('*')
                    .eq('proizvod_id', id)
                    .order('redosled_prikaza');

                if (imagesError) throw new Error(imagesError.message);

                // 4. Eigenschaften abrufen
                const { data: characteristics, error: characteristicsError } = await supabase
                    .from('karakteristike_proizvoda')
                    .select('*')
                    .eq('proizvod_id', id)
                    .order('redosled_prikaza');

                if (characteristicsError) throw new Error(characteristicsError.message);

                // 5. Lagerbestand abrufen
                const { data: inventory, error: inventoryError } = await supabase
                    .from('zalihe')
                    .select('*')
                    .eq('proizvod_id', id)
                    .single();

                if (inventoryError) throw new Error(inventoryError.message);

                // Alle Daten in einem Objekt zusammenführen
                const productDetail = {
                    product,
                    category,
                    images,
                    characteristics,
                    inventory,
                };

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(productDetail),
                };

            case 'categories':
                // Alle Kategorien abrufen
                const { data: categories, error: categoriesError } = await supabase
                    .from('kategorije')
                    .select('*')
                    .order('naziv');

                if (categoriesError) throw new Error(categoriesError.message);

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(categories),
                };

            case 'productsByCategory':
                // Produkte nach Kategorie abrufen
                const { data: categoryProducts, error: categoryProductsError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .eq('kategorija_id', id)
                    .order('naziv');

                if (categoryProductsError) throw new Error(categoryProductsError.message);

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(categoryProducts),
                };

            default:
                throw new Error(`Nepoznat API zahtev: ${path}`);
        }
    } catch (error) {
        console.error('Supabase proxy error:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
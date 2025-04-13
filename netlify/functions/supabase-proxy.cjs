const { createClient } = require('@supabase/supabase-js');

// Supabase Anmeldedaten
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Erstelle Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
    try {
        // Extrahiere Parameter aus der Anfrage
        const { path, id } = JSON.parse(event.body || '{}');

        if (!path) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Pfad ist erforderlich' })
            };
        }

        let response;

        // Verarbeite verschiedene API-Endpunkte
        switch (path) {
            case 'product':
                if (!id) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: 'Produkt-ID ist erforderlich' })
                    };
                }

                // Produkt abrufen
                const { data: product, error: productError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (productError) {
                    throw productError;
                }

                // Produkteigenschaften abrufen
                const { data: characteristics, error: characteristicsError } = await supabase
                    .from('karakteristike_proizvoda')
                    .select('*')
                    .eq('proizvod_id', id)
                    .order('redosled_prikaza', { ascending: true });

                if (characteristicsError) {
                    throw characteristicsError;
                }

                // Produktbilder abrufen
                const { data: images, error: imagesError } = await supabase
                    .from('slike_proizvoda')
                    .select('*')
                    .eq('proizvod_id', id)
                    .order('redosled_prikaza', { ascending: true });

                if (imagesError) {
                    throw imagesError;
                }

                // Lagerbestand abrufen
                const { data: inventory, error: inventoryError } = await supabase
                    .from('zalihe')
                    .select('*')
                    .eq('proizvod_id', id)
                    .single();

                if (inventoryError) {
                    throw inventoryError;
                }

                // Kategorie abrufen
                const { data: category, error: categoryError } = await supabase
                    .from('kategorije')
                    .select('*')
                    .eq('id', product.kategorija_id)
                    .single();

                if (categoryError) {
                    throw categoryError;
                }

                response = {
                    product,
                    characteristics,
                    images,
                    inventory,
                    category
                };
                break;

            case 'products':
                // Alle Produkte abrufen
                const { data: products, error: productsError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .order('naziv', { ascending: true });

                if (productsError) {
                    throw productsError;
                }

                response = products;
                break;

            case 'categories':
                // Alle Kategorien abrufen
                const { data: categories, error: categoriesError } = await supabase
                    .from('kategorije')
                    .select('*')
                    .order('naziv', { ascending: true });

                if (categoriesError) {
                    throw categoriesError;
                }

                response = categories;
                break;

            case 'productsByCategory':
                if (!id) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: 'Kategorie-ID ist erforderlich' })
                    };
                }

                // Produkte nach Kategorie abrufen
                const { data: categoryProducts, error: categoryProductsError } = await supabase
                    .from('proizvodi')
                    .select('*')
                    .eq('kategorija_id', id)
                    .order('naziv', { ascending: true });

                if (categoryProductsError) {
                    throw categoryProductsError;
                }

                response = categoryProducts;
                break;

            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Ungültiger Pfad' })
                };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        console.error('Fehler:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
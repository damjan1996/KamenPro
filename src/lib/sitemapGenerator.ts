import { getAllLocationSlugs } from './locationData';
import { getAllProducts, Product } from './api';

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
    images?: {
        loc: string;
        title: string;
        caption?: string;
    }[];
}

export async function generateSitemap(): Promise<string> {
    const baseUrl = 'https://kamenpro.net';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
        // Homepage
        {
            loc: `${baseUrl}/`,
            lastmod: currentDate,
            changefreq: 'daily',
            priority: 1.0,
            images: [{
                loc: `${baseUrl}/images/home/hero.png`,
                title: 'KamenPro - Kamene obloge za enterijer i eksterijer'
            }]
        },
        // Main pages
        {
            loc: `${baseUrl}/o-nama`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.8
        },
        {
            loc: `${baseUrl}/proizvodi`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.9
        },
        {
            loc: `${baseUrl}/reference`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.8
        },
        {
            loc: `${baseUrl}/kontakt`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.7
        }
    ];

    // Add location pages
    const locationSlugs = getAllLocationSlugs();
    locationSlugs.forEach(slug => {
        urls.push({
            loc: `${baseUrl}/lokacije/${slug}`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.9,
            images: [{
                loc: `${baseUrl}/images/lokacije/${slug}-og.jpg`,
                title: `Dekorativni kamen ${slug.charAt(0).toUpperCase() + slug.slice(1)} - KamenPro`
            }]
        });
    });

    // Add product pages
    try {
        const products = await getAllProducts();
        products.forEach(product => {
            urls.push({
                loc: `${baseUrl}/proizvodi/${product.id}`,
                lastmod: product.datum_azuriranja || currentDate,
                changefreq: 'monthly',
                priority: 0.8,
                images: [{
                    loc: `https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/placeholder.jpg`,
                    title: `${product.naziv} - KamenPro dekorativne kamene obloge`
                }]
            });
        });
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
    }

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

`;

    urls.forEach(url => {
        xml += `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>`;

        if (url.images && url.images.length > 0) {
            url.images.forEach(image => {
                xml += `
        <image:image>
            <image:loc>${image.loc}</image:loc>
            <image:title>${image.title}</image:title>
            ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
        </image:image>`;
            });
        }

        xml += `
    </url>

`;
    });

    xml += `</urlset>`;

    return xml;
}

// Helper function to save sitemap to public directory (for build processes)
export async function saveSitemap(): Promise<void> {
    const sitemapContent = await generateSitemap();
    
    // In a real implementation, you would write this to the file system
    // For now, we'll just log it or return it
    console.log('Generated sitemap:', sitemapContent);
}

// Function to generate sitemap with better product image handling
export async function generateSitemapWithImages(): Promise<string> {
    const baseUrl = 'https://kamenpro.net';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
        // Homepage
        {
            loc: `${baseUrl}/`,
            lastmod: currentDate,
            changefreq: 'daily',
            priority: 1.0,
            images: [{
                loc: `${baseUrl}/images/home/hero.png`,
                title: 'KamenPro - Kamene obloge za enterijer i eksterijer'
            }]
        },
        // Main pages
        {
            loc: `${baseUrl}/o-nama`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.8
        },
        {
            loc: `${baseUrl}/proizvodi`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.9
        },
        {
            loc: `${baseUrl}/reference`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.8
        },
        {
            loc: `${baseUrl}/kontakt`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: 0.7
        }
    ];

    // Add location pages
    const locationSlugs = getAllLocationSlugs();
    locationSlugs.forEach(slug => {
        urls.push({
            loc: `${baseUrl}/lokacije/${slug}`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.9,
            images: [{
                loc: `${baseUrl}/images/lokacije/${slug}-og.jpg`,
                title: `Dekorativni kamen ${slug.charAt(0).toUpperCase() + slug.slice(1)} - KamenPro`
            }]
        });
    });

    // Add product pages with proper image URLs
    try {
        const products = await getAllProducts();
        products.forEach(product => {
            // Create proper image URL based on product category and name
            const imageUrl = getProductImageUrl(product);
            
            urls.push({
                loc: `${baseUrl}/proizvodi/${product.id}`,
                lastmod: product.datum_azuriranja || currentDate,
                changefreq: 'monthly',
                priority: 0.8,
                images: [{
                    loc: imageUrl,
                    title: `${product.naziv} - KamenPro dekorativne kamene obloge`,
                    caption: product.opis || `Visokokvalitetne ${product.naziv.toLowerCase()} za enterijer i eksterijer`
                }]
            });
        });
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
    }

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

`;

    urls.forEach(url => {
        xml += `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>`;

        if (url.images && url.images.length > 0) {
            url.images.forEach(image => {
                xml += `
        <image:image>
            <image:loc>${image.loc}</image:loc>
            <image:title>${image.title}</image:title>
            ${image.caption ? `<image:caption>${image.caption}</image:caption>` : ''}
        </image:image>`;
            });
        }

        xml += `
    </url>

`;
    });

    xml += `</urlset>`;

    return xml;
}

// Helper function to generate proper product image URLs
function getProductImageUrl(product: Product): string {
    const baseImageUrl = 'https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images';
    
    // Extract category and color from product name
    const productName = product.naziv.toLowerCase();
    
    if (productName.includes('dolomite')) {
        if (productName.includes('white')) {
            return `${baseImageUrl}/Dolomite/White/Dolomite%20-%20White%20I%20-%20Kvadrat.jpg`;
        } else if (productName.includes('anthracite')) {
            return `${baseImageUrl}/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20I%20-%20Kvadrat.jpg`;
        }
    } else if (productName.includes('kamen')) {
        if (productName.includes('white')) {
            return `${baseImageUrl}/Kamen/White/Kamen%20-%20White%20-%20Kvadrat.jpg`;
        } else if (productName.includes('anthracite') || productName.includes('black')) {
            return `${baseImageUrl}/Kamen/Anthracite/Kamen%20-%20Anthracite%20-%20Kvadrat.jpg`;
        }
    } else if (productName.includes('cigla')) {
        if (productName.includes('white')) {
            return `${baseImageUrl}/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White%20-%20Kvadrat.jpg`;
        } else if (productName.includes('red')) {
            return `${baseImageUrl}/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red%20-%20Kvadrat.jpg`;
        }
    }
    
    // Default fallback image
    return `${baseImageUrl}/placeholder.jpg`;
}
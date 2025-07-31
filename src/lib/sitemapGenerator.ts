import { getAllLocationSlugs } from './locationData';

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

export function generateSitemap(): string {
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
export function saveSitemap(): void {
    const sitemapContent = generateSitemap();
    
    // In a real implementation, you would write this to the file system
    // For now, we'll just log it or return it
    console.log('Generated sitemap:', sitemapContent);
}
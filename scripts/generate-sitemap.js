#!/usr/bin/env node

/**
 * Script to generate sitemap.xml with dynamic product pages
 * Run this script during the build process to create an updated sitemap
 */

const fs = require('fs');
const path = require('path');

// Import the sitemap generator (needs to be compiled first)
async function generateDynamicSitemap() {
    try {
        console.log('🔄 Generating dynamic sitemap...');
        
        // Import the TypeScript module (assuming it's been compiled)
        const { generateSitemapWithImages } = require('../dist/lib/sitemapGenerator.js');
        
        // Generate the sitemap content
        const sitemapContent = await generateSitemapWithImages();
        
        // Write to public directory
        const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
        
        console.log('✅ Sitemap generated successfully at:', sitemapPath);
        console.log('📄 Sitemap contains dynamic product pages from database');
        
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        console.log('⚠️  Falling back to static sitemap');
        
        // Fallback: generate basic sitemap without dynamic products
        generateBasicSitemap();
    }
}

function generateBasicSitemap() {
    const currentDate = new Date().toISOString().split('T')[0];
    const baseUrl = 'https://kamenpro.net';
    
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                            http://www.google.com/schemas/sitemap-image/1.1
                            http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">

    <!-- Homepage -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <image:image>
            <image:loc>${baseUrl}/images/home/hero.png</image:loc>
            <image:title>KamenPro - Kamene obloge za enterijer i eksterijer</image:title>
        </image:image>
    </url>

    <!-- Main pages -->
    <url>
        <loc>${baseUrl}/o-nama</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>${baseUrl}/proizvodi</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>${baseUrl}/reference</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>${baseUrl}/kontakt</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Location pages -->
    <url>
        <loc>${baseUrl}/lokacije/bijeljina</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${baseUrl}/images/lokacije/bijeljina-og.jpg</image:loc>
            <image:title>Dekorativni kamen Bijeljina - KamenPro</image:title>
        </image:image>
    </url>

    <url>
        <loc>${baseUrl}/lokacije/brcko</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${baseUrl}/images/lokacije/brcko-og.jpg</image:loc>
            <image:title>Dekorativni kamen Brčko - KamenPro</image:title>
        </image:image>
    </url>

    <url>
        <loc>${baseUrl}/lokacije/tuzla</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${baseUrl}/images/lokacije/tuzla-og.jpg</image:loc>
            <image:title>Dekorativni kamen Tuzla - KamenPro</image:title>
        </image:image>
    </url>

</urlset>`;

    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, basicSitemap, 'utf8');
    
    console.log('✅ Basic sitemap generated successfully');
}

// Run the script
if (require.main === module) {
    generateDynamicSitemap();
}

module.exports = { generateDynamicSitemap, generateBasicSitemap };
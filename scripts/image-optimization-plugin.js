// scripts/image-optimization-plugin.js
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

/**
 * Vite plugin for automatic image optimization during build
 */
export function imageOptimizationPlugin(options = {}) {
    const {
        quality = 85,
        formats = ['webp', 'avif'],
        sizes = [400, 800, 1200, 1920],
        outputDir = 'dist/images',
        publicDir = 'public/images',
        skipExisting = true
    } = options;

    return {
        name: 'image-optimization',
        async buildStart() {
            console.log('🖼️  Starting image optimization...');
        },
        async generateBundle() {
            try {
                // Find all images in public directory
                const imagePatterns = [
                    `${publicDir}/**/*.{jpg,jpeg,png,webp}`,
                    'src/**/*.{jpg,jpeg,png,webp}'
                ];

                const allImages = [];
                for (const pattern of imagePatterns) {
                    const images = await glob(pattern);
                    allImages.push(...images);
                }

                console.log(`Found ${allImages.length} images to optimize`);

                // Create output directory
                await fs.mkdir(outputDir, { recursive: true });

                // Process each image
                for (const imagePath of allImages) {
                    await optimizeImage(imagePath, outputDir, {
                        quality,
                        formats,
                        sizes,
                        skipExisting
                    });
                }

                console.log('✅ Image optimization complete');
            } catch (error) {
                console.error('❌ Image optimization failed:', error);
            }
        }
    };
}

async function optimizeImage(inputPath, outputDir, options) {
    const { quality, formats, sizes, skipExisting } = options;
    const parsedPath = path.parse(inputPath);
    const relativePath = path.relative('public', inputPath).replace(/\\/g, '/');
    
    try {
        // Get image metadata
        const metadata = await sharp(inputPath).metadata();
        console.log(`Processing: ${relativePath} (${metadata.width}x${metadata.height})`);

        // Generate different sizes and formats
        for (const format of formats) {
            for (const size of sizes) {
                // Skip if image is smaller than target size
                if (metadata.width && metadata.width < size) continue;

                const outputName = `${parsedPath.name}-${size}w.${format}`;
                const outputPath = path.join(outputDir, path.dirname(relativePath), outputName);

                // Skip if file exists and skipExisting is true
                if (skipExisting) {
                    try {
                        await fs.access(outputPath);
                        continue; // File exists, skip
                    } catch {
                        // File doesn't exist, continue processing
                    }
                }

                // Create output directory
                await fs.mkdir(path.dirname(outputPath), { recursive: true });

                // Process image
                await sharp(inputPath)
                    .resize(size, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .toFormat(format, {
                        quality: format === 'png' ? 95 : quality,
                        progressive: format === 'jpeg',
                        effort: format === 'avif' ? 6 : undefined
                    })
                    .toFile(outputPath);

                console.log(`  ✓ Generated: ${outputName}`);
            }
        }

        // Also create optimized original format
        const originalFormat = metadata.format === 'jpeg' ? 'jpg' : metadata.format;
        const optimizedOriginalPath = path.join(
            outputDir, 
            path.dirname(relativePath), 
            `${parsedPath.name}-optimized.${originalFormat}`
        );

        if (!skipExisting || !(await fileExists(optimizedOriginalPath))) {
            await fs.mkdir(path.dirname(optimizedOriginalPath), { recursive: true });
            
            await sharp(inputPath)
                .toFormat(metadata.format, {
                    quality: originalFormat === 'png' ? 95 : quality,
                    progressive: originalFormat === 'jpeg'
                })
                .toFile(optimizedOriginalPath);

            console.log(`  ✓ Optimized original: ${parsedPath.name}-optimized.${originalFormat}`);
        }

    } catch (error) {
        console.error(`  ❌ Failed to process ${relativePath}:`, error.message);
    }
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

// Standalone function to run image optimization
export async function optimizeImages(options = {}) {
    const plugin = imageOptimizationPlugin(options);
    await plugin.generateBundle();
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
    const options = {
        quality: 85,
        formats: ['webp', 'avif'],
        sizes: [400, 800, 1200, 1920],
        outputDir: 'dist/images',
        publicDir: 'public/images'
    };

    optimizeImages(options).catch(console.error);
}
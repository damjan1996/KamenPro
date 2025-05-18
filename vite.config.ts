// src/vite.config.ts - with performance optimizations for SEO
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html',
    }) as Plugin,
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          injectHead: `
            <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link rel="preconnect" href="https://connect.facebook.net" crossorigin />
          `,
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'KamenPro',
        short_name: 'KamenPro',
        description: 'KamenPro - Kamene obloge za enterijer i eksterijer',
        theme_color: '#1c1917',
        background_color: '#ffffff',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }) as unknown as Plugin,
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: /\.(js|css|html|svg|json)$/i,
    }) as Plugin,
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }) as Plugin,
  ],
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },
  server: {
    // API-Proxy for development
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    cssCodeSplit: true,
    reportCompressedSize: true,
    assetsInlineLimit: 4096, // inline small assets as base64
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'form': ['react-hook-form', '@hookform/resolvers/zod'],
          'animation': ['framer-motion'],
          'ui': ['lucide-react', 'dompurify'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // enables imports like @/components/...
    },
  },
});
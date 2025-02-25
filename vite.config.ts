import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyze.html',
    }),
  ],
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'form': ['react-hook-form', '@hookform/resolvers/zod'],
          'animation': ['framer-motion'],
        },
      },
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline' data:;
        img-src 'self' data: blob: https://images.unsplash.com;
        font-src 'self' data: blob:;
        connect-src 'self' ws: wss: https://images.unsplash.com;
        worker-src 'self' blob:;
      `.replace(/\s+/g, ' ').trim(),
    },
  }
});
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
  server: {
    // API-Proxy for development - updated to use port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Changed from 3001 to 3000
        changeOrigin: true,
        secure: false,
      },
    },
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
  }
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

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
    {
      name: 'framer-motion-stub',
      resolveId(id) {
        if (id === 'framer-motion') {
          // Return a virtual module id
          return 'virtual:framer-motion';
        }
        return null;
      },
      load(id) {
        if (id === 'virtual:framer-motion') {
          // Return stub implementation
          return `
            export const motion = new Proxy({}, {
              get: (_, prop) => {
                return prop === 'div' ? ((props) => {
                  const { children, ...rest } = props;
                  return { tag: 'div', props: rest, children };
                }) : new Proxy({}, {
                  get: () => () => ({})
                });
              }
            });
            
            export const AnimatePresence = ({ children }) => children;
            export const useAnimation = () => ({
              start: () => Promise.resolve(),
              stop: () => {},
            });
            
            export default {
              motion,
              AnimatePresence,
              useAnimation,
            };
          `;
        }
        return null;
      }
    }
  ],
  optimizeDeps: {
    include: ['lucide-react'],
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      'framer-motion': resolve(__dirname, './src/shims/framer-motion.ts'),
    },
  },
});
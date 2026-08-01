import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/react-router') ||
              id.includes('/react-router-dom/')
            ) {
              return 'vendor-react';
            }
            if (
              id.includes('/framer-motion/') ||
              id.includes('/gsap/') ||
              id.includes('/lenis/')
            ) {
              return 'vendor-animations';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            if (
              id.includes('/three/') ||
              id.includes('/@react-three/')
            ) {
              return 'vendor-three';
            }
            if (id.includes('/@dnd-kit/')) {
              return 'vendor-dnd';
            }
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
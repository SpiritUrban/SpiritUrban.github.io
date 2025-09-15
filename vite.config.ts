import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',  // Changed from '/' to './' for better compatibility with GitHub Pages
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Keep assets in their respective directories
          const name = assetInfo.name || '';
          const info = name.split('.');
          const ext = info[info.length - 1] || '';
          if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext.toLowerCase())) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

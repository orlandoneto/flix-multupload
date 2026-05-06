import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo correto baseado no modo
  const env = loadEnv(mode, process.cwd(), '');

  // Remove console.log em produção
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    base: mode === 'production' ? './' : '/',
    server: {
      watch: {
        usePolling: true,
      },
      port: 3000,
      host: true,
    },
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: !isProduction, // Desabilita em produção
                ssr: false,
                preprocess: false,
                pure: true,
              },
            ],
          ],
        },
      }),
      tsconfigPaths()
    ],
    publicDir: "public",
    build: {
      chunkSizeWarningLimit: 2000,
      // Configurações específicas para desenvolvimento
      ...(isDevelopment && {
        minify: false, // Não minifica em desenvolvimento
        sourcemap: true, // Gera sourcemaps para debug
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': [
                'react',
                'react-dom',
                'styled-components',
                'react-router-dom',
                'react-helmet-async',
                'react-toastify',
                '@emotion/react',
                '@emotion/styled'
              ],
            },
            // Usa hash nos nomes para evitar cache no build:dev
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
            assetFileNames: (assetInfo) => {
              if (!assetInfo.name) return 'assets/[name].[hash][extname]';

              if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
                return 'assets/images/[name].[hash][extname]';
              }
              if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
                return 'assets/fonts/[name].[hash][extname]';
              }
              if (/\.(css)$/.test(assetInfo.name)) {
                return 'assets/css/[name].[hash][extname]';
              }
              return 'assets/[name].[hash][extname]';
            },
          },
        },
      }),
      // Configurações para produção
      ...(isProduction && {
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'styled-components': ['styled-components'],
              'vendor': [
                'react-router-dom',
                'react-helmet-async',
                'react-toastify',
                '@emotion/react',
                '@emotion/styled'
              ],
            },
            assetFileNames: (assetInfo) => {
              if (!assetInfo.name) return 'assets/[name].[hash][extname]';

              if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
                return 'assets/images/[name].[hash][extname]';
              }
              if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
                return 'assets/fonts/[name].[hash][extname]';
              }
              if (/\.(css)$/.test(assetInfo.name)) {
                return 'assets/css/[name].[hash][extname]';
              }
              return 'assets/[name].[hash][extname]';
            },
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
          },
        },
      }),
    },
    optimizeDeps: {
      include: [
        'styled-components',
        'react',
        'react-dom',
        '@emotion/react',
        '@emotion/styled'
      ],
      esbuildOptions: {
        target: 'es2020',
        // Remove console.logs em produção
        ...(isProduction && {
          drop: ['console', 'debugger'],
        }),
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'styled-components'],
    },
    define: {
      'process.env': {
        ...env,
        VITE_ENV: env.VITE_ENV || mode
      }
    },
  };
});

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
//@ts-ignore
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import eslint from 'vite-plugin-eslint'
// https://vitejs.dev/config https://vitest.dev/config
delete process.env['CommonProgramFiles(x86)']
delete process.env['ProgramFiles(x86)']
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      eslint(),
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
      nodePolyfills(),
    ],
    define: {
      ...Object.keys(env).reduce((prev, next) => {
        //@ts-ignore
        prev[`process.env.${next}`] = JSON.stringify(env[next])
        return prev
      }, {}),
    },
    build: {
      outDir: 'build',
      target: 'esnext',
      chunkSizeWarningLimit: 100,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: any) => {
            let extType = assetInfo.name.split('.').at(1)
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img'
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
    base: '/',
  }
})

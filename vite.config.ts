// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/zama_bounty/',
//   optimizeDeps: {
//     esbuildOptions: {
//       // Node.js global to browser globalThis
//       define: {
//         global: 'globalThis'
//       },
//       // Enable esbuild polyfill plugins
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true, 
//           process: true,
//         }), 
//         NodeModulesPolyfillPlugin() 
//       ]
//     }
//   }, 
  
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/zama_bounty/',
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // No need for Buffer polyfill plugin
    }
  }, 
  
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: env.VITE_APP_BASE_URL || '/',
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis'
//       },
//     }
//   }, 
  
// })

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_APP_BASE_URL || '/',
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
  };
});


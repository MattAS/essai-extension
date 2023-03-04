import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import * as dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      API_ROUTE:
        process.env.NODE_ENV === 'development'
          ? process.env.API_DEV
          : process.env.API_PROD,
    },
  },
  plugins: [react(), crx({ manifest })],
})

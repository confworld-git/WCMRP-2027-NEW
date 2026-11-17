import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: { noExternal: ["swiper", "react-helmet-async"] },
})

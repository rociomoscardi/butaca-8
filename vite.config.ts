import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      // Solo el sitio público. curacion.html es una herramienta local:
      // se usa con `npm run dev` (localhost:5173/curacion.html) y no va a dist/.
      input: 'index.html',
    },
  },
})

// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY,
      googleSearchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
      baseURL: 'http://localhost:3001' // ここでbaseURLを定義
    }
  },
  plugins: [
    '~/plugins/axios.ts',
  ]
})

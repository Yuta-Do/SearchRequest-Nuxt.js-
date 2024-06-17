// plugins/axios.ts
import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: nuxtApp.$config.public.baseURL // baseURLをruntimeConfigから取得
  })

  // エラーハンドリング
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 500) {
        nuxtApp.vueApp.config.globalProperties.$router.push('/sorry')
      }
      return Promise.reject(error)
    }
  )

  // axiosインスタンスをnuxtAppに追加
  nuxtApp.vueApp.config.globalProperties.$axios = instance
  return {
    provide: {
      axios: instance
    }
  }
})

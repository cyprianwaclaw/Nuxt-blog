// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', 'nuxt-icon', '@nuxt/image', 'nuxt-lazy-load'],
supabase: {
  redirect: false,
},
lazyLoad: {
  // These are the default values
  images: true,
  videos: true,
  audios: true,
  iframes: true,
  native: false,
  directiveOnly: false,

  // To remove class set value to false
  loadingClass: 'isLoading',
  loadedClass: 'isLoaded',
  appendClass: 'lazyLoad',
  
  observerConfig: {
    // See IntersectionObserver documentation
  }
},
css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss', '@/assets/style/_variables.scss'],
})
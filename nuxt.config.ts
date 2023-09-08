// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', 'nuxt-icon', '@nuxt/image'],
supabase: {
  redirect: false,
},
css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss', '@/assets/style/_variables.scss'],
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/A.EYE Logo.ico" },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-thin.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css",
        },
        {
          rel: "stylesheet",
          href: "https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css",
        },
      ],
    },
  },
  css: [
    "normalize.css",
    "bootstrap/dist/css/bootstrap.min.css",
    'animate.css',
    'vue3-toastify/dist/index.css',
    "~/assets/css/main.scss",
  ],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],
  pinia: {
    storesDirs: ["store/**"],
  },
  imports: {
    dirs: ["store"],
  },
  googleFonts: {
    families: {
      Inter: "100..800",
    },
  },
});

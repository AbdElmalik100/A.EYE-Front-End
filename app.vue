<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Loading v-if="loading"></Loading>
    <Tour :showTour="store.globalTour" @close-tour="() => store.globalTour = false"></Tour>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - A.EYE` : 'A.EYE';
  }
})
const store = useStore()
const loading = ref(false)

onNuxtReady(() => {
  if (!localStorage.getItem("tour")) store.globalTour = true
  if (store.isAuthenticated()) {
    store.getLoggedInUser(loading)
  }
})

</script>

<template>
    <HeaderComp></HeaderComp>
    <div class="error-404 min-vh-100 text-center py-5" v-if="error.statusCode === 404">
        <div class="container d-grid min-vh-100" style="place-items: center;">
            <div>
                <img class="img-fluid" width="400" src="assets/images/error-404.png" alt="">
                <h2 class="mt-4 fw-semibold">Page not found</h2>
                <p class="text-black-50 w-75 mx-auto">
                    The page you are looking for might be removed or unavailable in the current time.
                </p>
                <NuxtLink class="main-btn mt-4 d-block mx-auto" to="/">Back home</NuxtLink>
            </div>
        </div>
    </div>
    <div class="error-500 min-vh-100 text-center py-5" v-else>
        <div class="container d-grid min-vh-100 " style="place-items: center;">
            <div>
                <img class="img-fluid" width="400" src="assets/images/error-500.png" alt="">
                <p class="fs-4 mt-4">
                    Something went wrong with the server, we will fix it as soon as possible.
                </p>
            </div>
        </div>
    </div>
    <FooterComp></FooterComp>
</template>

<script setup>
defineProps(['error'])
</script>

<style lang="scss" scoped>
a {
    width: fit-content;
}

.error-404 {
    h2 {
        color: var(--second-color);
    }
}

.error-500 {
    p {
        color: var(--second-color);
    }
}
</style>
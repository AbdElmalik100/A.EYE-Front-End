<template>
    <header class="py-3">
        <div class="container d-flex align-items-center gap-3 justify-content-between">
            <NuxtLink to="/">
                <img class="logo img-fluid" width="175" src="assets/images/A.EYE-Transparent.png" alt="">
            </NuxtLink>
            <MobileMenu v-if="store.user === null"></MobileMenu>
            <ul class="links d-flex align-items-center gap-3" v-if="store.user === null">
                <li>
                    <NuxtLink to="/about" class="about text-uppercase">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="about text-uppercase me-3">Contact</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login" class="second-btn">Login</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/signup" class="main-btn">Sign up</NuxtLink>
                </li>
            </ul>
            <UserProfile v-else></UserProfile>
        </div>
    </header>
</template>

<script setup>
const store = useStore()


</script>

<style lang="scss" scoped>
header {
    background-color: var(--white-color);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.250);

    @media (max-width: 767px) {
        .links {
            display: none !important;
        }

        .logo {
            width: 150px;
        }
    }
}
</style>
<template>
    <div class="mobile-menu">
        <i class="fa-light fa-bars fs-1 menu" @click="openMenu = true"></i>
        <div class="overlay" :class="openMenu ? 'active' : ''">
            <ul class="links d-flex flex-column align-items-center justify-content-between p-4 position-fixed"
                ref="menu">
                <div class="text-end w-100">
                    <i class="fa-solid fa-x fs-2 close" @click="openMenu = false"></i>
                </div>
                <div class="text-center m-auto">
                    <li>
                        <NuxtLink to="/about" class="fs-2 mb-3 d-block text-uppercase" @click="openMenu = false">About</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contact" class="fs-2 text-uppercase" @click="openMenu = false">Contact</NuxtLink>
                    </li>
                </div>
                <div class="auth d-flex align-items-center gap-2 w-100" v-if="store.user === null">
                    <NuxtLink to="/login" class="second-btn w-100 d-block" @click="openMenu = false">Login</NuxtLink>
                    <NuxtLink to="/signup" class="main-btn w-100 d-block" @click="openMenu = false">Sign up</NuxtLink>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const store = useStore()
const openMenu = ref(false)
const menu = ref(null)

onClickOutside(menu, event => {
    openMenu.value = false
})

</script>

<style lang="scss" scoped>
.mobile-menu {
    display: none;

    .overlay {
        opacity: 0;
        z-index: -1;
        transition: 0.2s;
        visibility: hidden;

        .menu {
            color: var(--second-color);
        }

        .links {
            transition: 0.2s;
            right: -50%;
            height: 100%;
            width: 70%;
            background-color: var(--white-color);
        }

        &.active {
            opacity: 1;
            z-index: 55;
            visibility: visible;
            .links {
                right: 0;
            }
        }
    }

    @media (max-width: 767px) {
        display: block;
    }
}
</style>
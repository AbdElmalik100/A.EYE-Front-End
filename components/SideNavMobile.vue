<template>
    <div class="side-nav-mobile d-none position-absolute" :style="openMenu ? 'z-index: 5;' : ''" ref="menu" v-if="store.user !== null">
        <div class="nav-container p-2 px-3 rounded-2 d-flex align-items-center gap-3 justify-content-between"
            @click="openMenu = !openMenu">
            <span class="text-capitalize fw-semibold d-flex align-items-center gap-2"
                v-if="$route.name.includes('account')">
                <i class="fa-solid fa-user fs-6"></i>
                account
            </span>
            <span class="text-capitalize fw-semibold d-flex align-items-center gap-2" v-else>
                <i class="fa-solid fa-clock-rotate-left fs-6"></i>
                history
            </span>
            <i :class="`fa-solid fa-chevron-${openMenu ? 'up' : 'down'} fs-5`"></i>
        </div>
        <ul class="menu p-2 px-2 rounded-2 mt-2 position-relative" :class="openMenu ? 'active' : ''">
            <li>
                <NuxtLink :to="`/account/${store.user.username}`" @click="openMenu = false">
                    <i class="fa-solid fa-user fs-6"></i>
                    Account
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/history/${store.user.type === 'patient' ? `patient/${store.user.username}` : `doctor/${store.user.username}` }`" @click="openMenu = false">
                    <i class="fa-solid fa-clock-rotate-left fs-6"></i>
                    History
                </NuxtLink>
            </li>
            <li class="mt-auto">
                <button class="w-100 text-start text-danger" @click="logout()">
                    <i class="fa-solid fa-right-from-bracket fs-6"></i>
                    Logout
                </button>
            </li>
        </ul>
    </div>
    <Loading v-if="loading"></Loading>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
const store = useStore()

const openMenu = ref(false)
const menu = ref(null)
const loading = ref(false)

const logout = () => {
    store.logout(loading)
}

onClickOutside(menu, event => {
    openMenu.value = false
})


</script>

<style lang="scss" scoped>
.side-nav-mobile {
    top: 95px;
    width: calc(100% - 35px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    .nav-container {
        background-color: var(--white-color);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.100);
        cursor: pointer;
    }

    .menu {
        background-color: var(--white-color);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.100);
        transition: 0.2s;
        transform: translateY(-8px);
        opacity: 0;
        visibility: hidden;
        
        &.active {
            transform: translateY(0px);
            opacity: 1;
            visibility: visible;
        }

        li {

            a,
            button {
                width: 100%;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
        }
    }

    @media (max-width: 767px) {
        display: block !important;
    }
}
</style>
<template>
    <MobileMenu class="ms-auto"></MobileMenu>
    <div class="user-profile position-relative d-flex align-items-center gap-3" ref="profileMenu">
        <div class="links d-md-block d-none">
            <NuxtLink to="/about" class="about position-relative text-uppercase me-3">About</NuxtLink>
            <NuxtLink to="/contact" class="about position-relative text-uppercase">Contact</NuxtLink>
        </div>
        <div class="user-cont d-flex align-items-center gap-2" @click="openMenu = !openMenu">
            <i v-if="store.user.avatar === null" class="fa-solid fa-circle-user fs-1 user-img"></i>
            <img v-else class="rounded-circle img-fluid object-fit-cover" :src="store.user.avatar" alt=""
                style="width: 50px; height: 50px;">
            <div class="info">
                <span class="name d-block fw-bold fs-6">
                    {{ store.user.first_name }}
                </span>
                <span class="username">
                    @{{ store.user.username }}
                </span>
                <span class="type badge text-uppercase ms-2 d-inline">
                    {{ store.user.type }}
                </span>
            </div>
            <i class="fa-solid fa-chevron-down fs-6 ms-md-4 ms-0"></i>
        </div>
        <ul class="menu position-absolute d-flex flex-column align-items-center py-2 rounded-2"
            :class="openMenu ? 'active' : ''">
            <div class="mobile-info d-none w-100 p-2 px-3 mb-2 position-relative">
                <span class="name d-block fw-bold fs-6">
                    {{ store.user.first_name }}
                </span>
                <span class="username">
                    @{{ store.user.username }}
                </span>
                <span class="type badge text-uppercase d-block position-absolute" style="right: 10px; top: 0px;">
                    {{ store.user.type }}
                </span>
            </div>
            <li>
                <NuxtLink :to="`/account/${store.user.username}`" class="d-flex align-items-center gap-3"
                    @click="openMenu = false">
                    <i class="fa-solid fa-user fs-6"></i>
                    Account
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/history/${store.user.type === 'patient' ? `patient/${store.user.username}` : `doctor/${store.user.username}` }`" class="d-flex align-items-center gap-3"
                    @click="openMenu = false">
                    <i class="fa-solid fa-clock-rotate-left fs-6"></i>
                    History
                </NuxtLink>
            </li>
            <li class="logout">
                <button class="d-flex align-items-center gap-3 w-100" @click="logout()">
                    <i class="fa-solid fa-right-from-bracket fs-6"></i>
                    Logout
                </button>
            </li>
        </ul>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
const store = useStore()

const loading = ref(false)
const openMenu = ref(false)
const profileMenu = ref(null)


const logout = () => {
    store.logout(loading)
}


onClickOutside(profileMenu, (event) => {
    openMenu.value = false
})

</script>

<style lang="scss" scoped>
.user-profile {
    z-index: 6;

    .user-cont {
        cursor: pointer;

        .user-img {
            color: var(--main-color);
        }
    }

    .info {
        .name {
            color: var(--second-color);
        }

        .username {
            color: var(--light-grey-color);
        }
    }

    .info,
    .mobile-info {
        .type {
            color: var(--white-color);
            background-color: var(--second-color);
        }
    }

    .menu {
        background-color: var(--white-color);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.250);
        width: 225px;
        right: 0;
        visibility: hidden;
        opacity: 0;
        top: 20px;
        transition: 0.2s;
        z-index: -5;

        &.active {
            z-index: 5;
            visibility: visible;
            top: 60px;
            opacity: 1;
        }

        li {
            width: 100%;
            transition: 0.2s;
            cursor: pointer;

            a,
            button {
                padding: 10px 30px;
            }

            &:hover {
                background-color: var(--very-light-grey-color);

                a {
                    color: var(--second-color);
                }

                &.logout {
                    background-color: #ffc1c1;

                    button {
                        color: #d83e3e;
                    }
                }
            }

            &:not(:last-child) {
                border-bottom: 1px solid var(--grey-color);
            }

            a,
            button {
                color: var(--dark-grey-color);
                font-weight: 500 !important;
            }
        }
    }

    @media (max-width: 767px) {
        .info {
            display: none;
        }

        .mobile-info {
            display: block !important;
            border-bottom: 1px solid var(--light-grey-color);

            .name {
                color: var(--second-color);
            }

            .username {
                color: var(--dark-grey-color);
            }
        }
    }
}
</style>
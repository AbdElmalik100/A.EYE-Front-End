<template>
    <HeaderComp class="position-fixed w-100" style="z-index: 3;"></HeaderComp>
    <SideNavMobile></SideNavMobile>
    <div class="side-nav p-3 pt-4 position-fixed" v-if="store.user !== null">
        <ul class="d-flex align-items-start flex-column gap-2 h-100">
            <li>
                <NuxtLink :to="`/account/${store.user.username}`">
                    <i class="fa-solid fa-user fs-6"></i>
                    Account
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/history/${store.user.type === 'patient' ? `patient/${store.user.username}` : `doctor/${store.user.username}/${$route.params.id || ''}` }`">
                    <i class="fa-solid fa-clock-rotate-left fs-6"></i>
                    History
                </NuxtLink>
            </li>
            <li class="mt-auto">
                <button class="w-100" @click="logout()">
                    <i class="fa-solid fa-right-from-bracket fs-6"></i>
                    Logout
                </button>
            </li>
        </ul>
    </div>
    <Loading v-if="loading"></Loading>
</template>

<script setup>

const store = useStore()
const loading = ref(false)

const logout = () => {
    store.logout(loading)
}
</script>

<style lang="scss" scoped>
.side-nav {
    background-color: var(--white-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.250);
    top: 91px;
    left: 0;
    width: 250px;
    height: calc(100% - 91px);

    li {
        width: 100%;

        a,
        button {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            transition: 0.2s;
            border-radius: 5px;
            font-weight: 500;

            &:hover,
            &.router-link-active {
                background-color: var(--main-color);
                color: var(--white-color);
            }
        }
    }

    @media (max-width: 767px) {
        display: none;
    }
}
</style>
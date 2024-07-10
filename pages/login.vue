<template>
    <div class="login-page min-vh-100">
        <div class="container py-5 min-vh-100">
            <form class="login-form p-4 py-5 rounded-2 text-center" @submit.prevent="userLogin">
                <h1 class="fw-bold mb-5 fs-2">Login to your account</h1>
                <label class="w-100">
                    <div class="input-cont position-relative">
                        <input type="email" placeholder="Email address" class="w-100 pe-5" maxlength="50"
                            v-model="loginForm.email">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <span class="fst-italic text-danger d-block mt-1 text-start" v-if="errors"
                        v-for="(item, index) in errors.email" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="mt-3 w-100">
                    <div class="input-cont position-relative">
                        <input type="password" placeholder="Password" class="w-100 pe-5" maxlength="50"
                            v-model="loginForm.password">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <span class="fst-italic text-danger d-block mt-1 text-start" v-if="errors"
                        v-for="(item, index) in errors.password" :key="index">
                        {{ item }}
                    </span>
                </label>
                <div class="forget-pass text-end mt-3">
                    <NuxtLink to="/reset-password" class="fw-bold">Forget password?</NuxtLink>
                </div>
                <button class="main-btn w-100 mt-4 fw-bold">
                    <span>Login</span>
                </button>
                <p class="mt-4 fw-semibold">
                    Don't have an account?
                    <NuxtLink to="/signup" class="d-md-inline d-block">Create an account</NuxtLink>
                </p>
            </form>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
useHead({
    title: "Login"
})
const store = useStore()
const loading = ref(false)
const errors = ref({})
const loginForm = ref({
    email: '',
    password: '',
})

const userLogin = () => {
    store.login(loginForm, errors, loading)
}


</script>

<style lang="scss" scoped>
.login-page {
    .container {
        display: grid;
        place-items: center;
    }

    .login-form {
        width: 475px;
        background-color: var(--white-color);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        label {
            i {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
                color: var(--light-grey-color);
                font-size: 20px;
            }
        }

        .forget-pass {
            a {
                text-decoration: underline;
                &:hover {
                    text-decoration: none;
                }
            }
        }

        p {
            color: var(--second-color);

            a {
                color: var(--main-color);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .custom-alert {
        right: -375px;
        top: 25px;
        background-color: var(--white-color);
        border-right: 6px solid var(--main-color);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.250);
        transition: 0.2s;

        &.active {
            right: 15px;
        }
    }

    @media (max-width: 767px) {
        .login-form {
            width: 100%;
        }
    }
}
</style>
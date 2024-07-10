<template>
    <div class="login-page min-vh-100">
        <div class="container py-5 min-vh-100">
            <form class="signup-form p-4 py-5 rounded-2 text-center">
                <h1 class="fw-bold mb-5 fs-2">Create an account</h1>
                <div class="type py-3 d-flex align-items-center gap-3">
                    <div class="w-100">
                        <input id="patient" class="d-none" type="radio" name="type" value="patient"
                            v-model="signupForm.type">
                        <label for="patient"
                            class="box p-3 py-5 rounded-2 d-flex flex-column gap-2 align-items-center w-100">
                            <i class="fa-solid fa-users-medical fs-1"></i>
                            <span class="fw-bold">Patient</span>
                        </label>
                    </div>
                    <div class="w-100">
                        <input id="doctor" class="d-none" type="radio" name="type" value="doctor" v-model="signupForm.type">
                        <label for="doctor"
                            class="box p-3 py-5 rounded-2 d-flex flex-column gap-2 align-items-center w-100">
                            <i class="fa-solid fa-user-doctor fs-1"></i>
                            <span class="fw-bold">Doctor</span>
                        </label>
                    </div>
                </div>
                <label class="position-relative w-100">
                    <input type="text" placeholder="First Name" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.first_name">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.first_name" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="position-relative mt-3 w-100">
                    <input type="text" placeholder="Last Name" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.last_name">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.last_name" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="position-relative mt-3 w-100">
                    <input type="text" placeholder="Username" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.username">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.username" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="position-relative mt-3 w-100">
                    <input type="email" placeholder="Email address" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.email">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.email" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="position-relative mt-3 w-100">
                    <input type="password" placeholder="Password" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.password">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.password || errors.non_field_errors" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="position-relative mt-3 w-100">
                    <input type="password" placeholder="Confirm Password" class="w-100 pe-5" maxlength="50"
                        v-model="signupForm.re_password">
                    <span class="d-block mt-1 text-danger fst-italic text-start" v-if="errors"
                        v-for="(item, index) in errors.re_password || errors.non_field_errors" :key="index">
                        {{ item }}
                    </span>
                </label>
                <button class="main-btn w-100 mt-4 fw-bold" @click.prevent="createAccount">Sign up</button>
                <p class="mt-4 fw-semibold">
                    Already have an account?
                    <NuxtLink to="/login" class="d-md-inline d-block">Login</NuxtLink>
                </p>
            </form>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>

<script setup>
useHead({
    title: 'Sign up'
})
const config = useRuntimeConfig()
const { $axios } = useNuxtApp()
const store = useStore()

const loading = ref(false)
const errors = ref({})
const signupForm = ref({
    type: 'patient',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    re_password: '',
})



const createAccount = () => {
    store.signup(signupForm,errors, loading)
}

</script>

<style lang="scss" scoped>
.login-page {
    .container {
        display: grid;
        place-items: center;
    }

    .signup-form {
        width: 475px;
        background-color: var(--white-color);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        .type {
            input:checked+label {
                background-color: var(--main-color);
                color: var(--white-color);
            }

            label {
                border: 1px solid var(--main-color);
                transition: 0.2s;
                cursor: pointer;
            }
        }

        label {
            i.icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
                color: var(--light-grey-color);
                font-size: 20px;
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

    @media (max-width: 767px) {
        .signup-form {
            width: 100%;
        }
    }
}
</style>
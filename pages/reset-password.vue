<template>
    <div class="reset-password min-vh-100">
        <div class="container py-5 min-vh-100">
            <form class="reset-form p-4 py-5 rounded-2 text-center" @submit.prevent="sendEmail">
                <h1 class="fw-bold mb-5 fs-2">Reset Password</h1>
                <label class="w-100">
                    <div class="input-cont position-relative">
                        <input type="email" placeholder="Email address" class="w-100 pe-5" maxlength="50"
                            v-model="resetPassForm.email">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <span class="fst-italic text-danger d-block mt-1 text-start" v-if="errors"
                        v-for="(item, index) in errors.email" :key="index">
                        {{ item }}
                    </span>
                </label>
                <button class="main-btn w-100 mt-4 fw-bold">Send</button>
                <p class="mt-4 fw-semibold">
                    Don't have an account?
                    <NuxtLink to="/signup" class="d-md-inline d-block">Create an account</NuxtLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Reset Password"
})
const resetPassForm = ref({
    email: ''
})


const sendEmail = () => {
    console.log("email sent!");
}

</script>

<style lang="scss" scoped>
.reset-password {
    .container {
        display: grid;
        place-items: center;
    }

    .reset-form {
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

    @media (max-width: 767px) {
        .reset-form {
            width: 100% !important;
        }
    }
}
</style>
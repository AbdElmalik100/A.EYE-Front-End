<template>
    <div class="contact-page d-flex min-vh-100 flex-md-row flex-column">
        <div class="left-side w-100 p-3">
            <div class="inner p-5 text-center rounded-4">
                <div class="info">
                    <img src="assets/images/contact-information.png" class="img-fluid mb-5" width="175" height="175"
                        alt="">
                    <h1 class="text-light text-uppercase fw-bold">
                        We always got your back.
                    </h1>
                    <p class="text-light fs-5">
                        If any issues, Please contact us and we will respond as fast as we can within 24H. Your time is
                        important to us.
                    </p>
                </div>
            </div>
        </div>
        <div class="right-side w-100 d-grid py-5">
            <form class="w-75">
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">Full Name:</span>
                    <input type="text" class="w-100" placeholder="e.g. John Doe" v-model="contactForm.full_name">
                    <span class="d-block mt-1 fst-italic text-danger" v-if="errors"
                        v-for="(item, index) in errors.full_name" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="w-100 mt-3">
                    <span class="d-block mb-1 fw-semibold">Email Address:</span>
                    <input type="email" class="w-100" placeholder="e.g. johndoe100@gmail.com"
                        v-model="contactForm.email">
                    <span class="d-block mt-1 fst-italic text-danger" v-if="errors"
                        v-for="(item, index) in errors.email" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="w-100 mt-3">
                    <span class="d-block mb-1 fw-semibold">Phone Number:</span>
                    <input type="tel" class="w-100" placeholder="e.g. +2001011308220"
                        v-model="contactForm.phone_number">
                    <span class="d-block mt-1 fst-italic text-danger" v-if="errors"
                        v-for="(item, index) in errors.phone_number" :key="index">
                        {{ item }}
                    </span>
                </label>
                <label class="w-100 mt-3">
                    <span class="d-block mb-1 fw-semibold">Message:</span>
                    <textarea cols="30" rows="10" class="w-100" placeholder="Write down your issues"
                        v-model="contactForm.message"></textarea>
                    <span class="d-block mt-1 fst-italic text-danger" v-if="errors"
                        v-for="(item, index) in errors.message" :key="index">
                        {{ item }}
                    </span>
                </label>
                <button class="main-btn w-100 mt-3" @click.prevent="sendIssue">Send Meesage</button>
            </form>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
import Loading from './../components/Loading.vue'
import { toast } from 'vue3-toastify'
const { $axios } = useNuxtApp()

const contactForm = ref({
    full_name: '',
    email: '',
    phone_number: '',
    message: '',
})
const errors = ref({})
const loading = ref(false)

const sendIssue = async () => {
    loading.value = true
    await $axios.post('api/contact/', contactForm.value)
        .then(response => {
            toast("Your message has been sent!", {
                "theme": "light",
                "type": "success",
                "multiple": false,
                // "hideProgressBar": true,
                "transition": "bounce",
                "dangerouslyHTMLString": true,
            })
            contactForm.value = {
                full_name: '',
                email: '',
                phone_number: '',
                message: '',
            }
            errors.value = {}
        }).catch(error => {
            errors.value = error.response.data
        }).finally(() => {
            loading.value = false
        })
}


</script>

<style lang="scss" scoped>
.contact-page {
    .left-side {
        .inner {
            display: grid;
            place-items: center;
            position: relative;
            background-image: linear-gradient(0deg, var(--main-color), var(--second-color));
            height: 100%;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-image: url("/assets/images/contact-patterns.jpg");
                background-size: cover;
                border-radius: 16px;
                opacity: 0.09;
                filter: invert(1);
            }

            &>* {
                position: relative;
                z-index: 5;
            }
        }
    }

    .right-side {
        place-items: center;
    }

    @media (max-width: 767px) {
        .left-side {
            .inner {
                padding: 50px 25px !important;

                img {
                    width: 150px;
                    height: 150px;
                }

                p {
                    font-size: 16px !important;
                }
            }
        }
    }
}
</style>
<template>
    <div class="home-page min-vh-100">
        <div class="container py-5 mb-5">
            <div class="banner p-5 rounded-4 mb-5 d-flex align-items-center gap-5 flex-md-row flex-column">
                <div class="left-side w-75 position-relative">
                    <h1 class="fw-bold text-capitalize">
                        next gen A.I in the medical field
                    </h1>
                    <p class="mt-3">
                        The future is on your hands, diagnose fastly as the speed of the light, feel the power of A.I in
                        the medical field and opthalmology and check your condition. Before you begin take a tour to
                        understand how our A.I web application tool works. Hope you get well soon.
                    </p>
                    <div class="d-flex align-items-center gap-2 flex-md-row flex-column mt-5">
                        <button class="third-btn rounded-pill d-flex align-items-center gap-2 text-uppercase"
                            @click="showTour = true">
                            <span>Show Tour</span>
                            <i class="fa-solid fa-rocket-launch"></i>
                        </button>
                        <NuxtLink to="/contact"
                            class="third-outlined-btn rounded-pill d-flex align-items-center gap-2 text-uppercase">
                            <span>Support</span>
                            <i class="fa-solid fa-circle-question"></i>
                        </NuxtLink>
                    </div>
                </div>
                <div class="right-side w-50 position-relative"></div>
                <Tour :showTour="showTour" @close-tour="() => showTour = false"></Tour>
            </div>
            <div class="upload-image w-100 mx-auto">
                <label v-if="!loading && store.patientDetectionResults === null"
                    class="px-2 py-5 w-100 text-center rounded-1 upload-holder"
                    @click="store.user === null ? navigateTo({ name: 'login' }) : ''"
                    @dragover.prevent="handleDragOver($event)" @dragleave.prevent="handleDragLeave($event)"
                    @drop.prevent="handleDrop($event)">
                    <input v-if="store.user !== null" class="d-none" type="file"
                        accept="image/png, image/jpeg, image/jpg" @change="OCTDetection($event)">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <div class="info mt-4">
                        <h3 class="fw-bold fs-4">
                            Drag & drop your OCT image, or
                            <span>browse</span>
                        </h3>
                        <span class="d-block">
                            Accept only JPEG, JPG and PNG, Max size (1 MB)
                        </span>
                    </div>
                </label>
                <AILoading v-if="loading"></AILoading>
                <div class="detection-result py-5 mb-5 px-5 rounded-2" v-if="store.patientDetectionResults !== null">
                    <div class="close text-end mb-5">
                        <i class="fa-solid fa-x fs-4" title="Close the results" @click=closeResults></i>
                    </div>
                    <div class="image-comparison d-flex align-items-center justify-content-evenly gap-5">
                        <div class="normal text-center">
                            <img src="assets/images/Normal.png" class="img-fluid" width="150" height="150" alt="">
                            <span class="d-block mt-3 fw-bold fs-4">
                                Normal image of OCT
                            </span>
                        </div>
                        <div class="user-result text-center">
                            <img :src="store.patientDetectionResults.image" class="img-fluid rounded-2" width="150"
                                height="150" alt="">
                            <span class="d-block mt-3 fw-bold fs-4">
                                {{ store.patientDetectionResults.result }}
                            </span>
                        </div>
                    </div>
                    <div class="english-description">
                        <p class="mt-5 fs-5 fw-semibold description">
                            {{ store.patientDetectionResults.description }}
                        </p>
                        <div class="points d-flex flex-column gap-4 mt-4 ps-5">
                            <span class="fw-semibold fs-5 d-flex gap-3"
                                v-for="(item, index) in store.patientDetectionResults.points.split('_')" :key="index">
                                <i class="fa-solid fa-angles-right mt-2"></i>
                                {{ item }}
                            </span>
                        </div>
                    </div>
                    <div class="arabic-description mt-5" dir="rtl">
                        <p class="mt-5 fs-5 fw-semibold description">
                            {{ store.patientDetectionResults.description_arabic }}
                        </p>
                        <div class="points d-flex flex-column gap-4 mt-4 ps-5">
                            <span class="fw-semibold fs-5 d-flex gap-3"
                                v-for="(item, index) in store.patientDetectionResults.points_arabic.split('_')" :key="index">
                                <i class="fa-solid fa-angles-left mt-2"></i>
                                {{ item }}
                            </span>
                        </div>
                    </div>
                    <span class="d-block text-end text-muted fst-italic mt-4">
                        {{ new Date(store.patientDetectionResults.created_at).toUTCString() }}
                    </span>
                    <div class="w-100 mt-4" v-if="store.user.type === 'doctor'">
                        <button class="main-btn ms-auto d-block fw-bold" @click="openPopup = true">Save to</button>
                    </div>
                    <PatientsPopup v-if="store.user.type === 'doctor'" :openPopup="openPopup"
                        @close-popup="() => openPopup = false"></PatientsPopup>
                </div>
            </div>
            <div class="setps mt-5 d-flex align-items-center justify-content-around gap-5 flex-md-row flex-column">
                <div class="box text-center d-flex flex-column gap-4 align-items-center" @click="typeWriter">
                    <div class="image">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="txt">
                        <h4 class="fw-bold">Step One</h4>
                        <span class="d-block">Create an account to use the tool.</span>
                    </div>
                </div>
                <div class="box text-center d-flex flex-column gap-4 align-items-center">
                    <div class="image">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <div class="txt">
                        <h4 class="fw-bold">Step Two</h4>
                        <span class="d-block">Upload your Diabetic Reinapathy OCT.</span>
                    </div>
                </div>
                <div class="box text-center d-flex flex-column gap-4 align-items-center">
                    <div class="image">
                        <i class="fa-solid fa-file-circle-check"></i>
                    </div>
                    <div class="txt">
                        <h4 class="fw-bold">Step Three</h4>
                        <span class="d-block">Get your OCT analysis.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: ""
})

const store = useStore()
const openPopup = ref(false)
const showTour = ref(false)
const loading = ref(false)

const handleDragOver = (event) => {
    document.querySelector('.upload-holder').classList.add("drag")
}
const handleDragLeave = (event) => {
    document.querySelector('.upload-holder').classList.remove("drag")
    console.log(store.user);
}
const handleDrop = (event) => {
    const formData = new FormData()
    if (store.user.type === 'patient') {
        formData.append("patient", store.user.patient_profile.id)
        formData.append("image", event.dataTransfer.files[0])
        store.detectionAlgorithm(formData, loading)
    } else {
        formData.append("image", event.dataTransfer.files[0])
        store.detectionAlgorithm(formData, loading)
    }
}

const OCTDetection = (event) => {
    console.log(event.target);
    console.log(event.target.files[0]);
    const formData = new FormData()
    if (store.user.type === 'patient') {
        formData.append("patient", store.user.patient_profile.id)
        formData.append("image", event.target.files[0])
        store.detectionAlgorithm(formData, loading)
    } else {
        formData.append("image", event.target.files[0])
        store.detectionAlgorithm(formData, loading)
    }
}

const closeResults = () => {
    store.patientDetectionResults = null
}


</script>

<style lang="scss" scoped>
.home-page {
    .banner {
        background-image: linear-gradient(65deg, var(--main-color), var(--second-color));
        position: relative;
        color: var(--white-color);

        .left-side,
        .right-side {
            z-index: 5;
        }

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-image: url("assets/images/Patterns-2.png");
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0.5;
        }

        h1 {
            font-size: 45px;
        }

        p {
            line-height: 1.8;
        }
    }

    .upload-image {
        label {
            border: 2px dashed var(--light-grey-color);
            padding: 75px 20px !important;
            transition: 0.2s;
            cursor: pointer;

            &.drag {
                border-color: var(--main-color);
                box-shadow: 0 0 35px var(--main-color) inset;
            }

            i {
                font-size: 125px;
                color: var(--dark-grey-color);
            }

            .info {
                h3 {
                    color: var(--second-color);

                    span {
                        color: var(--main-color);

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

                span {
                    color: var(--light-grey-color);
                }
            }
        }

        .detection-result {
            background-color: var(--white-color);
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.25);
            border-top: 8px solid var(--main-color);

            .close {
                i {
                    color: var(--second-color);
                    transition: 0.2s;
                    cursor: pointer;

                    &:hover {
                        color: var(--main-color);
                    }
                }
            }

            .points {
                span {
                    i {
                        color: var(--main-color);
                    }
                }
            }
        }
    }

    .setps {
        .box {
            width: 100%;
            position: relative;

            &:nth-child(2) {


                &::before,
                &::after {
                    content: '';
                    position: absolute;
                    top: 35%;
                    transform: translateY(-50%);
                    width: 50%;
                    border-bottom: 1px dashed var(--light-grey-color);
                }

                &::before {
                    left: -115px;
                }

                &::after {
                    right: -115px;
                }

            }

            .image {
                position: relative;
                display: grid;
                place-items: center;
                width: 150px;
                height: 150px;
                background-color: var(--white-color);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.150);

                i {
                    color: var(--main-color);
                    font-size: 50px;
                }
            }

            .txt {
                color: var(--second-color);

                span {
                    color: var(--dark-grey-color);
                }
            }

        }
    }

    @media (max-width: 1140px) {
        .setps {
            .box {
                &:nth-child(2) {

                    &::before,
                    &::after {
                        width: 40%;
                    }

                    &::before {
                        left: -80px;
                    }

                    &::after {
                        right: -80px;
                    }
                }
            }
        }
    }

    @media (max-width: 991px) {
        .setps {
            .box {
                &:nth-child(2) {

                    &::before,
                    &::after {
                        width: 30%;
                    }

                    &::before {
                        left: -55px;
                    }

                    &::after {
                        right: -55px;
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        .banner {
            padding: 32px !important;
            text-align: center;

            .left-side {
                width: 100% !important;

                h1 {
                    font-size: 30px;
                }

                button,
                a {
                    width: 100%;
                    justify-content: center;
                }
            }
        }

        .upload-image {
            label {
                padding: 50px 20px !important;

                i {
                    font-size: 75px;
                }

                .info {

                    h3,
                    h3 span {
                        font-size: 18px !important;
                    }

                    span {
                        font-size: 12px;
                    }
                }
            }

            .detection-result {
                padding: 2rem 1.5rem !important;

                .image-comparison {
                    gap: 5px !important;
                    align-items: start !important;

                    .normal,
                    .user-result {
                        width: 50% !important;
                    }

                    img {
                        width: 75px;
                    }
                }

                .points {
                    padding-left: 10px !important;
                }

                span,
                p {
                    font-size: 15px !important;
                }
            }
        }

        .setps {
            .box {
                &:nth-child(2) {

                    &::before,
                    &::after {
                        display: none;
                    }

                }
            }
        }
    }
}
</style>
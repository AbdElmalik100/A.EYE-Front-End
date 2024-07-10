<template>
    <div class="overlay py-5 d-grid" :class="showTour ? 'active' : ''">
        <div class="tour rounded-3 p-4 text-center" ref="tour">
            <i class="fa-solid fa-x fs-4 ms-auto d-block close" @click="close"></i>
            <div class="tabs position-relative">
                <Transition name="slide-right" mode="out-in">
                    <div class="tab-1 position-absolute" v-if="activeTab === 1">
                        <img src="assets/images/Astronaut with space shuttle (1).gif" class="img-fluid" width="225" alt="">
                        <h4 class="fw-bold w-75 mx-auto">
                            We will take you to a short tour to show you what A.EYE does.
                        </h4>
                        <p class="text-muted mt-3">
                            A.EYE is an A.I web application tool for detecting Diabetic Retinopathy by uploading the OCT image and then wait for A.I algorithm to analyze then you get the results out and stored in your history.
                        </p>
                    </div>
                    <div class="tab-2 position-absolute" v-else-if="activeTab === 2">
                        <img src="assets/images/Preventive Health Care.gif" class="img-fluid" width="225" alt="">
                        <h4 class="fw-bold w-75 mx-auto">
                            What is Diabetic Retinopathy ?!
                        </h4>
                        <ul class="list text-black d-flex flex-column gap-4 text-start mt-4 px-5">
                            <li class="d-flex align-items-start gap-2">
                                <i class="fa-solid fa-star pt-1"></i>
                                Diabetic retinopathy is an eye condition that can cause vision loss and blindness in people who have diabetes. Has 4 stages (Mild, Moderate, Severe, Proliferative DR).
                            </li>
                            <li class="d-flex align-items-start gap-2">
                                <i class="fa-solid fa-star pt-1"></i>
                                It affects blood vessels in the retina (the light-sensitive layer of tissue in the back of your eye).
                            </li>
                            <li class="d-flex align-items-start gap-2">
                                <i class="fa-solid fa-star pt-1"></i>
                                If you have diabetes, it's important to get a comprehensive dilated eye exam at least once a year.
                            </li>
                        </ul>
                    </div>
                    <div class="tab-3 position-absolute" v-else-if="activeTab === 3">
                        <img src="assets/images/Successfully Done.gif" class="img-fluid" width="225" alt="">
                        <h4 class="fw-bold w-75 mx-auto">
                            Simple UI and easy to use for patients and doctors
                        </h4>
                        <ul class="list text-black d-flex gap-4 text-center mt-4 px-2 flex-md-row flex-column">
                            <li class="d-flex align-items-center gap-2 flex-column w-100">
                                <i class="fa-solid fa-circle-1 fs-1"></i>
                                Our solution takes your OCT image by uploading it on the website.
                            </li>
                            <li class="d-flex align-items-center gap-2 flex-column w-100">
                                <i class="fa-solid fa-circle-2 fs-1"></i>
                                After uploading it, Wait for the AI model to make the analyzing on your OCT image, Comparing your image with the normal image and the 4 stages.
                            </li>
                            <li class="d-flex align-items-center gap-2 flex-column w-100">
                                <i class="fa-solid fa-circle-3 fs-1"></i>
                                Then the AI model will bring you back the result whether if your OCT image is normal or is the one of the 4 stages (Mild, Moderate, Severe, Proliferative DR).
                            </li>
                        </ul>
                    </div>
                    <div class="tab-4 position-absolute" v-else-if="activeTab === 4">
                        <img src="assets/images/A.EYE-Transparent.png" class="img-fluid mb-5" width="350" alt="">
                        <h4 class="fw-bold w-75 mx-auto">
                            Create your account now to have the ability to diagnose your OCT image and detect if you are healthy or need to visit a doctor.
                        </h4>
                        <h5 class="mt-4 text-muted fst-italic">
                            We wish you good health from A.EYE team.
                        </h5>   
                    </div>
                </Transition>
            </div>
            <div class="pagination d-flex align-items-center gap-2 justify-content-between mt-5">
                <button class="prev d-flex align-items-center gap-2 fw-semibold" :class="activeTab > 1 ? 'show' : ''"
                    @click="prev">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span>Previous</span>
                </button>
                <div class="tabs-number d-flex align-items-center gap-2">
                    <span :class="activeTab === 1 ? 'active' : ''" @click="activeTab = 1">1</span>
                    <span :class="activeTab === 2 ? 'active' : ''" @click="activeTab = 2">2</span>
                    <span :class="activeTab === 3 ? 'active' : ''" @click="activeTab = 3">3</span>
                    <span :class="activeTab === 4 ? 'active' : ''" @click="activeTab = 4">4</span>
                </div>
                <button v-if="activeTab < 4" class="next d-flex align-items-center gap-2 fw-semibold"
                    @click="next">
                    <span>Next</span>
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button class="finish main-btn" v-else @click="close">
                    Finish Tour
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
const store = useStore()
const props = defineProps(['showTour'])
const emits = defineEmits(['close-tour'])
const tour = ref(null)
const activeTab = ref(1)

const prev = () => {
    activeTab.value--
}
const next = () => {
    activeTab.value++
}

onClickOutside(tour, event => {
    emits('close-tour')
    activeTab.value = 1
    if (props.showTour) localStorage.setItem("tour", true)
})

const close = () => {
    activeTab.value = 1
    localStorage.setItem("tour", true)
    emits('close-tour')
}

watch(props, newVal => {
    if (newVal.showTour) document.body.style.overflow = 'hidden'
    if (!newVal.showTour) document.body.style.overflow = 'visible'
})

</script>

<style lang="scss" scoped>
.overlay {
    place-items: center;
    overflow: auto;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s;

    &.active {
        z-index: 555;
        opacity: 1;
        visibility: visible;

        .tour {
            transform: scale(1);
        }
    }

    .tour {
        width: 750px;
        background-color: var(--white-color);
        transform: scale(0);
        color: var(--second-color);
        border-top: 8px solid var(--main-color);
        transition: 0.2s;
        .close {
            width: fit-content;
            transition: 0.2s;
            cursor: pointer;
            &:hover {
                color: var(--main-color);
            }
        }
        .tabs {
            height: 500px;
            h4 {
                color: var(--second-color);
            }
            p {
                line-height: 1.8;
            }
            &>div {
                top: 50%;
                transform: translateY(-50%);
            }
            .tab-2, .tab-3 {
                i {
                    color: var(--main-color);
                }
            }
        }
        .pagination {
            .prev {
                visibility: hidden;
                &.show {
                    visibility: visible;
                }
            }
            .tabs-number {
                span {
                    display: grid;
                    place-items: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1px solid var(--second-color);
                    padding-top: 1px;
                    font-weight: bold;
                    color: var(--second-color);
                    transition: 0.2s;
                    cursor: pointer;
                    &:hover {
                        color: var(--main-color);
                        border-color: var(--main-color);
                    }
                    &.active {
                        color: var(--white-color);
                        border-color: var(--main-color);
                        background-color: var(--main-color);
                    }
                }
            }
        }
    }
    @media (max-width: 767px) {
        .tour {
            width: calc(100% - 15px);
            .tabs {
                h4 {
                    width: 100% !important;
                }
                height: 750px;
                .tab-2 {
                    ul {
                        padding: 0 !important;
                    }
                }
            }
            .pagination {
                .prev, .next {
                    span {
                        display: none;
                    }
                }
                .finish {
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
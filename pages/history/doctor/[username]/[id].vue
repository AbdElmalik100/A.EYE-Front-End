<template>
    <div class="history min-vh-100">
        <div class="content p-4 min-vh-100 px-5" v-if="store.user">
            <div class="patient-details-box mb-4 rounded-2 p-4" v-if="patientDetails !== null">
                <h3 class="fw-bold">Personal details</h3>
                <form class="mt-4">
                    <div class="d-flex align-items-center gap-3">
                        <label class="w-100">
                            <span class="d-block fw-semibold mb-1">First name</span>
                            <input type="text" class="w-100" placeholder="First name" v-model="patientDetails.first_name">
                        </label>
                        <label class="w-100">
                            <span class="d-block fw-semibold mb-1">Last name</span>
                            <input type="text" class="w-100" placeholder="Last name" v-model="patientDetails.last_name">
                        </label>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-4 flex-md-row flex-column">
                        <div class="d-flex align-items-center gap-3 w-100">
                            <label class="w-100">
                                <span class="d-block fw-semibold mb-1">Age</span>
                                <input type="number" class="w-100" placeholder="e.g. 23" v-model="patientDetails.age">
                            </label>
                            <label class="w-100">
                                <span class="d-block fw-semibold mb-1">Gender</span>
                                <select class="w-100" v-model="patientDetails.gender">
                                    <option value="male">Male</option>
                                    <option value="male">Female</option>
                                </select>
                            </label>
                        </div>
                        <label class="w-100">
                            <span class="d-block fw-semibold mb-1">Phone number</span>
                            <input type="tel" class="w-100" placeholder="Phone number" v-model="patientDetails.phone_number">
                        </label>
                    </div>
                    <div class="mt-5 w-100">
                        <button class="main-btn ms-auto d-block" @click.prevent="updatePatientDetails">Save Changes</button>
                    </div>
                </form>
            </div>
            <div class="history-container patient-history rounded-2 p-4 "
                v-if="patientDetails !== null">
                <div class="d-flex align-items-center justify-content-between gap-3">
                    <h3 class="fw-bold">Patient detection history</h3>
                    <span class="text-muted text-nowrap">
                        Total: {{ patientDetails.doctor_patients_detections.length }}
                    </span>
                </div>
                <div class="detection-list d-flex flex-column gap-4 mt-4">
                    <div class="box rounded-2 p-4" :class="item.result.toLowerCase()"
                        v-for="(item, index) in detectionList" :key="index">
                        <div class="d-flex align-items-md-start align-items-center gap-5 flex-md-row flex-column">
                            <img :src="item.image" width="125" height="125" class="img-fluid rounded-2" alt="">
                            <div class="info">
                                <h4 class="fw-bold" :class="item.result.toLowerCase()">
                                    {{
                                        item.result_class === 1 ? 'Stage One - ' : item.result_class === 2 ? 'Stage Two - ' :
                                        item.result_class === 3 ? 'Stage Three - ' : item.result_class === 4 ? 'Stage Four - ':
                                        ''
                                    }}
                                    {{ item.result }}
                                </h4>
                                <div class="english">
                                    <p class="">
                                        {{ item.description }}
                                    </p>
                                    <ul class="points mt-4 d-flex flex-column gap-3 ps-3">
                                        <li class="d-flex gap-2" v-for="(point, index) in item.points.split('_')" :key="index">
                                            <i class="fa-solid fa-angles-right mt-1"></i>
                                            <span>
                                                {{ point }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="arabic mt-4" dir="rtl">
                                    <p class="">
                                        {{ item.description_arabic }}
                                    </p>
                                    <ul class="points mt-4 d-flex flex-column gap-3 ps-3">
                                        <li class="d-flex gap-2" v-for="(point, index) in item.points_arabic.split('_')" :key="index">
                                            <i class="fa-solid fa-angles-left mt-1"></i>
                                            <span>
                                                {{ point }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <span class="d-block text-end text-muted fst-italic mt-4">
                            {{ new Date(item.created_at).toUTCString() }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
useHead({
    title: "History"
})
definePageMeta({
    layout: 'settings'
})

const store = useStore()
const route = useRoute()
const { $axios } = useNuxtApp()
const loading = ref(false)
const patientDetails = ref(null)
const detectionList = ref(null)


const updatePatientDetails = async () => {
    loading.value = true
    await $axios.put(`api/patients/${route.params.id}/`, patientDetails.value)
        .then(response => {
            console.log('Patient profile updated!');
            toast("Patient information updated!", {
                "theme": "light",
                "type": "success",
                "multiple": false,
                // "hideProgressBar": true,
                "transition": "bounce",
                "dangerouslyHTMLString": true,
                onClick: () => location.reload()
            })
            setTimeout(() => {
                location.reload()
            }, 1500)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            loading.value = false
        })
}


onNuxtReady(async () => {
    loading.value = true
    await $axios.get("auth/users/me")
        .then(response => {
            $axios.get(`api/patients/${route.params.id}`)
                .then(innerResponse => {
                    patientDetails.value = innerResponse.data
                    detectionList.value = innerResponse.data.doctor_patients_detections.reverse()
                }).catch(error => {
                    console.log(error);
                    throw showError({
                        statusCode: 404,
                        fatal: true
                    })
                }).finally(() => {
                    loading.value = false
                })
        }).catch(error => {
            throw showError({
                statusCode: 404,
                fatal: true
            })
        })

})


</script>

<style lang="scss" scoped>
.history {
    padding: 91px 0 0 250px;
    .patient-details-box {
        background-color: var(--white-color);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);
    }
    .patient-history {
        background-color: var(--white-color);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        h3 {
            color: var(--second-color);
        }

        .box {
            border: 1px solid var(--main-color);
            h4 {
                &.normal {
                    color: #1AB201;
                }
                &.mild {
                    color: #F2A000;
                }
                &.moderate {
                    color: #EF5233;
                }
                &.severe {
                    color: #ee3f1c;
                }
                &.proliferative {
                    color: #D40000;
                }
            }
            .points {
                li {
                    i {
                        color: var(--main-color);
                    }
                }
            }
        }
    }
    @media (max-width: 767px) {
        padding: 125px 0 0 0px;
        .content {
            padding: 20px !important;
            .patient-history {
                h3 {
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="history min-vh-100">
        <div class="content p-4 min-vh-100 px-5" v-if="store.user">
            <div class="history-container patient-history rounded-2 p-4 "
                v-if="patientHistory.length > 0">
                <div class="d-flex align-items-center justify-content-between gap-3">
                    <h3 class="fw-bold">History</h3>
                    <span class="text-muted">
                        Total: {{ patientHistory.length }}
                    </span>
                </div>
                <div class="detection-list d-flex flex-column gap-4 mt-4">
                    <div class="box rounded-2 p-4" :class="item.result.toLowerCase()"
                        v-for="(item, index) in patientHistory" :key="index">
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
            <div class="empty" v-else>
                <div class="text-center">
                    <img class="img-fluid" width="175" src="assets/images/empty-box-very-light.png" alt="">
                    <h3 class="text-black-50 mt-4 fw-semibold">
                        There is no history yet.
                    </h3>
                </div>
            </div>
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
useHead({
    title: "History"
})
definePageMeta({
    layout: 'settings'
})
const store = useStore()
const { $axios } = useNuxtApp()
const loading = ref(false)
const patientHistory = ref([])


onNuxtReady(async () => {
    loading.value = true
    await $axios.get("auth/users/me")
        .then(response => {
            $axios.get(`api/patient-detection/?ordering=-created_at&patient=${response.data.patient_profile.id}`)
            .then(innerResponse => {
                patientHistory.value = innerResponse.data
            }).catch(error => {
                console.log(error);
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

    .empty {
        width: 100%;
        height: 100vh;
        display: grid;
        place-items: center;
    }

    @media (max-width: 767px) {
        padding: 125px 0 0 0px;

        .content {
            padding: 20px !important;
        }
    }
}
</style>
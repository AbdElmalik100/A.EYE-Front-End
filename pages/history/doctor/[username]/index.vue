<template>
    <div class="history min-vh-100">
        <div class="content p-4 min-vh-100 px-5" v-if="store.user">
            <div class="history-container doctor-history rounded-2 " >
                <div class="action-box d-flex align-items-center justify-content-between gap-3 p-4 rounded-2 flex-lg-row flex-column">
                    <label class="position-relative w-50">
                        <i class="fa-solid fa-magnifying-glass position-absolute text-muted search"></i>
                        <input type="search" class="w-100 ps-5" placeholder="Search" @change="searching">
                    </label>
                    <div class="filter-sort d-flex align-items-center gap-2">
                        <div class="position-relative" ref="sortMenu">
                            <button class="d-flex align-items-center gap-2 fw-bold rounded-2 p-2 px-3"
                                @click="openSortMenu = !openSortMenu">
                                <i class="fa-solid fa-arrow-up-arrow-down"></i>
                                Sort by
                            </button>
                            <div class="action-menu sort-menu position-absolute rounded-2 d-flex flex-column text-start p-1 gap-1" :class="openSortMenu ? 'active' : ''" >
                                <span class="text-muted"
                                    :class="selectedSort === item.params ? 'active' : ''"
                                    @click="sorting(item.params, $event)"
                                    v-for="(item, index) in sortTypes" :key="index">
                                    {{item.name}}
                                </span>
                            </div>
                        </div>
                        <div class="position-relative" ref="filterMenu">
                            <button class="d-flex align-items-center gap-2 fw-bold rounded-2 p-2 px-3"
                                @click="openfilterMenu = !openfilterMenu">
                                <i class="fa-solid fa-filter"></i>
                                Filter
                            </button>
                            <div class="action-menu filter-menu position-absolute rounded-2 d-flex flex-column text-start p-1 gap-1" :class="openfilterMenu ? 'active' : ''" >
                                <span class="text-muted"
                                    :class="selectedFilter == item.params ? 'active' : ''"
                                    @click="filtering(item.params, $event)"
                                    v-for="(item, index) in filterType" :key="index">
                                    {{item.name}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="patients-list mt-5 row" v-if="patientList.length > 0">
                    <div class="col-lg-4 col-md-6 mb-4" v-for="(item, index) in patientList" :key="index">
                        <NuxtLink :to="`/history/doctor/${store.user.username}/${item.id}`" class="box rounded-2 p-4 px-3 d-flex flex-column h-100 gap-4">
                            <div class="info d-flex align-items-start justify-content-between">
                                <div>
                                    <h6 class="name fw-bold text-capitalize">
                                        {{ item.full_name }}
                                    </h6>
                                    <span class="age text-muted">
                                        {{ item.age }} Years old
                                    </span>
                                </div>
                                <span class="date text-muted fst-italic d-block">
                                    {{ new Date(item.created_at).toLocaleString() }}
                                </span>
                            </div>
                            <div class="detection-result d-flex align-items-center gap-3 mt-auto"
                                v-for="(detectionItem, index) in [item.doctor_patients_detections[item.doctor_patients_detections.length - 1]]"
                                :key="index">
                                <img :src="detectionItem.image" class="img-fluid rounded-2" width="75" height="75"
                                    alt="">
                                <div class="details">
                                    <span class="fw-bold">
                                        {{
                                            detectionItem.result_class === 1 ?
                                            'Stage One - ' : detectionItem.result_class === 2 ?
                                            'Stage Two - ' : detectionItem.result_class === 3 ?
                                            'Stage Three - ' : detectionItem.result_class === 4 ?
                                            'Stage Four - ' : ''
                                        }}
                                        {{ detectionItem.result }}
                                    </span>
                                    <span v-if="item.doctor_patients_detections.length > 1" class="d-block fw-bold"
                                        :class="item.doctor_patients_detections[item.doctor_patients_detections.length - 1].result_class
                                        > item.doctor_patients_detections[item.doctor_patients_detections.length - 2].result_class ? 'text-danger' : 'text-success'">
                                        {{
                                            item.doctor_patients_detections[item.doctor_patients_detections.length - 1].result_class
                                            > item.doctor_patients_detections[item.doctor_patients_detections.length - 2].result_class
                                            ? 'Getting worse'
                                            : 'Getting great'
                                        }}
                                    </span>
                                    <span v-else class="d-block text-muted">
                                        First detection
                                    </span>
                                </div>
                                <div v-if="item.doctor_patients_detections.length > 1" class="ms-auto">
                                    <i class="fa-solid fa-arrow-trend-down text-danger fs-2"
                                        v-if="item.doctor_patients_detections[item.doctor_patients_detections.length - 1].result_class
                                        > item.doctor_patients_detections[item.doctor_patients_detections.length - 2].result_class"
                                    >
                                    </i>
                                    <i class="fa-solid fa-arrow-trend-up text-success fs-2" v-else></i>
                                </div>
                                <i class="fa-solid fa-circle-info fs-2 ms-auto text-primary" v-else></i>
                            </div>
                        </NuxtLink>
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
        </div>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
useHead({
    title: "History"
})
definePageMeta({
    layout: 'settings'
})

const store = useStore()
const { $axios } = useNuxtApp()
const loading = ref(false)
const patientList = ref([])
const sortMenu = ref(null)
const openSortMenu = ref(false)
const filterMenu = ref(null)
const openfilterMenu = ref(false)
const selectedSort = ref(null)
const selectedFilter = ref(null)
const sortTypes = ref([
    {
        name: 'Created at - Asc',
        params: 'created_at'
    },
    {
        name: 'Created at - Desc',
        params: '-created_at'
    },
    {
        name: 'A - Z',
        params: 'full_name'
    },
    {
        name: 'Z - A',
        params: '-full_name'
    },
    {
        name: 'Age - Asc',
        params: 'age'
    },
    {
        name: 'Age - Desc',
        params: '-age'
    },
])
const filterType = ref([
    {
        name: 'Normal',
        params: 0
    },
    {
        name: 'Stage one - Mild',
        params: 1
    },
    {
        name: 'Stage two - Moderate',
        params: 2
    },
    {
        name: 'Stage three - Severe',
        params: 3
    },
    {
        name: 'Stage four - Proliferative DR',
        params: 4
    },
])

const sorting = async (item, event) => {
    selectedSort.value = item
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active')
        selectedSort.value = '-updated_at'
        await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&ordering=${selectedSort.value}&detection_type=${selectedFilter.value}`)
            .then(response => {
                
                patientList.value = response.data
            }).catch(error => {
                console.log(error);
            })
    } else {
        event.target.classList.add('active')
        await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&ordering=${selectedSort.value}&detection_type=${selectedFilter.value}`)
            .then(response => {
                
                patientList.value = response.data
            }).catch(error => {
                console.log(error);
            })
    }
}

const filtering = async (item, event) => {
    selectedFilter.value = item
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active')
        selectedFilter.value = null
        await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&ordering=${selectedSort.value}&detection_type=${selectedFilter.value}`)
            .then(response => {
                patientList.value = response.data
            }).catch(error => {
                console.log(error);
            })
    } else {
        event.target.classList.add('active')
        await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&ordering=${selectedSort.value}&detection_type=${selectedFilter.value}`)
            .then(response => {
                patientList.value = response.data
            }).catch(error => {
                console.log(error);
            })
    }
}


const searching = async (event) => {
    await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&search=${event.target.value}&ordering=-updated_at`)
        .then(response => {
            patientList.value = response.data
        }).catch(error => {
            console.log(error);
        })
}

onClickOutside(sortMenu, (event) => {
    openSortMenu.value = false
})
onClickOutside(filterMenu, (event) => {
    openfilterMenu.value = false
})


onNuxtReady(async () => {
    loading.value = true
    await $axios.get("auth/users/me")
        .then(response => {
            $axios.get(`api/patients/?doctor=${response.data.doctor_profile.id}&ordering=-updated_at`)
                .then(innerResponse => {
                    patientList.value = innerResponse.data
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

    .doctor-history {
        .action-box {
            box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
            background-color: var(--white-color);
            position: relative;
            z-index: 2;
            .search {
                top: 50%;
                transform: translateY(-50%);
                left: 20px;
            }

            .filter-sort {
                button {
                    border: 1px solid var(--dark-grey-color);
                    transition: 0.2s;

                    &:hover {
                        border-color: var(--main-color);
                    }
                }
                .action-menu {
                    background-color: var(--white-color);
                    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);
                    visibility: hidden;
                    z-index: -1;
                    opacity: 0;
                    transition: 0.2s;
                    &.sort-menu {
                        width: 175px;
                        right: 0;
                        top: 25px;
                    }
                    &.filter-menu {
                        width: 250px;
                        right: 0;
                        top: 25px;
                    }
    
                    span {
                        padding: 5px 10px;
                        transition: 0.2s;
                        border-radius: 5px;
                        font-weight: 500;
                        width: 100%;
                        cursor: pointer;
                        &:hover, &.active {
                            background-color: var(--main-color);
                            color: var(--white-color) !important;
                        }
                    }
                    &.active {
                        top: 50px;
                        visibility: visible;
                        opacity: 1;
                        z-index: 1;
                    }
                }
            }
        }

        .patients-list {
            .box {
                background-color: var(--white-color);
                box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
                border: 1px solid transparent;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    border-color: var(--main-color);
                }

                .info {
                    .date {
                        font-size: 12px;
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
    @media (max-width: 991px) {
        .action-box {
            align-items: end !important;
            label {
                width: 100% !important;
            }
        }
    }
    @media (max-width: 767px) {
        padding: 125px 0 0 0px;
        .action-box {
            .filter-sort {
                &, &>div {
                    width: 100% !important;
                }
                button {
                    width: 100% !important;
                    justify-content: center;
                }
                .sort-menu {
                    right: initial;
                    left: 0;
                }
            }
        }
        .content {
            padding: 20px !important;
        }
    }
}
</style>
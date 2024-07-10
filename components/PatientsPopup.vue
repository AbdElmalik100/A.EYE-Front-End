<template>
    <div class="overlay d-grid py-5" :class="openPopup ? 'active' : ''">
        <div class="patients-popup rounded-2 p-4" v-if="activeTab === '1'">
            <div class="search d-flex align-items-center gap-2 flex-md-row flex-column">
                <input type="search" class="w-100" placeholder="e.g abd elmalik" @change="searching($event)">
                <button class="main-btn d-flex align-items-center gap-2" @click="activeTab = '2'">
                    <i class="fa-solid fa-plus"></i>
                    Add New
                </button>
            </div>
            <div class="patients py-4 d-grid">
                <ul class="patient-list w-100" v-if="patients !== null && patients.length > 0">
                    <li v-for="(item, index) in patients" :key="index">
                        <input :id="item.id" class="d-none" type="radio" name="patients" :value="JSON.stringify(item)"
                            @change="selectItem">
                        <label :for="item.id"
                            class="d-flex align-items-center gap-2 justify-content-between w-100 p-2 py-3">
                            <span class="name text-capitalize fw-bold">
                                {{ item.first_name }} {{ item.last_name }}
                            </span>
                            <div class="d-flex align-items-center gap-md-3 gap-2 text-nowrap">
                                <span class="gender text-capitalize">
                                    {{ item.gender }}
                                </span>
                                <span class="age">
                                    {{ item.age }} yo
                                </span>
                                <span class="phone-number">
                                    {{ item.phone_number }}
                                </span>
                            </div>
                        </label>
                    </li>
                </ul>
                <div class="d-grid" style="place-items: center;" v-else>
                    <h4 class="text-center text-muted w-100">
                        Nothing to show!
                    </h4>
                </div>
            </div>
            <div class="actions d-flex align-items-center gap-2 justify-content-end">
                <button class="second-btn cancel" @click="$emit('close-popup')">
                    Cancel
                </button>
                <button class="main-btn" @click="save">
                    Save
                </button>
            </div>
            <Loading v-if="loading"></Loading>
        </div>
        <div class="add-patient rounded-2 p-4" v-if="activeTab === '2'">
            <i class="fa-solid fa-arrow-left fs-4 mb-4" @click="backWard"></i>
            <form>
                <label class="w-100">
                    <span class="d-block mb-1 fw-semibold">First name</span>
                    <input type="text" class="w-100" placeholder="First name" v-model="patientForm.first_name">
                </label>
                <label class="w-100 mt-4">
                    <span class="d-block mb-1 fw-semibold">Last name</span>
                    <input type="text" class="w-100" placeholder="Last name" v-model="patientForm.last_name">
                </label>
                <div class="d-flex align-items-center gap-3 flex-md-row flex-column">
                    <div class="d-flex align-items-center gap-3 w-100">
                        <label class="w-100 mt-4">
                            <span class="d-block mb-1 fw-semibold">Age</span>
                            <input type="number" class="w-100" placeholder="e.g. 23" v-model="patientForm.age">
                        </label>
                        <label class="w-100 mt-4">
                            <span class="d-block mb-1 fw-semibold">Gender</span>
                            <select class="w-100" v-model="patientForm.gender">
                                <option value="male" selected>Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
                    </div>
                    <label class="w-100 mt-4">
                        <span class="d-block mb-1 fw-semibold">Phone number</span>
                        <input type="tel" class="w-100" placeholder="e.g. +2001011308220" v-model="patientForm.phone_number">
                    </label>
                </div>
                <div class="actions mt-5 d-flex align-items-center gap-2 justify-content-end">
                    <button class="second-btn cancel" @click="cancel">
                        Cancel
                    </button>
                    <button class="main-btn" @click.prevent="addNewPatient">
                        Save
                    </button>
                </div>
            </form>
            <Loading v-if="loading"></Loading>
        </div>
    </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
defineProps(['openPopup'])
const emits = defineEmits(['close-popup'])
const store = useStore()
const { $axios } = useNuxtApp()
const patients = ref(null)
const selectedItem = ref(null)
const loading = ref(false)
const activeTab = ref('1')
const patientForm = ref({
    first_name: '',
    last_name: '',
    gender: 'male',
    age: '',
    phone_number: '',
    doctor: store.user.doctor_profile.id
})


const searching = async (event) => {
    await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}&search=${event.target.value}`)
        .then(response => {
            patients.value = response.data
        }).catch(error => {
            console.log(error);
        })
}

const selectItem = (event) => {
    selectedItem.value = JSON.parse(event.target.value)
}

// For updateding updated_at field 
const updatePatient = async () => {
    await $axios.put(`api/patients/${selectedItem.value.id}/`, selectedItem.value)
        .then(response => {
            console.log('Patient updated');
        }).catch(error => {
            console.log(error);
        })
}


const save = async () => {
    loading.value = true
    store.patientDetectionResults.patient = +selectedItem.value.id
    delete store.patientDetectionResults.image
    await $axios.patch(`api/doctor-detection/${store.patientDetectionResults.id}/`, store.patientDetectionResults)
        .then(response => {
            console.log('saved!');
            $axios.get(`api/doctor-detection/?patient=${response.data.patient}`)
                .then(innerResponse => {
                    if (innerResponse.data.length > 1) {
                        if (response.data.result_class > innerResponse.data[innerResponse.data.length - 2].result_class) {
                            toast(`${selectedItem.value.full_name} is getting worse than before, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                                "icon": () => h('i', { class: 'fa-solid fa-arrow-trend-down text-danger fs-5 me-5' }),
                                "theme": "light",
                                "multiple": false,
                                // "hideProgressBar": true,
                                "transition": "bounce",
                                "dangerouslyHTMLString": true,
                                onClick: () => navigateTo(`/history/doctor/${store.user.username}`)
                            })
                            updatePatient()
                        } else {
                            toast(`${selectedItem.value.full_name} is getting great than before, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                                "icon": () => h('i', { class: 'fa-solid fa-arrow-trend-up text-success fs-5 me-5' }),
                                "theme": "light",
                                "multiple": false,
                                // "hideProgressBar": true,
                                "transition": "bounce",
                                "dangerouslyHTMLString": true,
                                onClick: () => navigateTo(`/history/doctor/${store.user.username}`)
                            })
                            updatePatient()
                        }
                    } else {
                        toast(`${selectedItem.value.full_name}'s first detection created, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                            "theme": "light",
                            "type": "info",
                            "multiple": false,
                            // "hideProgressBar": true,
                            "transition": "bounce",
                            "dangerouslyHTMLString": true,
                            onClick: () => navigateTo(`/history/doctor/${store.user.username}`)
                        })
                        updatePatient()
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    loading.value = false
                    emits('close-popup')
                    store.patientDetectionResults = null
                })
        }).catch(error => {
            console.log(error);
        })
}

const addNewPatient = async () => {
    loading.value = true
    await $axios.post('api/patients/', patientForm.value)
        .then(response => {
            selectedItem.value = response.data
            setTimeout(() => save(), 50)
        }).catch(error => {
            console.log(error);
        })
}

const cancel = () => {
    patientForm.value = {
        first_name: '',
        last_name: '',
        gender: 'male',
        age: '',
        phone_number: '',
    }
    activeTab.value = '1'
    emits('close-popup')
}

const backWard = () => {
    patientForm.value = {
        first_name: '',
        last_name: '',
        gender: 'male',
        age: '',
        phone_number: '',
    }
    activeTab.value = '1'
}

onNuxtReady(async () => {
    await $axios.get(`api/patients/?doctor=${store.user.doctor_profile.id}`)
        .then(response => {
            patients.value = response.data
        }).catch(error => {
            console.log(error);
        }).finally(() => {

        })
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

        .patients-popup {
            transform: scale(1);
        }
    }
    .add-patient {
        background-color: var(--white-color);
        width: 650px;
        transition: 0.2s;
        i {
            width: 50px;
            height: 50px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                background-color: var(--very-light-grey-color);
            }
        }
    }
    .patients-popup {
        background-color: var(--white-color);
        width: 650px;
        transition: 0.2s;
        transform: scale(0);

        .patients {
            min-height: 300px;

            .patient-list {
                li {
                    &:not(:first-of-type) {
                        border-top: 1px solid var(--dark-grey-color);
                    }

                    label {
                        transition: 0.2s;
                        cursor: pointer;

                        &:hover {
                            background-color: var(--main-color);
                            color: var(--white-color);
                        }
                    }

                    input:checked+label {
                        background-color: var(--main-color);
                        color: var(--white-color);
                    }
                }
            }
        }
    }
    @media (max-width: 767px) {
        .add-patient,
        .patients-popup {
            width: calc(100% - 15px);
            padding: 15px !important;
        }
        .patients-popup {
            .search {
                button {
                    width: 100%;
                    justify-content: center;
                }
            }
            .patients {
                label {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
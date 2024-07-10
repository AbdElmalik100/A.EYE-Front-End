import { defineStore } from 'pinia'
import { toast } from "vue3-toastify";
import axios from '~/plugins/axios'



export const useStore = defineStore('store', () => {
    const config = useRuntimeConfig()
    // To apply axios inside pinia :) 
    // const $axios = axios().provide.axios
    const { $axios } = useNuxtApp()
    const user = ref(null)
    const patientDetectionResults = ref(null)
    const globalTour = ref(false)

    const isAuthenticated = () => {
        return localStorage.getItem("token") ? true : false
    }

    const getLoggedInUser = async (loading) => {
        loading !== undefined ? loading.value = true : ''
        await $axios.get("auth/users/me")
            .then(response => {
                user.value = response.data
            }).catch(error => {
                localStorage.removeItem("token")
                navigateTo({
                    name: "index"
                })
            }).finally(() => {
                loading !== undefined ? loading.value = false : ''
            })
    }

    const login = async (form, errors, loading) => {
        loading.value = true
        await $axios.post("auth/token/login", form.value)
            .then(loginResponse => {
                localStorage.setItem("token", loginResponse.data.auth_token)
                $axios.defaults.headers.Authorization = `token ${loginResponse.data.auth_token}`
                $axios.get("auth/users/me")
                    .then(response => {
                        user.value = response.data
                        navigateTo({
                            name: "index"
                        })
                    }).catch(error => {
                        localStorage.removeItem("token")
                        navigateTo({
                            name: "index"
                        })
                    })
            }).catch(error => {
                errors.value = error.response.data
                if ('non_field_errors' in errors.value) {
                    toast(`Invalid email or password!`, {
                        "theme": "light",
                        "type": "error",
                        "multiple": false,
                        // "hideProgressBar": true,
                        "transition": "bounce",
                        "dangerouslyHTMLString": true,
                    })
                }
            }).finally(() => {
                loading.value = false
            })
    }


    const signup = async (form, errors, loading) => {
        loading.value = true
        await $axios.post("auth/users/", form.value)
            .then(response => {
                navigateTo({
                    name: "login"
                })
            }).catch(error => {
                errors.value = error.response.data
            }).finally(() => {
                loading.value = false
            })
    }

    const logout = async (loading) => {
        loading.value = true
        await $axios.post("auth/token/logout")
            .then(response => {
                console.log("logout successfuly!");
                localStorage.removeItem("token")
                $axios.defaults.headers.Authorization = ''
                user.value = null
                patientDetectionResults.value = null
                navigateTo({
                    name: "login"
                })
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
    }

    const detectionAlgorithm = (form, loading) => {
        loading.value = true
        if (user.value.type === 'patient') {
            $axios.post('api/patient-detection/', form)
                .then(response => {
                    patientDetectionResults.value = response.data
                    if (user.value.patient_profile.patient_detections.length > 0) {
                        const resultClass = user.value.patient_profile.patient_detections[user.value.patient_profile.patient_detections.length - 1].result_class
                        if (patientDetectionResults.value.result_class > resultClass) {
                            toast(`You are getting worse than before, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                                "icon": () => h('i', { class: 'fa-solid fa-arrow-trend-down text-danger fs-5 me-5' }),
                                "theme": "light",
                                "multiple": false,
                                // "hideProgressBar": true,
                                "transition": "bounce",
                                "dangerouslyHTMLString": true,
                                onClick: () => navigateTo(`/history/patient/${user.value.username}`)
                            })
                            getLoggedInUser()
                        } else {
                            toast(`You are getting great than before, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                                "icon": () => h('i', { class: 'fa-solid fa-arrow-trend-up text-success fs-5 me-5' }),
                                "theme": "light",
                                "multiple": false,
                                // "hideProgressBar": true,
                                "transition": "bounce",
                                "dangerouslyHTMLString": true,
                                onClick: () => navigateTo(`/history/patient/${user.value.username}`)
                            })
                            getLoggedInUser()
                        }
                    } else {
                        toast(`You've made your first detection, <span class="text-decoration-underline fw-bold" style="color: var(--main-color);">Check your history</span>`, {
                            "theme": "light",
                            "type": "info",
                            "multiple": false,
                            // "hideProgressBar": true,
                            "transition": "bounce",
                            "dangerouslyHTMLString": true,
                            onClick: () => navigateTo(`/history/patient/${user.value.username}`)
                        })
                        getLoggedInUser()
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    loading.value = false
                })
        } else {
            $axios.post('api/doctor-detection/', form)
            .then(response => {
                patientDetectionResults.value = response.data
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                loading.value = false
            })
        }
    }


    return {
        user,
        patientDetectionResults,
        globalTour,
        isAuthenticated,
        getLoggedInUser,
        signup,
        login,
        logout,
        detectionAlgorithm,
    }
})
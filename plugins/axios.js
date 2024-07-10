import axios from "axios";
export default defineNuxtPlugin(nuxtApp => {
    const axiosAPI = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        // baseURL: 'https://aeye-back-end.up.railway.app/',
        proxy: false,
        withCredentials: false,
        headers: {
            Authorization: ''
        }
    })

    if (!process.server) {
        if (localStorage.getItem("token")) {
            axiosAPI.defaults.headers.Authorization = `token ${localStorage.getItem("token")}`
        } else axiosAPI.defaults.headers.Authorization = ''
    }

    // nuxtApp.vueApp.provide("axios", axiosAPI)
    // nuxtApp.provide("axios", axiosAPI)
    return {
        provide: {
            axios: axiosAPI
        }
    }
})
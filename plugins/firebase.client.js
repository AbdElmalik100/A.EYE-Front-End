import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyD2u1AsKhk_boZ62RQnzFN9CJOq5wz3A3Q",
        authDomain: "aeye-storage.firebaseapp.com",
        projectId: "aeye-storage",
        storageBucket: "aeye-storage.appspot.com",
        messagingSenderId: "1088723517961",
        appId: "1:1088723517961:web:fc26d13da6ee15ab9eeed8"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app)

    nuxtApp.vueApp.provide('storage', storage)
    nuxtApp.provide('storage', storage)
})
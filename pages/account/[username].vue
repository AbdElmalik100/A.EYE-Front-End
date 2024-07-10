<template>
    <div class="account min-vh-100" v-if="userInfo !== null">
        <div class="content p-4 min-vh-100 px-5">
            <div class="box personal-info p-4 rounded-2">
                <h3 class="mb-4 fw-bold">Personal Information</h3>
                <div class="avatar d-flex align-items-center gap-4">
                    <label>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" class="d-none"
                            @change="reviewImage($event)">
                        <div class="d-grid rounded-circle avatar-placeholder"
                            v-if="previewImage === null && userInfo.avatar === null">
                            <div class="text-center">
                                <i class="fa-solid fa-image fa-3x text-muted"></i>
                                <span class="d-block fw-semibold text-muted mt-2">Upload your image</span>
                                <span class="accepts d-block text-muted mt-1">JPG, PNG, JPEG Max size 1MB</span>
                            </div>
                        </div>
                        <div v-else-if="(userInfo.avatar !== null || userInfo.avatar === null) && previewImage !== null"
                            class="img-cont position-relative">
                            <img :src="previewImage" class="reviewed-image img-fluid object-fit-cover rounded-circle"
                                width="250" alt="" style="height: 250px;">
                            <i class="fa-solid fa-camera cam fs-2 position-absolute"></i>
                        </div>
                        <div v-else-if="userInfo.avatar !== null && previewImage === null"
                            class="img-cont position-relative">
                            <img :src="userInfo.avatar" class="reviewed-image img-fluid object-fit-cover rounded-circle"
                                width="250" alt="" style="height: 250px;">
                            <i class="fa-solid fa-camera cam fs-2 position-absolute"></i>
                        </div>
                    </label>
                    <span class="d-block fst-italic text-danger">
                        {{ imageError }}
                    </span>
                </div>
                <form @submit.prevent="updateUser" class="mt-5">
                    <div class="d-flex align-items-start gap-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1">First Name: </span>
                            <input class="w-100" type="text" placeholder="Firt Name" v-model="userInfo.first_name">
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">Last Name: </span>
                            <input class="w-100" type="text" placeholder="Last Name" v-model="userInfo.last_name">
                        </label>
                    </div>
                    <div class="d-flex align-items-start gap-3 mt-3 flex-md-row flex-column">
                        <label class="w-100">
                            <span class="d-block mb-1">Username: </span>
                            <input class="w-100" type="text" placeholder="Username" :value="`@${userInfo.username}`"
                                disabled style="background-color: var(--very-light-grey-color);">
                        </label>
                        <label class="w-100">
                            <span class="d-block mb-1">Phone Number: </span>
                            <input class="w-100" type="text" placeholder="Phone Number" v-model="userInfo.phone_number">
                        </label>
                    </div>
                    <div class="text-end mt-3">
                        <button class="main-btn">Save changes</button>
                    </div>
                </form>
            </div>
            <div class="box email-change p-4 rounded-2 mt-4">
                <h3 class="mb-3 fw-bold">Email Address</h3>
                <p class="text-muted fw-semibold">
                    {{ userInfo.email }}
                </p>
                <button class="main-btn mt-2">
                    Change email address
                </button>
            </div>
            <div class="box password-chnage p-4 rounded-2 mt-4">
                <h3 class="mb-3 fw-bold">Change Password</h3>
                <p class="text-muted">
                    Need to change your password? We’ll send you a link to reset it.
                </p>
                <button class="main-btn mt-2">
                    Reset your password by email
                </button>
            </div>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>

<script setup>
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from "vue3-toastify";

definePageMeta({
    layout: 'settings'
})

const { $axios, $storage } = useNuxtApp()
const store = useStore()
const route = useRoute()

const previewImage = ref(null)
const imageError = ref(null)
const userInfo = ref(null)
const loading = ref(false)
const file = ref(null)

const reviewImage = (event) => {
    file.value = event.target.files[0]
    if (file.value.size > 1024000) {
        imageError.value = 'File size must be less than 1MB'
    } else {
        imageError.value = null
        previewImage.value = URL.createObjectURL(file.value)
    }
}




const updateUser = async () => {
    if (file.value === null) {
        await updateWitoutAvatar()
    } else await updateWithAvatar()
}


const updateWithAvatar = async () => {
    loading.value = true
    await uploadBytes(storageRef($storage, `avatar/${file.value.name}`), file.value).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(downloadURL => {
            userInfo.value.avatar = downloadURL
            $axios.put("accounts/users/me/", userInfo.value)
                .then(response => {
                    console.log('profile updated!');
                    toast("Profile information updated!", {
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
        })
    });
}
const updateWitoutAvatar = async () => {
    loading.value = true
    await $axios.put("auth/users/me/", userInfo.value)
        .then(response => {
            console.log('profile updated!')
            toast("Profile information updated!", {
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
            console.log(error)
        }).finally(() => {
            loading.value = false
        })

}

onNuxtReady(async () => {
    loading.value = true
    if (store.isAuthenticated()) {
        await $axios.get(`accounts/users/?username=${route.params.username}`)
            .then(response => {
                if (response.data.length > 0) {
                    userInfo.value = response.data[0]
                    useHead({
                        title: userInfo.value.first_name
                    })
                } else {
                    throw showError({
                        statusCode: 404,
                        fatal: true
                    })
                }
            }).catch(error => {
                throw showError({
                    statusCode: 404,
                    fatal: true
                })
            }).finally(() => {
                loading.value = false
            })
    }
})



</script>

<style lang="scss" scoped>
.account {
    padding: 91px 0 0 250px;

    .box {
        background-color: var(--white-color);
        box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.250);

        &.personal-info {
            .avatar {
                .img-cont {
                    cursor: pointer;

                    .cam {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.350);
                        border-radius: 50%;
                        display: grid;
                        place-items: center;
                        color: var(--main-color);
                        border: 3px dashed var(--main-color);
                        transition: 0.2s;
                        opacity: 0;
                    }

                    &:hover {
                        .cam {
                            opacity: 1;
                        }
                    }
                }

                .avatar-placeholder {
                    width: 250px;
                    height: 250px;
                    place-items: center;
                    border: 2px dashed var(--light-grey-color);
                    transition: 0.2s;
                    cursor: pointer;

                    .accepts {
                        font-size: 13px;
                    }

                    &:hover {
                        border-color: var(--main-color);
                    }
                }

                .reviewed-image {
                    cursor: pointer;
                }
            }
        }
    }

    @media (max-width: 767px) {
        padding: 125px 0 0 0px;

        .content {
            padding: 20px !important;

            .avatar {
                justify-content: center;
                flex-direction: column;
            }
        }
    }
}
</style>
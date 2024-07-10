<template>
    <footer class="py-3">
        <div class="container d-flex align-items-center gap-3 justify-content-between">
            <NuxtLink to="/">
                <img class="logo img-fluid" width="175" src="assets/images/A.EYE-Transparent-(Dark).png" alt="">
            </NuxtLink>
            <ul class="social-links d-flex align-items-center gap-3">
                <li>
                    <a href="https://www.facebook.com/abdelmalik.abdelghafar" target="_blank">
                        <i class="fa-brands fa-square-facebook fs-3"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/abdelmalik.abdelghafar" target="_blank">
                        <i class="fa-brands fa-instagram fs-3"></i>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/Abd_elmalik_" target="_blank">
                        <i class="fa-brands fa-x-twitter fs-3"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/abd-elmalik-abd-elghafar-64a029296/" target="_blank">
                        <i class="fa-brands fa-linkedin fs-3"></i>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
footer {
    background-color: var(--second-color);

    .social-links {
        a {
            color: var(--white-color);
            transition: 0.2s;

            &:hover {
                color: var(--main-color);
            }
        }
    }

    @media (max-width: 767px) {
        .logo {
            width: 150px;
        }
    }
}
</style>
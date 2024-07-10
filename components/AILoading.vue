<template>
    <div class="ai-loading text-center py-5">
        <img src="assets/images/A.EYE-Logo.png" class="img-fluid mb-4" width="175" height="175" alt="">
        <div class="loader mx-auto"></div>
        <p class="fw-bold mt-4 fs-5 w-75 mx-auto">
            Artificial intelligence algorithm now works, it may take a minute,
            <br>
            You will get your results soon.
            <br>
            Please keep this page open.
        </p>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.ai-loading {
    color: var(--second-color);

    .loader {
        width: fit-content;
        font-weight: bold;
        font-size: 35px;
        color: var(--main-color);
        clip-path: inset(0 1.3ch 0 0);
        animation: l4 1s steps(4) infinite;
    }

    .loader:before {
        content: "AI Processing..."
    }

    img {
        animation: rotation 0.8s infinite linear;
    }

    p {
        line-height: 1.7;
    }

    @media (max-width: 991px) {
        p {
            width: 100% !important;
        }
    }
}


@keyframes rotation {
    to {
        transform: rotate(180deg);
    }
}

@keyframes l4 {
    to {
        clip-path: inset(0 -0.5ch 0 0)
    }
}
</style>
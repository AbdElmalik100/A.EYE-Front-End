<template>
    <div class="loading">
        <div class="overlay">
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    </div>
</template>

<script setup>

onMounted(() => {
    document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
    document.body.style.overflow = 'visible'
})

</script>

<style lang="scss" scoped>
.overlay {
    z-index: 555;
    display: grid;
    place-items: center;
}

svg {
    width: 3.25em;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
    width: 100px;
}

circle {
    fill: none;
    stroke: var(--main-color);
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}
</style>
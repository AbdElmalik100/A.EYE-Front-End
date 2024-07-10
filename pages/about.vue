<template>
    <div class="about-page min-vh-100">
        <div class="landing min-vh-100 position-relative">
            <img class="img-fluid" src="assets/images/A.EYE-Background-min.jpg" alt="" loading="lazy">
            <h1 class="text-uppercase position-absolute text-center">
                Your eye is an A.I
            </h1>
        </div>
        <div class="about py-5">
            <div class="container d-flex align-items-center gap-5 flex-md-row flex-column">
                <div class="left-side">
                    <img class="img-fluid" src="assets/images/Deconstructed-robot-amico.png" alt="">
                </div>
                <div class="right-side">
                    <h1 class="text-uppercase mb-3 fw-bold">About Us</h1>
                    <p>
                        We are a team from faculty of computers and information
                        medical informatics department
                        we made an AI Tool for detection of Diabetic Retinopathy that
                        caused by high blood sugar due to diabetes.
                    </p>
                </div>
            </div>
        </div>
        <div class="diabetic py-5">
            <div class="container d-flex align-items-center gap-5 flex-lg-row flex-column">
                <div class="left-side flex-fill w-100">
                    <h1 class="fw-bold mb-3 text-uppercase">Our target disease is diabetic retinopathy</h1>
                    <p>
                        Diabetic retinopathy is a complication of diabetes that affects the eyes. It occurs when high blood
                        sugar levels damage the blood vessels in the retina, which is the light-sensitive tissue at the back
                        of the eye. Over time, this damage can lead to vision problems and even blindness if left untreated.
                        It is important for individuals with diabetes to manage their blood sugar levels, have regular eye
                        exams, and follow their healthcare provider's recommendations to prevent or manage diabetic
                        retinopathy. Treatment options may include laser therapy, medication injections, or surgery,
                        depending on the severity of the condition.
                    </p>
                </div>
                <div class="right-side flex-fill w-100">
                    <img class="img-fluid" src="assets/images/Frame.png" alt="">
                </div>
            </div>
        </div>
        <div class="samples py-5 mt-5">
            <div class="container">
                <div class="normal text-center">
                    <img class="img-fluid" width="200" src="assets/images/Normal.png" alt="">
                    <h3 class="mt-4 fw-bold w-25 mx-auto">
                        Normal image of diabetic retinopathy
                    </h3>
                </div>
                <div class="stages d-flex align-items-center gap-5 justify-content-center mt-5 flex-wrap">
                    <div class="box text-center">
                        <img class="img-fluid" width="200" src="assets/images/stage_1-Mild.png" alt="">
                        <h4 class="fw-bold mt-4">
                            Stage One
                            <span class="d-block">Mild</span>
                        </h4>
                    </div>
                    <div class="box text-center">
                        <img class="img-fluid" width="200" src="assets/images/stage_2-moderate.png" alt="">
                        <h4 class="fw-bold mt-4">
                            Stage Two
                            <span class="d-block">Moderate</span>
                        </h4>
                    </div>
                    <div class="box text-center">
                        <img class="img-fluid" width="200" src="assets/images/stage_3-severe.png" alt="">
                        <h4 class="fw-bold mt-4">
                            Stage Three
                            <span class="d-block">Severe</span>
                        </h4>
                    </div>
                    <div class="box text-center">
                        <img class="img-fluid" width="200" src="assets/images/stage_4-Proliferative-DR.png" alt="">
                        <h4 class="fw-bold mt-4">
                            Stage Four
                            <span class="d-block">Proliferative DR</span>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="technologies py-5 mt-5">
            <h2 class="fw-bold text-uppercase ps-md-5 p-0 ms-md-5 m-0 fst-italic mb-4 text-md-start text-center" style="letter-spacing: 5px;">Powered by</h2>
            <div class="container d-flex align-items-center justify-content-center gap-5 flex-wrap">
                <img class="img-fluid" src="assets/images/nuxt.png" alt="" title="Nuxt.JS">
                <img class="img-fluid" src="assets/images/bootstrap.png" alt="" title="Bootstrap">
                <img class="img-fluid" src="assets/images/sass.png" alt="" title="SASS">
                <img class="img-fluid" src="assets/images/django.png" alt="" title="Django">
                <img class="img-fluid" src="assets/images/postgres.png" alt="" title="PostgreSQL">
                <img class="img-fluid" src="assets/images/pytorch.png" alt="" title="Pytorch">
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "About"
})
</script>

<style lang="scss" scoped>
.about-page {
    background-color: var(--white-color);

    .landing {
        img {
            object-fit: cover;
        }

        h1 {
            font-size: 65px;
            color: var(--white-color);
            background-color: rgba(0, 0, 0, 0.250);
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: grid;
            place-items: center;
        }
    }

    .about {
        .right-side {
            color: var(--second-color);

            p {
                color: var(--dark-grey-color);
                line-height: 1.8;
            }
        }
    }

    .diabetic {
        background-color: var(--bg-color);

        .left-side {
            h1 {
                color: var(--second-color);
            }

            p {
                line-height: 1.8;
                color: var(--dark-grey-color);
            }
        }
    }

    .samples {
        color: var(--second-color);
    }

    .technologies {
        img {
            width: 125px;
            transition: 0.2s;
            filter: grayscale(1);
            cursor: pointer;

            &:hover {
                filter: grayscale(0);
            }
        }
    }

    @media (max-width: 991px) {
        .landing {
            height: 100vh !important;

            img {
                height: 100%;
            }
        }

        .samples {
            .normal {
                h3 {
                    width: 50% !important;
                }
            }
        }
    }

    @media (max-width: 767px) {
        .landing {
            h1 {
                font-size: 60px !important;
            }

            img {
                object-position: 53%;
            }
        }

        .samples {
            .normal {
                h3 {
                    width: 75% !important;
                }
            }
        }
    }
}
</style>
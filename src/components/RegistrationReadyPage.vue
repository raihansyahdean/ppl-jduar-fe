<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div>
                    <img id="instruction-image" alt="instruction-image" src="./../assets/img/ReadyPage/face.png">
                </div>
                <div id="instruction-div">
                    <div><p class="font-16-px font-weight-bold">Set Up deteksi wajah</p></div>
                    <p class="font-14-px">Posisikan wajah anda di hadapan kamera. Ikuti instruksi yang diberikan.</p>
                </div>
                <div>
                    <b-button href="/registration/start" class="border-0 font-16-px font-weight-bold" id="start-button">Mulai</b-button>
                </div>
            </div>
            <div class="px-5" id="cancel">
                <a href="/" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegistrationReadyPage',
    data () {
        return {}
    }
};
</script>

<style>
/* Instruction Part */
#instruction-div {
    margin: 0.5rem 3rem 3rem 3rem;
}

#instruction-image {
    width: 240px;
    height: 240px;
}
</style>


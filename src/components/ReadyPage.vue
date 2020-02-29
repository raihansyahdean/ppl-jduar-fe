<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div>
                    <img id="instruction-image" alt="instruction-image" src="./../assets/img/face.png">
                </div>
                <div id="instruction">
                    <div><p class="font-16-px font-weight-bold">Set Up deteksi wajah</p></div>
                    <p class="font-14-px">Posisikan wajah anda di hadapan kamera. Ikuti instruksi yang diberikan.</p>
                </div>
                <div>
                    <b-button class="border-0 font-16-px font-weight-bold" id="start-button">Mulai</b-button>
                </div>
            </div>
            <div class="float-right position-relative" id="cancel">
                <a href="/" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReadyPage',
};
</script>

<style>
/* Instruction Part */
#instruction-image {
    width: 240px;
    height: 240px;
}

#instruction {
    margin: 0.5rem 3rem 5rem 3rem;
}

/* Start Button */
#start-button {
    padding: 0.5rem 7rem;
    background-color: #ffffff;
    color: #000000;
    border-radius: 12px;
}

#start-button:focus {
    box-shadow: none;   
}

#start-button:active {
    background-color: #f2f2f2;
}
</style>


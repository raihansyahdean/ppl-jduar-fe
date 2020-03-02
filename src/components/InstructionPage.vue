<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div id="camera">
                    <div class="mx-auto d-block" id="circle">
                        <camera/>
                    </div>
                </div>
                <div id="instruction">
                    <div><img id="instruction-icon" alt="instruction-image" src="./../assets/img/front-face-instruction.png"></div>
                    <p class="font-14-px" id="instruction-sentence">Hadapkan kepala Anda ke arah depan.</p>
                </div>
                <div>
                    <b-button class="border-0 font-16-px font-weight-bold" id="shoot-button" @click="changeInstruction">Ambil Foto</b-button>
                </div>
            </div>
            <div class="float-right position-relative" id="cancel">
                <a href="/" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
import Camera from "./Camera.vue";
export default {
    name: 'InstructionPage',
    components: {
        Camera
    },
    data: function () {
        return {
            instructionsList: ['Hadapkan kepala Anda ke arah kanan.', 
            'Hadapkan kepala Anda ke arah kiri.', 
            'Hadapkan kepala Anda ke arah atas.', 
            'Hadapkan kepala Anda ke arah bawah.'],
            instructionIdx: 0
        }
    },
    methods: {
        changeInstruction: function(){
            if (this.instructionIdx == 4) {
                window.location = '/#/ready';
            }
            document.getElementById("instruction-sentence").innerHTML = this.instructionsList[this.instructionIdx];  
            this.instructionIdx++;
        },
    }
};
</script>


<style>
/* Camera Part */
#circle {
    background-color: #000000;
    height: 240px;
    width: 240px;
    border-radius: 50%;
    margin-top: 80px;
    position: relative;
    overflow: hidden;
    background-size: cover;
}

/* Instruction Part */
#instruction-icon {
    width: 60px;
    height: 60px;
    margin: 2rem 0;
}

#instruction {
    margin: 0rem 3rem 2rem 3rem;
}

/* Shoot Button */
#shoot-button {
    padding: 0.5rem 7rem;
    background-color: #2D9CDB;
    color: #ffffff;
    border-radius: 12px;
}

#shoot-button:focus {
    box-shadow: none;   
}

#shoot-button:active {
    background-color: #3180ad;
}
</style>


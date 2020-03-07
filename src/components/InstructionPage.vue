<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div id="camera">
                    <div class="mx-auto d-block" id="circle">
                        <camera ref="camera"/>
                    </div>
                </div>
                <div id="instruction">
                    <div><img id="instruction-icon" alt="instruction-icon" :src="instructionIcon"></div>
                    <p class="font-14-px" id="instruction-sentence">Hadapkan kepala Anda ke arah depan.</p>
                </div>
                <div>
                    <b-button class="border-0 font-16-px font-weight-bold" id="shoot-button" @click="savePhotoAndChangeInstruction">Ambil Foto</b-button>
                </div>
            </div>
            <div class="px-5" id="cancel">
                <a href="/ready" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
import Camera from "./Camera.vue"
import axios from "axios"

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
            instructionIconsList: ['right', 'left', 'up', 'down'],
            instructionIcon: require("../assets/img/front-face-instruction.png"),
            instructionIdx: 0,
            captured: {
                images: [],
            },
        }
    },
    methods: {
        savePhotoAndChangeInstruction: function(){
            const capturedPhoto = this.$refs.camera.capturePhoto();
            this.captured.images.push(capturedPhoto);
            console.log(this.captured);
            this.changeInstruction();
        },
        changeInstruction: function(){
            if (this.instructionIdx == 4) {
                this.sendPayload();
                // window.location = '/ready';
            } else {
                document.getElementById("instruction-sentence").innerHTML = this.instructionsList[this.instructionIdx];  
                this.instructionIcon = require("../assets/img/" + this.instructionIconsList[this.instructionIdx] + "-face-instruction.png");
                this.instructionIdx++;
            }
        },
        sendPayload: async function(){
            const payload = JSON.stringify(this.captured);
            axios({
                method: 'post',
                url: process.env.VUE_APP_URL_BE + "/crossroads/regist/",
                data: payload
            })
            .then(response => { console.log(response) })
            .catch(error => { console.log(error.response) });
        }
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

#instruction-sentence {
    margin: 0 0 2rem 0;
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


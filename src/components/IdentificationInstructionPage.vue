<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div id="instruction-content">
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
                    <b-button class="border-0 font-16-px font-weight-bold" id="shoot-button" @click="savePhotoAndChangePage">Ambil Foto</b-button>
                </div>
            </div>
            <div id="loading-circle" class="d-none"><b-spinner variant="primary" label="Spinning"></b-spinner></div>
            <div class="px-5" id="cancel">
                <a href="/identification/ready" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
import Camera from "./Camera.vue"
import axios from "axios"

export default {
    name: 'IdentificationInstructionPage',
    components: {
        Camera
    },
    data: function () {
        return {
            instructionIcon: require("../assets/img/InstructionPage/front-face-instruction.png"),
            captured: {
                image: "",
            },
        }
    },
    methods: {
        savePhotoAndChangePage: function() {
            const capturedPhoto = this.$refs.camera.capturePhoto();
            this.captured.image = capturedPhoto;
            console.log(this.captured);
            this.changePage();
        },
        changePage: function() {
            // Show loading icon
            document.getElementById('instruction-content').setAttribute('style', 'display:none');
            document.getElementById('cancel').setAttribute('style', 'display:none');
            document.getElementById('loading-circle').setAttribute('style', 'display:block !important');
            // Send photos to backend
            this.sendPayload(0);
        },
        sendPayload: async function(counter) {
            if(counter < 3){
                counter += 1;
                const payload = JSON.stringify(this.captured);
                axios({
                    data: payload,
                    method: 'post',
                    url: process.env.VUE_APP_URL_BE + "/crossroads/identify/",
                })
                .then(response => { 
                    console.log(response.data.passcode_set);
                    this.$store.dispatch('updateIds', response.data.passcode_set).then(() => {
                        this.$router.push({ path: '/identification/passcode' });
                    })
                })
                .catch(error => { 
                    console.log(error);
                    this.sendPayload(counter); 
                });
            }
            else{
                this.$router.push({ path: '/identification/fail' });
            }
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
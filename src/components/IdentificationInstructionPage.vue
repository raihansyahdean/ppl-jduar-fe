<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div id="instruction-content">
                <div class="justify-content-center row" id="information-sentence-div">
                    <div class="col-xs-8">
                        <p class="font-14-px" id="information-sentence">Wajah Anda sedang dideteksi</p>
                    </div>
                    <div class="py-2 mx-2 col-xs-4" id="dot-spinner">
                        <hollow-dots-spinner
                            :animation-duration="1000"
                            :dot-size="6"
                            :dots-num="3"
                            :color="'#2D9CDB'"
                        />
                    </div>
                </div>
                <div class="mx-auto d-block" id="circle-progress">
                    <radial-progress-bar class="mx-auto d-block" :diameter="diameter"
                       :completed-steps="stepsCompleted"
                       :total-steps="totalSteps"
                       :animate-speed="animateSpeed"
                       :stroke-width=10
                       :start-color="startColor"
                       :inner-stroke-color="innerStrokeColor"
                       :stop-color="stopColor">
                        <div id="camera">
                            <div class="mx-auto d-block" id="circle">
                                <camera class="d-block" ref="camera"/>
                            </div>
                        </div>
                    </radial-progress-bar>
                </div>
                <div id="instruction">
                    <div><img id="instruction-icon" alt="instruction-icon" :src="instructionIcon"></div>
                    <p class="font-14-px" id="instruction-sentence">Hadapkan kepala Anda ke arah depan.</p>
                    <div class="d-none" id="captured-sentence-div">
                        <p class="font-14-px" id="captured-sentence">Foto berhasil diambil!</p>
                    </div>
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
/* These lines are ignored due to face-api functionality must be tested directly by user */
/* istanbul ignore next */
import Camera from "./Camera.vue"
import RadialProgressBar from 'vue-radial-progress'
import {HollowDotsSpinner} from 'epic-spinners'
import axios from "axios"
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

export default {
    name: 'IdentificationInstructionPage',
    components: {
        Camera,
        RadialProgressBar,
        HollowDotsSpinner,
    },
    data: function () {
        return {
            instructionIcon: require("../assets/img/InstructionPage/front-face-instruction.png"),
            captured: {
                image: "",
            },
            faceDetected: false,
            circleTimer: null,
            diameter: 275,
            startColor: '#2D9CDB',
            innerStrokeColor: '#F2F2F2',
            stopColor: '#3180AD',
            animateSpeed: 10,
            stepsCompleted: 0,
            totalSteps: 30,
            captureSuccessAudio: new Audio(require("../assets/audio/ding.mp3")),
        }
    },
    methods: {
        detectFace: async function() {
            const camera = document.getElementById('video');
            const detect = await faceapi.detectSingleFace(camera, new faceapi.TinyFaceDetectorOptions());
            if (detect != undefined) {
                this.faceDetected = true;
                console.log("Face Detected");
                console.log(detect);
            } else {
                console.log("Face Not Detected");
            }
        },
        setCircleTime: function(seconds) {
            if (this.circleTimer != null) {
                this.stepsCompleted = 0;
                clearInterval(this.circleTimer);
            }
            this.startCircleTimer(seconds);
        },
        startCircleTimer: function(seconds) {
            this.circleTimer = setInterval(() => {
                this.stepsCompleted++;
                if (this.stepsCompleted >= this.totalSteps) {
                    clearInterval(this.circleTimer);
                    this.showCapturedText();
                    this.captureSuccessAudio.play();
                    setTimeout(this.changePage, 2000);
                    return;
                }
            }, seconds * 1000 / this.totalSteps);
        },
        showCapturedText: function() {
            document.getElementById('dot-spinner').setAttribute('style', 'display:none');
            document.getElementById('information-sentence').innerHTML = ""
            this.loadingTextAnimation(document.getElementById('information-sentence'), "Wajah Anda berhasil dideteksi!", 0, 10, false)
        },
        loadingTextAnimation: async function(target, message, index, interval, repeat) {
            if (index < message.length) {
                target.append(message[index++]);
                setTimeout(() => {
                    this.loadingTextAnimation(target, message, index, interval); 
                }, interval);
            } else if (repeat && index == message.length) {
                console.log("Hello")
                index = 0 
            }
        },
        savePhotoAndChangePage: async function(){
            await this.detectFace();
            if (this.faceDetected) {
                clearInterval(this.completeDetectFace);
                const capturedPhoto = this.$refs.camera.capturePhoto();
                this.captured.images = capturedPhoto;
                console.log(this.captured);
                this.setCircleTime(1);
            }
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
    },
    mounted() {
        this.completeDetectFace = setInterval(() => {
            this.savePhotoAndChangePage() 
        }, 500);

    },
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
</style>
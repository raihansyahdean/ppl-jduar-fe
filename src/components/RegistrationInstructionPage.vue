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
                <div class="d-none col-xs-8" id="timer-warning-div">
                    <p class="font-14-px" id="timer-warning">Foto akan diambil dalam {{ timeLeft }} detik.</p>
                </div>
                <div class="mx-auto d-block" id="circle-progress">
                    <radial-progress-bar class="mx-auto d-block" :diameter="diameter"
                       :completed-steps="completedSteps"
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
                    <div class="d-none" id="timer-warning-div">
                        <p class="font-14-px" id="timer-warning">Foto akan diambil dalam {{ timeLeft }} detik.</p>
                    </div>
                </div>
            </div>
            <div id="loading-circle" class="d-none"><b-spinner variant="primary" label="Spinning"></b-spinner></div>
            <div class="px-5" id="cancel">
                <a href="/registration/ready" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
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
    name: 'RegistrationInstructionPage',
    components: {
        Camera,
        RadialProgressBar,
        HollowDotsSpinner
    },
    data: function () {
        return {
            instructionsList: ['Hadapkan kepala Anda ke arah kanan.', 
            'Hadapkan kepala Anda ke arah kiri.', 
            'Hadapkan kepala Anda ke arah atas.', 
            'Hadapkan kepala Anda ke arah bawah.'],
            instructionIconsList: ['right', 'left', 'up', 'down'],
            instructionIcon: require("../assets/img/InstructionPage/front-face-instruction.png"),
            instructionIdx: 0,
            captured: {
                images: [],
            },
            timeLeft: '',
            photoTimer: null,
            circleTimer: null,
            textTimer: null,
            diameter: 275,
            startColor: '#2D9CDB',
            innerStrokeColor: '#F2F2F2',
            stopColor: '#3180AD',
            animateSpeed: 10,
            completedSteps: 0,
            totalSteps: 30,
            captureSuccessAudio: new Audio(require("../assets/audio/ding.mp3")),
            faceDetected: false,
            completeDetectFace: false,
        }
    },
    methods: {
        detectFace: async function() {
            const video = document.getElementById('video');
            const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
            if (detection != undefined) {
                this.faceDetected = true;
                console.log("Face Detected");
                console.log(detection);
            } else {
                console.log("Face Not Detected");
            }
        },
        setCircleTime: function(seconds) {
            if (this.circleTimer != null) {
                this.completedSteps = 0;
                clearInterval(this.circleTimer);
            }
            this.startCircleTimer(seconds);
        },
        startCircleTimer: function(seconds) {
            this.circleTimer = setInterval(() => {
                this.completedSteps++;
                if (this.completedSteps >= this.totalSteps) {
                    clearInterval(this.circleTimer);
                    this.showCapturedText();
                    this.captureSuccessAudio.play();
                    setTimeout(this.changeInstruction, 2000);
                    return;
                }
            }, seconds * 1000 / this.totalSteps);
        },
        showCapturedText: function() {
            document.getElementById('dot-spinner').setAttribute('style', 'display:none');
            document.getElementById('timer-warning-div').setAttribute('style', 'display:none');
            document.getElementById('information-sentence').innerHTML = ' '
            document.getElementById('information-sentence-div').setAttribute('style', 'display:block !important');
            this.loadingTextAnimation(document.getElementById('information-sentence'), "Foto berhasil diambil!", 0, 10, false)
        },
        setPhotoTime: function(seconds) {
            if (this.photoTimer != null) {
                clearInterval(this.photoTimer);
            }
            this.startTimer(seconds);
        },
        startTimer: function(seconds) {
            const now = Date.now();
            const end = now + seconds * 1000;
            this.displayTimeLeft(seconds);
            this.countdown(end);
        },
        countdown: function(end) {
            this.photoTimer = setInterval(() => {
                const secondsLeft = Math.round((end - Date.now()) / 1000);
                if (secondsLeft < 0) {
                    clearInterval(this.photoTimer);
                    this.savePhotoAndLoadProgress();
                    return;
                }
                this.displayTimeLeft(secondsLeft);
            }, 1000);
        },
        displayTimeLeft: function(secondsLeft) {
            this.timeLeft = `${secondsLeft}`;
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
        savePhotoAndLoadProgress: async function(){
            if (this.instructionIdx == 0) {
                await this.detectFace();
                if (this.faceDetected) {
                    clearInterval(this.completeDetectFace);
                    const capturedPhoto = this.$refs.camera.capturePhoto();
                    this.captured.images.push(capturedPhoto);
                    console.log(this.captured);
                    this.setCircleTime(1);
                }
                this.faceDetected = false;
            }
            else {
                const capturedPhoto = this.$refs.camera.capturePhoto();
                this.captured.images.push(capturedPhoto);
                console.log(this.captured);
                this.setCircleTime(1);
            }    
        },
        changeInstruction: function(){
            this.completedSteps = 0;
            document.getElementById('timer-warning-div').setAttribute('style', 'display:block !important');
            document.getElementById('information-sentence-div').setAttribute('style', 'display:none!important');
            if (this.instructionIdx == 4) {
                document.getElementById('instruction-content').setAttribute('style', 'display:none');
                document.getElementById('cancel').setAttribute('style', 'display:none');
                document.getElementById('loading-circle').setAttribute('style', 'display:block !important');
                this.sendPayload(0);
            } else {
                document.getElementById("instruction-sentence").innerHTML = this.instructionsList[this.instructionIdx];  
                this.instructionIcon = require("../assets/img/InstructionPage/" + this.instructionIconsList[this.instructionIdx] + "-face-instruction.png");
                this.instructionIdx++;
                this.setPhotoTime(5);
            }
        },
        sendPayload: async function(counter){
            if(counter < 3){
                counter += 1;
                const payload = JSON.stringify(this.captured);
                axios({
                    data: payload,
                    method: 'post',
                    url: process.env.VUE_APP_URL_BE + "/crossroads/regist/",
                })
                .then(response => { 
                    console.log(response.data.available_passcodes);
                    this.$store.dispatch('updateIds', response.data.available_passcodes).then(() => {
                        this.$router.push({ path: '/registration/passcode' });
                    })
                })
                .catch(error => { 
                    console.log(error);
                    this.sendPayload(counter); 
                });
            }
            else{
                this.$router.push({ path: '/registration/fail' });
            }
        }
    },
    mounted() {
        this.completeDetectFace = setInterval(() => {
            this.savePhotoAndLoadProgress() 
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
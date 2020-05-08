<template>
    <video ref="video" id="video"> </video>
</template>

<script>
/* These lines are ignored due to its functionality is tested directly by user*/
/* istanbul ignore next */
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs';

export default {
    name: 'Camera',
    data () {
        return {
            mediaStream: null,
        }
    },
    methods: {
        loadFaceDetection: async function(){
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/data/weights'),
            ]).then(this.showCamera());
        },
        showCamera: function() {
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    this.mediaStream = mediaStream;
                    this.$refs.video.srcObject = mediaStream;
                    this.$refs.video.play();
                })
                .catch(error => console.error('getUserMedia() error:', error));
            }
        },
        capturePhoto: function() {
            const video = this.$refs.video;
            if (!this.ctx) {
                this.canvas = document.createElement('canvas');
                this.canvas.height = video.clientHeight;
                this.canvas.width = video.clientWidth;
                this.ctx = this.canvas.getContext('2d');
            }
            const { ctx, canvas } = this;
            ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
            const captured = canvas.toDataURL("image/jpeg");
            return captured
        }
    },
    mounted() {
        this.loadFaceDetection();
    },
}
</script>

<style scoped>
video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    height: 240px;
    width: 240px;
    object-fit: cover;
}
</style>
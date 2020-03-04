<template>
    <video ref="video"> </video>
</template>

<script>
export default {
    name: 'Camera',
    data () {
        return {
            mediaStream: null,
        }
    },
    methods: {
        showCamera: function() {
            /* These lines are ignored due to its functionality is tested directly by user*/
            /* istanbul ignore next */
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
                const canvasEl = document.createElement('canvas');
                canvasEl.height = video.clientHeight;
                canvasEl.width = video.clientWidth;
                this.canvasEl = canvasEl;
                this.ctx = canvasEl.getContext('2d');
            }
            const { ctx, canvasEl } = this;
            ctx.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);
            const captured = canvasEl.toDataURL("image/jpeg");
            return captured
        }
    },
    mounted() {
        this.showCamera();
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
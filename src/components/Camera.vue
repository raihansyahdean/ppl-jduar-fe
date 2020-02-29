<template>
    <video ref="video"></video>
</template>

<script>
export default {
    data () {
        return {
            mediaStream: null
        }
    },
    mounted () {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                this.mediaStream = mediaStream  
                this.$refs.video.srcObject = mediaStream
                this.$refs.video.play()
            })
            .catch(error => console.error('getUserMedia() error:', error))
        }
    },
}
</script>

<style scoped>
video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    height: 230px;
    width: 230px;
    object-fit: cover;
}
</style>
<template>
    <video ref="video"></video>
</template>

<script>
export default {
    name: 'Camera',
    data () {
        return {
            mediaStream: null
        }
    },
    methods: {
        showCamera: function() {
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    this.mediaStream = mediaStream  
                    this.$refs.video.srcObject = mediaStream
                    this.$refs.video.play()
                })
                .catch(error => console.error('getUserMedia() error:', error))
            }
        }
    },
    mounted() {
        this.showCamera()
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
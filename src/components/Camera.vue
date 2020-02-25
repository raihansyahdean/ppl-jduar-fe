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
        }
        else if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia({ video: true }, function(mediaStream) {
                this.mediaStream = mediaStream 
                this.$refs.video.srcObject = mediaStream;
                this.$refs.video.play()
            });
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia({ video: true }, function(mediaStream){
                this.mediaStream = mediaStream 
                this.$refs.video.srcObject = window.webkitURL.createObjectURL(mediaStream);
                this.$refs.video.play()
            });
        } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia({ video: true }, function(mediaStream){
                this.mediaStream = mediaStream 
                this.$refs.video.srcObject = window.URL.createObjectURL(mediaStream);
                this.$refs.video.play()
            });
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
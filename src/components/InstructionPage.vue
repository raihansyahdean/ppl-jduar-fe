<template>
    <div id="camera">
        <div class="mx-auto d-block" id="circle">
            <camera/>
        </div>
    </div>
</template>

<script>
import Camera from '@/components/Camera.vue';

export default {
    name: 'InstructionPage',
    data () {
        return {}
    },
    components: {
        Camera
    },
};
</script>

<style>
#circle {
    background-color: #FFFFFF;
    height: 230px;
    width: 230px;
    border-radius: 50%;
    margin-top: 80px;
    position: relative;
    overflow: hidden;
    background-size: cover;
}
</style>
<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div>
                    <img id="regis-status-icon" alt="regis-fail-icon" src="./../assets/img/RegisStatus/fail.png">
                </div>
                <div id="regis-div">
                    <div><p class="font-22-px">Registrasi Gagal</p></div>
                </div>
                <div>
                    <b-button href="/registration/ready" class="border-0 font-16-px" id="retry-button">Registrasi Ulang</b-button>
                    <b-button href="/" class="border-0 font-16-px" id="fail-menu-button">Menu Utama</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegistrationFailPage',
    data () {
        return {}
    }
};
</script>


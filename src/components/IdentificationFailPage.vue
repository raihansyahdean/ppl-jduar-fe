<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div>
                    <img id="regis-status-icon" alt="regis-fail-icon" src="./../assets/img/IdenStatus/fail.png">
                </div>
                <div id="regis-div">
                    <div><p class="font-22-px">Identifikasi Gagal</p></div>
                </div>
                <div>
                    <b-button href="/identification/ready" class="border-0 font-16-px" id="retry-button">Identifikasi Ulang</b-button>
                    <b-button href="/" class="border-0 font-16-px" id="fail-menu-button">Menu Utama</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IdentificationFailPage',
    data () {
        return {}
    }
};
</script>


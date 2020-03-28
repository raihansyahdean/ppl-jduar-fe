<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div>
                <div>
                    <img id="regis-status-icon" alt="regis-success-icon" src="./../assets/img/RegisStatus/success.png">
                </div>
                <div id="regis-div">
                    <p class="font-22-px">Registrasi Sukses!</p>
                    <p class="font-14-px">Terima kasih sudah menjadi member kami</p>
                </div>
                <div>
                    <b-button href="/" class="border-0 font-weight-bold" id="menu-button">Kembali ke Menu</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegistrationSuccessPage',
    data () {
        return {}
    }
};
</script>


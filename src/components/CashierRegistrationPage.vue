<template>
    <b-overlay
        id="overlay-background"
        :show=showOverlay
        variant="white"
        blur="2px"
        spinner-variant="primary"
        rounded="sm"
    >
        <div class="vertical-center text-center justify-content-center">
            <div class="d-inline-block">
                <div>
                    <div id="title-div">
                        <p class="font-18-px font-weight-bold">REGISTRASI KASIR</p>
                    </div>
                    <div id="form-div">
                        <b-form @submit.prevent="submitRegist">
                            <b-form-group>
                                <b-input v-model="cashier.cashier_name" placeholder="Nama" required></b-input>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="cashier.username" placeholder="Username" required></b-input>
                                <p class="font-12-px m-0 text-left text-danger" v-show=usernameError>Username sudah terpakai.</p>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="cashier.merchant" placeholder="Merchant" required></b-input>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="cashier.merchant_branch" placeholder="Cabang Merchant" required></b-input>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="password" type="password" placeholder="Password" required></b-input>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="confirmationPassword" type="password" placeholder="Konfirmasi Password" required></b-input>
                                <p class="font-12-px m-0 text-left text-danger" v-show=passwordError>Gunakan 8 - 20 karakter dengan campuran huruf dan angka.</p>
                                <p class="font-12-px m-0 text-left text-danger" v-show=confirmationPasswordError>Password tidak sesuai.</p>
                            </b-form-group>
                            <p class="font-12-px m-0 text-left text-danger" v-show=otherError>Terjadi kesalahan pada sistem, mohon coba lagi.</p>
                            <b-button type="submit" class="border-0 font-16-px" id="submit-button">Daftar</b-button>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </b-overlay>
</template>

<script>
/* These lines are ignored due to face-api functionality must be tested directly by user */
/* istanbul ignore next */
export default {
    name: 'CashierRegistrationPage',
    data: function() {
        return {
            cashier: {
                cashier_name: '',
                username: '',
                merchant: '',
                merchant_branch: '',
                cashier_password: '',
            },
            password: null,
            confirmationPassword: null,
            showOverlay: false,
            usernameError: false,
            passwordError: false,
            confirmationPasswordError: false,
            otherError: false,
        }
    },
    methods: {
        checkPassword: async function() {
            const isAppropriate = await new Promise((resolve) => {
                const appropriateLength = this.password.length >= 8 && this.password.length <= 20
                const isAphanumeric = this.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)  
                if (!appropriateLength || !isAphanumeric) {
                    this.passwordError = true;
                    resolve(false);
                } else if (this.password != this.confirmationPassword) {
                    this.confirmationPasswordError = true;
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            return isAppropriate
        },
        encryptPassword: function() {
            const fib = [1, 2, 3, 5, 8, 13, 21];
            var passw = this.password;
            const passLen = passw.length;

            var new_pass = [];
            var i = 0;
            var count = 0;

            while(passLen > count){
                if(fib.includes(i)){
                    new_pass.push(passw.charAt(i));
                }
                else{
                    new_pass.push(passw.charAt(count));
                    count++;
                }
                i++;
            }

            var uni = this.toUnicode(new_pass);

            return "EN" + uni.join("") + "CRYPTED";
        },
        toUnicode: function(x){
            var uni = [];
            for(var i=0; i<x.length; i++){
                uni.push(x[i].charCodeAt(0)+x.length);
            }

            return uni;
        },
        submitRegist: async function() {
            this.showOverlay = true;
            this.usernameError = false;
            this.passwordError = false;
            this.confirmationPasswordError = false;
            this.otherError = false;
            
            const appropriatePassword = await this.checkPassword();
            if (appropriatePassword) {
                this.cashier.cashier_password = await this.encryptPassword();
                const cashier = JSON.stringify(this.cashier);
                this.$store.dispatch('regist', cashier)
                .then(() => this.$router.push({ path: '/' }))
                .catch(error => {
                    try {
                        if (error.response.data.message == "Duplicate Username Error") {
                            this.usernameError = true;
                        } else {
                            this.otherError = true;
                        }
                    } catch {
                        this.otherError = true;
                    }
                    this.showOverlay = false;
                })
            } else {
                this.showOverlay = false;
            }
        }
    }
};
</script>

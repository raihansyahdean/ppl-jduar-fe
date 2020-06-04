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
                        <p class="font-18-px font-weight-bold">LOGIN KASIR</p>
                    </div>
                    <div id="form-div">
                        <b-form @submit.prevent="onSubmit">
                            <b-form-group>
                                <b-input v-model="user.username" placeholder="Username" required></b-input>
                                <p class="font-12-px m-0 text-left text-danger" v-show=usernameError>Username tidak ada.</p>
                            </b-form-group>
                            <b-form-group>
                                <b-input v-model="password" type="password" placeholder="Password" required></b-input>
                                <p class="font-12-px m-0 text-left text-danger" v-show=passwordError>Password salah.</p>
                            </b-form-group>
                            <p class="font-12-px m-0 text-left text-danger" v-show=otherError>Terjadi kesalahan pada sistem, mohon coba lagi.</p>
                            <b-button type="submit" class="border-0 font-16-px" id="submit-button">Masuk</b-button>
                        </b-form>
                    </div>
                    <div>
                        <p class="font-12-px" id="no-account">Tidak punya akun?
                            <a href="/cashier/registration">Daftar</a>
                        </p>
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
    name: 'CashierLoginPage',
    data: function() {
        return {
            user: {
                username: '',
                cashier_password: '',
            },
            password: null,
            showOverlay: false,
            usernameError: false,
            passwordError: false,
            otherError: false,
        }
    },
    methods: {
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
        onSubmit: async function() {
            this.showOverlay = true;
            this.usernameError = false;
            this.passwordError = false;
            this.otherError = false;
            
            this.user.cashier_password = await this.encryptPassword();
            const user = JSON.stringify(this.user);
            this.$store.dispatch('login', user)
            .then(() => this.$router.push({ path: '/' } ))
            .catch(error => {
                try {
                    if (error.response.data.message == "Username not found") {
                        this.usernameError = true;
                    } else if (error.response.data.message == "Wrong Password") {
                        this.passwordError = true;
                    } else {
                        this.otherError = true;
                    }
                }
                catch {
                    this.otherError = true;
                }                
                this.showOverlay = false;
            })
        }
    }
};
</script>

<style>
#no-account {
    margin: 2rem 0;
    color: #9FA4AA!important;
}

#no-account a {
    color: #29ABE2!important;
}
</style>
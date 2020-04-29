<template>
    <div class="vertical-center text-center justify-content-center">
        <div class="d-inline-block">
            <div class="passcode-content p-5">
                <div>
                    <div><p class="font-16-px font-weight-bold">Pilih Passcode</p></div>
                </div>
                <div id="passcode-icons">
                    <div v-for="id in generatePasscode" :key="id.first" class="row">
                        <div class="col passcode-circle m-4" v-b-modal="'confirmation-modal'" v-bind:id="'passcode-' + id.first" @click="clickedPasscode(id.first)">
                            <img class="passcode-icon" alt="passcode" :src="require('@/assets/img/PasscodePage/' + id.first + '.png')">
                        </div>
                        <div class="col passcode-circle m-4" v-b-modal="'confirmation-modal'" v-if="id.second != 'empty'" v-bind:id="'passcode-' + id.second" @click="clickedPasscode(id.second)">
                            <img class="passcode-icon" alt="passcode" :src="require('@/assets/img/PasscodePage/' + id.second + '.png')">
                        </div>
                        <div class="col passcode-circle empty-icon m-4" v-if="id.second == 'empty'">
                        </div>
                    </div>
                </div>
                <div>
                    <b-modal ref="confirmation-modal" :hide-header="true" :hide-footer="true" id="confirmation-modal" :static="true" size="sm" centered>
                    <p class="font-18-px text-center" id="modal-title">Pilih Passcode ini?</p>
                    <div class="text-center modal-footer-template">
                        <b-button class="modal-button mx-2" id="yes-button" size="sm" @click="choosePasscode">Ya</b-button>
                        <b-button class="modal-button mx-2" id="no-button" size="sm" @click="hideModal">Tidak</b-button>
                    </div>
                </b-modal>
                </div>
            </div>
            <div class="px-5" id="cancel">
                <a href="/" class="font-16-px text-decoration-none" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'IdentificationPasscodePage',
    data: function () {
        return {
            chosenPasscode: null,
        }
    },
    computed: {
        generatePasscode: function() {
            var storedPasscodesIDs = this.$store.state.passcodeIDs;
            if (this.$store.state.passcodeIDs == undefined || storedPasscodesIDs.length == 0) {
                window.location = "/identification/fail";
            } else {
                storedPasscodesIDs = this.rearrangePasscode(storedPasscodesIDs);
            }
            this.$store.commit('updateIds', [])
            return storedPasscodesIDs;
        },
    },
    methods: {
        rearrangePasscode: function(passcodesIDs){
            var rearrangedPasscodeIDs = [];
            for (var i = 0; i < passcodesIDs.length; i+=2) {
                if ((i == passcodesIDs.length - 1) && (passcodesIDs.length % 2 == 1)) {
                    rearrangedPasscodeIDs.push({first: passcodesIDs[i], second: "empty"});
                } else {
                    rearrangedPasscodeIDs.push({first: passcodesIDs[i], second: passcodesIDs[i+1]});
                }
            }
            return rearrangedPasscodeIDs;
        },
        clickedPasscode: function(passcodeID){
            this.chosenPasscode = passcodeID;
        },
        choosePasscode: async function(){
            const payloadData = JSON.parse(JSON.stringify({"passcode" : this.chosenPasscode}));
            axios({
                method: 'post',
                url: process.env.VUE_APP_URL_BE + "/crossroads/identifypasscode/",
                data: payloadData
            })
            .then(response => {
                console.log(response.data.message);
                if (response.data.message.includes("Incorrect")) {
                    this.$router.push({ path: '/identification/fail' }); 
                }
                else {
                    this.$router.push({ path: '/identification/success' });
                }
            })
            .catch(error => {
                console.log(error.response);
                this.$router.push({ path: '/identification/fail' }); 
            });
        },
        hideModal: function() {
            this.$refs['confirmation-modal'].hide();
        }
    }
};
</script>

<style>
/* Passcode Part */
.passcode-circle {
    background-color: #F9F9F9;
    height: 100px;
    width: 100px!important;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    background-size: cover;
    padding: 20px;
    cursor: pointer;
}

.empty-icon {
    background-color: #ffffff!important;
}

.passcode-icon {
    height: 60px;
    width: 60px;
}

/* Modal Part */
#modal-title{
    padding-top: 10px;
}

.modal-footer-template {
    margin-top: 41px;
}

.modal-button {
    color: #ffffff!important;
    border-radius: 10px!important;
    width: 95px;
    height: 36px;
    border: none!important;
}

#yes-button {
    background-color: #29ABE2;
}

#no-button {
    background: #828282;
}
</style>


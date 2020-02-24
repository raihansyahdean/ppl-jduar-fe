<template>
    <div class="text-center">
        <div id ="ready-page">
            <div id="camera">
                <div class="mx-auto d-block" id="circle"></div>
            </div>
            <div id="instruction">
                <p class="sentence">Pertama-tama, posisikan kepala Anda di dalam lingkaran. Lalu, gerakkan kepala Anda sesuai dengan instruksi yang diberikan.</p>
            </div>
            <div>
                <b-button id="start-button">Mulai</b-button>
            </div>
            <div class="text-right" id="cancel">
                <a href="/" class="sentence" id="cancel-link">Batal</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate: function() {
        document.body.className = 'black';
    },
    name: 'ReadyPage',
}
</script>

<style>
#ready-page {
    width: 360px; 
    height: 640px;
    display: inline-block;
}

#circle {
    background-color: #FFFFFF;
    height: 230px;
    width: 230px;
    border-radius: 50%;
    margin-top: 80px;
}

#instruction {
    margin: 2.5rem 3rem;
}

.sentence {
    color: #FFFFFF;
}

#start-button {
    padding: 3px 5rem;
    background-color: #6785FD;
}

#cancel {
    margin: 3rem 4rem;
}

#cancel-link:hover {
    color: #FFFFFF;
    text-decoration: none;
}
</style>


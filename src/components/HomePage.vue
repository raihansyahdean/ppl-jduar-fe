<template>
<div style="text-align: center;">
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Link</b-nav-item>
          <b-nav-item href="/" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  <div style="margin-top:3vw">
  <router-link to="/ready">
      <img id='register-image'
      style="margin:1vw;"
      @mouseover="mouseOverRegister"
      @mouseleave="mouseLeaveRegister" 
      @mousedown="mouseClickRegister"
      :src="imageRegister"/>
  </router-link>

  <div>
    <router-link to="/">
        <img id='identify-image'
        @mouseover="mouseOverIdentify"
        @mouseleave="mouseLeaveIdentify" 
        @mousedown="mouseClickIdentify"
        :src="imageIdentify"/>
    </router-link>
  </div>

  </div>

</div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            imageIdentify:require("../assets/Identify Default.png"),
            imageRegister:require("../assets/Register Default.png")
        }
    },
    methods: {
        mouseOverRegister: function(){
            this.imageRegister = require("../assets/Register Hover.png")
        },
        mouseLeaveRegister: function(){
            this.imageRegister = require("../assets/Register Default.png")
        },
        mouseClickRegister: function(){
            this.imageRegister = require("../assets/Register Clicked.png")
        },

        mouseOverIdentify: function(){
            this.imageIdentify = require("../assets/Identify Hover.png")
        },
        mouseLeaveIdentify: function(){
            this.imageIdentify = require("../assets/Identify Default.png")
        },
        mouseClickIdentify: function(){
            this.imageIdentify = require("../assets/Identify Clicked.png")
        }
    }

}
</script>
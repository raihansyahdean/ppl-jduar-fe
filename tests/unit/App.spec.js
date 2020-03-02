import { mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import routes from "@/routes.js"

describe('App.vue', () => {
  const wrapper = mount(App, {
    stubs: ['router-view']
  })

  it('it contains tag router-view', () => {
    expect(wrapper.html()).toContain('<router-view-stub></router-view-stub>')
  })
})

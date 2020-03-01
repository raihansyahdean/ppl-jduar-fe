import { mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import routes from "@/routes.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("App", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { 
      localVue,
      stubs: ["b-navbar-nav", "b-nav-item", "b-collapse", "b-navbar-toggle", "b-navbar", "b-navbar-brand"],
      router
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('NavBar')
  });
})
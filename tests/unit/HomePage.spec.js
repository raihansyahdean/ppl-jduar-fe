import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('HomePage.vue', () => {
    const wrapper = shallowMount(HomePage, {
        localVue,
        stubs: ["b-navbar-nav", "b-nav-item", "b-collapse", "b-navbar-toggle", "b-navbar", "b-navbar-brand"]
    });
    it("Test navbar and init image", async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('NavBar')
        expect(wrapper.vm.$data.imageIdentify).toBe(require('@/assets/Identify Default.png'))
        expect(wrapper.vm.$data.imageRegister).toBe(require('@/assets/Register Default.png'))
    });

    it("Test register image", async () => {
        var imgRegister = wrapper.find('#register-image')
        imgRegister.trigger('mouseover')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Register Hover.png'))

        imgRegister.trigger('mouseleave')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Register Default.png'))

        imgRegister.trigger('mousedown')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Register Clicked.png'))
    });

    it("Test identification image", async () => {
        var imgRegister = wrapper.find('#identify-image')
        imgRegister.trigger('mouseover')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Identify Hover.png'))

        imgRegister.trigger('mouseleave')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Identify Default.png'))

        imgRegister.trigger('mousedown')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/Identify Clicked.png'))
    });
})

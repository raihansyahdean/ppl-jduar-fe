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
        expect(wrapper.html()).toContain('Smart CRM')
        expect(wrapper.vm.$data.imageIdentify).toBe(require('@/assets/img/HomePage/Identify Default.png'))
        expect(wrapper.vm.$data.imageRegister).toBe(require('@/assets/img/HomePage/Register Default.png'))
    });

    it("Test register image", async () => {
        var imgRegister = wrapper.find('#register-image')
        imgRegister.trigger('mouseover')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Register Hover.png'))

        imgRegister.trigger('mouseleave')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Register Default.png'))

        imgRegister.trigger('mousedown')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Register Clicked.png'))
    });

    it("Test identification image", async () => {
        var imgRegister = wrapper.find('#identify-image')
        imgRegister.trigger('mouseover')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Identify Hover.png'))

        imgRegister.trigger('mouseleave')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Identify Default.png'))

        imgRegister.trigger('mousedown')
        await wrapper.vm.$nextTick()
        expect(imgRegister.attributes("src")).toBe(require('@/assets/img/HomePage/Identify Clicked.png'))
    });
})

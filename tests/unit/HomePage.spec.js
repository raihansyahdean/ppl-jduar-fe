import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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
    

    it("Test register image mouseover and mouseleave function", async () => {
        const mouseOverRegister = jest.fn();
        const mouseLeaveRegister = jest.fn();

        const wrapper2 = shallowMount(HomePage, {
            localVue,
            stubs: ["b-navbar-nav", "b-nav-item", "b-collapse", "b-navbar-toggle", "b-navbar", "b-navbar-brand"],
            methods: {
                mouseLeaveRegister,
                mouseOverRegister
            }, data() {
                return {
                    imageRegister: require("@/assets/Register Default.png") 
                }
            }
        });

        await wrapper2.vm.$nextTick()
        var imgRegister = wrapper2.find('#register-image')
        imgRegister.trigger('mouseover')
        expect(mouseOverRegister).toBeCalled()
        expect(wrapper2.vm.$data.imageRegister).toBe(require('@/assets/Register Clicked.png'))

        imgRegister.trigger('mouseleave')
        expect(mouseLeaveRegister).toBeCalled()
        expect(wrapper2.vm.$data.imageRegister).toBe(require('@/assets/Register Default.png'))

    });

    it("Test identify image mouseover and mouseleave function", async () => {
        const mouseOverIdentify = jest.fn();
        const mouseLeaveIdentify = jest.fn();

        const wrapper3 = shallowMount(HomePage, {
            localVue,
            stubs: ["b-navbar-nav", "b-nav-item", "b-collapse", "b-navbar-toggle", "b-navbar", "b-navbar-brand"],
            methods: {
                mouseLeaveIdentify,
                mouseOverIdentify
            }, data() {
                return {
                    imageIdentify: require("@/assets/Identify Default.png") 
                }
            }
        });

        await wrapper3.vm.$nextTick()
        var imgIdentify = wrapper3.find('#identify-image')
        imgIdentify.trigger('mouseover')
        expect(mouseOverIdentify).toBeCalled()
        expect(wrapper3.vm.$data.imageIdentify).toBe(require('@/assets/Identify Clicked.png'))

        imgIdentify.trigger('mouseleave')
        expect(mouseLeaveIdentify).toBeCalled()
        expect(wrapper3.vm.$data.imageIdentify).toBe(require('@/assets/Identify Default.png'))

    });
})

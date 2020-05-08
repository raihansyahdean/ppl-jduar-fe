import { mount } from '@vue/test-utils'
import IdentificationInstructionPage from '@/components/IdentificationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import 'jest-canvas-mock'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('IdentificationInstructionPage.vue', () => {
    it('contains camera video', () => {
        const wrapper = mount(IdentificationInstructionPage);
        expect(wrapper.html()).toContain('id="video"');
    });

    it('contains identification instruction', () => {
      const wrapper = mount(IdentificationInstructionPage);
      expect(wrapper.html()).toContain('Hadapkan kepala Anda ke arah depan.');
    });

    it('does not contain manual Ambil Foto button', () => {
      const wrapper = mount(IdentificationInstructionPage);
      expect(wrapper.find('#shoot-button').exists()).toBe(false);
    });
  
  
})
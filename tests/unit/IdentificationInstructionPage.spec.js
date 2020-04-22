import { mount } from '@vue/test-utils'
import IdentificationInstructionPage from '@/components/IdentificationInstructionPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import {render, fireEvent} from '@testing-library/vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"
import 'jest-canvas-mock'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('IdentificationInstructionPage.vue', () => {
    it('contains camera video tag', () => {
        const wrapper = mount(IdentificationInstructionPage);
        expect(wrapper.html()).toContain('<video></video>');
    });

    it('changes page after taking photos', async () => {
        const router = new VueRouter({ routes });
        const {getByText} = render(IdentificationInstructionPage, {routes});
        const button = getByText('Ambil Foto');
        await fireEvent.click(button);
        router.push("/identification/passcode");
        expect(router.currentRoute.fullPath).toBe("/identification/passcode");
    });
})
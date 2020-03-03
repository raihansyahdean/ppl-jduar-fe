import { mount } from '@vue/test-utils'
import ReadyPage from '@/components/ReadyPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import VueRouter from "vue-router"
import routes from "@/routes.js"

Vue.use(BootstrapVue);
Vue.use(VueRouter);

describe('ReadyPage.vue', () => {
  const router = new VueRouter({ routes });
  const wrapper = mount(ReadyPage, { 
    Vue,
    router
  });

  it('it contains ready page instruction', () => {
    expect(wrapper.html()).toContain('Posisikan wajah anda di hadapan kamera');
  });

  it('it redirect the page to instruction page if Mulai Button is clicked', async () => {
    const button = wrapper.find('#start-button');
    button.trigger('click');
    router.push("/start");
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.fullPath).toBe('/start');
    });
})

import { mount } from '@vue/test-utils'
import Camera from '@/components/Camera.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('Camera.vue', () => {
  const wrapper = mount(Camera)

  it('it contains the video', () => {
    expect(wrapper.html()).toContain('<video></video')
  })
})
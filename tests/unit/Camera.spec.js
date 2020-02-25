import { mount } from '@vue/test-utils'
import Camera from '@/components/Camera.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

const wrapper = mount(Camera)

describe('Camera', () => {

  it('contains the video', () => {
    expect(wrapper.contains('video')).toBe(true)
  })

  it('has a mounted hook', () => {
    expect(typeof Camera.mounted).toBe('function')
  })

  it('sets the correct default data', () => {
    expect(typeof Camera.data).toBe('function')
    const defaultData = Camera.data()
    expect(defaultData.mediaStream).toBe(null)
  })
})
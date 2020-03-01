import { shallowMount } from '@vue/test-utils'
import Camera from '@/components/Camera.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('Camera', () => {

  it('contains the video', () => {
    const wrapper = shallowMount(Camera)
    expect(wrapper.contains('video')).toBe(true)
  })

  it('has a mounted hook', () => {
    expect(typeof Camera.mounted).toBe('function')
  })

  it('has a data hook', () => {
    expect(typeof Camera.data).toBe('function')
  })

  it('sets the correct default data', () => {
    const defaultData = Camera.data()
    expect(defaultData.mediaStream).toBe(null)
  })
  
})
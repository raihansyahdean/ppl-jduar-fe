import { mount } from '@vue/test-utils'
import ReadyPage from '@/components/ReadyPage.vue'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('ReadyPage.vue', () => {
  const wrapper = mount(ReadyPage)

  it('it contains ready page instruction', () => {
    expect(wrapper.html()).toContain('Pertama-tama, posisikan kepala Anda di dalam lingkaran')
  })
})

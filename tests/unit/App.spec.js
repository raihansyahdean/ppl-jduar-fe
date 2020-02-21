import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  const wrapper = mount(App)

  it('it contains code with love', () => {
    expect(wrapper.html()).toContain('<p>code with ❤ by JDUAR NVIDIA</p>')
  })
})

import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  const wrapper = mount(App, {
    stubs: ['router-view']
  })

  it('it contains tag router-view', () => {
    expect(wrapper.html()).toContain('<router-view-stub></router-view-stub>')
  })
})

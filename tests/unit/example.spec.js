import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const wrapper = mount(HelloWorld)

  it('it contains ready page instruction', () => {
    expect(wrapper.html()).toContain('Hello World')
  })
})

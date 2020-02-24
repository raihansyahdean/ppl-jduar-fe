import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const wrapper = mount(HelloWorld)

  it('it contains code with love', () => {
    expect(wrapper.html()).toContain('<p>code with ❤ by JDUAR NVIDIA</p>')
  })
})

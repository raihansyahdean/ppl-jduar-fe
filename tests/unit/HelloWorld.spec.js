import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const wrapper = shallowMount(HelloWorld);
  it('it contains code with love', () => {
    expect(wrapper.html()).toContain('<p>code with ❤ by JDUAR NVIDIA</p>')
  });
})

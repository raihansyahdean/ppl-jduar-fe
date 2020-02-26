import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  var msg = "Hello World"
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: msg,
    }
  })
  it('renders props.msg when passed', () => {
    expect(wrapper.text()).toMatch(msg)
  })
})

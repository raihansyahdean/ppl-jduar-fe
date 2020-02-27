import { mount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'

describe('HomePage.vue', () => {
    const wrapper = mount(HomePage);
    it("Test image if no hover", async () => {
        expect(wrapper.html()).toContain('NavBar')
    });
})

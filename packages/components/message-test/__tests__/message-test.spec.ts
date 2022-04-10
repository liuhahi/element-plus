import { mount } from '@vue/test-utils'
import MessageTest from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('MessageTest.vue', () => {
  test('render test', () => {
    const wrapper = mount(MessageTest, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})

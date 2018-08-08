import { mount } from '@vue/test-utils';
import Home from '@/containers/pages/Home';

let wrapper;

beforeEach(() => {
  wrapper = mount(Home);
});

describe('Home.vue', () => {
  it('Should render title text', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('SSR-Page');
  });
  it('Should have class', () => {
    expect(wrapper.classes()).toContain('bg');
  });
});

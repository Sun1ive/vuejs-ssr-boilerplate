import { configure, addDecorator } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

import Vue from 'vue';
import Vuex from 'vuex';
import Main from '../src/containers/layouts/Main';
import storyRouterDecorator from './storyRouterDecorator';

import '../src/filters';

setOptions({
  name: 'Vue SSR boilerplate',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: false,
  sortStoriesByKind: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  sidebarAnimations: true,
  selectedAddonPanel: undefined // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
});

// Install Vue plugins.
Vue.use(Vuex);

const requireContext = require.context('../src', true, /\.story\.js$/);

const loadStories = () => {
  // https://webpack.github.io/docs/context.html
  requireContext.keys().forEach(requireContext);
};

addDecorator((storyFn, context) => {
  const options = storyFn();
  return {
    ...options,
    components: {
      Main,
      ...options.components
    },
    template: `<Main>${options.template}</Main>`
  };
});

addDecorator(storyRouterDecorator());

configure(loadStories, module);

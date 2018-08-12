import Vue from 'vue';
import 'es6-promise/auto'; //eslint-disable-line
import cookieDough from 'cookie-dough';
import { createApp } from './main';

const renderClient = async () => {
  const { app, router, store } = await createApp({
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    initialState: window.__INITIAL_STATE__,
    extras: {
      cookies: cookieDough(),
    },
  });

  // a global mixin that calls `asyncData` when a route component's params change
  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to,
        })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    },
  });
  // wait until router has resolved all async before hooks
  // and async components...
  router.onReady(() => {
    // Add router hook for handling asyncData.
    // Doing it after initial route is resolved so that we don't double-fetch
    // the data that we already have. Using router.beforeResolve() so that all
    // async components are resolved.
    // eslint-disable-next-line
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);

      let diffed = false;

      // matching all components and check difference between routes
      // eslint-disable-next-line
      const activated = matched.filter((component, index) => diffed || (diffed = prevMatched[index] !== component));
      const asyncDataHooks = activated.map(component => component.asyncData).filter(_ => _);
      if (!asyncDataHooks.length) {
        return next();
      }

      Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
        .then(() => {
          next();
        })
        .catch(next);
    });

    // actually mount to DOM
    app.$mount('#app');
  });
};

renderClient();

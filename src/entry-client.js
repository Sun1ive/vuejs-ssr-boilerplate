import Vue from 'vue';
import 'es6-promise/auto'; //eslint-disable-line
import cookieDough from 'cookie-dough';
import { createApp } from './main';

const renderClient = async () => {
  const { app, router } = await createApp({
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    initialState: window.__INITIAL_STATE__,
    extras: {
      cookies: cookieDough()
    }
  });

  // a global mixin that calls `asyncData` when a route component's params change
  Vue.mixin({
    beforeMount() {
      const { asyncData } = this.$options;
      if (asyncData) {
        // assign the fetch operation to a promise
        // so that in components we can do `this.dataPromise.then(...)` to
        // perform other tasks after data is ready
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route,
          router: this.$router
        });
      }
    }
  });

  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to,
          router: this.$router
        })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    }
  });
  // wait until router has resolved all async before hooks
  // and async components...
  router.onReady(() => {
    // actually mount to DOM
    app.$mount('#app');
  });
};

renderClient();

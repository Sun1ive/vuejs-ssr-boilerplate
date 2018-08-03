import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/pages/Home';
import NotFound from '@/containers/pages/NotFound';

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '*', name: 'NotFound', component: NotFound },
];

// eslint-disable-next-line
export function createRouter() {
  // getting access to router object
  const router = new Router({
    base: '/',
    routes,
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
  });
  return router;
}

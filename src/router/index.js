import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// use this dynamic import if you want to split
// your code on chunks
// if don't then use import comp from '...' as usual
const _import = file => () => import(`@/containers/pages/${file}`);

const routes = [
  { path: '/', name: 'home', component: _import('Home') },
  { path: '*', name: 'NotFound404', component: _import('NotFound') },
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

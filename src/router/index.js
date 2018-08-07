import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/pages/Home';
import App from '@/containers/pages/App';
import NotFound from '@/containers/pages/NotFound';

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/app', name: 'app', component: App },
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

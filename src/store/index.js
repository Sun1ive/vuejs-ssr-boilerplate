import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import getInitialState from './getInitialState';

Vue.use(Vuex);

// eslint-disable-next-line
export function createStore({ initialState, externalActions }) {
  // get access to store
  const store = new Vuex.Store({
    state: initialState || getInitialState(),
    actions: { ...externalActions, ...actions },
    mutations,
    getters,
  });
  return store;
}

import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import initialState from './initialState';

Vue.use(Vuex);

// eslint-disable-next-line
export function createStore() {
  return new Vuex.Store({
    state: initialState(),
    actions,
    mutations,
    getters,
  });
}

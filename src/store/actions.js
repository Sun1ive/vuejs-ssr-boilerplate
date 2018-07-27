export const increment = ({ commit }, value = 1) => {
  commit('incrementState', value);
};

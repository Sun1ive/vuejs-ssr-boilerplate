export const increment = ({ commit }, value = 1) => {
  commit('incrementState', value);
};

export const decrement = ({ commit }, value = 1) => {
  commit('decrementState', value);
};

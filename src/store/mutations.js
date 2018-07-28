export const incrementState = (state, payload) => (state.counter = payload); // eslint-disable-line
export const decrementState = (state, payload) => state.counter - payload;

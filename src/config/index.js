import BUILT_IN_VALUES from './process_env';

let RUNTIME_VALUES = {};

if (typeof window !== 'undefined' && window.__CONFIG__) {
  try {
    RUNTIME_VALUES = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}
export default {
  ...BUILT_IN_VALUES,
  ...RUNTIME_VALUES,
};

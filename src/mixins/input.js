// default input mixin that handles input and emits value to parent
// <input v-model="val"> << children
// <child-component v-model="parent_state" /> << parent
export default {
  props: {
    value: {
      required: true,
    },
  },
  computed: {
    val: {
      get: ({ value }) => value,
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};

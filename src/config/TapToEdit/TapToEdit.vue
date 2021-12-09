<template>
  <q-input
    borderless
    v-model="value"
    debounce="500"
    @input="onBlur"
    :input-class="`text-right text-dark ${hasError}`"
    label-slot
    :placeholder="defaultValue"
  >
    <template v-slot:label>
      <div class="row justify-end all-pointer-events">
        <span class="custom-label">{{ label }}</span>
      </div>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'tap-to-edit',
  props: {
    label: {
      type: String,
      default: 'Tap to Edit',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  mounted() {
    this.value = this.defaultValue;
  },
  methods: {
    onBlur() {
      this.$emit('setValue', this.value);
    },
  },
};
</script>

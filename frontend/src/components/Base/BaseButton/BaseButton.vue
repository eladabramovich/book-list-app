<template>
  <button :class="styles.baseButton" :style="inlineStyle" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
import moduleStyles from './BaseButton.module.css';
export default {
  props: {
    inlineStyle: {
      type: Object,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

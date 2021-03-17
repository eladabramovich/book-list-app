<template>
  <p :class="styles.errorMessage" :style="inlineStyle">
    <slot></slot>
  </p>
</template>

<script>
import moduleStyles from './ServerErrorMessage.module.css';
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

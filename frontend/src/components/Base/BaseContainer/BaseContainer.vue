<template>
  <div :class="styles.container">
    <slot></slot>
  </div>
</template>

<script>
import moduleStyles from './BaseContainer.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

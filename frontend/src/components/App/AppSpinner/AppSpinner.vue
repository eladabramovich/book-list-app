<template>
  <div :class="styles.loader">Loading...</div>
</template>

<script>
import moduleStyles from './AppSpinner.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

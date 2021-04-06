<template>
  <BaseButton :class="styles.dangerButton" v-on="$listeners">
    <slot></slot>
  </BaseButton>
</template>

<script>
import moduleStyles from './DangerButton.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

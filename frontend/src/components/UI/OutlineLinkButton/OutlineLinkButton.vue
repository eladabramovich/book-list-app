<template>
  <BaseLinkButton :to="to" :class="styles.outlineLink">
    <slot></slot>
  </BaseLinkButton>
</template>

<script>
import moduleStyles from './OutlineLinkButton.module.css';
export default {
  props: {
    to: {
      type: String,
      requierd: true,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

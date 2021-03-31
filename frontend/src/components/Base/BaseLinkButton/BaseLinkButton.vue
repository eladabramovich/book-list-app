<template>
  <router-link :to="to" :class="styles.baseLinkButton" :style="inlineStyle">
    <slot></slot>
  </router-link>
</template>

<script>
import moduleStyles from './BaseLinkButton.module.css';
export default {
  props: {
    to: {
      type: String,
      defualt: '/',
    },
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

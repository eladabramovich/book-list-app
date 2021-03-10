<template>
  <h1 :class="styles.title">Hello Home</h1>
</template>

<script>
import homeStyles from './HomePage.module.css';
export default {
  computed: {
    styles() {
      return homeStyles;
    },
  },
};
</script>

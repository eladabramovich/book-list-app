<template>
  <button :class="styles.baseButton" :style="inlineStyle" @click="onClicked">
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
    onClicked: {
      type: Function,
      required: true,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

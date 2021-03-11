<template>
  <div :class="styles.drawer">
    <div :class="styles.linksContainer">
      <router-link :class="styles.link" to="/" @click="closeDrawer">
        Home
      </router-link>
      <router-link :class="styles.link" to="/browse" @click="closeDrawer">
        Browse Books
      </router-link>
      <router-link :class="styles.link" to="/register" @click="closeDrawer">
        Login/Register
      </router-link>
    </div>
  </div>
</template>

<script>
import moduleStyles from './AppDrawer.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
  },
};
</script>

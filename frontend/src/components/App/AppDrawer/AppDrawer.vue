<template>
  <div :class="styles.drawer">
    <div :class="styles.linksContainer">
      <router-link :class="styles.link" to="/">
        <span @click="closeDrawer">Home</span>
      </router-link>
      <router-link :class="styles.link" to="/browse">
        <span @click="closeDrawer">Browse Books</span>
      </router-link>
      <router-link v-if="!isUserLoggedin" :class="styles.link" to="/register">
        <span @click="closeDrawer">Login/Register</span>
      </router-link>
      <router-link v-else :class="styles.link" to="/logout">
        <span @click="closeDrawer">Logout</span>
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
    isUserLoggedin() {
      return this.$store.getters.isUserLoggedin;
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
  },
};
</script>

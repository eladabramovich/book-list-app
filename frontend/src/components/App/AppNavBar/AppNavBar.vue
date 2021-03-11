<template>
  <header :class="styles.navbar">
    <router-link to="/">
      <p :class="styles.logo">My Books List</p>
    </router-link>
    <ul :class="`${styles.navList} ${styles.alignCenter}`">
      <li :class="styles.navItem">
        <router-link to="/browse">Browse Books</router-link>
      </li>
    </ul>
    <ul :class="`${styles.navList} ${styles.alignRight}`">
      <li :class="styles.navItem">
        <router-link to="/register">
          <strong>Login/Rgister</strong>
        </router-link>
      </li>
    </ul>
    <div
      :class="`${styles.hamburgerIcon} ${styles.alignRight}`"
      @click="toggleAppDrawer"
    >
      <span :class="styles.line1"></span>
      <span :class="styles.line2"></span>
      <span :class="styles.line3"></span>
    </div>
  </header>
</template>

<script>
import moduleStyles from './AppNavBar.module.css';
export default {
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
  methods: {
    toggleAppDrawer() {
      if (this.isDrawerOpen) {
        this.$emit('closeDrawer');
      } else {
        this.$emit('openDrawer');
      }
    },
  },
};
</script>

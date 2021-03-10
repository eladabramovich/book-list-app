<template>
  <header :class="styles.navbar">
    <router-link to="/">
      <p :class="styles.logo">My Books List</p>
    </router-link>
    <ul :class="styles.navList">
      <li :class="styles.navItem">
        <router-link to="/browse">Browse Books</router-link>
      </li>
    </ul>
    <ul :class="`${styles.navList} ${styles.fixRight}`">
      <li :class="styles.navItem">
        <router-link to="/register">
          <strong>Login/Rgister</strong>
        </router-link>
      </li>
    </ul>
    <div :class="`${styles.hamburgerIcon} ${styles.fixRight}`">
      <span :class="styles.line1"></span>
      <span :class="styles.line2"></span>
      <span :class="styles.line3"></span>
    </div>
  </header>
</template>

<script>
import moduleStyles from './AppNavBar.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

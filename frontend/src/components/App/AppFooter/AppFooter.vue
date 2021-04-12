<template>
  <footer :class="styles.footer">
    <ul>
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/browse">Browse Books</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <p>&copy; {{ year }} My Books List</p>
  </footer>
</template>

<script>
import moduleStyles from './AppFooter.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <header :class="styles.navbar">
    <router-link to="/">
      <p :class="styles.logo">My Books List</p>
    </router-link>
    <ul :class="`${styles.navList} ${styles.alignCenter}`">
      <li :class="styles.navItem">
        <router-link to="/browse?limit=5&page=1&sort=title">
          Browse Books
        </router-link>
      </li>
    </ul>
    <ul :class="`${styles.navList} ${styles.alignRight}`">
      <li
        :class="`${styles.navItem} ${styles.dropdownItem}`"
        v-if="isUserAdmin"
      >
        <span>manage</span>
        <div :class="styles.dropdown">
          <router-link to="/manage/books">Manage Books</router-link>
          <router-link to="/manage/users">Manage Users</router-link>
        </div>
      </li>
      <li :class="styles.navItem" v-if="!isUserLoggedin">
        <router-link to="/register">
          <strong>Login/Rgister</strong>
        </router-link>
      </li>
      <li :class="styles.navItem" v-else>
        <router-link to="/logout">
          <strong>Logout</strong>
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
    isUserLoggedin() {
      return this.$store.getters.isUserLoggedin;
    },
    isUserAdmin() {
      if (this.isUserLoggedin) {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.isAdmin;
      } else {
        return false;
      }
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

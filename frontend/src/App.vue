<template>
  <div id="app">
    <AppNavBar
      :isDrawerOpen="isDrawerOpen"
      @openDrawer="openAppDrawer"
      @closeDrawer="closeAppDrawer"
    />
    <AppDrawer @close="closeAppDrawer" v-if="isDrawerOpen" />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppNavBar from '@/components/App/AppNavBar/AppNavBar.vue';
import AppDrawer from '@/components/App/AppDrawer/AppDrawer.vue';
import AppFooter from '@/components/App/AppFooter/AppFooter.vue';
export default {
  components: {
    AppNavBar,
    AppFooter,
    AppDrawer,
  },
  computed: {
    isDrawerOpen() {
      return this.$store.getters.isAppDrawerOpen;
    },
  },
  created() {
    this.$store.dispatch('shouldLogout');
  },
  methods: {
    closeAppDrawer() {
      document.body.classList.remove('overflow-hidden');
      this.$store.dispatch('toggleAppDrawer', false);
    },
    openAppDrawer() {
      document.body.classList.add('overflow-hidden');
      this.$store.dispatch('toggleAppDrawer', true);
    },
  },
};
</script>

<style>
@import '~normalize.css';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
a {
  text-decoration: none;
}

input:not(type='checkbox') {
  /* Remove Safari styling */
  border-radius: 0;
  -webkit-appearance: none;
}

:root {
  --primary-color: #f1cc03;
  --text-color-primary: #2e2f2f;
  --text-color-links: #6298e7;
  --borders-color-primary: #324438;

  --header-height: 65px;
  --footer-height: 80px;
  --content-min-height: calc(
    100vh - var(--header-height) - var(--footer-height)
  );
}

body {
  font-family: 'Open Sans', 'Helvetica Neue', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page {
  min-height: var(--content-min-height);
}

.overflow-hidden {
  overflow: hidden;
}
</style>

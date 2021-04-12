<template>
  <main :class="`${styles.homePage} page`">
    <BaseContainer>
      <h2 :class="styles.categoryTitle">Newest 5 books on the website</h2>
      <hr :class="styles.divider" />
      <AppSpinner v-if="loading" />
      <ServerErrorMessage v-else-if="error">
        {{ error }}
      </ServerErrorMessage>
      <BooksList :books="newestBooks" v-else />

      <h2 :class="styles.categoryTitle">Top 5 books on the website</h2>
      <hr :class="styles.divider" />
      <AppSpinner v-if="loading" />
      <ServerErrorMessage v-else-if="error">
        {{ error }}
      </ServerErrorMessage>
      <BooksList :books="topBooks" v-else />
    </BaseContainer>
  </main>
</template>

<script>
import axios from 'axios';
import homeStyles from './HomePage.module.css';

import BooksList from '@/components/Books/BooksList/BooksList.vue';
export default {
  components: {
    BooksList,
  },
  metaInfo: {
    title: 'Home',
  },
  computed: {
    styles() {
      return homeStyles;
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      newestBooks: [],
      topBooks: [],
    };
  },
  async created() {
    this.loading = true;
    try {
      const newestBooksReq = await axios.get('/api/books?limit=5');
      this.newestBooks = newestBooksReq.data.data;

      const topBooksReq = await axios.get(
        '/api/books?sort=-averageScore&limit=5'
      );
      this.topBooks = topBooksReq.data.data;
    } catch (err) {
      this.error = err.message;
      console.error(err);
    }
    this.loading = false;
  },
};
</script>

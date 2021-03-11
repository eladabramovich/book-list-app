<template>
  <main :class="`${styles.homePage} page`">
    <BaseContainer>
      <h2 :class="styles.categoryTitle">Newest 5 books on the website</h2>
      <hr :class="styles.divider" />
      <BooksList :books="newestBooks" />

      <h2 :class="styles.categoryTitle">Top 5 books on the website</h2>
      <hr :class="styles.divider" />
      <BooksList :books="topBooks" />
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
  computed: {
    styles() {
      return homeStyles;
    },
  },
  data() {
    return {
      newestBooks: [],
      topBooks: [],
    };
  },
  async created() {
    try {
      const newestBooksReq = await axios.get('/api/books?limit=5');
      this.newestBooks = newestBooksReq.data.data;

      const topBooksReq = await axios.get(
        '/api/books?sort=-averageScore&limit=5'
      );
      this.topBooks = topBooksReq.data.data;
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

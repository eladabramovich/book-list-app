<template>
  <main :class="`${styles.bookDeatilsPage} page`">
    <BaseContainer>
      <AppSpinner v-if="loading" />
      <ServerErrorMessage v-else-if="error" />
      <div :class="styles.detailsGrid" v-else>
        <div :class="styles.imageCont">
          <img :src="selectedBook.images.large" :alt="selectedBook.title" />
        </div>
        <div :class="styles.titleCont">
          <h1>{{ selectedBook.title }}</h1>
        </div>
        <div :class="styles.contentCont">
          <div :class="styles.metaDetails">
            <div :class="styles.generes">
              <strong>Geners:</strong>
              {{ bookGeners }}
            </div>
            <div :class="styles.score">
              <p>{{ averageScore }}</p>
              <p>Score</p>
            </div>
          </div>
          <hr :class="styles.divider" />
          <p :class="styles.description" v-html="selectedBook.description"></p>
          <hr :class="styles.divider" />
          <Reviews :reviews="reviews" />
        </div>
      </div>
    </BaseContainer>
  </main>
</template>

<script>
import Reviews from '@/components/Reviews/Reviews/Reviews.vue';
import moduleStyles from './BookDetailsPage.module.css';
export default {
  components: {
    Reviews,
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    selectedBook() {
      return this.$store.getters['books/selectedBook'];
    },
    reviews() {
      return this.$store.getters['books/bookReviews'];
    },
    bookGeners() {
      return this.selectedBook.generes.join(', ');
    },
    averageScore() {
      return this.selectedBook.averageScore > 0
        ? this.selectedBook.averageScore.toFixed(2)
        : 0;
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  async created() {
    this.loading = true;
    const bookId = this.$route.params.id;
    try {
      await this.$store.dispatch('books/fetchBookDetails', bookId);
      await this.$store.dispatch('books/fetchBookReviews', bookId);
    } catch (err) {
      this.error = err.message;
      console.error(err);
    }
    this.loading = false;
  },
};
</script>

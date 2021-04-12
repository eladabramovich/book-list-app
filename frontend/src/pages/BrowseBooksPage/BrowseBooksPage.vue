<template>
  <main :class="`${styles.browseBooksPage} page`">
    <BaseContainer>
      <h1 :class="styles.pageHeading">Browse Books</h1>
      <div :class="styles.filterActions">
        <SearchBar @search="searchBook" />
        <ul :class="styles.sortActions">
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: 'title' },
              }"
              >A-Z</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: '-title' },
              }"
              >Z-A</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: '-averageScore' },
              }"
              >Highest Score</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: 'averageScore' },
              }"
              >Lowest Score</router-link
            >
          </li>
        </ul>
      </div>
      <AppSpinner v-if="loading" />
      <ServerErrorMessage v-else-if="error">
        {{ error }}
      </ServerErrorMessage>
      <BooksList :books="books" v-else />
      <Pagination
        :current-page="currentPage"
        :url="$route.fullPath"
        :end-page="totalPages"
      />
    </BaseContainer>
  </main>
</template>

<script>
import FetchBooksList from '@/mixins/FetchBooksList';
import BooksList from '@/components/Books/BooksList/BooksList.vue';
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue';
import Pagination from '@/components/UI/Pagination/Pagination.vue';
import moduleStyles from './BrowseBooksPage.module.css';
export default {
  components: {
    BooksList,
    SearchBar,
    Pagination,
  },
  mixins: [FetchBooksList],
  metaInfo: {
    title: 'Browse',
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
  },
  data() {
    return {
      books: [],
      totalPages: 1,
    };
  },
  watch: {
    $route: async function() {
      const data = await this.fetchData();
      this.books = data.books;
      this.totalPages = data.totalPages;
    },
  },
  methods: {
    searchBook(searchTerm) {
      let url = `${this.$route.path}?limit=5&page=1`;
      if (searchTerm !== '') {
        url += `&title[regex]=${searchTerm}&title[options]=i`;
      }
      this.$router.push(url);
    },
  },
  async created() {
    const data = await this.fetchData();
    this.books = data.books;
    this.totalPages = data.totalPages;
  },
};
</script>

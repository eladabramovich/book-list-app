<template>
  <main :class="`${styles.listBooksPage} page`">
    <BaseContainer>
      <h1 :class="styles.title">List All Books</h1>
      <div :class="styles.filterActions">
        <SearchBar @search="searchBook" placeholder-text="Enter a book name" />
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
                query: { limit: 5, page: 1, sort: 'createdAt' },
              }"
              >Create Date DESC</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: '-createdAt' },
              }"
              >Create Date ASC</router-link
            >
          </li>
        </ul>
      </div>
      <table :class="styles.booksTable">
        <thead>
          <tr>
            <th :class="styles.bookTitle">Title</th>
            <th :class="styles.bookId">ID</th>
            <th :class="styles.createdAt">Created At</th>
            <th :class="styles.updatedAt">Updated At</th>
            <th :class="styles.editLinkCell"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id" :class="styles.row">
            <td :class="styles.bookTitle">{{ book.title }}</td>
            <td :class="styles.bookId">{{ book._id }}</td>
            <td :class="styles.createdAt">{{ formateDate(book.createdAt) }}</td>
            <td :class="styles.updatedAt">{{ formateDate(book.updatedAt) }}</td>
            <td :class="styles.editLinkCell">
              <router-link :to="`/manage/books/${book._id}`">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :current-page="currentPage"
        :url="$route.fullPath"
        :end-page="totalPages"
      />
      <div :class="styles.ctaBtnCont">
        <BaseLinkButton to="/manage/books/add" :class="styles.addBookBtn">
          Add New Book</BaseLinkButton
        >
      </div>
    </BaseContainer>
  </main>
</template>

<script>
import dayjs from 'dayjs';
import FetchBooksList from '@/mixins/FetchBooksList';
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue';
import Pagination from '@/components/UI/Pagination/Pagination.vue';
import moduleStyles from './ListBooksPage.module.css';
export default {
  components: {
    SearchBar,
    Pagination,
  },
  mixins: [FetchBooksList],
  metaInfo: {
    title: 'Manage Books',
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
    formateDate(dateStr) {
      return dayjs(dateStr).format('HH:mm DD/MM/YYYY');
    },
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

<template>
  <main :class="`${styles.listBooksPage} page`">
    <BaseContainer>
      <h1 :class="styles.title">List All Books</h1>
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
              <router-link to="/">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div :class="styles.ctaBtnCont">
        <BaseLinkButton to="/" :class="styles.addBookBtn"
          >Add New Book</BaseLinkButton
        >
      </div>
    </BaseContainer>
  </main>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import moduleStyles from './ListBooksPage.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    formateDate(dateStr) {
      return dayjs(dateStr).format('HH:mm DD/MM/YYYY');
    },
  },
  async created() {
    const page = this.$route.query.page || '1';
    try {
      const { data } = await axios.get(`/api/books?limit=5&page=${page}`);
      this.books = data.data;
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

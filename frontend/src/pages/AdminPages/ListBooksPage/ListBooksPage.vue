<template>
  <main :class="`${styles.listBooksPage} page`">
    <BaseContainer>
      <h1 :class="styles.title">List All Books</h1>
      <SearchBar @search="searchBook" />
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
      <div :class="styles.ctaBtnCont">
        <BaseLinkButton to="/manage/books/add" :class="styles.addBookBtn"
          >Add New Book</BaseLinkButton
        >
      </div>
    </BaseContainer>
  </main>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue';
import moduleStyles from './ListBooksPage.module.css';
export default {
  components: {
    SearchBar,
  },
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
    async fetchData() {
      let qsStr = '';
      const qsKeys = Object.keys(this.$route.query);
      for (let i = 0; i <= qsKeys.length - 1; i++) {
        if (i === 0) {
          qsStr += '?';
        } else {
          qsStr += '&';
        }
        qsStr += `${qsKeys[i]}=${this.$route.query[qsKeys[i]]}`;
      }
      const page = this.$route.query.page || '1';
      const url =
        qsKeys.length > 0
          ? '/api/books' + qsStr
          : `/api/books?limit=5&page=${page}`;
      try {
        const { data } = await axios.get(url);
        this.books = data.data;
      } catch (err) {
        console.error(err);
      }
    },
    searchBook(searchTerm) {
      let url = `${this.$route.path}?limit=5&page=1`;
      if (searchTerm !== '') {
        url += `&title[regex]=${searchTerm}&title[options]=i`;
      }
      this.$router.push(url);
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

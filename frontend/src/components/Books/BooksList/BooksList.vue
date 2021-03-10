<template>
  <div :class="styles.booksList">
    <BooksListItem
      v-for="book in books"
      :key="book._id"
      :id="book._id"
      :title="book.title"
      :images="book.images"
      :score="book.averageScore"
    />
  </div>
  <!-- https://via.placeholder.com/96x132 -->
</template>

<script>
import moduleStyles from './BooksList.module.css';
import BooksListItem from '@/components/Books/BooksListItem/BooksListItem.vue';
export default {
  components: {
    BooksListItem,
  },
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      this.error = null;
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
      this.loading = true;
      try {
        const { data } = await axios.get(url);
        this.loading = false;
        return {
          books: data.data,
          totalPages: data.pagination.pageCount,
        };
      } catch (err) {
        this.loading = false;
        console.error(err);
        this.error = err.response.data.message;
      }
    },
  },
};

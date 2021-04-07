<template>
  <div :class="styles.pagination">
    <router-link :to="prevLinkObj" v-if="currentPage > 1">
      {{ currentPage - 1 }}
    </router-link>
    <router-link :to="linkObj">{{ currentPage }}</router-link>
    <router-link :to="nextLinkObj" v-if="currentPage + 1 <= endPage">
      {{ currentPage + 1 }}
    </router-link>
  </div>
</template>

<script>
import moduleStyles from './Pagination.module.css';
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    endPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    linkObj() {
      const pathEndIndex = this.url.indexOf('?');
      if (pathEndIndex === -1) {
        return {
          path: this.url,
          query: {
            limit: 5,
            page: 1,
          },
        };
      }
      const qsStr = new URLSearchParams(this.url.slice(this.url.indexOf('?')));
      const linkObj = {
        path: this.url.substr(0, pathEndIndex),
        query: {},
      };
      for (let item of qsStr.entries()) {
        if (item[0] === 'page') {
          linkObj.query[item[0]] = parseInt(item[1]);
        } else {
          linkObj.query[item[0]] = item[1];
        }
      }
      return linkObj;
    },
    prevLinkObj() {
      const linkObj = {
        ...this.linkObj,
        query: {
          ...this.linkObj.query,
          page: this.linkObj.query.page === 1 ? 1 : this.linkObj.query.page - 1,
        },
      };
      return linkObj;
    },
    nextLinkObj() {
      const linkObj = {
        ...this.linkObj,
        query: {
          ...this.linkObj.query,
          page: this.linkObj.query.page + 1,
        },
      };
      return linkObj;
    },
  },
};
</script>

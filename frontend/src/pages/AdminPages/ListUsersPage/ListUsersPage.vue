<template>
  <main :class="`${styles.listUsersPage} page`">
    <BaseContainer>
      <h1 :class="styles.title">List All Users</h1>
      <div :class="styles.filterActions">
        <SearchBar @search="searchUser" placeholder-text="Enter a username" />
        <ul :class="styles.sortActions">
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: 'username' },
              }"
              >A-Z</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                path: $route.path,
                query: { limit: 5, page: 1, sort: '-username' },
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
      <table :class="styles.usersTable">
        <thead>
          <tr>
            <th :class="styles.username">Username</th>
            <th :class="styles.userId">ID</th>
            <th :class="styles.createdAt">Created At</th>
            <th :class="styles.updatedAt">Updated At</th>
            <th :class="styles.editLinkCell"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" :class="styles.row">
            <td :class="styles.username">{{ user.username }}</td>
            <td :class="styles.userId">{{ user._id }}</td>
            <td :class="styles.createdAt">{{ formateDate(user.createdAt) }}</td>
            <td :class="styles.updatedAt">{{ formateDate(user.updatedAt) }}</td>
            <td :class="styles.editLinkCell">
              <router-link :to="`/manage/users/${user._id}`">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :current-page="currentPage"
        :url="$route.fullPath"
        :end-page="totalPages"
      />
    </BaseContainer>
  </main>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue';
import Pagination from '@/components/UI/Pagination/Pagination.vue';
import moduleStyles from './ListUsersPage.module.css';
export default {
  components: {
    SearchBar,
    Pagination,
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
      users: [],
      totalPages: 1,
    };
  },
  watch: {
    $route: 'fetchData',
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
      const token = this.$store.getters.token;
      const url =
        qsKeys.length > 0
          ? '/api/users' + qsStr
          : `/api/users?limit=5&page=${page}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = data.data;
        this.totalPages = data.pagination.pageCount;
      } catch (err) {
        console.error(err);
      }
    },
    searchUser(searchTerm) {
      let url = `${this.$route.path}?limit=5&page=1`;
      if (searchTerm !== '') {
        url += `&title[regex]=${searchTerm}&title[options]=i`;
      }
      this.$router.push(url);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

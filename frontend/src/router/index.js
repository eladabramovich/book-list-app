import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/HomePage/HomePage.vue';
import Auth from '../pages/AuthPage/AuthPage.vue';
import Logout from '../pages/LogoutPage/LogoutPage.vue';
import BookDetails from '../pages/BookDetailsPage/BookDetailsPage.vue';
import ListBooksPage from '../pages/AdminPages/ListBooksPage/ListBooksPage.vue';
import AddBookPage from '../pages/AdminPages/AddBookPage/AddBookPage.vue';
import EditBookPage from '../pages/AdminPages/EditBookPage/EditBookPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/book/:id',
    name: 'bookDetails',
    component: BookDetails,
  },
  {
    path: '/manage/books',
    name: 'listBooks',
    component: ListBooksPage,
  },
  {
    path: '/manage/books/add',
    name: 'addBook',
    component: AddBookPage,
  },
  {
    path: '/manage/books/:id',
    name: 'editBook',
    component: EditBookPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/HomePage/HomePage.vue';
import Auth from '../pages/AuthPage/AuthPage.vue';
import Logout from '../pages/LogoutPage/LogoutPage.vue';
import BrowseBooksPage from '../pages/BrowseBooksPage/BrowseBooksPage.vue';
import BookDetails from '../pages/BookDetailsPage/BookDetailsPage.vue';

const About = () => import('../pages/AboutPage/AboutPage.vue');
const ListBooksPage = () =>
  import(
    /* webpackChunkName: "admin-books" */ '../pages/AdminPages/ListBooksPage/ListBooksPage.vue'
  );
const AddBookPage = () =>
  import(
    /* webpackChunkName: "admin-books" */ '../pages/AdminPages/AddBookPage/AddBookPage.vue'
  );
const EditBookPage = () =>
  import(
    /* webpackChunkName: "admin-books" */ '../pages/AdminPages/EditBookPage/EditBookPage.vue'
  );
const ListUsersPage = () =>
  import(
    /* webpackChunkName: "admin-users" */ '../pages/AdminPages/ListUsersPage/ListUsersPage.vue'
  );
const EditUserPage = () =>
  import(
    /* webpackChunkName: "admin-users" */ '../pages/AdminPages/EditUserPage/EditUserPage.vue'
  );

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
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
    path: '/browse',
    name: 'browseBooks',
    component: BrowseBooksPage,
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
    meta: {
      requiresAuth: true,
      requiresAdminRole: true,
    },
  },
  {
    path: '/manage/books/add',
    name: 'addBook',
    component: AddBookPage,
    meta: {
      requiresAuth: true,
      requiresAdminRole: true,
    },
  },
  {
    path: '/manage/books/:id',
    name: 'editBook',
    component: EditBookPage,
    meta: {
      requiresAuth: true,
      requiresAdminRole: true,
    },
  },
  {
    path: '/manage/users',
    name: 'listUsers',
    component: ListUsersPage,
    meta: {
      requiresAuth: true,
      requiresAdminRole: true,
    },
  },
  {
    path: '/manage/users/:id',
    name: 'editUser',
    component: EditUserPage,
    meta: {
      requiresAuth: true,
      requiresAdminRole: true,
    },
  },
  {
    path: '**',
    name: '404',
    redirect: '/',
  },
];

function isUserLoggedIn() {
  return localStorage.getItem('user') !== null;
}

function isAdminUser() {
  let flag = false;
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    if (user.isAdmin) {
      flag = true;
    }
  }
  return flag;
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.path },
      });
    } else {
      next();
    }
  } else {
    next();
  }

  if (to.matched.some((record) => record.meta.requiresAdminRole)) {
    if (!isAdminUser()) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

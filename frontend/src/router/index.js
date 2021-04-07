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

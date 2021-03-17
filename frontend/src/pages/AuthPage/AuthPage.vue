<template>
  <main :class="`${styles.authPage} page`">
    <BaseContainer>
      <h1 :class="styles.title">{{ authActionText }}</h1>
      <form @submit.prevent="submitForm" novalidate="novalidate">
        <div :class="styles.formGroup" v-if="!isLogin">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            :class="[errors.username ? styles.error : '']"
            v-model.lazy.trim="$v.username.$model"
          />
          <p :class="styles.errorMessage">
            {{ errors.username }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            :class="[errors.email ? styles.error : '']"
            v-model.trim="$v.email.$model"
          />
          <p :class="styles.errorMessage">
            {{ errors.email }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            :class="[errors.password ? styles.error : '']"
            v-model.lazy.trim="$v.password.$model"
          />
          <p :class="styles.errorMessage">
            {{ errors.password }}
          </p>
        </div>
        <div :class="styles.formGroup" v-if="!isLogin">
          <label for="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm Password"
            :class="[errors.confirm_password ? styles.error : '']"
            v-model.lazy.trim="$v.confirm_password.$model"
          />
          <p :class="styles.errorMessage">
            {{ errors.confirm_password }}
          </p>
        </div>
        <div :class="styles.btnContainer">
          <button
            type="button"
            :class="styles.switchModeBtn"
            @click="switchMode"
          >
            Switch To {{ isLogin ? 'Register' : 'Login' }}
          </button>
          <AppSpinner v-if="loading" />
          <ServerErrorMessage v-else-if="serverError">
            {{ serverError }}
          </ServerErrorMessage>
          <button :class="styles.submitBtn" v-else>
            <span>{{ authActionText }}</span>
          </button>
        </div>
      </form>
    </BaseContainer>
  </main>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators';
import moduleStyles from './AuthPage.module.css';
export default {
  data() {
    return {
      loading: false,
      serverError: null,
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
    };
  },
  validations() {
    if (this.isLogin) {
      return {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      };
    } else {
      return {
        username: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(70),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
        confirm_password: {
          required,
          sameAs: sameAs('password'),
        },
      };
    }
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    isLogin() {
      return this.$route.query.login ? true : false;
    },
    authActionText() {
      return this.isLogin ? 'Login' : 'Register';
    },
  },
  methods: {
    async submitForm() {
      this.setErrorMessages();
      if (this.$v.$invalid) return;

      this.loading = true;
      this.serverError = null;
      let data;
      if (this.isLogin) {
        data = {
          email: this.email,
          password: this.password,
        };
      } else {
        data = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        };
      }

      try {
        await this.$store.dispatch('authUser', {
          action: this.isLogin ? 'login' : 'register',
          userData: data,
        });
        this.$router.replace('/');
      } catch (err) {
        this.serverError = err.message;
        console.error(err);
      }

      this.loading = false;
    },
    setErrorMessages() {
      if (this.$v.username && this.$v.username.$error) {
        if (!this.$v.username.required) {
          this.errors.username = 'This field is required';
        } else if (!this.$v.username.minLength) {
          this.errors.username = 'Please enter at least 2 characters';
        } else if (!this.$v.username.maxLength) {
          this.errors.username = 'Please enter no more than 70 characters';
        }
      } else if (
        this.$v.username &&
        this.$v.username.$invalid &&
        !this.$v.username.$dirty
      ) {
        this.errors.username = 'This field is required';
      } else {
        this.errors.username = '';
      }

      if (this.$v.email.$error) {
        if (!this.$v.email.required) {
          this.errors.email = 'This field is required';
        } else if (!this.$v.email.$email) {
          this.errors.email = 'Please enter a valid email address';
        }
      } else if (this.$v.email.$invalid && !this.$v.email.$dirty) {
        this.errors.email = 'This field is required';
      } else {
        this.errors.email = '';
      }

      if (this.$v.password.$error) {
        if (!this.$v.password.required) {
          this.errors.password = 'This field is required';
        } else if (!this.$v.password.$minLength) {
          this.errors.password = 'Please enter at least 2 characters';
        }
      } else if (this.$v.password.$invalid && !this.$v.password.$dirty) {
        this.errors.password = 'This field is required';
      } else {
        this.errors.password = '';
      }

      if (this.$v.confirm_password && this.$v.confirm_password.$error) {
        if (!this.$v.confirm_password.required) {
          this.errors.confirm_password = 'This field is required';
        } else if (!this.$v.confirm_password.$sameAs) {
          this.errors.confirm_password =
            'Password and Confirm password fields do not match';
        }
      } else if (
        this.$v.confirm_password &&
        this.$v.confirm_password.$invalid &&
        !this.$v.confirm_password.$dirty
      ) {
        this.errors.confirm_password = 'This field is required';
      } else {
        this.errors.confirm_password = '';
      }
    },
    switchMode() {
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirm_password = '';

      if (!this.$route.query.login) {
        this.$router.push('/register?login=1');
      } else {
        this.$router.push('/register');
      }
    },
  },
};
</script>

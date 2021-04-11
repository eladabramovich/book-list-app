<template>
  <main :class="`${styles.editUserPage} page`">
    <BaseContainer>
      <h1>Edit User</h1>
      <form
        :class="styles.form"
        @submit.prevent="submitForm"
        novalidate="novalidate"
      >
        <div :class="styles.formGroup">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            :class="[errors.username ? styles.error : '']"
            v-model.lazy.trim="$v.username.$model"
            placeholder="Enter a username"
          />
          <p :class="styles.errorMessage">
            {{ errors.username }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            :class="[errors.email ? styles.error : '']"
            v-model.lazy="$v.email.$model"
            placeholder="Enter Email Address"
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
            :class="[errors.password ? styles.error : '']"
            v-model="$v.password.$model"
            placeholder="Enter Password"
          />
          <p :class="styles.errorMessage">
            {{ errors.password }}
          </p>
        </div>
        <h4 :class="styles.isAdminTitle">Is Admin</h4>
        <div :class="`${styles.formGroup} ${styles.checkboxGroup}`">
          <div>
            <input
              type="checkbox"
              name="is_admin"
              id="is-admin"
              value="Is Admin"
              v-model.lazy="isAdmin"
            />
            <label for="is-admin">Yes</label>
          </div>
        </div>
        <p :class="styles.errorMessage">
          {{ errors.generes }}
        </p>
        <div :class="styles.dangerZone">
          <h2>Danger Zone</h2>
          <DangerButton type="button" @click="deleteUser">
            Delete User
          </DangerButton>
        </div>
        <ServerErrorMessage v-if="!loading && serverError">
          {{ serverError }}
        </ServerErrorMessage>
        <div :class="styles.buttonsCont">
          <OutlineLinkButton :class="styles.cancelBtn" to="/manage/users">
            Cancel
          </OutlineLinkButton>
          <BaseButton :class="styles.submitBtn" type="submit">
            Submit
          </BaseButton>
        </div>
      </form>
    </BaseContainer>
  </main>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import OutlineLinkButton from '@/components/UI/OutlineLinkButton/OutlineLinkButton.vue';
import DangerButton from '@/components/UI/DangerButton/DangerButton.vue';
import moduleStyles from './EditUserPage.module.css';
export default {
  components: {
    OutlineLinkButton,
    DangerButton,
  },
  data() {
    return {
      loading: false,
      serverError: null,
      username: '',
      email: '',
      password: '',
      isAdmin: false,
      selectedUser: {},
      errors: {
        username: '',
        email: '',
        password: '',
        isAdmin: '',
      },
    };
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    userId() {
      return this.$route.params.id;
    },
  },
  validations: {
    username: { required },
    email: { required },
    password: {
      minLengthUnlessEmpty: (value) => {
        if (value !== '') {
          return value.length >= 6;
        } else {
          return true;
        }
      },
    },
  },
  async created() {
    this.serverError = null;
    this.loading = true;
    const token = this.$store.getters.token;
    try {
      const { data } = await axios.get(`/api/users/${this.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.username = data.username;
      this.email = data.email;
      this.isAdmin = data.isAdmin;
    } catch (err) {
      this.serverError = err.response.data.message;
      console.error(err);
    }
    this.loading = false;
  },
  methods: {
    async submitForm() {
      this.setErrorMessages();
      if (this.$v.$invalid) return;

      this.loading = true;
      this.serverError = null;

      try {
        const token = this.$store.getters.token;
        const formData = {
          username: this.username,
          email: this.email,
          isAdmin: this.isAdmin,
        };
        if (this.password !== '') {
          formData.password = this.password;
        }
        await axios.put(`/api/users/${this.userId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$router.push('/manage/users');
      } catch (err) {
        this.serverError = err.response.data.message;
        console.error(err);
      }

      this.loading = false;
    },
    setErrorMessages() {
      const requiredMessage = 'This field is required';
      if (this.$v.username && this.$v.username.$error) {
        if (!this.$v.username.required) {
          this.errors.username = requiredMessage;
        }
      } else if (
        this.$v.username &&
        this.$v.username.$invalid &&
        !this.$v.username.$dirty
      ) {
        this.errors.username = requiredMessage;
      } else {
        this.errors.username = '';
      }

      if (this.$v.email && this.$v.email.$error) {
        if (!this.$v.email.required) {
          this.errors.email = requiredMessage;
        }
      } else if (
        this.$v.email &&
        this.$v.email.$invalid &&
        !this.$v.email.$dirty
      ) {
        this.errors.email = requiredMessage;
      } else {
        this.errors.email = '';
      }

      if (this.$v.password && this.$v.password.$error) {
        if (!this.$v.password.minLengthUnlessEmpty) {
          this.errors.password = 'Password must be at least 6 characters';
        }
      } else if (
        this.$v.password &&
        this.$v.password.$invalid &&
        !this.$v.password.$dirty
      ) {
        this.errors.password = requiredMessage;
      } else {
        this.errors.password = '';
      }
    },
    async deleteUser() {
      const token = this.$store.getters.token;
      try {
        await axios.delete(`/api/users/${this.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$router.push('/manage/users');
      } catch (err) {
        this.serverError = err.response.data.message;
        console.error(err);
      }
    },
  },
};
</script>

<template>
  <div>
    <div :class="styles.btnCont">
      <button :class="styles.toggleBtn" @click="toggleContent">
        + Add your review
      </button>
    </div>
    <div :class="styles.formCont" ref="formCont">
      <form @submit.prevent="submitForm" v-if="isUserLoggedin">
        <div :class="styles.formGroup">
          <label for="score" :class="styles.required">Score</label>
          <select
            id="score"
            v-model="$v.score.$model"
            :class="[errors.score ? styles.error : '']"
          >
            <option default>Choose score...</option>
            <option value="1">1 - Appalling</option>
            <option value="2">2 - Aweful</option>
            <option value="3">3 - Very Bad</option>
            <option value="4">4 - Bad</option>
            <option value="5">5 - Mediocre</option>
            <option value="6">6 - Fine</option>
            <option value="7">7 - Good</option>
            <option value="8">8 - Very Good</option>
            <option value="9">9 - Amazing</option>
            <option value="10">10 - Masterpiece</option>
          </select>
          <p :class="styles.errorMessage" v-show="errors.score">
            {{ errors.score }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="review" :class="styles.required">Review</label>
          <textarea
            rows="6"
            id="review"
            v-model.trim="$v.review.$model"
            :class="[errors.review ? styles.error : '']"
          ></textarea>
          <p
            :class="`${styles.errorMessage} ${styles.last}`"
            v-show="errors.review"
          >
            {{ errors.review }}
          </p>
        </div>
        <AppSpinner v-if="loading" />
        <BaseButton
          type="submit"
          :class="styles.submitBtn"
          :inlineStyle="{ marginTop: '32px' }"
          v-else
          >Submit</BaseButton
        >
        <p :class="styles.formError" v-if="!loading && serverError">
          {{ serverError }}
        </p>
      </form>
      <div :class="styles.loginMessage" v-else>
        <p>Please log in to add/edit your review</p>
        <BaseButton @click="goToLogin">
          Go to Login
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import moduleStyles from './ReviewForm.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
    isUserLoggedin() {
      return this.$store.getters.isUserLoggedin;
    },
  },
  data() {
    return {
      loading: false,
      serverError: null,
      score: 'Choose score...',
      review: '',
      errors: {
        score: '',
        review: '',
      },
    };
  },
  validations: {
    score: {
      required: (value) => value !== 'Choose score...',
    },
    review: {
      required,
    },
  },
  methods: {
    toggleContent() {
      const el = this.$refs.formCont;
      if (el.classList.contains(this.styles.show)) {
        el.classList.remove(this.styles.show);
      } else {
        el.classList.add(this.styles.show);
      }
    },
    async submitForm() {
      this.setErrorMessages();
      if (this.$v.$invalid) return;
      const reviewData = {
        score: this.score,
        reviewText: this.review,
        bookId: this.$route.params.id,
      };

      this.loading = true;
      this.serverError = null;
      try {
        await this.$store.dispatch('books/saveBookReview', reviewData);
      } catch (err) {
        console.log(err);
        if (err.response.data.message === 'Unique Field') {
          this.serverError = 'You can only post one review';
        } else {
          this.serverError = err.message;
        }
      }
      this.loading = false;
      this.score = 'Choose score...';
      this.review = '';
    },
    setErrorMessages() {
      if (this.$v.score.$error) {
        if (!this.$v.score.required) {
          this.errors.score = 'Please choose a score';
        }
      } else if (
        this.$v.score &&
        this.$v.score.$invalid &&
        !this.$v.score.$dirty
      ) {
        this.errors.score = 'Please choose a score';
      } else {
        this.errors.score = '';
      }

      if (this.$v.review.$error) {
        if (!this.$v.review.required) {
          this.errors.review = 'This is a required field';
        }
      } else if (
        this.$v.review &&
        this.$v.review.$invalid &&
        !this.$v.review.$dirty
      ) {
        this.errors.review = 'This is a required field';
      } else {
        this.errors.review = '';
      }
    },
    goToLogin() {
      this.$router.push(
        '/register?login=1&redirect=' +
          encodeURIComponent(this.$route.path.substr(1))
      );
    },
  },
};
</script>

<template>
  <main :class="`${styles.addBookPage} page`">
    <BaseContainer>
      <h1>Add New Book</h1>
      <form
        :class="styles.form"
        @submit.prevent="submitForm"
        novalidate="novalidate"
      >
        <div :class="styles.formGroup">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            :class="[errors.title ? styles.error : '']"
            v-model.lazy.trim="$v.title.$model"
            placeholder="Enter a title"
          />
          <p :class="styles.errorMessage">
            {{ errors.title }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="small-image">Small Image URL</label>
          <input
            type="text"
            id="small-image"
            :class="[errors.smallImage ? styles.error : '']"
            v-model.lazy="$v.smallImage.$model"
            placeholder="Enter the small image URL"
          />
          <p :class="styles.errorMessage">
            {{ errors.smallImage }}
          </p>
        </div>
        <div :class="styles.formGroup">
          <label for="large-image">Large Image URL</label>
          <input
            type="text"
            id="large-image"
            :class="[errors.largeImage ? styles.error : '']"
            v-model.lazy="$v.largeImage.$model"
            placeholder="Enter the large image URL"
          />
          <p :class="styles.errorMessage">
            {{ errors.largeImage }}
          </p>
        </div>
        <h4 :class="styles.generesTitle">Generes</h4>
        <div :class="`${styles.formGroup} ${styles.checkboxGroup}`">
          <div>
            <input
              type="checkbox"
              name="generes"
              id="action"
              value="Action"
              v-model="$v.generes.$model"
            />
            <label for="action">Action</label>
            <br />
            <input
              type="checkbox"
              name="generes"
              id="advanture"
              value="Advanture"
              v-model="$v.generes.$model"
            />
            <label for="advanture">Advanture</label>
            <br />
            <input
              type="checkbox"
              name="generes"
              id="drama"
              value="Drama"
              v-model="$v.generes.$model"
            />
            <label for="drama">Drama</label>
            <br />
          </div>
          <div>
            <input
              type="checkbox"
              name="generes"
              id="fantasy"
              value="Fantasy"
              v-model="$v.generes.$model"
            />
            <label for="fantasy">Fantasy</label>
            <br />
            <input
              type="checkbox"
              name="generes"
              id="fiction"
              value="Fiction"
              v-model="$v.generes.$model"
            />
            <label for="fiction">Fiction</label>
            <br />
            <input
              type="checkbox"
              name="generes"
              id="humor"
              value="Humor"
              v-model="$v.generes.$model"
            />
            <label for="humor">Humor</label>
            <br />
          </div>
          <div>
            <input
              type="checkbox"
              name="generes"
              id="non-fiction"
              value="non Fiction"
              v-model.lazy="generes"
            />
            <label for="non-fiction">Non Fiction</label>
            <br />
            <input
              type="checkbox"
              name="generes"
              id="science-fiction"
              value="Science Fiction"
              v-model.lazy="generes"
            />
            <label for="science-fiction">Science Fiction</label>
          </div>
        </div>
        <p :class="styles.errorMessage">
          {{ errors.generes }}
        </p>
        <div :class="styles.formGroup">
          <label for="description">Description</label>
          <textarea
            id="description"
            :class="[errors.description ? styles.error : '']"
            v-model.lazy="$v.description.$model"
          ></textarea>
          <p :class="styles.errorMessage">
            {{ errors.description }}
          </p>
        </div>
        <ServerErrorMessage v-if="!loading && serverError">
          {{ serverError }}
        </ServerErrorMessage>
        <div :class="styles.buttonsCont">
          <OutlineLinkButton :class="styles.cancelBtn" to="/manage/books">
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
import moduleStyles from './AddBookPage.module.css';
export default {
  components: {
    OutlineLinkButton,
  },
  metaInfo: {
    title: 'New Book',
  },
  data() {
    return {
      loading: false,
      serverError: null,
      title: '',
      smallImage: '',
      largeImage: '',
      generes: [],
      description: '',
      errors: {
        title: '',
        smallImage: '',
        largeImage: '',
        generes: '',
        description: '',
      },
    };
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
  validations: {
    title: { required },
    smallImage: { required },
    largeImage: { required },
    generes: { required },
    description: { required },
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
          title: this.title,
          imageUrlSmall: this.smallImage,
          imageUrlLarge: this.largeImage,
          generes: this.generes,
          description: this.description,
        };
        await axios.post('/api/books', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$router.push('/manage/books');
      } catch (err) {
        this.serverError = err.response.data.message;
        console.error(err);
      }

      this.loading = false;
    },
    setErrorMessages() {
      const requiredMessage = 'This field is required';
      if (this.$v.title && this.$v.title.$error) {
        if (!this.$v.title.required) {
          this.errors.title = requiredMessage;
        }
      } else if (
        this.$v.title &&
        this.$v.title.$invalid &&
        !this.$v.title.$dirty
      ) {
        this.errors.title = requiredMessage;
      } else {
        this.errors.title = '';
      }

      if (this.$v.smallImage && this.$v.smallImage.$error) {
        if (!this.$v.smallImage.required) {
          this.errors.smallImage = requiredMessage;
        }
      } else if (
        this.$v.smallImage &&
        this.$v.smallImage.$invalid &&
        !this.$v.smallImage.$dirty
      ) {
        this.errors.smallImage = requiredMessage;
      } else {
        this.errors.smallImage = '';
      }

      if (this.$v.largeImage && this.$v.largeImage.$error) {
        if (!this.$v.largeImage.required) {
          this.errors.largeImage = requiredMessage;
        }
      } else if (
        this.$v.largeImage &&
        this.$v.largeImage.$invalid &&
        !this.$v.largeImage.$dirty
      ) {
        this.errors.largeImage = requiredMessage;
      } else {
        this.errors.largeImage = '';
      }

      if (this.$v.generes && this.$v.generes.$error) {
        if (!this.$v.generes.required) {
          this.errors.generes = 'Check at least 1 genere';
        }
      } else if (
        this.$v.generes &&
        this.$v.generes.$invalid &&
        !this.$v.generes.$dirty
      ) {
        this.errors.generes = 'Check at least 1 genere';
      } else {
        this.errors.generes = '';
      }

      if (this.$v.description && this.$v.description.$error) {
        if (!this.$v.description.required) {
          this.errors.description = requiredMessage;
        }
      } else if (
        this.$v.description &&
        this.$v.description.$invalid &&
        !this.$v.description.$dirty
      ) {
        this.errors.description = requiredMessage;
      } else {
        this.errors.description = '';
      }
    },
  },
};
</script>

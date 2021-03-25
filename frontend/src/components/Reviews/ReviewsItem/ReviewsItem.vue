<template>
  <div :class="styles.reviewItem">
    <header>
      <p :class="styles.name">{{ username }}</p>
      <div :class="styles.info">
        <p :class="styles.score">Score: {{ score }}</p>
        <p :class="styles.date">{{ formattedDate }}</p>
      </div>
    </header>
    <div :class="styles.body">
      <p v-if="reviewText.length <= 150">
        {{ reviewText }}
      </p>
      <p v-else>
        {{ longText }}
        &nbsp;
        <a
          href="#"
          :class="styles.toggleText"
          @click.prevent="fullyOpen = !fullyOpen"
        >
          {{ !fullyOpen ? 'Read More' : 'Read Less' }}
        </a>
      </p>
    </div>
    <hr :class="styles.divider" />
  </div>
</template>

<script>
import moduleStyles from './ReviewsItem.module.css';
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fullyOpen: false,
    };
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    formattedDate() {
      const dateArr = this.date.substr(0, 10).split('-');
      let formattedDate = [];
      for (let i = dateArr.length - 1; i >= 0; i--) {
        formattedDate.push(dateArr[i]);
      }
      formattedDate = formattedDate.join('/');
      return formattedDate;
    },
    longText() {
      return !this.fullyOpen
        ? this.reviewText.split(' ', 99).join(' ')
        : this.reviewText;
    },
  },
};
</script>

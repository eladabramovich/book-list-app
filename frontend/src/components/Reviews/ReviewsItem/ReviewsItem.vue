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
      <slot></slot>
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
    date: {
      type: String,
      required: true,
    },
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
  },
};
</script>

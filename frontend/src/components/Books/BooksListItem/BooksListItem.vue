<template>
  <div>
    <div :class="styles.bookItem">
      <router-link :to="`/book/${id}`">
        <picture>
          <source
            media="(min-width: 769px)"
            :srcset="images.small"
            type="image/jpeg"
          />
          <source
            media="(max-width: 768px)"
            :srcset="images.large"
            type="image/jpeg"
          />
          <img :src="images.small" :alt="title" />
        </picture>
        <div :class="styles.bookDetails">
          <h3>{{ title }}</h3>
          <p>Score: {{ formattedScore }}</p>
        </div>
      </router-link>
    </div>
    <hr :class="styles.divider" />
  </div>
</template>

<script>
import moduleStyles from './BooksListItem.module.css';
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    score: {
      type: Number,
      default: 0.0,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
    formattedScore() {
      return Number.isInteger(this.score) ? this.score : this.score.toFixed(2);
    },
  },
};
</script>

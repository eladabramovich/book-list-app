<template>
  <div :class="styles.reviews">
    <h3>Reviews</h3>
    <ReviewForm />
  </div>
</template>

<script>
import ReviewForm from '@/components/Reviews/ReviewForm/ReviewForm.vue';
import moduleStyles from './Reviews.module.css';
export default {
  components: {
    ReviewForm,
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

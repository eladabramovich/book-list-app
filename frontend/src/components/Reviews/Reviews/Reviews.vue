<template>
  <div :class="styles.reviews">
    <h3>Reviews</h3>
    <ReviewForm />
    <div :class="styles.reviewsItemsCont">
      <ReviewsItem
        v-for="review in reviews"
        :key="review._id"
        :username="review.username"
        :score="review.score"
        :date="review.createdAt"
        :reviewText="review.reviewText"
      />
    </div>
  </div>
</template>

<script>
import ReviewForm from '@/components/Reviews/ReviewForm/ReviewForm.vue';
import ReviewsItem from '@/components/Reviews/ReviewsItem/ReviewsItem.vue';
import moduleStyles from './Reviews.module.css';
export default {
  components: {
    ReviewForm,
    ReviewsItem,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

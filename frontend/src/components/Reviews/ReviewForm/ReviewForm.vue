<template>
  <div>
    <button :class="styles.toggleBtn" @click="toggleContent">
      + Add your review
    </button>
    <div :class="styles.formCont" ref="formCont">
      <p v-if="isUserLoggedin">form</p>
      <div :class="styles.loginMessage" v-else>
        <p>Please log in to add/edit your review</p>
        <BaseButton :onClicked="goToLogin">
          Go to Login
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    toggleContent() {
      const el = this.$refs.formCont;
      if (el.classList.contains(this.styles.show)) {
        el.classList.remove(this.styles.show);
      } else {
        el.classList.add(this.styles.show);
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

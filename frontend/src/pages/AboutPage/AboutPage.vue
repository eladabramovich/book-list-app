<template>
  <main :class="`${styles.aboutPage} page`">
    <BaseContainer>
      <h1 :class="styles.pageHeading">About</h1>
      <h4 :class="styles.title">
        Thank you for your<br />interest in this project.
      </h4>
      <p :class="styles.info">
        This is a demo project for a book database website.<br />
        It was designed and implemented by Elad Abramovich.
      </p>
      <p :class="styles.contactInfo">
        Contact information:
        <br />
        <a
          href="https://www.linkedin.com/in/elad-abramovich/"
          target="_blank"
          title="linkedin profile"
        >
          LinkedIn
        </a>
        <br />
        <a
          href="https://github.com/eladabramovich"
          target="_blank"
          title="GitHub profile"
          >Github</a
        >
        <br /><br />
        Link to project source code:
        <br />
        <a
          href="https://github.com/eladabramovich/book-list-app"
          target="_blank"
          title="Source code repo"
        >
          https://github.com/eladabramovich/book-list-app
        </a>
      </p>
    </BaseContainer>
  </main>
</template>

<script>
import moduleStyles from './AboutPage.module.css';
export default {
  computed: {
    styles() {
      return moduleStyles;
    },
  },
};
</script>

<template>
  <div :class="styles.searchBar">
    <input
      type="text"
      id="search-term"
      :class="styles.searchInput"
      :placeholder="placeholderText"
      v-model="term"
    />
    <label for="search-term">Search Book Name</label>
    <BaseButton
      @click="emitTerm"
      :inlineStyle="{ width: '186px', height: '44px' }"
      >Search</BaseButton
    >
  </div>
</template>

<script>
import moduleStyles from './SearchBar.module.css';
export default {
  props: {
    placeholderText: {
      type: String,
      default: 'Search...',
    },
  },
  computed: {
    styles() {
      return moduleStyles;
    },
  },
  data() {
    return {
      term: '',
    };
  },
  methods: {
    emitTerm() {
      this.$emit('search', this.term);
    },
  },
};
</script>

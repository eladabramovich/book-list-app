<script>
export default {
  async created() {
    await this.$store.dispatch('logout');
    this.$router.replace('/');
  },
};
</script>

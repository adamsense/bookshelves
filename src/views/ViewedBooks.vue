<template>
  <div>
    <div class="rawcol" v-for="book in setBooks" :key="book.id" col="4">
      <bookcard @openBook="openBook(book)" :book="book"></bookcard>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ...mapGetters("books", ["lastViewedBooks"]),
    setBooks() {
      return this.lastViewedBooks;
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div>
      <div v-if="loading" class="lodaing-card">
        <v-progress-circular :size="50" :width="7" color="blue" indeterminate>
        </v-progress-circular>
      </div>

      <v-container v-if="!loading">
        <v-row>
          <v-col
            class="main-grid"
            v-for="book in getBooksCard"
            :key="book.id"
            col="4"
          >
            <bookcard @openBook="openBook(book)" :book="book"></bookcard>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-overlay v-if="!loading" :z-index="zIndex" :value="bookOverlay">
        <v-progress-circular
          v-show="loadingBook"
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>

        <bookview
          v-if="!loadingBook"
          :key="currBook.id"
          :book="currBook"
          @closeView="closeBookView(false)"
        ></bookview>
      </v-overlay>
    </div>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
      class="go-up"
    >
      <v-icon large>mdi-menu-up </v-icon>
    </v-btn>
    <v-pagination
      v-if="!loading"
      v-model="pagination.pageNum"
      :length="pages"
      @input="next"
      :total-visible="8"
    ></v-pagination>
    <v-sheet class="recent-container" v-if="isEmpty" max-width="1920">
      <h6 class="recent-viewed">Books you've recently viewed</h6>
      <v-slide-group :v-show="isEmpty" class="pa-4" show-arrows>
        <v-slide-item class="carusel" v-for="book in viewedList" :key="book.id">
          <bookcard @openBook="openBook(book)" :book="book"></bookcard>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import bookcard from "../components/books/BookCard.vue";
import bookview from "../components/books/BookView.vue";
import { mapActions, mapGetters } from "vuex";
import { GetBookById } from "@/api/books";

export default {
  name: "Home",

  components: { bookcard, bookview },
  data() {
    return {
      fab: false,
      loading: true,
      loadingBook: false,
      zIndex: 1,
      bookOverlay: false,
      books: [],
      viewedList: [],
      currBook: {},
      bookPerPage: 32,
      pagination: {
        pageNum: 1,
        pages: 10,
      },
    };
  },
  created() {
    this.next();
  },
  watch: {
    lastViewedBooks: {
      immediate: true,
      handler() {
        this.viewdBooks(this.lastViewedBooks);
      },
    },
  },
  computed: {
    isEmpty() {
      if (this.viewedList.length > 0) return true;
      return false;
    },
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 6;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 5;
      }

      if (this.$vuetify.breakpoint.md) {
        return 4;
      }

      return 3;
    },
    ...mapGetters("books", ["listOfBooks", "booksCount", "lastViewedBooks"]),
    getBooksCard() {
      return this.listOfBooks;
    },

    pages() {
      return Math.ceil(this.booksCount / this.bookPerPage);
    },
  },

  methods: {
    ...mapActions("books", ["GetBooks", "AddBookToViewedList"]),

    async viewdBooks(bolist) {
      bolist.forEach((bookId) => {
        let item = this.viewedList.find((item) => item.id == bookId);
        if (item == undefined) {
          let fbook = GetBookById(bookId);
          fbook
            .then((res) => {
              this.viewedList.push(res);
            })
            .catch((error) => {
              console.log("catch error: ", error);
            });
        }
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
    },

    closeBookView(view) {
      this.bookOverlay = view;
      this.loadingBook = view;
      if (!view) {
        this.currBook = { id: 0 };
      }
    },
    next() {
      this.loading = true;
      const a = this.GetBooks(this.pagination.pageNum);
      a.then(() => {
        this.loading = false;
      });
    },
    async openBook(book) {
      this.currBook = {};
      this.closeBookView(true);
      let temp = this.viewedList.find((item) => item.id == book.id);
      if (temp == undefined)
        this.currBook = await this.AddBookToViewedList(book.id);
      else this.currBook = temp;
      this.loadingBook = false;
    },
  },
};
</script>
<style scoped>
.recent-container {
  margin-top: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25),
    3px 0px 10px 0 rgba(0, 0, 0, 0.22);
}
.carusel {
  margin-left: 12px;
}
.go-up {
  margin-bottom: 65px;
}
.lodaing-card {
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  display: flex;
  height: 70vh;
  width: 70vh;
}

.recent-viewed {
  margin-top: 5px;
  padding-left: 10px;
  color: rgb(117, 102, 102);
  font-size: 12px;
}
.main-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
</style>
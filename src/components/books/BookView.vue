<template>
  <v-card class="book-view">
    <v-container class="view-count" fluid>
      <v-row>
        <v-col cols="5" class="col-cover">
          <div class="cover">
            <img v-bind:src="bookCover" class="book-cover" />
          </div>
        </v-col>
        <v-col cols="7" class="col-details">
          <v-container fluid>
            <v-card flat class="card-book-details" height="60%">
              <h1 class="book-title">{{ book.title }}</h1>

              <div class="author" v-for="author in authors" :key="author.name">
                <span> {{ author.name }}</span>
              </div>
            </v-card>
            <v-card flat class="dtl-chi" height="30%">
              <div
                class="chips"
                v-for="shelev in bookShelvesItem"
                :key="shelev.name"
              >
                <v-chip x-small>{{ shelev }}</v-chip>
              </div>
            </v-card>
            <v-card flat class="btn-add-remove" height="10%">
              <div class="cart-btn">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-2"
                      min-width="0"
                      text
                      color="green"
                      @click="addToCart(book.id)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-plus-circle-outline </v-icon>
                    </v-btn>
                  </template>
                  <span>add to cart</span>
                </v-tooltip>
                <v-icon :color="btnColor">mdi-cart</v-icon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :disabled="!removeFromCartBtn"
                      min-width="0"
                      class="ml-2"
                      text
                      color="red"
                      @click="removeItem"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove from cart</span>
                </v-tooltip>
              </div>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-card flat class="card-close-btn">
      <v-btn class="close-view" color="blue" small @click="$emit('closeView')">
        close
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const missingCover = "@/assets/missingCover.jpg";

export default {
  name: "bookview",
  data() {
    return {
      removeFromCartBtn: false,
      bookItems: [],
    };
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  created() {},
  watch: {
    cartItems: {
      immediate: true,
      handler() {
        this.handleRemoveFromCart(this.book.id);
      },
    },
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
    authors() {
      return { ...this.book.authors };
    },
    btnColor() {
      if (this.removeFromCartBtn) return "green";
      return "grey";
    },

    bookShelvesItem() {
      return { ...this.book.bookshelves };
    },
    bookCover() {
      if (this.book.img) {
        return this.book.img;
      }
      return missingCover;
    },
  },
  methods: {
    ...mapActions("cart", ["AddItem", "RemoveItem"]),
    addToCart() {
      this.AddItem(this.book);
    },
    removeItem() {
      this.RemoveItem(this.book);
    },
    handleRemoveFromCart(id) {
      let a = this.cartItems.find((item) => item.id === id);
      if (a == null) this.removeFromCartBtn = false;
      else this.removeFromCartBtn = true;
    },
  },
};
</script>

<style scoped>
.card-close-btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: rgb(248, 244, 244);
}
.btn-add-remove {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  background-color: rgb(248, 244, 244);
}
.card-book-details {
  display: flex;
  margin: 0px;
  padding: 0px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  color: black;
  background-color: rgb(248, 244, 244);
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
}
.close-view {
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 3px;
}

.dtl-chi {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  background-color: rgb(248, 244, 244);
}
.chips {
  flex-direction: row;
  display: inline-flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5px;
}

.author {
  color: rgb(117, 102, 102);
  text-shadow: 1px 1px 1px rgb(99, 92, 92), 1px 1px 1px rgba(0, 0, 0, 0.22);
  font-size: 16px;
}

.col-details {
  display: flex;
}
.col-cover {
  display: flex;
}
.book-title {
  font-size: 32px;
  color: rgb(12, 7, 7);
  text-shadow: 1px 1px 1px rgb(99, 92, 92), 2px 2px 2px rgba(0, 0, 0, 0.22);
  margin: 1px;
  padding: 3 3 0 0;
  display: flex;
  justify-content: left;
}
.book-view {
  display: block;
  min-width: 600px;
  min-height: 400px;
  border: solid 1px rgb(172, 172, 172);
  border-radius: 3px;
  color: rgb(253, 246, 246);
  background-color: rgb(248, 244, 244);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.view-count {
  display: flex;
  max-width: 600px;
  max-height: 500px;
  align-items: center;
}

.cover {
  padding: 0px;
  object-fit: contain;
  display: flex;
  max-width: 400px;
  max-height: 500px;
  min-width: 200px;
  min-height: 350px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}
.book-cover {
  width: 100%;
  height: 100%;
}
</style>
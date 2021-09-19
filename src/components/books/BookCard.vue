<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="card"
      :class="{ 'on-hover': hover }"
      @click="$emit('openBook')"
    >
      <v-container class="card-view" fluid>
        <v-row no-gutters>
          <v-col class="cover" cols="4">
            <img v-bind:src="imgUrl" class="book-cover" />
          </v-col>
          <v-col cols="8" class="book-details">
            <v-row class="book-details" no-gutters>
              <div class="book-title">
                <h4>{{ bookTitle }}</h4>
              </div>
            </v-row>
            <v-row no-gutters>
              <div class="author" v-for="author in authors" :key="author.name">
                <span> {{ author.name }}</span>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
const missingCover = "@/assets/missingCover.jpg";
export default {
  name: "bookcard",

  data() {
    return {
      hover: false,
      overlay: false,
    };
  },

  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    bookTitle() {
      return this.book.title.slice(0, 20) + "...";
    },
    imgUrl() {
      if (this.book.img) {
        return this.book.img;
      }
      return missingCover;
    },
    bookshelves() {
      return { ...this.book.bookshelves };
    },
    authors() {
      return { ...this.book.authors };
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 1;
}
.v-card.on-hover {
  opacity: 0.5;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.card-view {
  padding: 0px;
  margin: 0px;
}

.card {
  display: flex;
  max-width: 300px;
  min-width: 200px;
  max-height: 100px;
  height: 100px;
  width: 250px;
  align-items: center;
  border: solid 1px rgb(172, 172, 172);
  border-radius: 3px;
  font-size: 14px;
  color: rgb(82, 82, 82);
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.cover {
  object-fit: contain;
  width: 65px;
  height: 100px;
  box-shadow: 2px 5px 5px 1px rgba(0, 0, 0, 0.25),
    1px 0px 1px 0px rgba(0, 0, 0, 0.22);
}
.book-cover {
  padding: 4px;
  width: 100%;
  height: 100%;
}
.book-details {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.book-title {
  flex-wrap: wrap;
  font-size: 15px;
  color: rgb(56, 44, 44);
  text-shadow: 0px 0px 0px rgb(99, 92, 92), 1px 1px 1px rgba(0, 0, 0, 0.22);
  text-align: left;
  margin-left: 7px;
  margin-top: 10px;
}

.author {
  font-size: 12px;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
}
</style>

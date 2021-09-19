<template>
  <v-app-bar app id="app-bar" absolute color="transparent" flat>
    <v-toolbar-title />

    <v-spacer />

    <v-btn class="ml-2" min-width="0" text to="/404">
      <v-icon>mdi-alert-circle </v-icon>
    </v-btn>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge
            :content="cartItems.length"
            :value="cartItems.length"
            color="green"
            overlap
          >
            <v-icon> mdi-cart </v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <v-list-item v-for="item in getCartItems" :key="item.element.id">
          <v-list-item-avatar rounded>
            <img :src="item.element.img" />
          </v-list-item-avatar>
          <v-list-item-title
            class="titleItem"
            v-text="reduceTextLength(item.element.title)"
          />
          <v-icon>mdi-minus-circle-outline </v-icon>
        </v-list-item>
        <v-divider v-if="getCartItems.length > 0"></v-divider>
        <a class="center-item" v-if="getCartItems.length > 0"> go to cart</a>
        <p class="center-item" v-else>cart is empty</p>
      </v-list>
    </v-menu>
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-list :tile="false" nav>
        <div></div>
      </v-list>
    </v-menu>

    <v-btn class="ml-2" min-width="0" text to="/home">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { VListItem, VListItemTitle, VListItemAvatar } from "vuetify/lib";
import { mapGetters } from "vuex";
export default {
  name: "topbar",
  components: {
    "v-list-item": VListItem,
    "v-list-item-title": VListItemTitle,
    "v-list-item-avatar": VListItemAvatar,
  },
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),

    getCartItems() {
      if (!this.cartItems) return 0;
      const unique = [...new Set(this.cartItems.map((item) => item))];
      var count = 0;
      var cartSum = [];
      unique.forEach((element) => {
        this.cartItems.forEach((item) => {
          if (item.id === element.id) count++;
        });
        cartSum.push({ element, count });
        count = 0;
      });
      return cartSum;
    },
  },
  methods: {
    reduceTextLength(text) {
      return text.slice(0, 30);
    },
  },
};
</script>

<style scoped>
.center-item {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  margin: 0px;
}
.mybadge {
  border-radius: 10px;
  color: #ffffff;
  display: inline-block;
  font-size: 10px;
  height: 15px;
  letter-spacing: 0;
  line-height: 1;
  min-width: 15px;
  padding: 2px 2px;
  pointer-events: auto;
  position: absolute;
  text-align: center;
  text-indent: 0;
  top: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
}
.titleItem {
  font-size: 10px;
}
</style>
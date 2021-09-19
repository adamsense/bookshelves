<template>
  <div>
    <v-app-bar app>
      <topbar></topbar>
    </v-app-bar>

    <v-main class="main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <bookfooter class="fixed-footer" app></bookfooter>
  </div>
</template>

<script>
import topbar from "./TopBar.vue";
import bookfooter from "./Footer.vue";
export default {
  components: {
    topbar,
    bookfooter,
  },
};
</script>

<style scoped>
.main {
  margin-bottom: 65px;
}

.fixed-header {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}
.fixed-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
  margin-bottom: 0px;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>
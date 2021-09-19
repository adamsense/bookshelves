<template>
  <v-app class="app-wrapper">
    <router-view></router-view>
  </v-app>
</template>


<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>
<style scoped >
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
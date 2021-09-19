<template>
  <v-footer class="footer" dark padless>
    <v-card flat tile class="flex">
      <v-card-text class="card-text">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <div class="divider"><v-divider></v-divider></div>

      <v-card-text class="card-text">
        {{ new Date().getFullYear() }} <strong>&nbsp;&nbsp; UpWord</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "bookfooter",
  data: () => ({
    icons: [
      "mdi-facebook",
      "mdi-twitter",
      "mdi-google-plus",
      "mdi-linkedin",
      "mdi-instagram",
    ],
  }),
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  height: 65px;
  width: 100%;
}

.card-text {
  flex: 1 1 auto;
  display: flex;
  padding: 0px;
  padding-top: 2px;
  justify-content: center;
}
.divider {
  display: flex;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: center;
  width: 60%;
}
</style>
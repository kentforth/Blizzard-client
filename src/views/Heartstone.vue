<script>
import Navigation from "../components/Navigation/Navigation.vue";
export default {
  name: "Heartstone",
  components: { Navigation }
}
</script>

<template>
  <div class="heartstone">
    <Navigation />
  </div>
</template>

<style scoped lang="scss">
.heartstone {
  background: url("../assets/images/heartstone-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
}
</style>
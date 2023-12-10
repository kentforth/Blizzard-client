<script>
import Navigation from "../components/Navigation/Navigation.vue";
export default {
  name: "Diablo",
  components: { Navigation }
}
</script>

<template>
  <div class="diablo">
    <Navigation />
  </div>
</template>

<style scoped lang="scss">
.diablo {
  background: url("../assets/images/diablo-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
}
</style>
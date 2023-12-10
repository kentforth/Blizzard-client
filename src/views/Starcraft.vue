<script>
import Navigation from "../components/Navigation/Navigation.vue";
export default {
  name: "Starcraft",
  components: { Navigation }
}
</script>

<template>
  <div class="starcraft">
    <Navigation />
  </div>
</template>

<style scoped lang="scss">
.starcraft {
  background: url("../assets/images/starcraft-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
}
</style>
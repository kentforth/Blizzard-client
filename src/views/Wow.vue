<script>
import Navigation from "../components/Navigation/Navigation.vue";
export default {
  name: "Wow",
  components: { Navigation }
}
</script>

<template>
  <div class="wow">
    <Navigation />
  </div>
</template>

<style scoped lang="scss">
.wow {
  background: url("../assets/images/wow-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
}
</style>
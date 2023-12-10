<script>
import Card from "../components/pages/Overwatch/Card/Card.vue";
import Navigation from "../components/Navigation/Navigation.vue";

export default {
name: "Overwatch",
  
components: {
  Card,
  Navigation
  },
}
</script>

<script setup>

</script>

<template>
  <div class="overwatch">
    <Navigation />
    
    <div class="container">
      <Card
        title="Users"
        icon="users"
      />
      <Card
        title="Clans"
        icon="clans"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.overwatch {
  background: url("../assets/images/overwatch-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  position: absolute;
  
  .container {
    margin-left: auto;
    width: calc(100% - 170px);
    align-self: center;
    justify-content: space-between;
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }
}
</style>
<script lang="ts">
export default {
  name: 'CalculateButton'
}
</script>

<script setup lang="ts">

</script>

<template>
  <button class="button-calculate">
    Calculate 
    <br>
    Attributes
  </button>
</template>

<style lang="scss" scoped>
.button-calculate {
  font-family: "Diablo", sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  color: #e1deb2;
  padding: 1.2em 5em 1.5em 5em;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  background-image: url("@/assets/images/diablo/diablo button background.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  
  &:active {
    transform: translateY(3px);
  }
}
</style>
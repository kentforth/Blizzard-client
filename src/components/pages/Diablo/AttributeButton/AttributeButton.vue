<script lang="ts">
export default {
  name: 'AttributeButton'
}
</script>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button class="button">
    {{ props.text }}
  </button>
</template>

<style lang="scss" scoped>
.button {
  width: 50px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1em;
  color: $gold-90;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.29),
  inset 0 1px 1px rgba(255, 255, 255, 0.44);
  outline: none;
  font-size: 1.5rem;
  border-radius: $radius-4;
  font-family: "Diablo Heavy", serif;
  background-image: linear-gradient(
          to bottom,
          #601b0b,
          #56170a,
          #4c1308,
          #420f05,
          #380c02
  );
  
  &:active {
    box-shadow: none;
  }
}
</style>
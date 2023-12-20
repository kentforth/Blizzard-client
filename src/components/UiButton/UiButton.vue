<script>
export default {
  name: 'UiButton'
}
</script>

<script setup>
const props = defineProps({
  text: {
    type:String,
    required: true
  }
})
</script>

<template>
  <button class="ui-button">
    {{ props.text }}
  </button>
</template>

<style>
.ui-button {
  width: 200px;
}
</style>
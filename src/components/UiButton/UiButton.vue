<script>
export default {
  name: 'UiButton'
}
</script>

<script setup>
const props = defineProps({
  title: {
    type:String,
    required: true
  }
})
</script>

<template>
  <button class="ui-button">
    {{ props.title }}
  </button>
</template>

<style></style>
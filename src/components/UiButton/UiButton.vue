<script lang="ts">


export default {
  name: 'UiButton'
}
</script>

<script setup lang="ts">
import { defineProps } from 'vue'

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
<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "CardHeader"
}
</script>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: null,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const icon = defineAsyncComponent(() => import (`../../../../assets/icons/${props.icon}.svg`)
)
</script>

<template>
  <div class="card-header">
    <h2 class="card-header__title">
      {{ title }}
    </h2>
    <component
      :is="icon"
      class="icon"
    />
  </div>
</template>

<style scoped lang="scss">
.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &__title {
    font-family: 'Open Sans', sans-serif;
  }
}
</style>
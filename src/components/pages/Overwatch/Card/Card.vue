<script>
import CardHeader from "./CardHeader.vue";

export default {
  name: "Card",
  
  components: { CardHeader }
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


</script>

<template>
  <div class="card">
    <CardHeader
      :icon="icon"
      :title="props.title"
    />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background: rgba(60, 55, 66, 0.5);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 20px;
}
</style>
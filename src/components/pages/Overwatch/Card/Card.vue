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
  </div>
</template>

<style scoped lang="scss">
.card {
  background: rgba(60, 55, 66, 0.5);
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 5px;
  padding: 20px;
}
</style>
<script lang="ts">
export default {
  name: 'GamesToday'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

import image from '@/assets/images/heartstone/heartstone-total-games.png'

const totalGames = ref<string>('0')

onBeforeMount(() => {
  socket.on("heartStoneTotalGames", (games) => totalGames.value = games);
})

onBeforeUnmount(() => socket.off('heartStoneTotalGames'))
</script>

<template>
  <div class="heartstone-games-today">
    <h2>Games Today : {{ totalGames }}</h2>

    <img
      :src="image"
      alt="totalGames"
      class="heartstone-games-today__image"
    >
  </div>
</template>

<style lang="scss" scoped>
.heartstone-games-today {
  position: relative;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    width: 200px;
    overflow: hidden;
    color: $brown;
    font-weight: 700;
    z-index: 999;
    text-align: left;
    font-size: 1.2rem;
    position: absolute;
    bottom: 40px;
    right: 160px;
  }
  
  &__image {
    z-index: 1;
    object-fit: contain;
    object-position: right;
  }

  @include ui-mobile-only {
    &__image {
      width: 250px;
    }
    h2 {
      font-size: 14px;
      bottom: 25px;
      right: 20px;
    }
  }
}

</style>
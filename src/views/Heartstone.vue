<script lang="ts">
export default {
  name: "Heartstone"
}
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import UiButton from "@/components/UiButton/UiButton.vue";

import CardsType from "@/components/pages/HeartStone/CardsType/CardsType.vue";
import TopDecks from "@/components/pages/HeartStone/TopDecks/TopDecks.vue";
import GamesToday from "@/components/pages/HeartStone/GamesToday/GamesToday.vue";
import Winrates from "@/components/pages/HeartStone/Winrates/Winrates.vue";
import CardsPlayed from "@/components/pages/HeartStone/CardsPlayed/CardsPlayed.vue";

const isConnected = ref(true)

const text = computed(() => isConnected.value ? 'Pause connection' : 'Resume connection')

onBeforeMount(() => {
  socket.connect()
})

onBeforeUnmount(() => {
  socket.disconnect()
})

const onClick  = () => {
  isConnected.value = !isConnected.value

  if (!isConnected.value) {
    return socket.disconnect()
  }

  socket.connect()
}
</script>

<template>
  <div class="heartstone">
    <div class="heartstone__backdrop">
      <div class="container heartstone__container">
        <UiButton
          :text="text"
          class="heartstone__button"
          @click="onClick"
        />

        <div class="heartstone__top">
          <CardsType />

          <TopDecks />

          <GamesToday />
        </div>

        <div class="heartstone__bottom">
          <Winrates />

          <CardsPlayed class="heartstone__cards-played" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.heartstone {
  background: url("../assets/images/heartstone-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  backdrop-filter: blur(10px);
  
  &__backdrop {
    background: rgba(1, 1, 1, 0.7);
  }

  &__container {
    margin-left: auto;
    width: calc(100% - 170px);
    display: flex;
    flex-direction: column;
  }
  
  &__top {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    grid-gap: 20px;
    justify-content: center;
    justify-items: center;
  }
  
  &__bottom {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__button {
    margin-top: 40px;
    align-self: center;
  }

  @include ui-mobile-only {
    &__container {
      margin-left: 0;
      width: 100%;
      padding: 50px 20px 20px 20px;
    }
    
    &__top {
      grid-template-columns: 1fr;
      align-items: center;
    }

    &__bottom {
      grid-template-columns: 1fr;
    }
    
    &__cards-played {
      margin-top: 20px;
    }
  }
}
</style>
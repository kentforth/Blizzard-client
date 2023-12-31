<script lang="ts">

export default {
  name: "Wow"
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

import CharacterDistribution from "@/components/pages/Wow/CharacterDistribution/CharacterDistribution.vue";
import TopPlayers from "@/components/pages/Wow/TopPlayers/TopPlayers.vue";

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
  <div class="wow">
    <div class="container wow__container">
      <UiButton
        :text="text"
        class="wow__button"
        @click="onClick"
      />
      
      <CharacterDistribution class="wow__character-distribution" />
      
      <TopPlayers class="wow__top-players" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wow {
  background: url("../assets/images/wow-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;

  &__container {
    margin-left: auto;
    width: calc(100% - 170px);
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 40px;
    align-self: center;
  }
  
  &__top-players,
  &__character-distribution {
    margin-top: 20px;
  }

  @include ui-mobile-only {
    &__container {
      margin-left: 0;
      width: 100%;
      padding: 50px 20px 20px 20px;
    }
  }
}
</style>
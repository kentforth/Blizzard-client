<script lang="ts">
export default {
  name: "Diablo"
}
</script>

<script setup lang="ts">
import {
  ref,
  computed
} from 'vue'

import UiButton from "@/components/UiButton/UiButton.vue";

import { socket } from "@/services/socket";

import Countries from "@/components/pages/Diablo/Countries/Countries.vue";
import CharacterStats from "@/components/pages/Diablo/CharacterStats/CharacterStats.vue";

const isConnected = ref(true)

const text = computed(() => isConnected.value ? 'Pause connection' : 'Resume connection')

const onClick  = () => {
  isConnected.value = !isConnected.value

  if (!isConnected.value) {
    return socket.disconnect()
  }

  socket.connect()
}
</script>

<template>
  <div class="diablo">
    <div class="container diablo__container">
      <UiButton
        :text="text"
        class="diablo__button"
        @click="onClick"
      />
      
      <Countries class="diablo__countries" />
      
      <CharacterStats />
    </div>
  </div>
</template>

<style scoped lang="scss">
.diablo {
  background: url("../assets/images/diablo-bg.png") center center;
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
  
  &__countries {
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
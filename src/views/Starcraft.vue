<script lang="ts">

export default {
  name: "Starcraft"
}
</script>

<script setup lang="ts">
import { socket } from "@/services/socket";

import {
  computed,
  onBeforeMount,
  onBeforeUnmount, ref
} from 'vue'
import UiButton from "@/components/UiButton/UiButton.vue";

import Users from "@/components/pages/Starcraft/Users/Users.vue";
import Cards from "@/components/pages/Starcraft/Cards/Cards.vue";

onBeforeMount(() => {
  socket.connect()
})

onBeforeUnmount(() => {
  socket.disconnect()
})

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
  <div class="starcraft">
    <div class="container starcraft__container">
      <UiButton
        :text="text"
        class="starcraft__button"
        @click="onClick"
      />

      <Users />
      
      <Cards class="starcraft__cards" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.starcraft {
  background: url("../assets/images/starcraft-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;

  &__button {
    margin-top: 40px;
    align-self: center;
  }

  &__container {
    margin-left: auto;
    width: calc(100% - 170px);
    display: flex;
    flex-direction: column;
  }
  
  &__cards {
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
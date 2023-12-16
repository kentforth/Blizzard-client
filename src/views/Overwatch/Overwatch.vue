<script>
import Card from "../../components/pages/Overwatch/Card/Card.vue";
import Navigation from "../../components/Navigation/Navigation.vue";

export default {
name: "Overwatch",
  
components: {
  Card,
  Navigation
  }
}
</script>

<script setup>
import { 
  ref, 
  computed
} from 'vue'

import { socket } from "../../services/socket.ts";
import UiButton from "../../components/UiButton/UiButton.vue";
import Users from "../../components/pages/Overwatch/Users/Users.vue";
import ClansWinrate from "../../components/pages/Overwatch/ClansWinrate/ClansWinrate.vue";

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
  <div class="overwatch">
    <Navigation />
    
    <div class="container overwatch__container">
      <UiButton
        :title="text"
        class="overwatch__button"
        @click="onClick"
      />
      
      <div class="overwatch__inner">
        <Card
          icon="users"
          title="Users"
          class="overwatch__card"
        >
          <Users />
        </Card>

        <Card
          icon="clans"
          title="Clans winrate"
          class="overwatch__card"
        >
          <ClansWinrate />
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Overwatch.scss"></style>
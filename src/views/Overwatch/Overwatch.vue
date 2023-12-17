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

import { socket } from "@/services/socket";

import UiButton from "@/components/UiButton/UiButton.vue";

import Tank from "@/components/pages/Overwatch/Tank/Tank.vue";
import Users from "@/components/pages/Overwatch/Users/Users.vue";
import Damage from "@/components/pages/Overwatch/Damage/Damage.vue";
import Healer from "@/components/pages/Overwatch/Healer/Healer.vue";
import ClansWinrate from "@/components/pages/Overwatch/ClansWinrate/ClansWinrate.vue";

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
          class="overwatch__users"
        >
          <Users />
        </Card>

        <Card
          icon="clans"
          title="Clans winrate"
          class="overwatch__clans-winrate"
        >
          <ClansWinrate />
        </Card>

        <Card
          icon="shield"
          title="Users' Choice - Tank"
          class="overwatch__tank"
        >
          <Tank />
        </Card>

        <Card
          icon="damage"
          title="Users' Choice - Damage"
          class="overwatch__damage"
        >
          <Damage />
        </Card>

        <Card
          icon="healer"
          title="Users' Choice - Healer"
          class="overwatch__healer"
        >
          <Healer />
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Overwatch.scss"></style>
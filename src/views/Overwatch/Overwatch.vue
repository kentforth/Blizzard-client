<script>
import Card from "@/components/pages/Overwatch/Card/Card.vue";

import Tank from "@/components/pages/Overwatch/Tank/Tank.vue";
import Users from "@/components/pages/Overwatch/Users/Users.vue";
import Damage from "@/components/pages/Overwatch/Damage/Damage.vue";
import Healer from "@/components/pages/Overwatch/Healer/Healer.vue";
import ClansWinrate from "@/components/pages/Overwatch/ClansWinrate/ClansWinrate.vue";

export default {
name: "Overwatch",
  
components: {
  Card,
  Tank,
  Users,
  Damage,
  Healer,
  ClansWinrate
  }
}
</script>

<script setup>
import { 
  ref, 
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { socket } from "@/services/socket";

import UiButton from "@/components/UiButton/UiButton.vue";

const isConnected = ref(true)

const text = computed(() => isConnected.value ? 'Pause connection' : 'Resume connection')

const cards = [
  {
    icon: 'users',
    title: 'Users',
    class: 'overwatch__users',
    component: 'Users'
  },
  {
    icon: 'clans',
    title: 'Clans winrate',
    class: 'overwatch__clans-winrate',
    component: 'ClansWinrate'
  },
  {
    icon: 'shield',
    title: 'Users Choice - Tank',
    class: 'overwatch__tank',
    component: 'Tank'
  },
  {
    icon: 'damage',
    title: 'Users Choice - Damage',
    class: 'overwatch__damage',
    component: 'Damage'
  },
  {
    icon: 'healer',
    title: 'Users Choice - Healer',
    class: 'overwatch__healer',
    component: 'Healer'
  }
]

onMounted(() => {
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
  <div class="overwatch">
    <div class="container overwatch__container">
      <UiButton
        :title="text"
        class="overwatch__button"
        @click="onClick"
      />
      
      <div class="overwatch__inner">
        <Card
          v-for="card in cards"
          :key="card.title"
          :icon="card.icon"
          :title="card.title"
          :class="card.class"
        >
          <component :is="card.component" />
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Overwatch.scss"></style>
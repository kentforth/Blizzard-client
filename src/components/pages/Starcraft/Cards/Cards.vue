<script lang="ts">
export default {
  name: 'Cards'
}
</script>

<script setup lang="ts">
import zerg from '@/assets/images/starcraft/cards/zerg.webp'
import terran from '@/assets/images/starcraft/cards/terran.webp'
import protoss from '@/assets/images/starcraft/cards/protoss.webp'

import raven from '@/assets/images/starcraft/cards/terran/raven.webp'
import hellion from '@/assets/images/starcraft/cards/terran/hellion.webp'
import battlecruiser from '@/assets/images/starcraft/cards/terran/battlecruiser.webp'

import mutalisk from '@/assets/images/starcraft/cards/zerg/mutalisk.webp'
import zergling from '@/assets/images/starcraft/cards/zerg/zergling.webp'
import ultralisk from '@/assets/images/starcraft/cards/zerg/ultralisk.webp'

import zealot from '@/assets/images/starcraft/cards/protoss/zealot.webp'
import carrier from '@/assets/images/starcraft/cards/protoss/carrier.webp'
import highTemplar from '@/assets/images/starcraft/cards/protoss/high templar.webp'

import Card from "@/components/pages/Starcraft/Card/Card.vue";

interface ICard {
  alt: string,
  image: string,
  units: IUnit[]
}

interface IUnit {
  title: string,
  image: string
}

const terrans = [
  {
    title: 'Raven',
    image: raven
  },
  {
    title: 'Hellion',
    image: hellion
  },
  {
    title: 'Battlecruiser',
    image: battlecruiser
  }
]

const zergs = [
  {
    title: 'Zealot',
    image: zealot
  },
  {
    title: 'Carrier',
    image: carrier
  },
  {
    title: 'High Templar',
    image: highTemplar
  }
]

const protosses = [
  {
    title: 'Mutalisk',
    image: mutalisk
  },
  {
    title: 'Zergling',
    image: zergling
  },
  {
    title: 'Ultralisk',
    image: ultralisk
  }
]

const cards: ICard[] = [
  {
    alt: 'terran',
    image: terran,
    units: terrans
  },
  {
    alt: 'zerg',
    image: zerg,
    units: zergs
  },
  {
    alt: 'protoss',
    image: protoss,
    units: protosses
  }
]
</script>

<template>
  <div class="starcraft-cards">
    <Card
      :image="card.image"
      :alt="card.alt"
      :units="card.units"
      v-for="card in cards"
      :key="card"
    />
  </div>
</template>

<style lang="scss" scoped>
.starcraft-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  justify-items: center;
  
  @include ui-mobile-only {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>


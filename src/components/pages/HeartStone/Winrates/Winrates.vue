<script lang="ts">
export default {
  name: 'Winrates'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

import mage from '@/assets/images/heartstone/winrates/mage.webp'
import rogue from '@/assets/images/heartstone/winrates/rogue.webp'
import druid from '@/assets/images/heartstone/winrates/druid.webp'
import hunter from '@/assets/images/heartstone/winrates/hunter.webp'
import shaman from '@/assets/images/heartstone/winrates/shaman.webp'
import priest from '@/assets/images/heartstone/winrates/priest.webp'
import warlock from '@/assets/images/heartstone/winrates/warlock.webp'
import paladin from '@/assets/images/heartstone/winrates/paladin.webp'
import warrior from '@/assets/images/heartstone/winrates/warrior.webp'
import demonHunter from '@/assets/images/heartstone/winrates/demon-hunter.webp'

const items = ref([
  {
    title: "Demon Hunter",
    place: "#1",
    image: demonHunter,
    percent: 54.3,
  },
  {
    title: "Hunter",
    place: "#2",
    image: hunter,
    percent: 53.5
  },
  {
    title: "Paladin",
    place: "#3",
    image: paladin,
    percent: 52.1
  },
  {
    title: "Shaman",
    place: "#4",
    image: shaman,
    percent: 51.0
  },
  {
    title: "Rogue",
    place: "#5",
    image: rogue,
    percent: 50.4
  },
  {
    title: "Warrior",
    place: "#6",
    image: warrior,
    percent: 48.9
  },
  {
    title: "Mage",
    place: "#7",
    image: mage,
    percent: 45.1
  },
  {
    title: "Warlock",
    place: "#8",
    image: warlock,
    percent: 44.9
  },
  {
    title: "Priest",
    place: "#9",
    percent: 41.0,
    image: priest
  },
  {
    title: "Druid",
    place: "#10",
    image: druid,
    percent: 43.3
  }
])

const getPercentClass = (percent) => {
  if (percent < 42) return 'red'
  if (percent > 42 && percent < 46) return 'orange'
  if (percent > 47 && percent <= 50) return 'yellow'
  if (percent > 50) return 'green'
}

onBeforeMount(() => {
  socket.on("heartstoneWinRates", (winrates) => {
    items.value[0].percent = winrates[0];
    items.value[1].percent = winrates[1];
    items.value[2].percent = winrates[2];
    items.value[3].percent = winrates[3];
    items.value[4].percent = winrates[4];
    items.value[5].percent = winrates[5];
    items.value[6].percent = winrates[6];
    items.value[7].percent = winrates[7];
    items.value[8].percent = winrates[8];
    items.value[9].percent = winrates[9];
  });
})

onBeforeUnmount(() => socket.off('heartstoneWinRates'))
</script>

<template>
  <div class="heartstone-winrates">
    <h2>Class Winrates</h2>
    
    <div class="heartstone-winrates__items">
      <div
        class="heartstone-winrates__item"
        v-for="item in items"
        :key="item.title"
        :style="{ 'background-image': 'url(' + item.image + ')' }"
      >
        <div class="heartstone-winrates__place">
          {{ item.place }}
        </div>
        <div class="heartstone-winrates__title">
          {{ item.title }}
        </div>
        <div class="heartstone-winrates__percentage">
          <p :class="`heartstone-winrates__item_${getPercentClass(item.percent)}`">
            {{ item.percent }}
          </p>
          <span :class="`heartstone-winrates__item_${getPercentClass(item.percent)}`">%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.heartstone-winrates {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin-left: 10px;
    font-weight: 800;
    font-size: 1.3rem;
    color: $white;
    text-shadow: 2px 2px black;
  }
  
  &__place {
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.3rem;
    background-color: rgba(18, 18, 18, 0.6);
    text-align: center;
    text-shadow: 3px 2px black;
  }

  &__percentage {
    background-color: rgba(18, 18, 18, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    p,
    span {
      color: $white;
      font-weight: 700;
      font-size: 1.4rem;
    }

    span {
      margin-left: 4px;
    }
  }

  &__items {
    margin-top: 10px;
  }

  &__item {
    width: 100%;
    height: 50px;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: 100px 300px 100px;
    align-items: center;
    align-content: center;

    &_red {
      color: $red !important;
    }

    &_green {
      color: $green !important;
    }

    &_orange {
      color: $orange !important;
    }

    &_yellow {
      color: $yellow !important;
    }
  }
  
  @include ui-mobile-only {
    &__title,
    &__place {
      font-size: 1rem;
    }
    
    &__item {
      grid-template-columns: 60px 200px 60px;
    }
    
    &__percentage {
      p,
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
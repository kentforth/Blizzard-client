<script lang="ts">
export default {
  name: 'TopPlayers'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount
} from 'vue'

import { socket } from "@/services/socket";

import monk from '@/assets/images/wow/icons/monk.png'
import mage from '@/assets/images/wow/icons/mage.png'
import druid from '@/assets/images/wow/icons/druid.png'
import shaman from '@/assets/images/wow/icons/shaman.png'
import priest from '@/assets/images/wow/icons/priest.png'
import paladin from '@/assets/images/wow/icons/paladin.png'

const items = ref([
  {
    img: shaman,
    name: "Smxn",
    class: "Shaman"
  },
  {
    img: monk,
    name: "Drizzy",
    class: "Monk"
  },
  {
    img: priest,
    name: "Gekz",
    class: "Priest"
  },
  {
    img: paladin,
    name: "Cluti",
    class: "Paladin"
  },
  {
    img: shaman,
    name: "Bluegator",
    class: "Shaman"
  },
  {
    name: "Cream",
    class: "Mage",
    img: mage
  },
  {
    img: druid,
    name: "Mooncucumber",
    class: "Druid"
  },
  {
    img: paladin,
    name: "Pals",
    class: "Priest"
  },
  {
    img: priest,
    name: "Olimpics",
    class: "Priest"
  },
  {
    img: monk,
    name: "Stabww",
    class: "Monk"
  },
])

const series = ref([
  {
    name: "Rating",
    data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31],
  },
])

const chartOptions = ref({
  theme: {
    mode: 'dark'
  },
  chart: {
    type: "bar",
    height: 400,
    foreColor: "#f4e2e2",
    background: 'transparent',
  },
  colors: ["#024A4A"],
      plotOptions: {
    bar: {
      columnWidth: "50%",
          endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
  },
  tooltip: {
    theme: "dark",
  },
  grid: {
    row: {
      colors: ["#fff", "#f2f2f2"],
    },
  },
  responsive: [
    {
      breakpoint: 370,
      options: {
        height: 200,
      },
    },
  ],
      xaxis: {
    labels: {
      rotate: -45,
    },
    categories: [
      "Smxn",
      "Drizzy",
      "Gekz",
      "Cluti",
      "Bluegator",
      "Cream",
      "Mooncucumber",
      "Pals",
      "Olimpics",
      "Stabw",
    ],
        tickPlacement: "on",
  },
  yaxis: {
    title: {
      text: "Servings",
    },
  },
  fill: {
    type: "gradient",
      gradient: {
      shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [90],
    },
  },
})

onBeforeMount(() => {
  socket.on("wowTopPlayersRating", (data) => {
    series.value[0].data = data
  })
})
</script>

<template>
  <div class="wow-top-players">
    <h2>Top Players Ratings</h2>
    
    <div class="wow-top-players__items">
      <div
        class="wow-top-players__item"
        v-for="item in items"
        :key="item.name"
      >
        <p>{{ item.name }}</p>
        
        <hr class="wow-top-players__line">
        
        <p>{{ item.class }}</p>
        
        <img
          :src="item.img"
          :alt="item.name"
        >
      </div>
    </div>

    <div class="wow-top-players__chart">
      <apexchart
        type="bar"
        height="430"
        :series="series"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wow-top-players {
  background: rgba(173, 63, 31, 0.6);
  border-radius: $radius-4;
  padding: 20px;
  
  &__items {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 1fr);

    p {
      margin: 5px;
      font-size: 1rem;
    }

    p:first-child {
      font-weight: 700;
      color: #e37434;
    }
  }
  
  &__line {
    border: 1px solid $pink-90;
  }
  
  &__chart {
    margin-top: 20px;
  }
  
  @include ui-mobile-only {
    &__items {
      grid-template-columns: repeat(2, 1fr);
    }
    
  }
}
</style>
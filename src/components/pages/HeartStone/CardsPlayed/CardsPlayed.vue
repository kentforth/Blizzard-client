<script lang="ts">
export default {
  name: 'CardsPlayed'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

const series = ref([
  {
    data: [182, 283, 192, 241, 195, 136, 185, 253, 215, 243, 173, 216],
    name: "Games Played",
  },
])
 
 const chartOptions = ref({
   theme: {
     mode: 'dark'
   },
  chart: {
    background: 'transparent',
    foreColor: "#f4e2e2",
        height: 350,
        type: "bar",
  },
  colors: [
    "#FF5A68",
    "#55FF9F",
    "#4A41FF",
    "#83FF73",
    "#A13CFF",
    "#A5FFE2",
    "#FF9F5F",
    "#55BBFF",
    "#EF41FF",
    "#FFD678",
    "#4BD8FF",
    "#FF374B",
  ],
      plotOptions: {
    bar: {
      columnWidth: "45%",
          distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
  },
  responsive: [
    {
      breakpoint: 770,
      options: {
        chart: {
          height: 450,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
      xaxis: {
    max: 10,
        categories: [
      "Wand Thief",
      "Pen Flinger",
      "Boggspine Knukles",
      "Backstab",
      "Spirit Jailer",
      "Lightining Bloom",
      "Foxy Fraud",
      "Pharaoh Cat",
      "Swindle",
      "Shadow Step",
      "Tour Guide",
      "Kazakus",
    ],
        labels: {
      style: {
        colors: [
          "#FF5A68",
          "#55FF9F",
          "#4A41FF",
          "#83FF73",
          "#A13CFF",
          "#A5FFE2",
          "#FF9F5F",
          "#55BBFF",
          "#EF41FF",
          "#FFD678",
          "#4BD8FF",
          "#FF374B",
        ],
            fontSize: "12px",
      },
    },
  },
})

onBeforeMount(() => {
  socket.on("heartStoneCardsPlayed", (cardsPlayed) => {
    series.value[0].data = cardsPlayed;
  });
})

onBeforeUnmount(() => socket.off('heartStoneCardsPlayed'))
</script>

<template>
  <div class="heartstone-cards-played">
    <h2>Cards played by game mode over the last 5 minutes</h2>
    
    <apexchart
      type="bar"
      height="535"
      :series="series"
      :options="chartOptions"
      class="heartstone-cards-played__chart"
    />
  </div>
</template>

<style lang="scss" scoped>
.heartstone-cards-played {
  &__chart {
    margin-top: 10px;
  }
}
</style>
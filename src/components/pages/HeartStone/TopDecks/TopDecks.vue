<script lang="ts">
export default {
  name: 'TopDecks'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

import { socket } from "@/services/socket";

const series = ref([630, 1243, 658, 1421, 870, 1562])

 const chartOptions = ref({
  chart: {
    width: 380,
        type: "polarArea",
        foreColor: "#f4e2e2",
  },
  labels: [
    "Soul Demon Hunter",
    "Guardian Druid",
    "Highlander Hunter",
    "Broom Paladin",
    "Big Priest",
    "Secret Rogue",
  ],
      fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
        colors: undefined,
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
    },
  },
  theme: {
    monochrome: {
      enabled: true,
          color: "#7D4F78",
          shadeTo: "light",
          shadeIntensity: 0.6,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 350,
        },
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 370,
      options: {
        chart: {
          width: 270,
        },
      },
    },
  ],
})

onBeforeMount(() => {
  socket.on("heartstoneTopDeckGames", (games) => series.value = games);
})

onBeforeUnmount(() => socket.off('heartstoneTopDeckGames'))
</script>

<template>
  <div class="heartstone-top-decks">
    <h2>Top Deck Games</h2>
    
    <apexchart
      type="polarArea"
      width="380"
      :series="series"
      :options="chartOptions"
      class="heartstone-top-decks__chart"
    />
  </div>
</template>

<style lang="scss" scoped>
.heartstone-top-decks {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &__chart {
    margin-top: 10px;
  }
}
</style>
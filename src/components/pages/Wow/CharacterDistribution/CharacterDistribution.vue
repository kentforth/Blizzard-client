<script lang="ts">
export default {
  name: 'CharacterDistribution'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount
} from 'vue'

import { socket } from "@/services/socket";

const series = ref([
  {
    name: "EU Realms",
    data: [10, 9.5, 9.9, 9.9, 8.9, 8.2, 8.4, 7.9, 7.6, 6.7, 5.3, 5.5],
  },
  {
    name: "U.S. Realms",
    data: [11, 9.7, 9.7, 9.5, 8.8, 8.4, 8.6, 8, 7.5, 6.4, 5, 5],
  },
])

const chartOptions = ref({
  theme: {
    mode: 'dark'
  },
  chart: {
    type: "bar",
    height: 500,
    foreColor: "#f4e2e2",
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      horizontal: true,
          dataLabels: {
        position: "top",
      },
    },
  },
  colors: ["#4BE38C", "#1E7CE3"],
      dataLabels: {
    enabled: true,
        offsetX: -10,
        style: {
      fontSize: "12px",
          colors: ["#fff"],
    },
  },
  tooltip: {
    theme: "dark",
  },
  stroke: {
    show: true,
        width: 1,
        colors: ["#fff"],
  },
  xaxis: {
    categories: [
      "Hunter",
      "Paladin",
      "Druid",
      "Warrior",
      "Mage",
      "Dead Knight",
      "Priest",
      "Rogue",
      "Warlock",
      "Shaman",
      "Monk",
      "Demon Hunter",
    ],
  },
})

onBeforeMount(() => {
 socket.on("wowCharacterDistribution", (charactersArray) => {
    series.value[0].data = charactersArray[0]
    series.value[1].data = charactersArray[1]
  });
})
</script>

<template>
  <div class="wow-character-distribution">
    <h2>
      Distribution of World of Warcraft characters in U.S. and EU realms
      by class
    </h2>

    <apexchart
      type="bar"
      height="500"
      :series="series"
      :options="chartOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.wow-character-distribution {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(173, 63, 31, 0.6);
  border-radius: $radius-4;
  padding: 2%;
}
</style>

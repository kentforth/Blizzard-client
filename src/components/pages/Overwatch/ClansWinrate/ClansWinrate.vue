<script lang="ts">
export default {
  name: 'ClansWinrate'
}
</script>

<script setup lang="ts">
import {
  ref,
  UnwrapRef,
  onBeforeMount
} from 'vue'

import { socket } from "@/services/socket";

const clansSeries = ref<UnwrapRef<object>>([
  {
    name: "Teamfight Win Rates",
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8],
  },
])

const clansOptions =  {
  theme: {
    mode: 'dark'
  },
  chart: {
    fontFamily: 'Open Sans, sans-serif',
    background: 'transparent',
    height: 350,
    type: "bar",
    foreColor: "#FFEDFF",
  },
  plotOptions: {
    bar: {
      distributed: true,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  fill: {
    colors: [
      "#F44A03",
      "#006EC8",
      "#22477B",
      "#968630",
      "#92D000",
      "#F09829",
      "#3C0F50",
      "#00B7D3",
      "#F7CA00",
      "#EB222E",
    ],
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "14px",
    },
  },
  xaxis: {
    categories: [
      "Shock",
      "Fuel",
      "Uprising",
      "Dynasty",
      "Outlaws",
      "Fusion",
      "Gladiators",
      "Spitfire",
      "Valiant",
      "Dragons",
    ],
    position: "top",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val: number) {
        return val + "%";
      },
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    theme: "dark",
  },
}

onBeforeMount(() => {
  socket.on("overwatchTeamWinRate", (data) => {
    clansSeries.value = [{ data }];
  });
})

</script>

<template>
  <apexchart
    type="bar"
    height="270"
    :series="clansSeries"
    :options="clansOptions"
    class="overwatch-clans-winrate-chart"
  />
</template>

<style lang="scss">
.overwatch-clans-winrate-chart {
  margin-top: 10px;
}
</style>
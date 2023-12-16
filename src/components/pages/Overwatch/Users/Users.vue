<script lang="ts">
export default {
  name: 'Users'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount
} from 'vue'

import { socket } from "../../../../services/socket";

const usersSeries = ref([
  {
    name: "Users",
    data: [],
  },
])

const usersOptions = ref({
  grid: {
    show: false,
  },
  theme: {
    mode: 'dark'
  },
  chart: {
    type: "area",
    speed: 800,
    delay: 150,
    easing: "easeinout",
    enabled: true,
    fontFamily: 'Open Sans, sans-serif',
    foreColor: "#FFEDFF",
    background: 'transparent',
    animations: {
      animateGradually: {
        enabled: true,
      },
      dynamicAnimation: {
        speed: 350,
        enabled: true,
      },
    },
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    type: "datetime",
    tickAmount: 9,
    labels: {
      format: "HH:mm:ss",
      datetimeUTC: false,
    },
  },
  colors: ["#DAA011"],
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "HH:mm:ss",
    },
  },
  dataLabels: {
    enabled: false,
  },
})

onBeforeMount(() => {
  socket.on("overwatchNewNumber", (args: number) => {
    addUser(args)
  });
})

const addUser  = (user: number) => {
  if (usersSeries.value[0].data.length >= 20) {
    return usersSeries.value[0].data.shift()
  }

  if (usersSeries.value[0].data.length >= 100) {
    return
  }

  usersSeries.value[0].data.push(user);
}
</script>

<template>
  <apexchart
    type="area"
    height="270"
    :series="usersSeries"
    :options="usersOptions"
    class="overwatch-users-chart"
  />
</template>

<style lang="scss">
.overwatch-users-chart {
  margin-top: 10px;
}
</style>
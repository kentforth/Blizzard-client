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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Spinner from 'vue-easy-spinner/package/Spinner.vue';

import { socket } from "@/services/socket";

import { ISeries } from '@/types'

const hasSpinner = ref(true)

const usersSeries = ref<ISeries[]>([
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
  socket.on("overwatchNewNumber", (args: any) => {
    addUser(args)
  });
})

const addUser  = (user: any) => {
  if (usersSeries.value[0].data.length >= 20) {
    return usersSeries.value[0].data.shift()
  }

  if (usersSeries.value[0].data.length >= 100) {
    return
  }

  usersSeries.value[0].data.push(user);
  
  if (usersSeries.value[0].data.length) {
    hasSpinner.value = false
  }
}
</script>

<template>
  <div class="overwatch-users">
    <Spinner
      v-if="hasSpinner"
      type="circular"
      size="36"
      class="overwatch-users__spinner"
    />

    <apexchart
      type="area"
      height="270"
      :series="usersSeries"
      :options="usersOptions"
      class="overwatch-users__chart"
    />
  </div>
</template>

<style lang="scss" scoped>
.overwatch-users {
  position: relative;
  
  &__chart {
    margin-top: 10px;
  }
  
  &__spinner {
    position: absolute;
    left: 50%;
    top: 100px;
  }
}
</style>
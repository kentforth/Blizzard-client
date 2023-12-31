<script lang="ts">
export default {
  name: 'Users'
}
</script>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

import Spinner from 'vue-easy-spinner/package/Spinner.vue';

import { socket } from "@/services/socket";

import { ISeries } from "@/types";

const hasSpinner = ref(true)
const usersSeries = ref<ISeries[]>([
  {
    name: "Users",
    data: [],
  },
])
const chartOptions = ref({
  theme: {
    mode: 'dark'
  },
  chart: {
    background: 'transparent',
    type: "area",
        foreColor: "#FFEDFF",
        animations: {
      enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
        enabled: true,
            delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
            speed: 350,
      },
    },
  },
  colors: ["#010D4F"],
      dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    show: false,
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
  tooltip: {
    theme: "dark",
        x: {
      format: "HH:mm:ss",
    },
  },
})

onBeforeMount(() => {
  socket.on("starcraftGenerateUsers", (user: any) => {
    addUser(user);
  });
})

onBeforeUnmount(() => {
  socket.off("starcraftGenerateUsers");
})

const addUser = (user: any) =>  {
  if (usersSeries.value[0].data.length >= 20) {
    return usersSeries.value[0].data.shift();
  } 
    
  usersSeries.value[0].data.push(user);
  
  if (usersSeries.value[0].data.length) {
    hasSpinner.value = false
  }
  
}
</script>

<template>
  <div class="starcraft-users">
    <h2>Users</h2>

    <Spinner
      v-if="hasSpinner"
      type="circular"
      size="36"
      class="starcraft-users__spinner"
    />
    
    <apexchart
      ref="usersChart"
      type="area"
      height="200"
      :series="usersSeries"
      :options="chartOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.starcraft-users {
  position: relative;
  h2 {
    margin-top: 20px;
    text-align: center;
  }
  
  &__spinner {
    position: absolute;
    left: 50%;
    top: 100px;
  }
}

</style>
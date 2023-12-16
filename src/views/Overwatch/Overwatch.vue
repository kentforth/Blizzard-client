<script>
import Card from "../../components/pages/Overwatch/Card/Card.vue";
import Navigation from "../../components/Navigation/Navigation.vue";

export default {
name: "Overwatch",
  
components: {
  Card,
  Navigation
  },
}
</script>

<script setup>
import { 
  ref,
  onBeforeMount
} from 'vue'

import { socket } from "../../services/socket.ts";
import UiButton from "../../components/UiButton/UiButton.vue";

const isConnected = ref(true)

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

const clansSeries = ref([
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
        formatter: function (val) {
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
          formatter: function (val) {
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
  socket.on("overwatchNewNumber", (...args) => {
    addUser(...args)
  });

  socket.on("overwatchTeamWinRate", (data) => {
    clansSeries.value = [
      {
        data,
      },
    ];
  });
})

const addUser  = (user) => {
  if (usersSeries.value[0].data.length >= 20) {
    return usersSeries.value[0].data.shift()
  } 
  
  if (usersSeries.value[0].data.length >= 100) {
    return
  }
  
  usersSeries.value[0].data.push(user);

  usersSeries.value = [
    {
      data: usersSeries.value[0].data,
    },
  ]
}

const onClick  = () => {
  isConnected.value = !isConnected.value
  
  if (!isConnected.value) {
    return socket.disconnect()
  }
  
  socket.connect()
}

</script>

<template>
  <div class="overwatch">
    <Navigation />
    
    <div class="container overwatch__container">
      <UiButton
        title="Pause connection"
        class="overwatch__button"
        @click="onClick"
      />
      
      <div class="overwatch__inner">
        <Card
          icon="users"
          title="Users"
          class="overwatch__card"
        >
          <apexchart
            type="area"
            height="200"
            :series="usersSeries"
            :options="usersOptions"
            class="overwatch__chart"
          />
        </Card>

        <Card
          icon="clans"
          title="Clans winrate"
          class="overwatch__card"
        >
          <apexchart
            type="bar"
            height="270"
            :series="clansSeries"
            :options="clansOptions"
            class="overwatch__chart"
          />
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Overwatch.scss"></style>
<script>
import Card from "../components/pages/Overwatch/Card/Card.vue";
import Navigation from "../components/Navigation/Navigation.vue";

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
  onMounted
} from 'vue'

import { socket } from "../services/socket.ts";

const usersChartOptions =  {
  chart: {
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
  colors: ["#DAA011"],
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
}

const usersSeries = ref([
  {
    name: "Users",
    data: [],
  },
])

onMounted(() => {
  socket.on("overwatchNewNumber", (...args) => {
    addUser(...args)
  });
})

const addUser  = (user) => {
  if (usersSeries.value[0].data.length >= 20) {
    usersSeries.value[0].data.shift();
  } else {
    usersSeries.value[0].data.push(user);
  }

  usersSeries.value = [
    {
      data: usersSeries.value[0].data,
    },
  ];
}

</script>

<template>
  <div class="overwatch">
    <Navigation />
    
    <div class="container">
      <Card
        title="Users"
        icon="users"
      >
        <apexchart
          type="area"
          height="200"
          :options="usersChartOptions"
          :series="usersSeries"
        />
      </Card>
      <Card
        title="Clans"
        icon="clans"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.overwatch {
  background: url("../assets/images/overwatch-bg.png") center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  position: absolute;
  
  .container {
    margin-left: auto;
    width: calc(100% - 170px);
    align-self: center;
    justify-content: space-between;
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }
}
</style>
<script lang="ts">
export default {
  name: 'Character'
}
</script>

<script setup lang="ts">
import {
  ref,
  computed
} from 'vue'

import monk from '@/assets/images/diablo/monk.png'
import wizard from '@/assets/images/diablo/wizard.png'
import barbarian from '@/assets/images/diablo/barbarian.png'
import demonHunter from '@/assets/images/diablo/demon-hunter.png'
import witchDoctor from '@/assets/images/diablo/witch-doctor.png'

import AttributeButton from "@/components/pages/Diablo/AttributeButton/AttributeButton.vue";
import CalculateButton from "@/components/pages/Diablo/CalculateButton/CalculateButton.vue";

const image = computed(() => {
  switch(props.character) {
    case 'barbarian':
      return barbarian;
    case 'demonHunter':
      return demonHunter;
    case 'monk':
      return monk;
    case 'witchDoctor':
      return witchDoctor;
    case 'wizard':
      return wizard;
    default: 
      return barbarian
  }
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  
  character: {
    type: String,
    required: true
  }
})

const stats = ref([
  { value: 23, characteristics: 'Vitality' },
  { value: 12, characteristics: 'Strength' },
  { value: 4, characteristics: 'Dexterity' },
  { value: 17, characteristics: 'Intelligence' },
])

const series = ref([23, 12, 4 ,17])

const chartOptions = ref({
  chart: {
    type: "radialBar",
    foreColor: "#f4e2e2",
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "36%",
        background: "transparent",
        image: undefined,
      },
    },
  },
  colors: ["#D90208", "#66D923", "#2395D9", "#D98718"],
  labels: ["Strength", "Dexterity", "Intelligence", "Vitality"],
  legend: {
    show: true,
    floating: true,
    fontSize: "16px",
    position: "left",
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0,
    },
    formatter: function (seriesName, opts) {
      return (
          seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
      );
    },
    itemMargin: {
      vertical: 3,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: "100%",
          maxHeight: "600px",
        },
        legend: {
          show: false,
        },
      },
    },
  ],
})

const add = (index) => {
  stats.value[index].value = stats.value[index].value + 1
}

const remove = (index) => {
  stats.value[index].value = 
  stats.value[index].value === 0 ?
  stats.value[index].value : stats.value[index].value - 1
}

const generateStats = () => {
  const array = stats.value.map(el => el.value)
  const newArray = [];
  const sum = array.reduce((a, b) => a + b, 0);
  let percent = null;
  array.forEach((element) => {
    percent = (element * 100) / sum;
    newArray.push(percent.toFixed(1));
  });

  series.value = newArray.map(Number)
}
</script>

<template>
  <div class="diablo-character">
    <h3>{{ props.title }}</h3>
    <img
      :src="image"
      alt="barbarian"
      class="diablo-character__image"
    >
    
    <div class="diablo-character__inner">
      <div
        class="diablo-character__stats"
        v-for="(stat, index) in stats"
        :key="stat.characteristics"
      >
        <p>{{ stat.characteristics }}:</p> <span>{{ stat.value }}</span>
        <div class="diablo-character__buttons">
          <AttributeButton
            text="-"
            @click="remove(index)"
          />
          <AttributeButton
            text="+"
            @click="add(index)"
          />
        </div>
      </div>
      
      <CalculateButton
        class="diablo-character__calculate"
        @click="generateStats"
      />

      <apexchart
        type="radialBar"
        height="300"
        :series="series"
        :options="chartOptions"
        class="diablo-character__chart"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.diablo-character {
  border: 1px solid $white;
  border-radius: $radius-8;
  padding: 20px;
  display: flex;
  width:100%;
  box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.7);
  flex-direction: column;
  align-items: center;
  
  h3 {
    text-align: center;
  }
  
  &__image {
    margin-top: 10px;
    height: 120px;
    width: max-content;
  }
  
  &__stats {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    grid-column: 1;
    
    &:nth-child(1) {
      grid-row: 1;
    }

    &:nth-child(2) {
      grid-row: 2;
    }

    &:nth-child(3) {
      grid-row: 3;
    }

    &:nth-child(4) {
      grid-row: 4;
    }
    
    p {
      width: 70px;
    }
    
    span {
      width: 30px;
      margin-left: 40px;
      color: $pink;
    }
  }
  
  &__inner {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  &__buttons {
    display: flex;
    align-items: center;
    margin-left: 30px;
    justify-items: center;
    
    .button {
      &:first-child {
        margin-left: 0;
      }
    }
  }
  
  &__calculate {
    margin-top: 20px;
    grid-row: 5;
  }
  
  &__chart {
    grid-column: 2;
    grid-row: 1 / span 5;
  }
  
  @include ui-mobile-only {
    &__inner {
      grid-template-columns: 1fr;
    }
    
    &__calculate {
      grid-row: 6;
    }
    
    &__chart {
      grid-row: 5;
      grid-column: 1;
    }
  }
}
</style>
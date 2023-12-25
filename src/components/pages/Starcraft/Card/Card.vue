<script lang="ts">
export default {
  name: 'Card'
}
</script>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'image'
  },
  units: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="card__container">
      <div class="card__inner">
        <img
          :src="image"
          :alt="alt"
          class="card__image"
        >
        <div class="card__units">
          <div
            class="card__unit-item"
            v-for="unit in units"
            :key="unit.title"
          >
            <img
              :src="unit.image"
              :alt="unit.title"
            >
             
            <p>{{ unit.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  &__container {
    width: 270px;
    height: 370px;
    position: relative;
    justify-content: center;
    align-items: center;
    
    &:hover > .card__inner {
      transform: rotateY(180deg) translateY(-20px);
    }
  }
  
  &__inner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform-style: preserve-3d;
    transition: all 0.7s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  
  &__units {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 10px;
    position: relative;
    top: 10px;
    left: 12px;
    width: 93%;
    height: 93%;
    backface-visibility: hidden;
    background-color: $deep-blue;
    border-radius: 5px;
    transform: rotateY(180deg);
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.5);
  }
  
  &__unit-item {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-gap: 10px;
    align-items: center;
    justify-items: start;
    padding: 0 0 0 20px;

    img {
      width: 100%;
      height: 100%;
    }

    p {
      font-size: 1rem;
      color: $gold;
    }
  }
}
</style>
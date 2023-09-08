<template>
    <div>
      <div class="star-rating">
        <div
          v-for="star in 5"
          :key="star"
          @mouseover="highlightStars(star)"
          @mouseleave="resetStars()"
          @click="toggleRating(star)"
          class="star"
          :class="{ 'star-disabled': selectedRating > 0 }"
        >
          <Icon
            :name="star <= selectedRating ? 'ph:bookmark-simple' : 'ph:bookmark-simple-duotone'"
            :size="21"
            :class="{
              'star-highlighted': star <= hoverRating || star <= selectedRating,
              'star-selected': star <= selectedRating
            }"
          />
        </div>
      </div>
      <p>{{ selectedRating }} gwiazdek wybranych</p>
      <button @click="remove()">usun</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedRating = ref(2);
  const hoverRating = ref(0);
  
  const toggleRating = (rating) => {
    if (selectedRating.value === 0) {
      selectedRating.value = rating; 
    }
  };
  
  const highlightStars = (rating) => {
    hoverRating.value = rating;
  };

  const remove = () => {
    selectedRating.value=0
    hoverRating.value = 0;

  }
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
  }
  
  .star {
    margin-right: 5px;
    cursor: pointer;
  }
  
  .star-highlighted, .star-selected {
    color: green;
  }
  
  .star-selected {
    color: green;
  }
  
  .star-disabled {
    pointer-events: none; 
    opacity: 0.5; 
  }
  </style>
  
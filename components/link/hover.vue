<template>
    <div @mouseover="handleMouseOver" @mouseout="handleMouseOut" class="w-full flex flex-row justify-between">
      <NuxtLink :to="props?.link?.toLowerCase()">
    <p 
    :style="{ fontSize: props.size + 'px' }"
    :class="[
    isHovered ? 'font-normal' : 'font-light',
    props.name=='Wyloguj się' ? 'hover:text-red-600' : ''
    ]">   {{ props.name }}</p>
      </NuxtLink>
      <Icon
        v-if="isHovered"
        name="ph:arrow-up-right"
        :size="iconSize"
        ref="icon"
      />
      <!-- <Icon
      v-else
      name="ph:arrow-up-right"
      :color="[props.notHover ? 'white': '#C5C5C5']"
      :size="iconSize"
    /> -->
    </div>
  </template>
  
  <script setup lang="ts">
  import gsap from 'gsap';
  const icon = ref()
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    }, 
    notHover: {
      type: Boolean,
      required: false,
    }, 
    size: {
      type: String,
      required: true,
    }, 
    iconSize: {
      type: String,
      required: true,
    },
  });
  
  const isHovered = ref(false);
  
  const handleMouseOver = () => {
    isHovered.value = true;
    gsap.to('icon', { opacity: 1});
  };
  
  const handleMouseOut = () => {
    isHovered.value = false;
    gsap.to('icon', { opacity: 0 });
  };
  </script>
  
  <style scoped>
  .wait {
    opacity: 0;
  }
  </style>
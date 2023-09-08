<template>
    <NuxtLink :to="props.link">
      <button class="button-category">{{ props.name }}</button>
    </NuxtLink>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  </style>
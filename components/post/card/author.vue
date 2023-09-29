<template>
    <div class="cursor-default">
      <img :src="post.image" class="image isLoading" />
      <NuxtLink :to="`/post/${post.link}`" class="cursor-pointer">
        <h3
        class="hover:underline mt-4 mb-3"
          
        >
          {{ sliceText(post.title, 45) }}
        </h3></NuxtLink
      >
      <p class="des">{{ sliceText(post.description, 100) }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
      post: Object as () => New,
    });
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .image {
    border: 1px solid $border;
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    height: 200px
  }
  
  </style>
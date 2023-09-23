<template>
    <div class="cursor-default"
    :style="{ width: props.elementWidth + 'px' }"
    >
      <img :src="post.image" class="image" :style="{ height: props.imageHeight + 'px' }" />
      <div class="flex justify-between" :style="{ marginTop: props.authorTop + 'px' }">
        <div class="flex gap-1 items-center">
          <img
            v-if="post.profiles.avatar_url"
            :src="post.profiles.avatar_url"
            class="avatar"
            loading="lazy"
          />
          <Icon
            v-else
            name="carbon:user-avatar-filled"
            class="avatar"
            color="#BFCBEE"
            size="23"
          />
          <NuxtLink :to="`/autor/${post.profiles.link}`">
            <p class="text-sm hover:underline">{{ post.profiles.full_name }}</p>
          </NuxtLink>
        </div>
        <div class="flex gray place-items-center gap-[6px]">
          <p class="text-[15px]">{{ post.time_read }} min</p>
          <div class="dot" />
          <p class="text-[15px]">{{ calculateElapsedTime(post.created_at) }}</p>
        </div>
      </div>
      <NuxtLink :to="`/post/${post.link}`" class="cursor-pointer">
        <h2
        class="hover:underline"
          :style="{
            fontSize: props.titleSize + 'px',
            marginTop: props.titleTop + 'px',
            marginBottom: props.titleBottom + 'px',
          }"
        >
          {{ post.title }}
        </h2></NuxtLink
      >
      <p class="des" v-if="props.isDescription">{{ sliceText(post.description, props.desLength) }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
      post: Object as () => New,
    imageHeight: Number,
    elementWidth: Number,
    titleSize: Number,
    titleTop: Number,
    titleBottom: Number,
    authorTop: Number,
    desLength: {
      type: Number,
      required: true,
    },
    isDescription:{
      type: Boolean,
      required: true,
    }
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .image {
    border-radius: 14px;
    object-fit: cover;
    width: 100%;
    border: 1px solid $border;

  }
  
  .avatar {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    object-fit: cover;
  }
  .dot {
    width: 5px;
    height: 5px;
    background-color: $gray;
    border-radius: 50%;
  }
  .gray {
    color: $gray;
  }
  </style>
<template>
    <div class="cursor-default flex">
      <div class="flex flex-col shrink-1 pr-[50px]">
        <div class="flex place-itenms-content justify-between mb-[6px]">
          <div class="flex gap-[6px] place-items-center">
            <img
              v-if="post.profiles.avatar_url"
              :src="post.profiles.avatar_url"
              class="avatar isLoadingImage"
              loading="lazy"
            />
            <Icon
              v-else
              name="carbon:user-avatar-filled"
              class="avatar -mt-1"
              color="#BFCBEE"
              size="25"
            />
            <NuxtLink :to="`/autor/${post.profiles.link}`">
              <p class="text-[15px] family  hover:underline text-light">{{ post.profiles.full_name }}</p>
            </NuxtLink>
          </div>
          <div class="flex gray place-items-center gap-[15px] place-items-center">
            <div class="flex place-items-center gap-[3px]">
                <Icon name="ph:chat-circle-dots" size="24"/>
              <p class="text-[15px]">{{ post.time_read }} </p>
            </div>
            <ButtonsSaved :id="post.id" :size="23"/>
          </div>
        </div>
        <NuxtLink :to="`/post/${post.link}`" class="cursor-pointer">
          <p class="font-medium text-[21px] hover:underline">
            {{ post.title }}
          </p>
        </NuxtLink>
        <p class="des mt-[6px]">
          {{ sliceText(post.description, 114) }}
        </p>
        <div class="flex justify-between mt-[12px]">
          <div class="flex gap-[14px]">
            <!-- {{ post.category_id2.link }} -->
            <LinkCategory :name="post.category_id2.name" :link="post.category_id2.link" />
            <LinkCategory :name="post.category_id1.name" :link="post.category_id1.link" />
          </div>
          <div class="flex gray place-items-center gap-[6px]">
            <p class="text-[15px]">{{ post.time_read }} min</p>
            <div class="dot" />
            <p class="text-[15px]">{{ calculateElapsedTime(post.created_at) }}</p>
          </div>
        </div>
      </div>
      <div class="w-[250px] h-[190px] flex shrink-0">
        <img
          :src="post.image"
          class="image isLoadingImage"
          :style="{ height: props.imageHeight + 'px' }"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    post: Object as () => any,
    imageHeight: Number,
    elementWidth: Number,
    titleSize: Number,
    titleTop: Number,
    titleBottom: Number,
    authorTop: Number,
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .image {
    border-radius: 10px;
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
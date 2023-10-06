<template>
    <div class="cursor-default flex mt-[42px] justify-between">
      <div class="flex flex-col shrink-1 md:pr-[50px] w-full pr-5">
        <div class="flex place-items-content justify-between mb-[6px]">
          <div class="flex gap-[6px] place-items-center md:mt-0 mt-1">
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
              size="22"
            />
            <NuxtLink :to="`/autor/${post.profiles.link}`">
              <p class="md:text-[15px] family  hover:underline text-light text-[13px] -mt-1 md:mt-0">{{ post.profiles.full_name }}</p>
            </NuxtLink>
          </div>
          <div class="md:flex hidden gray place-items-center md:gap-[15px]">
            <div class="flex place-items-center gap-[3px]">
                <Icon name="ph:chat-circle-dots" size="24"/>
              <p class="text-[15px]">{{ post.time_read }} </p>
            </div>
            <ButtonsSaved :id="post.id" :size="27"/>
          </div>
        </div>
        <NuxtLink :to="`/post/${post.link}`" class="cursor-pointer">
          <p class="font-medium md:text-[21px] md:text-[15px] md:leading-normal hover:underline  leading-[24px] text-[17px] font-semibold">
            {{ sliceText(post.title, 40) }}
          </p>
        </NuxtLink>
        <p class="des mt-[6px] md:flex hidden">
          {{ sliceText(post.description, 114) }}
        </p>
        <div class="md:flex justify-between md:mt-[12px] mt-[7px]">
          <div class="hidden md:flex gap-[14px]">
            <!-- {{ post.category_id2.link }} -->
            <LinkCategory :name="post.category_id2.name" :link="post.category_id2.link" />
            <LinkCategory :name="post.category_id1.name" :link="post.category_id1.link" />
          </div>
          <div class="hidden md:flex gray place-items-center gap-[6px]">
            <p class="text-[15px]">{{ post.time_read }} min</p>
            <div class="dot" />
            <p class="text-[15px]">{{ calculateElapsedTime(post.created_at) }}</p>
          </div>
          <div class="flex md:hidden gray place-items-center justify-between">
            <!-- <p class="text-[15px]">{{ post.time_read }} min</p> -->
            <!-- <div class="dot" /> -->
            <p class="text-[15px]">{{ calculateElapsedTime(post.created_at) }}</p>
            <ButtonsSaved :id="post.id" :size="27"/>
          </div>
        </div>
      </div>
      <div class="md:w-[250px] md:h-[190px] flex shrink-0 w-[100px] h-[100px]">
        <img
          :src="post.image"
          class="image isLoading"
          />
          <!-- :style="{ height: props.imageHeight + 'px' }" -->
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
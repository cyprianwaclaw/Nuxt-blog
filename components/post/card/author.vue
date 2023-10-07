<template>
  <div class="cursor-default md:h-[425px] relative">
    <img :src="post.image" class="image isLoading" />
    <div class="flex justify-between mt-[10px] mb-[7px]">
      <div class="flex gap-[6px] items-center">
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
      <ButtonsSaved :size="30" :id="post.id "/>
    </div>
    <NuxtLink :to="`/post/${post.link}`" class="cursor-pointer">
      <h3 class="hover:underline">
        {{ sliceText(post.title, 54) }}
      </h3></NuxtLink
    >
    <p class="des mt-[6px]">{{ sliceText(post.description, 150) }}</p>
    <div class="md:absolute bottom-0 w-full flex justify-between place-items-center mt-4 md:mt-0 md:mb-0">
<div class="gap-[12px] flex">
  <LinkCategory :name="post.category_id1.name" :link="post.category_id1.link"/>
  <LinkCategory :name="post.category_id2.name" :link="post.category_id2.link"/>
</div>
      <div class="flex gray">
        <p class="text-[15px]">{{ calculateElapsedTime(post.created_at) }}</p>
      </div>
    </div>
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
  height: 200px;
}
</style>

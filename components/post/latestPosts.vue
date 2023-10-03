<template>
  <!-- <div> -->
  <div>
    <div class="flex flex-col md:hidden mb-[54px]">
      <p class="text-[19px] mb-[12px] mt-[2px]">Może Ci się spodobać</p>
      <div
        class="w-full overflow-x-auto scrollbar-hide w-full"
      >
        <div class="flex space-x-8">
          <!-- Use "space-x-7" to add space between items -->
          <div
            v-for="(single, index) in posts"
            :key="index"
            class="flex-shrink-0 w-[270px]"
          >
            <img :src="single.image" class="image isLoading" />
            <!-- Your other content goes here -->
            <div class="flex justify-between mt-2 mb-3">
              <div class="flex gap-1 items-center">
                <img
                  v-if="single.profiles.avatar_url"
                  :src="single.profiles.avatar_url"
                  class="avatar"
                />
                <Icon
                  v-else
                  name="carbon:user-avatar-filled"
                  class="avatar"
                  color="#BFCBEE"
                  size="21"
                />
                <NuxtLink :to="`/autor/${single.profiles.link}`">
                  <p class="text-sm hover:underline">{{ single.profiles.full_name }}</p>
                </NuxtLink>
              </div>
              <p class="text-[14px] gray font-light">{{ calculateElapsedTime(single.created_at) }}</p>
              <!-- <div class="flex gray place-items-center gap-[6px]">
                 <p class="text-[14px]">{{ single.time_read }} min</p>
                <div class="dot" /> 
              </div> -->
            </div>
            <NuxtLink :to="`/post/${single.link}`" class="cursor-pointer">
              <p class="text-[18px] w-full font-medium">
                {{ single.title }}
              </p></NuxtLink
            >
            <!-- <p class="des mt-1">{{ sliceText(single.description, 100) }}</p> -->
          </div>
        </div>
      </div>
    </div>
    <div class="md:flex w-full mb-[200px] hidden">
      <div class="w-[750px] pr-[50px]">
        <p class="text-[19px] mb-[10px] mt-[2px]">Może Ci się spodobać</p>
        <PostCardNew
          :post="posts[0]"
          :imageHeight="450"
          :titleTop="7"
          :titleBottom="12"
          :authorTop="12"
          :desLength="250"
          :isDescription="true"
        />
      </div>
      <div class="grid grid-rows-2 w-[400px] pl-[50px] border-own gap-y-[40px]">
        <PostCardNew
          :post="posts[1]"
          :titleSize="18"
          :imageHeight="180"
          :titleTop="10"
          :titleBottom="6"
          :authorTop="12"
          :desLength="105"
          :isDescription="true"
        />
        <PostCardNew
          :post="posts[2]"
          :titleSize="18"
          :imageHeight="180"
          :titleTop="10"
          :titleBottom="6"
          :authorTop="12"
          :desLength="105"
          :isDescription="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
let { data: posts, error } = (await supabase
  .from("posts")
  .select(
    `   
      id,
     title,
     link,
     created_at,
       image,
        time_read,
       description,
      profiles(
         full_name,
         link,
         avatar_url
       )
     `
  )
  .limit(4)
  .order("created_at", { ascending: false })) as any;
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-left: 1px solid $border;
}
.image {
  border-radius: 12px;
  object-fit: cover;
  width: 100%;
  height: 260px;
  border: 1px solid $border;
}
</style>

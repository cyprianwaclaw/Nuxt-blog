<template>
    <div>
      <!-- {{posts[0]}} -->
      <div class="flex w-full mb-[200px]">
        <div class="w-[750px] pr-[50px]">
          <p class="text-[19px] mb-[10px] mt-[2px]">Może Ci się spodobać</p>
          <PostCardNew
            :post="posts[0]"
            :imageHeight="450"
            :titleTop="16"
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
            :titleTop="14"
            :titleBottom="6"
          :authorTop="12"
            :desLength="105"
            :isDescription="true"
          />
          <PostCardNew
            :post="posts[2]"
            :titleSize="18"
            :imageHeight="180"
            :titleTop="14"
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
     title,
     created_at,
       image,
        time_read,
       description,
      profiles(
         full_name,
         avatar_url
       )
     `
    )
    .limit(3)
    .order("created_at", { ascending: false })) as any;
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .border-own{
  border-left: 1px solid $border;
  }
  </style>
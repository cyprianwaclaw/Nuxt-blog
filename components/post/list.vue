<template>
    <div class="flex w-full">
      <div class="pr-[50px] shrink-1">
        <div v-for="(post, index) in posts" :key="index" class="grid grid-col">     
            <!-- {{ post.category_id1.name }}
            {{ post.category_id2.name }}        -->
          <PostCardList :post="post" 
          :class="[index !== posts.length -1 ? 'mb-[110px]' : 'mb-[42px]']"
          />
        </div>
      </div>
      <div class="pl-[50px] border-own shrink-0 w-[300px]">
        <div class="w-full h-12 bg-blue-100"></div>
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
          category_id1(name),
          category_id2(name),
         description,
        profiles(
           full_name,
           avatar_url
         )
       `
    )
    .limit(6)) as //   .order("created_at", { ascending: false })
  any;
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .border-own {
    border-left: 1px solid $border;
  }
  </style>
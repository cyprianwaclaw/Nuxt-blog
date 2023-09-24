<template>
  <NuxtLayout name="list">
    <template #content>
      <div v-for="(post, index) in posts" :key="index" class="grid grid-col">   
      <PostCardList :post="post" 
      :class="[index !== posts.length -1 ? 'mb-[110px]' : 'mb-[42px]']"
      />
    </div>
      </template>
      <template #sidebar>
        <h5 class="mt-4">Popularne tematy</h5>
          <div class="flex flex-wrap gap-x-3 gap-y-3 mt-5 border-own pb-8">
            <LinkCategory v-for="(single, index) in categories" :key="index" :name="single.name" :link="single.id"/>
          </div>
          <!-- <div class="flex flex-wrap gap-x-3 gap-y-3 mt-5 border-own pb-8">
            <LinkCategory v-for="(single, index) in categories" :key="index" :name="single.name" :link="single.id"/>
          </div> -->
      </template>
  </NuxtLayout>

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
          category_id1(name, link),
          category_id2(name, link),
         description,
        profiles(
           full_name,
           link,
           avatar_url
         )
       `
    )
    .limit(6)) as //   .order("created_at", { ascending: false })
  any;

const {data: categories} = (await supabase
.from("categories")
.select('*')
) as any

  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .border-own {
    border-bottom: 1px solid $border;
  }
  </style>
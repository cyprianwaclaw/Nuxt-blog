<template>
  popular
    <div v-for="(post, index) in posts" :key="index" class="grid grid-col mt-[43px]">
        <PostCardList
        :post="post"
        :class="[index !== posts.length - 1 ? 'mb-[58px]' : 'mb-[42px]']"
        />
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
  .order("created_at", { ascending: false })
  .limit(6)) as any;

  </script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

</style>
/!czekaniwe az wszystko się załaduje i wtedy pobiera dane
<template>
  <div  class="w-full">
    <div v-if="isLoading">Czekam na dane...</div>
    <div class="md:grid md:grid-cols-3 gap-x-[42px] gap-y-[44px] mt-10 md:pb-[100px]">
        <PostCardAuthor v-for="(post, index) in allArticle" :key="index" :post="post" class="mt-14"/>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// const user = useSupabaseUser();
const supabase = useSupabaseClient();
const isLoading = ref(true);
const allArticle = ref([]) as any;

onMounted(async () => {

    const fetchAuthorArticles = await supabase
    .from("posts")
    .select(
      `
      id,
       title,
       link,
       created_at,
         image,
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
    .limit(6)
    // .match({ user_id: currentAuthor.value.id });
  allArticle.value = fetchAuthorArticles.data;

  isLoading.value = false;
});

const posts = ref();
let { data, error } = await supabase
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
  .limit(5)
  .order("created_at", { ascending: false });
posts.value = data;
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-bottom: 1px solid $border;
}
</style>

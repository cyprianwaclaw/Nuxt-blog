<template>
  <!-- last -->
  <div v-if="isLoading">
    <PostListSkeleton/>
  </div>
  <div v-esle v-for="(post, index) in posts" :key="index" class="grid grid-col">
    <PostCardList
      :post="post"
      :class="[index !== posts.length - 1 ? 'mb-[58px]' : 'mb-[42px]']"
      :loading="isLoading"
      />
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const isLoading = ref(true);
const posts = ref();
onMounted(async () => {
  setTimeout(async () => {
    let { data } = (await supabase
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

    posts.value = data;
    isLoading.value = false;
  }, 100);
  // setTimeout(async () => {
  // }, 3000);
});

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>

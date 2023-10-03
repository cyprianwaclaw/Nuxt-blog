/!czekaniwe az wszystko się załaduje i wtedy pobiera dane
<template>
  <div  class="w-full">
    <div v-if="isLoading">Czekam na dane...</div>
    <!-- <div v-else>
      <div
        v-for="(profil, index) in profiles"
        :key="index"
        class="flex justify-between place-items-center w-full py-[20px] px-2"
        :class="[index == profiles.length - 1 ? '' : 'border-own']"
      >
        <div class="flex flex-row place-items-center">
          <div class="flex" v-if="profil.avatar_url">
            <img :src="profil.avatar_url" />
          </div>
          <Icon
            name="carbon:user-avatar-filled"
            class="avatar"
            color="#BFCBEE"
            size="52"
            v-else
          />
          <div class="flex flex-col ml-[13px]">
            <p class="text-[14px] gray">{{ profil.number_article }} artytułów</p>
            <NuxtLink :to="`autor/${profil.link}`">
              <p
                class="text-[16px] family font-normal -mt-2 cursor-pointer hover:underline"
              >
                {{ sliceText(profil.full_name, 15) }}
              </p>
            </NuxtLink>
          </div>
        </div>
        <ButtonsFollower :id="profil.id" :name="profil.full_name" />
      </div>
    </div> -->
    <div class="md:grid md:grid-cols-3 gap-[64px] mt-10 md:pb-[100px]">
        <PostCardAuthor v-for="(post, index) in allArticle" :key="index" :post="post" />
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

<template>
  <div>
    <Head>
      <Title>{{ currentAuthor?.full_name }}</Title>
    </Head>
    <div>
      <div v-if="currentAuthor?.avatar_url ? true : false">dsdsd</div>
      <div v-else class="flex w-full justify-center">
        <Icon
          name="carbon:user-avatar-filled"
          class="avatar"
          color="#BFCBEE"
          size="115"
        />
      </div>
      <h1 class="text-[60px] text-center mt-3">{{ currentAuthor?.full_name }}</h1>
    </div>

    <NuxtLayout name="list" class="mt-[130px]">
      <template #content>
        <div class="w-full pr-28">
          <h2>O autorze</h2>
          <p class="font-light mt-3 text-[19px]">
            {{ currentAuthor?.description }}
          </p>
          <h2 class="mt-[100px]">Ulubione tematy</h2>
          <div class="flex gap-[15px] mt-5">
            <LinkCategory
              v-for="(single, index) in category"
              :key="index"
              :name="single.name"
              :link="single.link"
              :size="16"
              :paddingX="18"
              :paddingY="9"
            />
          </div>
        </div>
      </template>
      <template #sidebar>
        <ButtonsFollower
        :id="currentAuthor?.id" 
        :name="currentAuthor?.full_name"
        :size="16"
        :paddingX="18"
        :paddingY="9"
        />
      </template>
    </NuxtLayout>
    <div class="my-[100px]">
      <div class="flex place-items-center gap-3">
        <h2>Wszystkie artukuły</h2>
        <div class="dot" />
        <p class="gray text-[21px] mt-[1px]">
          {{ currentAuthor?.number_article ? currentAuthor?.number_article : 0 }}
        </p>
      </div>
      <div class="grid grid-cols-3 gap-[64px] mt-10 pb-[100px]">
        <PostCardAuthor v-for="(post, index) in allArticle" :key="index" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
const currentAuthor = ref();
const allArticle = ref([]) as any;
const category = ref([]) as any;
const findElement = ref([]) as any;

onMounted(async () => {
  const fetchAuthor = await supabase
    .from("profiles")
    .select("*")
    .match({ link: router.currentRoute.value.params.name })
    .single();
  currentAuthor.value = fetchAuthor.data;

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
    .match({ user_id: currentAuthor.value.id });
  allArticle.value = fetchAuthorArticles.data;

  allArticle.value.forEach((single: any) => {
    let id1 = single.category_id1;
    let id2 = single.category_id2;
    category.value.push(id1, id2);
  });

  category.value = category.value.filter((element: any) => {
    if (!findElement[element.name]) {
      findElement[element.name] = true;
      return true;
    }
    return false;
  });
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}
</style>

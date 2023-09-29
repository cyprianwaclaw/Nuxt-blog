<template>
  <div>
    <Head>
      <Title>{{ currentAuthor?.full_name }}</Title>
    </Head>
    <NuxtLayout name="list" class="mb-[230px]">
      <template #content>
        <div class="flex place-items-center gap-5 mb-[48px]">
          <div v-if="currentAuthor?.avatar_url ? true : false">dsdsd</div>
          <div v-else class="">
            <Icon
              name="carbon:user-avatar-filled"
              class="avatar"
              color="#BFCBEE"
              size="84"
            />
          </div>
          <h1>{{ currentAuthor?.full_name }}</h1>
        </div>
        <PostListAuthor />
        <div class="w-full pr-28"></div>
      </template>
      <template #sidebar>
        <div class="border-own pb-7">
          <div class="flex gap-8 h-[64px] mb-10">
            <div class="">
              <p class="gray text-[15px] text-center">Obserwujący</p>
              <div v-if="isLoading">Ladowanie</div>
              <p v-else class="text-[21px] font-medium text-center mt-1">
                {{ userFollowed }}
              </p>
            </div>
            <div class="">
              <p class="gray text-[15px] text-center">Obserwowany</p>
              <div v-if="isLoading">Ladowanie</div>
              <p v-else class="text-[21px] font-medium text-center mt-1">
                {{ userFollower }}
              </p>
            </div>
          </div>
          <ButtonsFollower
            @change="test"
            :id="currentAuthor?.id"
            :name="currentAuthor?.full_name"
            :size="16"
            :paddingX="18"
            :paddingY="9"
          />
        </div>
        <div class="border-own py-7">
          <p>{{ currentAuthor?.number_article }} postów</p>
        </div>
        <div class="border-own py-7">
          <h5>Ulubione tematy</h5>
          <div class="flex flex-wrap gap-x-3 gap-y-3 mt-5">
            <LinkCategory
              v-for="(single, index) in popularCategories"
              :key="index"
              :name="single.name"
              :link="single.link"
            />
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
const isLoading = ref(true);
const popularCategories = ref([]) as any;

const { data: currentAuthor } = (await supabase
  .from("profiles")
  .select("*")
  .match({ link: router.currentRoute.value.params.name })
  .single()) as any;

const categories = ref([]) as any;

const test = () => {
  fetchUserFollowed();
  fetchUserFollower();
};

const { data: allPostCategories } = (await supabase
  .from("posts")
  .select(
    `category_id1(name, link),
         category_id2(name, link)`
  )
  .match({ user_id: currentAuthor.id })) as any;

allPostCategories.forEach((single: any) => {
  let id1 = single.category_id1;
  let id2 = single.category_id2;
  categories.value.push(id1, id2);
});

popularCategories.value = categories.value.filter((element: any) => {
  if (!popularCategories[element.name]) {
    popularCategories[element.name] = true;
    return true;
  }
  return false;
});

const userFollowed = ref();
const userFollower = ref();

const fetchUserFollowed = async () => {
  const { data } = (await supabase
    .from("followers")
    .select("id")
    .eq("user_followed_id", currentAuthor.id)) as any;
  userFollowed.value = data.length;
};

const fetchUserFollower = async () => {
  const { data } = (await supabase
    .from("followers")
    .select("id")
    .eq("user_followers_id", currentAuthor.id)) as any;
  userFollower.value = data.length;
};

onMounted(async () => {
  fetchUserFollowed();
  fetchUserFollower();
  isLoading.value = false;
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
.border-own {
  border-bottom: 1px solid $border;
}
</style>

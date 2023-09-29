<template>
  <div>
    <Head>
      <Title>{{ currentCategory?.name }}</Title>
    </Head>
    <NuxtLayout name="list" class="mb-[230px]">
      <template #content>
        <div class="flex place-items-center gap-[12px] mb-[48px]">
          <h1>
            {{ currentCategory?.name }}
          </h1>
          <div class="dot" />
          <p class="gray text-[21px] mt-[1px]">
            {{ currentCategory?.number_posts ? currentCategory?.number_posts : 0 }}
          </p>
        </div>
      <PostListCategory/>
      </template>
      <template #sidebar>
        <div class="border-own py-7">
          <h5>Popularni twórcy w {{ currentCategory?.name.toLowerCase() }}</h5>
          <div class="flex flex-wrap mt-5">
            <div v-for="(user, index) in users" :key="index" class="-mr-5">
              <!-- {{ user.full_name }} -->
              <NuxtLink :to="`/autor/${user.link}`">
                <div v-if="user.avatar_url ? true : false">dsdsd</div>
                <div v-else class="flex w-full mb-2">
                  <Icon
                    name="carbon:user-avatar-filled"
                    class="avatar"
                    color="#BFCBEE"
                    size="54"
                  />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="border-own py-8">
          <h5>Powiązane tematy</h5>
          <div class="flex flex-wrap gap-x-3 gap-y-3 mt-5">
            <LinkCategory
              v-for="(single, index) in categories"
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
const currentCategory = ref();
const popular = ref(true);
const change = () => {
  popular.value = !popular.value;
};

// onMounted(async () => {
  // loadComponent("last");

  const fetchCategory = await supabase
    .from("categories")
    .select("*")
    .match({ link: router.currentRoute.value.params.name })
    .single();

  currentCategory.value = fetchCategory.data;
// });
const { data: categories } = (await supabase
  .from("categories")
  .select("*")
  .limit(5)) as any;

const { data: users } = (await supabase
  .from("profiles")
  .select("link, avatar_url, full_name")
  // dodac osbsługe tematów
  .limit(5)) as any;

const { data: recommended } = (await supabase
  .from("posts")
  .select("link, image, title")
  // dodac osbsługe tematów
  .limit(5)) as any;
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}
.image {
  border-radius: 5px;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.border-own {
  border-bottom: 2px solid $border;
  padding-bottom: -20px;
}
hr {
  border: 1px solid $border;
  // height: 2px;
  margin-top: -2px;
}
.border-active {
  border-bottom: 3px solid $primary;
}
.active {
  color: $primary;
}
</style>

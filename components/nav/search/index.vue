<template>
  <div class="fixed left-0 bottom-0 w-full z-10" @click="isOpenSearch">
    <div class="blur-background" v-if="openSearch"></div>
  </div>
  <div class="flex flex-col w-full relative cursor-pointer">
    <div class="container" @click="openSearch = true">
      <div class="flex flex-row gap-3 w-full cursor-pointer">
        <Icon name="ph:magnifying-glass" class="gray" size="21" />
        <input
          placeholder="Jaki temat Cię interesuje..."
          class="cursor-pointer"
          v-model="handleInput"
        />
      </div>
    </div>
    <div v-if="openSearch" class="open-search">
      <!-- {{ categories }} -->
      <!-- {{  categories}} -->
      <NavSearchContainer
        :searchValue="handleInput"
        :lastResults="last"
        :categories="categories"
        @close="isOpenSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const last = ref() as any;
const categories = ref();

const openSearch = ref(false);

const isOpenSearch = () => {
  openSearch.value = !openSearch.value;
  handleInput.value = "";
};

const handleInput = ref<any>("");
onMounted(async () => {
  const allCategories = (await supabase.from("categories").select("name, id")) as any;
  categories.value = allCategories?.data;

  if (user.value) {
    const results = (await supabase
      .from("search")
      .select("last")
      .eq("user_id", user?.value?.id)) as any;

    last.value = results?.data[0].last;
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
$gray-search: #c0c0c0;
.container {
  height: 52px;
  display: flex;
  place-items: center;
  border-radius: 10px;
  flex-shrink: 0;
  background: #f1f4f5;
  justify-content: space-between;
  border: 1px solid #dddddd;
  z-index: 20;
  padding: 14px;
}
.gray {
  color: $gray-search;
}
input {
  border: transparent;
  background: transparent;
  font-family: $family;
  font-size: 16px;
  width: 100%;
  margin-right: 21px;
}
input:focus {
  outline: none;
}
.open-search {
  position: absolute;
  width: 100%;
  height: 460px;
  background-color: white;
  z-index: 10;
  border: 1px solid $gray-search;
  border-radius: 10px;
  padding: 70px 30px 30px 30px;
}
</style>

<template>
<div>
    <div v-if="isLoading">Czekam na dane...</div>
    <div v-else>
      <div>

          <LinkHover  v-for="(link, index) in links" :key="index"
          class="mt-[5px] cursor-pointer place-items-center w-full py-[12px] px-2"         
          :class="[index == links.length - 1 ? '': 'border-own']"
          :name="link.name"
          :link="link.name"
          size=19
          iconSize=24
          :notHover="false"
          />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const isLoading = ref(true);
const router = useRouter()
let links:any = [];

// onMounted(async () => {
  const linksResponse = await supabase
  .from("categories")
    .select("id, name")
    .limit(6)

  links = linksResponse.data || [];

  isLoading.value = false;
// });

const nuxtLink = (link:any)=>{
  router.push(`/kategoria/${link}`)
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own{
border-bottom: 1px solid $border;
}
</style>
/!czekaniwe az wszystko się załaduje i wtedy pobiera dane
<template>
  <div class="w-full">
    <div v-if="isLoading">Czekam na dane...</div>
    <div v-else>
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
            size="50"
            v-else
          />
          <div class="flex flex-col ml-[13px]">
            <p class="text-[14px] gray">{{ profil.number_article }} artytułów</p>
            <NuxtLink :to="`autor/${profil.link}`">
              <p
                class="text-[16px] family font-normal  cursor-pointer hover:underline"
              >
                {{ sliceText(profil.full_name, 17) }}
              </p>
            </NuxtLink>
          </div>
        </div>
        <ButtonsFollower :id="profil.id" :name="profil.full_name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// const user = useSupabaseUser();
const supabase = useSupabaseClient();
const isLoading = ref(true);
// let data:any = [];
let profiles: any = [];

onMounted(async () => {
  // Pobieranie danych profili
  const profilesResponse = (await supabase
    .from("profiles")
    .select("full_name, avatar_url, id, number_article, link")
    .limit(4)
    .order("number_article", { ascending: false })) as any;

  // data = followersResponse.data || [];
  profiles = profilesResponse.data || [];

  // Ustawienie flagi na zakończenie ładowania
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-bottom: 1px solid $border;
}
</style>

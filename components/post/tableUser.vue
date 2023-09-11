/!czekaniwe az wszystko się załaduje i wtedy pobiera dane
<template>
  <div>
    <div v-if="isLoading">Czekam na dane...</div>
    <div v-else>
      <div v-for="(profil, index) in profiles" :key="index" class="flex justify-between place-items-center w-full py-[20px] px-2"
      :class="[index == profiles.length - 1 ? '': 'border-own']"
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
            <p class="text-[14px] font-medium gray">{{ profil.number_article }} artytułów</p>
            <p class="text-[17px] font-normal -mt-2 cursor-pointer">{{ sliceText(profil.full_name, 16) }}</p>
          </div>
          </div>
          <ButtonsFollower :id="profil.id" />
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
let profiles:any = [];

onMounted(async () => {
  // Pobieranie danych followers
  // const followersResponse = await supabase
  //   .from("followers")
  //   .select("user_followed_id, user_followers_id")
  //   .eq("user_followed_id", user?.value?.id);

  // Pobieranie danych profili
  const profilesResponse = (await supabase
    .from("profiles")
    .select("full_name, avatar_url, id, number_article")
    .limit(4)
    .order("number_article", { ascending: false })) as any;

  // Przypisanie danych
  // data = followersResponse.data || [];
  profiles = profilesResponse.data || [];

  // Ustawienie flagi na zakończenie ładowania
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own{
border-bottom: 1px solid $border;
}
</style>
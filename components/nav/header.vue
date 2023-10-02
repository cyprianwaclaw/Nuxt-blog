<template>
  <ModalAccount :modalActive="isOpen" @close="isModal()" @logout="isLogout()" />
  <ModalAuth :modalActive="isAuth" @close="isModalAuth()" @logout="isLogout()" />
  <div
    class="fixed flex md:hidden flex place-items-center flex-row justify-between w-full bg-white border-b border-gray-200 py-3 px-5"
  >
    <NuxtLink to="/" class="flex shrink-0">
      <p class="text-[24px]">Nuxt3 Blog</p>
    </NuxtLink>
    <NavSearchMobile />
  </div>
  <div
    class="flex place-items-center flex-row justify-between 2xl:mx-16 lg:mx-12 md:mx-12 mx-5 2xl:py-8 md:py-7 py-3"
  >
    <NuxtLink to="/" class="md:flex hidden shrink-0">
      <p class="flex title shrink-0">Nuxt3 Blog</p>
    </NuxtLink>
    <div
      class="md:flex hidden w-full max-w-[1000px] mx-[80px] shrink"
      v-if="router.currentRoute.value.name !== 'post-nowy'"
    >
      <NavSearch />
    </div>
    <div class="flex shrink-0 place-items-center gap-5">
      <h3
        v-if="!user"
        @click="isModalAuth()"
        class="md:text-open md:text-[18px] text-[16px] font-normal cursor-pointer hidden md:flex"
      >
        Logowanie
      </h3>
      <div v-else class="flex place-items-center gap-4">
        <div
          @click="router.back()"
          class="flex flex-row gap-2 place-items-center"
          v-if="router.currentRoute.value.name == 'post-nowy'"
        >
          <Icon name="ph:arrow-left-bold" size="21" />
          <h3>Wróć do strony</h3>
        </div>
        <NuxtLink to="/post/nowy" v-else><h3>Dodaj artykuł</h3></NuxtLink>
        <NuxtImg
          @click="isModal()"
          :src="avatar?.avatar_url"
          v-if="avatar?.avatar_url"
          class="avatar"
        />
        <Icon
          @click="isModal()"
          name="carbon:user-avatar-filled"
          color="#BFCBEE"
          size="47"
          v-else
        />
      </div>
      <!-- <NavSearchMobile/> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const isOpen = ref(false);
const isModal = () => {
  isOpen.value = !isOpen.value;
};
const isAuth = ref(false);
const isModalAuth = () => {
  isAuth.value = !isAuth.value;
};

const isLogout = async () => {
  isOpen.value = !isOpen.value;
  const { error } = await supabase.auth.signOut();
};
const avatar = ref();
const router = useRouter();
watch(user, async (newValue: any) => {
  avatar.value = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", newValue?.id)
    .single();
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.title {
  color: $text-black;
  font-family: $family;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.avatar {
  width: 45px;
  height: 45px;
  cursor: pointer;
  border-radius: 45px;
  border: 1px solid $border;
}
</style>

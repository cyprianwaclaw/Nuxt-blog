<template>
    <ModalAccount
    :modalActive="isOpen"
    @close="isModal()"
    @logout="isLogout()"
  />
  <ModalAuth
  :modalActive="isAuth"
  @close="isModalAuth()"
  @logout="isLogout()"
/>
  <div class="flex place-items-center mx-16 my-6  h-[52px] flex-row  justify-between">
    <NuxtLink to="/">
      <p class="flex title shrink-0">Nuxt3 Blog</p>
    </NuxtLink>
      <div class="flex w-full max-w-[1000px] mx-[80px] shrink"  v-if="router.currentRoute.value.name !== 'post-nowy'">
        <NavSearch/>
    </div>
    <div class="flex shrink-0">
        <h3 v-if="!user" @click="isModalAuth()" class="text-open text-[18px]">Logowanie</h3>
        <div v-else class="flex place-items-center gap-4">
          <div @click="router.back()" class="flex flex-row gap-2 place-items-center" v-if="router.currentRoute.value.name == 'post-nowy'">
            <Icon name="ph:arrow-left-bold" size="21" />
            <h3>Wróć do strony</h3>
          </div>
          <NuxtLink to="/post/nowy" v-else><h3>Dodaj artykuł</h3></NuxtLink>
          <NuxtImg  @click="isModal()" :src="avatar?.avatar_url" v-if="avatar?.avatar_url" class="avatar"/>
          <Icon @click="isModal()"  name="carbon:user-avatar-filled" class="avatar" color="#BFCBEE" size="55" v-else />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase= useSupabaseClient();
const isOpen = ref(false);
const isModal = () => {
   isOpen.value = !isOpen.value;
  };
  const isAuth = ref(false);
const isModalAuth = () => {
   isAuth.value = !isAuth.value;
  };

  const isLogout = async ()=>{
    isOpen.value = !isOpen.value;
    const { error } = await supabase.auth.signOut();
  }
  const avatar = ref()
const router = useRouter();
watch(user, async (newValue) => {
    avatar.value = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id',newValue?.id)
    .single();
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.title{
    color:$text-black;
font-family: $family;
font-size: 28px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

.avatar{
    width: 45px;
    height: 45px;
    cursor: pointer;
    border-radius: 45px;
    border: 1px solid var(--gray-line, #E9E9E9);
    //background: url(<path-to-image>), lightgray 50% / cover no-repeat;
}
</style>
<template>
  <ModalConfirmation
  :modalActive="open"
  des="Zapisano post"
  status="success"
  @close="isModal()"
/>
<ModalConfirmation
:modalActive="open2"
des="Usunięto z zapisanych"
status="error"
@close="isModal2()"
/>
  <div v-if="isLoading">ładowanie</div>
  <div v-else>
    <Icon
      @mouseover="hoverSaved"
      @mouseout="hoverSaved"
      @click="toggleSavedPost"
      :name="savedPost ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
      :size="24"
      class="cursor-pointer"
      :class="{
        'saved-hover': hoverIcon,
        'saved-selected': savedPost,
      }"
    />
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const route = useRouter();
const supabase = useSupabaseClient();
const open = ref(false);
const open2 = ref(false);
const savedPost = ref();
const hoverIcon = ref(false);
const isLoading = ref(true);

const isModal = () => {
  open.value = true;

  setTimeout(() => {
    open.value = false;
  }, 1100);
};
const isModal2 = () => {
  open2.value = true;

  setTimeout(() => {
    open2.value = false;
  }, 1100);
};
const fetchData = async () => {
  const { data, error } = await supabase
    .from("saved_posts")
    .select("*")
    .eq("user_id", user?.value?.id)
    .eq("post_id", route?.currentRoute.value?.params?.name)
    .single();

  savedPost.value = data;
  isLoading.value = false;
};

onMounted(() => {
  fetchData();
});

const toggleSavedPost = async () => {
  const insertData = [
    {
      user_id: user?.value?.id,
      post_id: route?.currentRoute.value?.params?.name,
    },
  ];
  if (user.value) {
    if (savedPost.value === true) {
      savedPost.value = false;
      isModal2();
      const { data, error } = await supabase
        .from("saved_posts")
        .delete()
        .eq("user_id", user?.value?.id)
        .eq("post_id", route?.currentRoute.value?.params?.name);
      hoverIcon.value = false;
    } else {
      isLoading.value = true;
      setTimeout(async () => {
        isModal()
        const { data, error } = await supabase.from("saved_posts").insert(insertData);
        savedPost.value = true;
        isLoading.value = false;
      }, 300);
      hoverIcon.value = false;
    }
  } else {
    isModal();
  }
};

const hoverSaved = () => {
  hoverIcon.value = !hoverIcon.value;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.saved-hover {
  color: green;
}

.saved-selected {
  color: rgb(171, 165, 56);
}
</style>

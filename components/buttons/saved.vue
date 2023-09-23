<template>
  <ModalConfirmation
  :modalActive="open"
  des="Zapisano post"
  status="success"
  @close="isModal()"
/>
<ModalAuth
:modalActive="isAuth"
@close="isModalAuth()"
@logout="isLogout()"
/>
<ModalConfirmation
:modalActive="open2"
des="Usunięto z zapisanych"
status="error"
@close="isModal2()"
/>
<div v-if="isLoading">ładowanie</div>
<div v-else>
  <div v-if="user">
    <Icon
    @mouseover="hoverSaved"
    @mouseout="hoverSaved"
    @click="toggleSavedPost"
    :name="savedPost ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
    :size="props.size"
    class="cursor-pointer text-[#C5C5C5]"
    :class="{
      'saved-hover': hoverIcon,
      'saved-selected': savedPost,
    }"
    />
  </div>
  <div v-else>
    <Icon
    @mouseover="hoverSaved"
    @mouseout="hoverSaved"
    @click="isModalAuth"
    :name="savedPost ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
    :size="props.size"
    class="cursor-pointer text-[#C5C5C5]"
    :class="{
      'saved-hover': hoverIcon,
      'saved-selected': savedPost,
    }"
    />
  </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const props = defineProps({
  id:{
    type:Number,
    required: true
  },
  size:{
    type:Number,
    required: true
  }
})

const isAuth = ref(false);
const isModalAuth = () => {
   isAuth.value = !isAuth.value;
  };
const savedPost = ref();
const hoverIcon = ref(false);
const isLoading = ref(true);

const open = ref(false);
const open2 = ref(false);
const isModal = () => {
  open.value = true;

  setTimeout(() => {
    open.value = false;
  }, 1200);
};
const isModal2 = () => {
  open2.value = true;

  setTimeout(() => {
    open2.value = false;
  }, 1200);
};
const fetchData = async () => {
  const { data, error } = await supabase
    .from("saved_posts")
    .select("*")
    .eq("user_id", user?.value?.id)
    .eq("post_id", props.id)
    .single();

  savedPost.value = data ? true : false;
  isLoading.value = false;
};

onMounted(() => {
  fetchData();
});

const toggleSavedPost = async () => {
  const insertData = [
    {
      user_id: user?.value?.id,
      post_id: props.id,
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
        .eq("post_id", props.id);
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
  color: #C5C5C5;
}

.saved-selected {
  color: $primary;
}
</style>

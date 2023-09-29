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
<div v-if="isLoading">
  <svg class="spinner" width="24px" height="24px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
 </svg>
</div>
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

// dobry przykład jak ponownie pobra dane podczas zalogowania
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
  setTimeout(() => {

  fetchData();
}, 100);

});


watch(user, async (newValue) => {
  isLoading.value = true;
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

// Here is where the magic happens

$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite, 
    colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}

</style>

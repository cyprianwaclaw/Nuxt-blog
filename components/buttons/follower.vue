<template>
  <ModalConfirmation
    :modalActive="open"
    :des="textDesc()"
    status="success"
    @close="isModal()"
  />
  <ModalConfirmation
    :modalActive="open2"
    des="Usunięto z listy obserwowanych"
    status="error"
    @close="isModal2()"
  />
  <div>
    <ModalAuth :modalActive="isAuth" @close="isModalAuth()" />
    <div v-if="isLoading">Ładowanie...</div>
    <div v-else>
      <div v-if="user">
        <button
        :style="{
          fontSize: props.size + 'px',
          paddingTop: props.paddingY + 'px',
          paddingBottom: props.paddingY + 'px',
          paddingLeft: props.paddingX + 'px',
          paddingRight: props.paddingX + 'px',
        }"
          @click="changeFollow(props.id)"
          :class="{
            'unactive-button': text === 'Obserwuj',
            'active-button': text !== 'Obserwuj',
          }"
        >
          {{ text }}
        </button>
      </div>
      <div v-else>
        <button @click="isModalAuth()" class="unactive-button">Obserwuj</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser() as any;
const supabase = useSupabaseClient();
const isLoading = ref(true);
const isFollow = ref();
const isAuth = ref(false);
const text = ref();
const props = defineProps({
  id: {
    type: String,
    required:true
  },
name:{
  type:String,
  required:true
},
size: {
    type: Number,
    required: false,
  },
  paddingX: {
    type: Number,
    required: false,
  },
  paddingY: {
    type: Number,
    required: false,
  },
});

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

const isModalAuth = () => {
  isAuth.value = !isAuth.value;
};

onMounted(async () => {
  const followersResponse = await supabase
    .from("followers")
    .select("user_followed_id, user_followers_id")
    .eq("user_followed_id", user?.value?.id);

  isFollow.value = followersResponse.data?.some(
    (el: any) => el.user_followers_id == props.id
  );
  text.value = isFollow.value ? "Obserwujesz" : "Obserwuj";
  isLoading.value = false;
});

const changeFollow = (item: any) => {
  if (text.value == "Obserwujesz") {
    isModal2()
    text.value = "Obserwuj";
    unfollow(item);
  } else {
    isModal()
    text.value = "Obserwujesz";
    follow(item);
  }
};

const follow = async (item: any) => {
  const { data } = (await supabase.from("followers").insert({
    user_followed_id: user?.value?.id,
    user_followers_id: item,
  })) as any;
};

const unfollow = async (item: any) => {
  const { data } = await supabase
    .from("followers")
    .delete()
    .eq("user_followed_id", user?.value?.id)
    .eq("user_followers_id", item);
};

const textDesc = () => {
 return "Obserwujesz użytkownika " + props.name;
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
$color: #5d9dd9;
.unactive-button {
  border-radius: 8px;
  border: 1px solid $color;
  padding: 6px 12px;

  color: $color;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.75px;
  font-size: 13px;
}
.unactive-button:hover {
  background-color: #1777d11c;
}
.active-button {
  border-radius: 8px;
  border: 1px solid $color;
  padding: 6px 12px;
  color: $white;
  background-color: $color;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.75px;
  font-size: 13px;
}
.active-button:hover {
  background-color: #5494cf;
}
</style>

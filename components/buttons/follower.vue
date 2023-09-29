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
    <div v-if="user?.id == props?.id"></div>
    <div v-else>
      <div v-if="isLoading">
        <button class="w-[120px] h-[34px] unactive-button loading-button">
          <div strss="spinner-container">
            <svg
              class="spinner"
              width="18px"
              height="18px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="path"
                fill="none"
                stroke-width="6"
                stroke-linecap="round"
                cx="33"
                cy="33"
                r="30"
              ></circle>
            </svg>
          </div>
        </button>
      </div>
      <div v-else>
        <div v-if="user">
          <div v-if="user?.id == props?.id"></div>
          <div v-else>
            <button
              class="w-[120px] h-[34px]"
              @click="changeFollow(props.id)"
              :class="{
                'unactive-button': text === 'Obserwuj',
                'active-button': text !== 'Obserwuj',
              }"
            >
              {{ text }}
            </button>
          </div>
        </div>
        <div v-else>
          <div v-if="user?.id == props?.id"></div>
          <div v-else>
            <button @click="isModalAuth()" class="unactive-button w-[120px] h-[34px]">
              Obserwuj
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser() as any;
const newUser = ref();
const supabase = useSupabaseClient();
const isLoading = ref(true);
const isFollow = ref();
const isAuth = ref(false);
const text = ref();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  setTimeout(async () => {

  const followersResponse = await supabase
    .from("followers")
    .select("user_followed_id, user_followers_id")
    .eq("user_followed_id", user?.value?.id);

  isFollow.value = followersResponse.data?.some(
    (el: any) => el.user_followers_id == props.id
  );
  text.value = isFollow.value ? "Obserwujesz" : "Obserwuj";
  isLoading.value = false;
  }, 500)
});

const changeFollow = (item: any) => {
  if (text.value == "Obserwujesz") {
    isModal2();
    text.value = "Obserwuj";
    unfollow(item);
  } else {
    isModal();
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
};

watch(user, async (newValue: any) => {
  newUser.value = newValue;
  isLoading.value = true;

  const followersResponse = await supabase
    .from("followers")
    .select("user_followed_id, user_followers_id")
    .eq("user_followed_id", user?.value?.id);

  isFollow.value = followersResponse.data?.some(
    (el: any) => el.user_followers_id == props.id
  );
  text.value = isFollow.value ? "Obserwujesz" : "Obserwuj";
  isLoading.value = false;
  // console.log(newValue);
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
$color: #5d9dd9;

.loading-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

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

// Here is where the magic happens

$offset: 187;
$duration: 1.2s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: $primary;
  }
  25% {
    stroke: $primary;
  }
  50% {
    stroke: $primary;
  }
  75% {
    stroke: $primary;
  }
  100% {
    stroke: $primary;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>

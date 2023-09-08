<template>
    <div>
      <ModalAuth
      :modalActive="isAuth"
      @close="isModalAuth()"
    />
      <div v-if="user">
        <button @click="changeFollow(props.id)" 
        :class="{ 'unactive-button': text === 'Obserwuj', 'active-button': text !== 'Obserwuj' }"
  >
          {{ text }}
        </button>
      </div>
      <div v-else>
          <button @click="isModalAuth()" class="unactive-button">
              Obserwuj
            </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const isFollow = ref();
  const isAuth = ref(false)
  const text = ref();
  const props = defineProps({
    id: {
      type: String,
    },
    array:{
      type: Array
    }
  });
  const isModalAuth = () => {
  isAuth.value =! isAuth.value
  };
  
  isFollow.value = props.array?.some((el: any) => el.user_followers_id == props.id);
  
  text.value = isFollow.value ? "Obserwujesz" : "Obserwuj";
  
  const changeFollow = (item: any) => {
    if (text.value == "Obserwujesz") {
      text.value = "Obserwuj";
      unfollow(item);
    } else {
      text.value = "Obserwujesz";
      follow(item);
    }
  };
  
  const follow = async (item: any) => {
    const { data } = await supabase.from("followers").insert({
      user_followed_id: user.value.id,
      user_followers_id: item,
    });
    console.log(item);
  };
  
  const unfollow = async (item: any) => {
    const { data } = await supabase
      .from("followers")
      .delete()
      .eq("user_followed_id", user.value.id)
      .eq("user_followers_id", item);
    console.log(item);
  };
  </script>
  
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  $color:#5D9DD9;
  .unactive-button{
      border-radius: 8px;
      border: 1px solid $color;
      padding: 6px 12px;
  
      color: $color;
      font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.36px;
  font-size: 13px;
  }
  .unactive-button:hover{
  
      background-color: #1777d11c;
  
  }
  .active-button{
      border-radius: 8px;
      border: 1px solid $color;
      padding: 6px 12px;
      color: $white;
      background-color: $color;
      font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.36px;
  font-size: 13px;
  }
  .active-button:hover{
  
      background-color: #5494cf;
  
  }
  </style>
<template>
  <div class="flex gap-[8px]">
    <div
      class="pb-[2px] px-4"
      @click="lastButton()"
      :class="[last === true ? 'border-active' : '']"
    >
      <p
        :class="[last === true ? 'active' : '']"
        class="gray text-[15px] hover:text-black hover:cursor-pointer"
      >
        Najnowsze
      </p>
    </div>
    <div class="pb-[2px] px-4" @click="popularButton()"
    :class="[popular === true ? 'border-active' : '']"
    >
      <p 
      :class="[popular === true ? 'active' : '']"
      class="gray text-[15px] hover:text-black hover:cursor-pointer">
        Najpopularniejsze
      </p>
    </div>
    <div 
    :class="[topRating === true ? 'border-active' : '']" 
    class="pb-[2px] px-4" @click="topRatingButton()">
      <p 
      :class="[topRating === true ? 'active' : '']"
      
      class="gray text-[15px] hover:text-black hover:cursor-pointer">
        Najlepiej oceniane
      </p>
    </div>
  </div>
  <hr />
  <div class="mt-[50px]">

    <div v-if="isLoading">
      <PostListSkeleton />
    </div>
    <div v-for="(post, index) in posts" :key="index" class="grid grid-col">
      <PostCardList
      :post="post"
      :class="[index !== posts.length - 1 ? 'mb-[58px]' : 'mb-[42px]']"
      />
    </div>
  </div>
  <!-- <component :is="currentComponent" /> -->
</template>

<script setup lang="ts">
import gsap from "gsap";
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const posts = ref();
const isLoading = ref(true);

const last = ref();
const popular = ref();
const topRating = ref();

// let params = router.currentRoute.value.query.p as string;
//   if (params === "popular") {
//     popularButton() 
//   } else if (params === "topRating") {
//     topRatingButton()
//   } else if (params === "last") {
//     lastButton()
//   } else {
//     lastButton()
//   }

const popularButton = async () => {
  // isLoading.value = true;
  // last.value = false
  popular.value = true
  // topRating.value = false
  // setTimeout(async () => {
  //   let { data } = (await supabase
  //     .from("posts")
  //     .select(
  //       `
  //   id,
  //   title,
  //   link,
  //   created_at,
  //   image,
  //   time_read,
  //   category_id1(name, link),
  //   category_id2(name, link),
  //   description,
  //   profiles(
  //     full_name,
  //     link,
  //     avatar_url
  //     )
  //     `
  //     )
  //     .order("created_at", { ascending: true })
  //     .limit(6)) as any;

  //   posts.value = data;
  //   isLoading.value = false;
  // }, 400);
  // // isLoading.value = true;
  // // loadComponent("popular");
  // router.push({ query: { p: "popular" } });
};

const lastButton = () => {
  isLoading.value = true;
  last.value = true
  popular.value = false
  topRating.value = false
  setTimeout(async () => {
    let { data } = (await supabase
      .from("posts")
      .select(
        `
    id,
    title,
    link,
    created_at,
    image,
    time_read,
    category_id1(name, link),
    category_id2(name, link),
    description,
    profiles(
      full_name,
      link,
      avatar_url
      )
      `
      )
      .order("created_at", { ascending: false })
      .limit(6)) as any;

    posts.value = data;
    isLoading.value = false;
  }, 400);
  // isLoading.value = true;
  // loadComponent("popular");

  router.push({ query: { p: "last" } });
};



const topRatingButton = () => {
  isLoading.value = true;
  last.value = false
  popular.value = false
  topRating.value = true
  setTimeout(async () => {
    let { data } = (await supabase
      .from("posts")
      .select(
        `
    id,
    title,
    link,
    created_at,
    image,
    time_read,
    category_id1(name, link),
    category_id2(name, link),
    description,
    profiles(
      full_name,
      link,
      avatar_url
      )
      `
      )
      .order("created_at", { ascending: false })
      .limit(6)) as any;

    posts.value = data;
    isLoading.value = false;
  }, 400);
  // isLoading.value = true;
  // loadComponent("popular");

  router.push({ query: { p: "topRating" } });
};
// const topRatingButton = () => {
//   isLoading.value = true;
//   // loadComponent("topRating");
//   router.push({ query: { p: "topRating" } });
// };

// const fetchData = async () => {
// const { data:saved } = await supabase
// .from("saved_posts")
// .select("*")
// .eq("user_id", user?.value?.id)
// .eq("post_id", props.id)
// .single();

// };

// onMounted(async () => {
// setTimeout(async () => {
//   let { data } = (await supabase
//     .from("posts")
//     .select(
//       `
//     id,
//     title,
//     link,
//     created_at,
//     image,
//     time_read,
//     category_id1(name, link),
//     category_id2(name, link),
//     description,
//     profiles(
//       full_name,
//       link,
//       avatar_url
//       )
//       `
//     )
//     .order("created_at", { ascending: false })
//     .limit(6)) as any;

//   posts.value = data;
//   isLoading.value = false;
// }, 200);

// onUnmounted(()=>{

watch(popular, (newValue)=>{
  if(newValue == true){
    isLoading.value = true;
  last.value = false
  popular.value = true
  topRating.value = false
  setTimeout(async () => {
    let { data } = (await supabase
      .from("posts")
      .select(
        `
    id,
    title,
    link,
    created_at,
    image,
    time_read,
    category_id1(name, link),
    category_id2(name, link),
    description,
    profiles(
      full_name,
      link,
      avatar_url
      )
      `
      )
      .order("created_at", { ascending: true })
      .limit(6)) as any;

    posts.value = data;
    isLoading.value = false;
  }, 400);
  // isLoading.value = true;
  // loadComponent("popular");
  router.push({ query: { p: "popular" } });
  }
})

  let params = router.currentRoute.value.query.p as string;
  if (params === "popular") {
    popular.value = true

  } else if (params === "topRating") {
    topRatingButton()
  } else if (params === "last") {
    lastButton()
  } else {
    lastButton()
  }
// })

  onBeforeRouteUpdate(async (to, from) => {
// //   // isLoading.value = true

  let params = to.query.p;
  if(params === "popular") {
    popular.value = true
    // popularButton() 

  }
  console.log(params)
//   if (params === "popular") {
//     popularButton() 
//   } else if (params === "topRating") {
//     topRatingButton()
//   } else if (params === "last") {
//     lastButton()
//   } else {
//     lastButton()
//   }
});

</script>

<!-- <script setup lang="ts">
import gsap from "gsap";
const router = useRouter();
const isLoadingNav = ref(true);
const isLoading = ref(true);

const currentComponent = shallowRef();
const loadComponent = async (componentName: string) => {
  // setTimeout(async () => {
    // isLoading.value = true
    const component = await import(`@/components/post/categories/${componentName}.vue`);    
    currentComponent.value = component.default || component;
    // isLoading.value = false;
    // isLoadingNav.value = false;
  // }, 300)
  // setTransitionName();
};

// onMounted(() => {
loadComponent("last");

  // isLoading.value = true;
  // isLoading.value = false;

  let params = router.currentRoute.value.query.p as string;
  if (params === "popular") {
    loadComponent("popular");
  } else if (params === "topRating") {
    loadComponent("topRating");
  } else if (params === "last") {
    loadComponent("last");
  } else {
    loadComponent("last");
  }
// });

const popular = () => {
  // isLoading.value = true
  loadComponent("popular");
  router.push({ query: { p: "popular" } });
};

const last = () => {
  // isLoading.value = true
  loadComponent("last");
  router.push({ query: { p: "last" } });
};
const topRating = () => {
  // isLoading.value = true
  loadComponent("topRating");
  router.push({ query: { p: "topRating" } });
};

onBeforeRouteUpdate(async (to, from) => {
  // isLoading.value = true

  let params = to.query.p;
  if (params === "popular") {
    loadComponent("popular");
  } else if (params === "topRating") {
    loadComponent("topRating");
  } else if (params === "last") {
    loadComponent("last");
  } else {
    loadComponent("last");
  }
});
</script> -->

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-active {
  border-bottom: 3px solid $primary;
}
.active {
  color: $primary;
}
.close {
  color: rgb(194, 194, 194);
}
.close:hover {
  color: rgb(167, 167, 167);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.modal-view {
  background-color: rgb(255, 255, 255);
  border-radius: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.18s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

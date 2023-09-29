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
  
  const popularButton = async () => {
    popular.value = true
  };
  
  const lastButton = () => {
    last.value = true
  };
  
  const topRatingButton = () => {
    topRating.value = true
  };
  
  
  onMounted(async () => {
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
  }, 200);
  })
  
  
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
    }, 200);
    // isLoading.value = true;
    // loadComponent("popular");
    router.push({ query: { p: "popular" } });
    }
  })
  
  watch(last, (newValue)=>{
    if(newValue == true){
      isLoading.value = true;
    last.value =  true
    popular.value =  false
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
    router.push({ query: null as any});
    // router.push({ query: { p: "last" } });
    }
  })
  
  watch(topRating, (newValue)=>{
    if(newValue == true){
      isLoading.value = true;
    last.value =  false
    popular.value =  false
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
    }, 200);
    // isLoading.value = true;
    // loadComponent("popular");
    router.push({ query: { p: "topRating" } });
    }
  })
  
    let params = router.currentRoute.value.query.p as string;
    if (params === "topRating") {
      topRating.value = true
    } else if (params === "popular") {
      popular.value = true
    } else {
      last.value = true
    }
  // })
  
    onBeforeRouteUpdate(async (to, from) => {
  // //   // isLoading.value = true
  
    let params = to.query.p;
    if (params === "topRating") {
      topRating.value = true
    } else if (params === "popular") {
      popular.value = true
    } else {
      last.value = true
    }
  
  });
  
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  .border-active {
    border-bottom: 3px solid $primary;
  }
  .active {
    color: $primary;
  }
  </style>
  
<template>
    <div>
      <PostLatestPosts />
      <div class="flex flex-col  cursor-default">
        <p class="text-[20px] gray">NOWOŚCI & AUTORZY</p>
        <h1 class="mb-[70px] text-[64px] leading-[87px]">Najświeższe wpisy, <br/> najbardziej aktywni twórcy</h1>
      </div>
      <div class="flex flex-row gap-[100px] pb-[200px]">
        <div class="w-[350px]">
            <LazyPostTableUser/>
      </div>
      <div class="w-[350px]">
          <PostTableCategories/>
          </div>
          <div class="absolute right-0 w-[650px]">
            <Swiper
            :scrollbar="{
              hide: true,
            }"
            :slidesPerView="'auto'"
            :modules="modules"
            class="mySwiper cursor-grabbing"
          >
            <SwiperSlide  v-for="(post, index) in posts"    :key="index">
            <PostCardNew
            class="cursor-grabbing"
            :post="post"
            :titleSize="18"
            :imageHeight="260"
            :titleTop="12"
            :titleBottom="24"
            :authorTop="12"
            :desLength="105"
            :isDescription="false"
            :elementWidth="400"
          />
        </SwiperSlide>
          </Swiper>
    
          </div>
        </div>
   <div class="flex flex-row gap-[100px] pb-[250px]">
    <div class="flex flex-col  cursor-default">
    <p class="text-[20px] gray">SPECJALNIE</p>
    <h1 class="mb-[42px] text-[64px] leading-[87px]">Wybrane dla Ciebie</h1>
    <LazyPostList class="mt-[70px]"/>
  </div>
   </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/scrollbar';
    
    import { Scrollbar } from 'swiper/modules';
    const posts = ref()
    const supabase = useSupabaseClient();
    // onMounted(async()=>{
      let { data, error } = (await supabase
      .from("posts")
      .select(
        `
        title,
         created_at,
           image,
            time_read,
           description,
          profiles(
             full_name,
             avatar_url
           )
           `
           )
           .limit(5)
           .order("created_at", { ascending: false }))
           // import { Keyboard, Pagination, Navigation} from 'swiper/modules';
           posts.value = data
          // })
    
    const isLoading = ref(true)
    const modules = [Scrollbar];
    
    
  </script>
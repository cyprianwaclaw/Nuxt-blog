<template>
  <div>
    <PostLatestPosts />
    <!-- <div class="flex flex-col cursor-default">
      <p class="text-[20px] gray">NOWOŚCI & AUTORZY</p>
      <h1 class="mb-[80px] text-[64px] leading-[87px]">
        Najświeższe wpisy, <br />
        najbardziej aktywni twórcy
      </h1>
    </div> -->

    <!-- <div class="flex flex-row w-full gap-[110px]">
      <div class="w-[280px]">
        <div class="border-own  mb-3 ">
          <h5 class="mb-[5px]"> Popularne tematy</h5>
        </div>
        <PostTableCategories />
      </div>
      <div class="w-full">
        <div class="border-own mb-3 ">
          <h5 class="mb-[5px]">Autorzy</h5>
        </div>
        <div class="flex gap-[70px] w-full">
          <LazyPostTableUser />
          <LazyPostTableUser />
        </div>
      </div>
    </div>
    <div class="border-own mt-16">
      <h5 class="mb-[5px]">Najświeższe wpisy</h5>
    </div>
    <PostTablePosts />
    <div class="flex flex-row gap-[100px] pb-[250px] mt-[110px]">
      <div class="flex flex-col cursor-default">
        <p class="text-[20px] gray">SPECJALNIE</p>
        <h1 class="mb-[42px] text-[64px] leading-[87px]">Wybrane dla Ciebie</h1>
        <LazyPostList class="mt-[70px]" />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/scrollbar";
const router = useRouter();

import { Scrollbar } from "swiper/modules";
// const posts = ref()
// const supabase = useSupabaseClient();
// // onMounted(async()=>{
//   let { data, error } = (await supabase
//   .from("posts")
//   .select(
//     `
//     title,
//      created_at,
//        image,
//         time_read,
//        description,
//       profiles(
//          full_name,
//          avatar_url
//        )
//        `
//        )
//        .limit(5)
//        .order("created_at", { ascending: false }))
//        // import { Keyboard, Pagination, Navigation} from 'swiper/modules';
//        posts.value = data
// })

const isLoading = ref(true);
const modules = [Scrollbar];
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-bottom: 1px solid $border;
}
</style>

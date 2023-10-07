<template>
  <div>
    <PostLatestPosts />
 <div class="flex flex-col cursor-default md:mt-1 mt-[490px]">
      <p class="md:text-[20px] md:font-normal gray text-[14px] font-light ">NOWOŚCI & AUTORZY</p>
      <h1 class="md:mb-[80px] md:text-[64px] md:leading-[87px] text-[48px] leading-[58px] mt-[6px]">
        Najświeższe wpisy, <br />
        najbardziej aktywni twórcy
      </h1>
    </div>
     <div class="md:flex md:flex-row w-full md:gap-[110px] mt-8 md:mt-0">
      <div class="md:w-[280px] w-full">
        <div class="border-own  mb-3 ">
          <h5 class="mb-[5px]"> Popularne tematy</h5>
        </div>
        <PostTableCategories />
      </div>
      <div class="w-full mt-8 md:mt-0">
        <div class="border-own mb-3 ">
          <h5 class="mb-[5px]">Autorzy</h5>
        </div>
        <div class="md:flex w-full md:flex-row gap-20 hidden">
          <LazyPostTableUser/>
          <LazyPostTableUser />
        </div>
        <div class="flex w-full flex-col md:hidden ">
          <LazyPostTableUser/>
        </div>
      </div>
    </div>
  <div class="border-own md:mt-16 mt-8">
      <h5 class="mb-[5px]">Najświeższe wpisy</h5>
    </div>
    <PostTablePosts />
      <div class="flex flex-row gap-[100px] md:pb-[250px] mt-[110px] mb-[40px]">
      <div class="flex flex-col cursor-default">
      <p class="md:text-[20px] md:font-normal gray text-[14px] font-light ">DLA CIEBIE</p>
      <h1 class="md:mb-[80px] md:text-[64px] md:leading-[87px] text-[48px] leading-[58px] mt-[6px]">
        Wybrane wpisy, <br />
        specjalnie dla Ciebie
      </h1>
        <LazyPostList class="md:mt-[70px] mt-[8px]" />
      </div>
    </div>
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

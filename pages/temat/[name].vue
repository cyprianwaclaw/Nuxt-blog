<template>
  <div>
    <Head>
      <Title>{{ currentCategory?.name }}</Title>
    </Head>
    <NuxtLayout name="list" class="mb-[230px]">
      <template #content>
        <div class="flex place-items-center gap-[12px] mb-[48px]">
          <h1>
            {{ currentCategory?.name }}
          </h1>
          <div class="dot" />
          <p class="gray text-[21px] mt-[1px]">
            {{ currentCategory?.number_posts ? currentCategory?.number_posts : 0 }}
          </p>
        </div>
        <!-- <div class="flex gap-[4px]">
            <div class="pb-[3px] border-active px-5" @click="change()">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najnowsze</p>
            </div>
                <div class="pb-[3px] border-active px-5">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najpopularniejsze</p>
            </div>
            <div class="pb-[3px] border-active px-5">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najlepiej oceniane</p>
            </div>
        </div> -->
        <!-- <hr /> -->
        <!-- <ModalAuth/> -->
        <PostCategories />
        <!-- {{ currentComponent }}   -->
        <!-- <button  @click="currentTab = 'Posts'">test</button> -->
        <!-- <div v-if="popular">
            <PostCategoriesPopular/>
        </div>  -->
        <!-- <component
        :is="tabs[currentTab]"
        />  
          {{ currentComponent }}            -->
      </template>
      <!-- <template #sidebar> 


      </template> -->
      <template #sidebar>
        <!-- <div v-if="post.profiles?.avatar_url ? true : false">dsdsd</div>
        <div v-else class="flex w-full mb-2">
          <Icon name="carbon:user-avatar-filled" class="avatar" color="#BFCBEE" size="64" />
        </div>
        <NuxtLink :to="`/autor/${post.profiles.link}`">
          <p class="text-[24px] hover:underline">{{ post.profiles.full_name }}</p>
        </NuxtLink>
        <p class="mt-2 mb-5 des">{{ sliceText(post.profiles?.description, 170) }}</p>
        <ButtonsFollower :id="post.user_id" :name="post.profiles.full_name" /> -->
        <div class="border-own py-7">
          <h5>Popularni twórcy w {{ currentCategory?.name.toLowerCase() }}</h5>
          <div class="flex flex-wrap mt-5">
            <div v-for="(user, index) in users" :key="index" class="-mr-5">
              <!-- {{ user.full_name }} -->
              <NuxtLink :to="`/autor/${user.link}`">
                <div v-if="user.avatar_url ? true : false">dsdsd</div>
                <div v-else class="flex w-full mb-2">
                  <Icon
                    name="carbon:user-avatar-filled"
                    class="avatar"
                    color="#BFCBEE"
                    size="54"
                  />
                </div>
              </NuxtLink>
              <!-- <ButtonsFollower :id="user.id" :name="user.full_name" /> -->
            </div>
          </div>
        </div>
        <div class="border-own py-8">
          <h5>Powiązane tematy</h5>
          <div class="flex flex-wrap gap-x-3 gap-y-3 mt-5">
            <LinkCategory
              v-for="(single, index) in categories"
              :key="index"
              :name="single.name"
              :link="single.link"
            />
          </div>
        </div>
        <div class="py-8">
          <h5>Moze Ci się sposobac</h5>
          <div class="flex w-full flex-col">
            <div v-for="(post, index) in recommended" :key="index" class="w-full flex place-items-center gap-[12px] mt-5">
              <!-- <div> -->
                <img :src="post.image" class="image" />
              <!-- </div> -->
              <NuxtLink :to="`/post/${post.link}`">
                <p class="hover:underline text-[15px] leading-snug font-normal">{{ sliceText(post?.title, 40) }}</p>
                <!-- <p class="hover:underline text-[14px] leading-tight">{{post?.title}}</p> -->

              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import Home from '@/components/post/categories/popular.vue'
// import Posts from '@/components/post/categories/topRating.vue'
// import Archive from '@/components/post/categories/popular.vue'

const currentTab = ref("Home");

// const tabs = {
//   Home,
//   Posts,
//   Archive
// } as any
const supabase = useSupabaseClient();
const router = useRouter();
const currentCategory = ref();
const popular = ref(true);
const change = () => {
  popular.value = !popular.value;
};

onMounted(async () => {
  // loadComponent("last");

  const fetchCategory = await supabase
    .from("categories")
    .select("*")
    .match({ link: router.currentRoute.value.params.name })
    .single();

  currentCategory.value = fetchCategory.data;
});

// const currentComponent = shallowRef();
// const loadComponent = async (componentName: string) => {
//   const component = await import(/* @vite-ignore */ `@/components/${componentName}.vue`);
//   currentComponent.value = component.default || component;
//   // setTransitionName();
// };

// loadComponent("last");
const { data: categories } = (await supabase
  .from("categories")
  .select("*")
  .limit(5)) as any;

const { data: users } = (await supabase
  .from("profiles")
  .select("link, avatar_url, full_name")
  // dodac osbsługe tematów
  .limit(5)) as any;

const { data: recommended } = (await supabase
  .from("posts")
  .select("link, image, title")
  // dodac osbsługe tematów
  .limit(5)) as any;
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}
.image {
  border-radius: 5px;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.border-own {
  border-bottom: 2px solid $border;
  padding-bottom: -20px;
}
hr {
  border: 1px solid $border;
  // height: 2px;
  margin-top: -2px;
}
.border-active {
  border-bottom: 3px solid $primary;
}
.active {
  color: $primary;
}
</style>

//! drugi przykład
<!-- <template>
  <div>
    <button @click="loadComponent('home')">Home</button>
    <button @click="loadComponent('posts')">Posts</button>
    <button @click="loadComponent('archive')">Archive</button>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

// Stan do przechowywania aktualnie wybranego komponentu
const currentComponent = ref(null);

// Funkcja do dynamicznego importowania komponentów
const loadComponent = async (componentName) => {
  if (componentName === 'home') {
    currentComponent.value = await defineAsyncComponent(() =>
      import('@/components/post/categories/popular.vue')
    );
  } else if (componentName === 'posts') {
    currentComponent.value = await defineAsyncComponent(() =>
      import('@/components/post/categories/topRating.vue')
    );
  } else if (componentName === 'archive') {
    currentComponent.value = await defineAsyncComponent(() =>
      import('@/components/post/categories/archive.vue')
    );
  }
};
</script> -->

<!-- 
<template>
  <div>
    <Head>
      <Title>{{ currentCategory?.name }}</Title>
    </Head>
    <NuxtLayout name="list" class="mb-[230px]">
      <template #content>
        <div class="flex place-items-center gap-[12px] mb-[48px]">
          <h1>
            {{ currentCategory?.name }}
          </h1>
          <div class="dot" />
          <p class="gray text-[21px] mt-[1px]">
            {{ currentCategory?.number_posts ? currentCategory?.number_posts : 0 }}
          </p>
        </div>
        <div class="flex gap-[4px]">
            <div class="pb-[3px] border-active px-5" @click="change()">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najnowsze</p>
            </div>
                <div class="pb-[3px] border-active px-5">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najpopularniejsze</p>
            </div>
            <div class="pb-[3px] border-active px-5">
                <p class="gray text-[15px] hover:text-black hover:cursor-pointer active">Najlepiej oceniane</p>
            </div>
        </div>
        <hr />
        <button  @click="currentTab = 'Posts'">test</button>
        <div v-if="popular">
            <PostCategoriesPopular/>
        </div> 
        <component
          :is="tabs[currentTab]"
        />  
      </template>
      <template #sidebar> </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import { ref, defineProps, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import { useSupabaseClient } from '@/composables/supabase';

const currentCategory = ref()

const currentTab = ref('Home');

const supabase = useSupabaseClient();
const router = useRouter();
const popular = ref(true);

const change = () => {
  popular.value = !popular.value;
};

onMounted(async () => {
  const fetchCategory = await supabase
    .from("categories")
    .select("*")
    .match({ link: router.currentRoute.value.params.name })
    .single();

  currentCategory.value = fetchCategory.data;
});

const tabs = {
  Home: import('@/components/post/categories/popular.vue'),
  Posts: import('@/components/post/categories/topRating.vue'),
  Archive: import('@/components/post/categories/popular.vue')
};

let currentComponent = tabs[currentTab.value];

import { watch } from 'vue';
watch(currentTab, (newTab) => {
  currentComponent = tabs[newTab];
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}

.border-own {
  border-bottom: 2px solid $border;
  padding-bottom: -20px;
}

hr {
  border: 1px solid $border;
  // height: 2px;
  margin-top: -2px; 
}

.border-active {
  border-bottom: 3px solid $primary;
}

.active {
  color:$primary;
}
</style> -->

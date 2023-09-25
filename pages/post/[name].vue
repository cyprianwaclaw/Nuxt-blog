<template>
  <NuxtLayout name="list">
    <template #content>
      <div class="flex justify-between place-items-center">
        <div class="mr-[32px]">
          <div class="flex gray place-items-center gap-[6px]">
            <p class="text-[16px]">{{ calculateElapsedTime(post.created_at) }}</p>
            <div class="dot" />
            <p class="text-[15px]">{{ post.time_read }} min czytania</p>
          </div>
          <h2 class="mt-[6px]">{{ post.title }}</h2>
        </div>
        <ButtonsSaved :id="post.id" :size="32" />
      </div>
      <PostSingleInfo :post="post" class="mt-[32px] mb-[46px]" />
      <img :src="post.image" class="image isLoadingImage" />
      <div v-for="(single, index) in post.content" :key="index">
        <p :class="single.class">{{ single.text }}</p>
      </div>
      <div class="w-full h-[1000px]">

      </div>
    </template>
    <template #sidebar>
      <div v-if="post.profiles?.avatar_url ? true : false">dsdsd</div>
      <div v-else class="flex w-full mb-2">
        <Icon name="carbon:user-avatar-filled" class="avatar" color="#BFCBEE" size="64" />
      </div>
      <NuxtLink :to="`/autor/${post.profiles.link}`">
        <p class="text-[24px] hover:underline">{{ post.profiles.full_name }}</p>
      </NuxtLink>
      <p class="mt-2 mb-5 des">{{ sliceText(post.profiles?.description, 170) }}</p>
      <ButtonsFollower :id="post.user_id" :name="post.profiles.full_name" />
      <div class="border-own py-7 mt-7">
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
      <div class="border-own py-7">
        <h5>
          Popularni w {{ post.category_id1.name.toLowerCase() }} i
          {{ post.category_id2.name.toLowerCase() }}
        </h5>
        <div class="flex flex-wrap mt-5">
          <div v-for="(user, index) in users" :key="index" class="-mr-5">
            <!-- {{ user.full_name }} -->
            <NuxtLink :to="`/autor/${user.link}`">
              <div v-if="user.avatar_url ? true : false">dsdsd</div>
              <div v-else class="flex w-full mb-2">
                <Icon name="carbon:user-avatar-filled" class="avatar" color="#BFCBEE" size="54" />
              </div>
            </NuxtLink>
      <!-- <ButtonsFollower :id="user.id" :name="user.full_name" /> -->

          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser() as any;
// const followed = ref()
// const isLoading = ref(true);
let { data: post, error } = (await supabase
  .from("posts")
  .select(
    `
      id,
       title,
       created_at,
         image,
         content,
          time_read,
          category_id2(name, link),
          category_id1(name, link),
         description,
         user_id,
        profiles(
           full_name,
           link,
           avatar_url,
           description
         )
       `
  )
  .match({ link: router.currentRoute.value.params.name })
  .single()) as any;

const { data: categories } = (await supabase
  .from("categories")
  .select("*")
  .limit(5)) as any;

const { data: users } = (await supabase
  .from("profiles")
  .select("link, avatar_url, full_name")
// dodac osbsługe tematów
  .limit(5)) as any;

// ! LINK https://www.youtube.com/watch?v=VcnROkRhJ34
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.image {
  border-radius: 12px;
  object-fit: cover;
  height: 500px;
  width: 100%;
}

.border-own {
  border-top: 1px solid $border;
}

.h1 {
  font-size: 12px;
}
.dot {
  width: 5px;
  height: 5px;
  background-color: $gray;
  border-radius: 50%;
}
.gray {
  color: $gray;
}

//!Tip tap editor
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
.is-active {
  background: black;
  color: #fff;
}
.button,
input,
select {
  font-size: inherit;
  font-family: inherit;
  color: #000;
  margin: 0.1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
  accent-color: black;
}
</style>

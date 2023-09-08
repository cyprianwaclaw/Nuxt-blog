<template>
  <NuxtLayout name="list">
    <template #content>
      <div class="flex gray place-items-center gap-[6px]">
        <p class="text-[16px]">{{ calculateElapsedTime(post.created_at) }}</p>
        <div class="dot" />
        <p class="text-[15px]">{{ post.time_read }} min czytania</p>
        <!-- <div class="dot" /> 
<p class="text-[16px]">{{ post.category_id1.name }}</p>
        <div class="dot" />
        <p class="text-[16px] mt-1">{{ post.category_id2.name }}</p> -->
      </div>
      <h2 class="mt-[6px]">{{ post.title }}</h2>
      <PostSingleInfo :post="post" class="mt-[32px] mb-[46px]" />
      <img :src="post.image" alt="hero image" class="image" />
      <div v-for="(single, index) in post.content" :key="index">
        <p :class="single.class">{{ single.text }}</p>
      </div>
    </template>
    <template #sidebar>
      {{ post.profiles }}
      {{ json }}
      <div class="w-full h-12 bg-blue-100"></div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRouter();
const supabase = useSupabaseClient();

const html = "<p>Example <strong>Text</strong></p>";

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
          category_id1(name),
          category_id2(name),
         description,
        profiles(
           full_name,
           avatar_url
         )
       `
  )
  .match({ id: route.currentRoute.value.params.name })
  .single()) as any;

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

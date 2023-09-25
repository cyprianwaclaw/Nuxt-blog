<template>
  <div>
    <Head>
      <Title>{{ currentCategory?.name }}</Title>
    </Head>
    <!-- {{ currentCategory }} -->
    <NuxtLayout name="list">
      <template #content> </template>
      <template #sidebar> </template>
    </NuxtLayout>
    <pre
      >{{ currentCategory }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
const currentCategory = ref();

onMounted(async () => {
  const fetchCategory = await supabase
    .from("categories")
    .select("*")
    .match({ link: router.currentRoute.value.params.name })
    .single();

  currentCategory.value = fetchCategory.data;
});
</script>

<style scoped></style>

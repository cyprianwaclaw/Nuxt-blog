<template>
      <button class="button-category" @click="routerPush()">{{ props.name }}</button>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  });

const routerPush = () => {
  const state ={ category_id: props.link, category_name: props.name };

  router.push({
    path: `/temat/${changeRouteName(props.name)}`,
    state,
  });
};

  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  </style>
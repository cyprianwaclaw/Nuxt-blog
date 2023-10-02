<template>
  <div class="bg">
    <NuxtLayout name="default">
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.bg{
  background-color: #fefefe;
}
</style>
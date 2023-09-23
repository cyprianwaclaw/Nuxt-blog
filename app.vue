<template>
  <div class="bg">
    <NuxtLoadingIndicator/>
    <NuxtLayout name="default">
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
<template>
    <div class="flex">
<Icon name="ph:magnifying-glass" class="gray cursor-pointer" size="26" @click="isOpen()"/>
<div class="" v-if="open">
    dssd
</div>
    </div>
</template>

<script setup lang="ts">
const open = ref(false)
const isOpen = ()=>{
  open.value =!  open.value
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

</style>
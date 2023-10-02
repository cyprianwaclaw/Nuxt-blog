<template>
    <div class="flex">
<Icon name="ph:magnifying-glass-light" class="own-icon" size="28" @click="isOpen()"/>
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
.own-icon{
    color: rgb(172, 172, 172);
    cursor: pointer;
    
}
</style>
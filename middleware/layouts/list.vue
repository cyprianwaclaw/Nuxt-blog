<template>
    <div class="flex w-full">
        <div class="pr-[50px] shrink-1 w-full">
            <slot name="content"/>

          </div> 
          <div class="pl-[50px] border-own shrink-0 w-[310px]">
              <slot name="sidebar"/>
              
            </div>
        </div>

</template>

<script setup lang="ts">

</script>

  
<style scoped lang="scss">
@import "@/assets/style/variables.scss";


.border-own {
    border-left: 1px solid $border;
  }
</style>
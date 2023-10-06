<template>
    <div class="flex w-full">
        <div class="md:pr-[50px] shrink-1 w-full">
            <slot name="content"/>

          </div> 
          <div class="md:pl-[50px] md:border-own md:shrink-0 md:w-[350px] md:sticky md:top-[70px] md:flex hidden">
            <div class="sticky top-[60px]">
                <slot name="sidebar"/>
            </div>
              
            </div>
        </div>

</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own{
border-left: 1px solid $border;
}
</style>
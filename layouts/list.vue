<template>
    <div class="flex w-full">
        <div class="pr-[50px] shrink-1">
            <slot name="content"/>

          </div> 
          <div class="pl-[50px] border-own shrink-0 w-[300px]">
              <slot name="sidebar"/>
              
            </div>
        </div>

</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
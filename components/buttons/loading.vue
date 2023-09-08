<template>
    <div v-if="props.loading" class="button-primary">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="button-primary" v-else>
      {{ props.title }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title:{
        type:String,
        required: true,
    },
    loading:{
        type:Boolean,
        required: true,
    }
})
</script>

<style scoped>
.lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ffffff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
</style>
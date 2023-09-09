<template>
    <Transition>
      <div class="fixed z-50 left-0 bottom-0 w-full">
        <div class="blur-background-new" v-if="props.modalActive"></div>
        <Transition 
        @before-enter="onBeforeEnter"
        >
          <div 
          class="modal-view-update w-[400px]" 
          v-if="props.modalActive">
          <div class="flex place-items-center gap-[12px]">
              <div class="">
                  <Icon v-if="props.status=='error'" name="ph:x-circle-light" size="5"/>
                  <Icon v-if="props.status=='success'" name="prime:check-circle"  size="37" color="black"/>
                  <Icon v-if="props.status=='alert'" name="ph:warning-circle-light"  size="75"/>
                </div>
                <p class="text-black text-[17x]">{{ props.des }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import gsap from 'gsap'
  const props = defineProps({
    des: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    modalActive: {
      type: Boolean,
      required: true,
    }
  });
  

  const onBeforeEnter = (el: any) => {
  gsap.from(el, { 
    x: -200,
    duration: 0.2,
    // ease: 'power2.inOut',
 });
};

  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  /* tło do modala */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

    .modal-view-update {
        background: #96F3C6;
      border: solid transparent;
      border-radius: 12px;
      position: absolute;
      top: 16%;
      left: 15%;
      transform: translate(-50%, -50%);
      z-index: 100;
      padding: 13px;
    }
    
    .blur-background-new {
        background: rgba(0, 0, 0, 0.00);
        width: 100%;
        height: 100vh;
    }

  </style>
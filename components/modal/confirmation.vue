<template>
<Transition 
          @before-enter="onBeforeEnter"
          >
          <div 
          class="modal-view-update" 
          :class="[
            props.status==='success' ? 'alert-green' : '',
            props.status==='error' ? 'alert-red' : '',
            props.status==='alert' ? 'alert-yellow' : '',          
            ]"
            v-if="props.modalActive">
            <div class="flex place-items-center gap-[12px]">
              <div class="">
                <Icon v-if="props.status=='error'" name="prime:times-circle" size="37" color="black"/>
                <Icon v-if="props.status=='success'" name="prime:check-circle"  size="37" color="black"/>
                <Icon v-if="props.status=='alert'" name="prime:exclamation-circle"  size="37" color="black"/>
              </div>
              <p class="text-black text-[17x]">{{ props.des }}</p>
            </div>
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
    x: 200,
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
      border: solid transparent;
      border-radius: 12px;
      position: fixed;
      top: 10%;
      right: 5%;
     // transform: translate(-50%, -50%);
      z-index: 100;
      padding: 13px 21px 13px 13px;
    }
    
.alert-green{
    background: #96F3C6;
}
.alert-red{
    background: #FFB1A9;
}
.alert-yellow{
    background: #FCE38E;
}
  </style>
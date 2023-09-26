<template>
    <Transition>
      <!-- <div class="fixed z-50 left-0 bottom-0 w-full" @click="closeModal">
        <div class="blur-background" v-if="props.modalActive"></div>
      </div> -->
    </Transition>
    <Transition @before-enter="onBefore">
      <div class="modal-view w-[800px] relative h-[600px]" v-if="props.modalActive">
        <div class="absolute top-4 right-6">
          <Icon
            name="carbon:close"
            size="32"
            class="close w-8 h-8 border-transparent rounded-[6px] cursor-pointer -mr-1"
            @click="closeModal"
          />
        </div>
        <div class="grid grid-cols-2 h-full place-items-center">
          <div
            class="bg-[#E9ECF2] w-full h-full place-items-center flex justify-center border-transparent rounded-l-[24px]"
          >
            <img src="/assets/login.png" alt="Login Image" />
          </div>
          <div class="px-[26px] py-[24px] h-full pt-[64px]">
            <Transition :name="animationName" mode="out-in">
              <component
                :is="currentComponent"
                @close="closeModal"
                @componentLogin="loadComponent('login')"
                @componentRegister1="loadComponent('register1')"
                @componentRegister2="loadComponent('register2')"
                @componentForgot="loadComponent('forgotPassword')"
  
              />
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import gsap from "gsap";
  const emit = defineEmits(["close", "logout"]);
//   const props = defineProps({
//     modalActive: {
//       type: Boolean,
//       required: true,
//     },
//   });
  
  const onBefore = (el: any) => {
    gsap.to(el, {
      y: -20,
      duration: 0.2,
    });
  };
  
  const animationName = ref("slide-fade");
  
  const setTransitionName = () => {
    if (
      currentComponent.value.__name === "login" ||
      currentComponent.value.__name === "forgotPassword"
      || currentComponent.value.__name === "register1"
    ) {
      animationName.value = "slide-fade";
      // animationName.value = "slide-up";
    } else {
      animationName.value = "";
    }
  };
  
  const currentComponent = shallowRef();
  const loadComponent = async (componentName: string) => {
    // const component = await import(`@/components/auth/${componentName}.vue`);
  const component = await import(`@/components/post/categories/${componentName}.vue`);

    currentComponent.value = component.default || component;
    setTransitionName();
  };
  
  const closeModal = () => {
    emit("close");
    loadComponent("login");
  };
  
  onMounted(() => {
    loadComponent("last");
  });
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  .close {
    color: rgb(194, 194, 194);
  }
  .close:hover {
    color: rgb(167, 167, 167);
  }
  
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .modal-view {
    background-color: rgb(255, 255, 255);
    border-radius: 24px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.18s ease-out;
  }
  
  .slide-up-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .slide-up-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease-in-out;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  </style>
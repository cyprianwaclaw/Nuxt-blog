<template>
    <Transition>
      <div class="fixed z-50 left-0 bottom-0 w-full" @click="$emit('close')">
        <div class="blur-background" v-if="props.modalActive"></div>
      </div>
      </Transition>
        <Transition @before-enter="onBefore">
          <div
            class="modal-view w-[270px] relative h-[262px] px-[26px] py-[24px]"
            v-if="props.modalActive"
          >
            <div class="flex justify-between place-items-center">
              <p class="cursor-default text-[21px] font-medium">Moje konto</p>
              <Icon
                name="carbon:close"
                size="32"
                class="close w-8 h-8 border-transparent rounded-[6px] cursor-pointer -mr-1 "
                @click="$emit('close')"
              />
            </div>
            <div class="mt-[8px]">
              <LinkHover  v-for="(link, index) in links" :key="index"
              class="mt-[5px] cursor-pointer"         
              :name="link.name"
              :link="link.link"
              @click="$emit('close')"
              size=17
              iconSize=22
              :notHover="false"
              />
              <LinkHover 
              class="mt-[5px]  cursor-pointer hover:text-red-500"         
              name="Wyloguj się"
              size="17"
              iconSize="22"
              :notHover="false"
              @click="$emit('logout')"
              />
          </div>
          </div>
        </Transition>
      <!-- </div> -->
    <!-- </Transition> -->
  </template>
  
  <script setup lang="ts">
  import gsap from "gsap";
  const emit = defineEmits(["close", "logout"]);
  const props = defineProps({
    modalActive: {
      type: Boolean,
      required: true,
    },
  });
  
  const links=[{
      name: 'Profil',
      link: '/konto'
  },{
      name: 'Zapisane artykuły',
      link: '/konto'
  },{
      name: 'Moje artykuły',
      link: '/konto'
  },{
      name: 'Ustawienia',
      link: '/konto/ustawienia'
  }
  ]
  
  const onBefore = (el: any) => {
    gsap.to(el, {
      y: -20,
      duration: 0.2,
    });
  };
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  .close {
    color: rgb(194, 194, 194);
  }
  .close:hover {
      color: rgb(167, 167, 167);
    }
    
  /* tło do modala */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .edit-message-modal {
    margin: 5px 10px 24px 10px;
    line-height: 27px;
    font-weight: 400;
    font-size: 17px;
    text-align: center;
  }
  .modal-view {
    background-color: white;
    border: solid transparent;
    border-radius: 24px;
    position: absolute;
    top: 100px;
    right: 70px;
    z-index: 100;
  }
  </style>
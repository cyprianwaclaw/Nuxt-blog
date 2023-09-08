<template>
    <div class="grid grid-cols-4 cursor-default">
      <div class="flex flex-col">
        <p class="text-[28px] font-medium">Nuxt3 Blog</p>
        <div class="flex flex-col mt-[21px] gap-[8px] cursor-pointer">
          <div class="flex place-items-center gap-[8px]">
            <Icon name="ph:facebook-logo" size="28" />
            <p class="text-[17px]">Facebook</p>
          </div>
          <div class="flex place-items-center gap-[8px] cursor-pointer">
            <Icon name="ph:instagram-logo" size="28" />
            <p class="text-[17px]">Instagram</p>
          </div>
          <div class="flex place-items-center gap-[8px] cursor-pointer">
            <Icon name="ph:youtube-logo" size="28" />
            <p class="text-[17px]">You Tube</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col mr-[50px]">
        <h5 class="mb-[10px]">Blog</h5>
        <LinkHover
          v-for="(link, index) in Blog"
          :key="index"
          class="mt-[5px] cursor-pointer"
          :name="link.name"
          :link="link.link"
          size="17"
          iconSize="22"
          :notHover="true"
        />
      </div>
      <div class="flex flex-col mr-[50px]">
        <h5 class="mb-[10px]">Moje konto</h5>
        <LinkHover
          v-for="(link, index) in Account"
          :key="index"
          class="mt-[5px] cursor-pointer"
          :name="link.name"
          :link="link.link"
          size="17"
          iconSize="22"
          :notHover="true"
        />
      </div>
      <div class="flex flex-col w-full h-full bg-[#F8F8F8]">
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const Blog = [
    { name: "Najpopularniejszi twórcy", link: "/dodaj" },
    { name: "Przeglądaj tematy", link: "/daa" },
    { name: "Polityka prywatności", link: "/daa" },
    { name: "Regulamin", link: "/daa" },
  ];
  const Account = [
    { name: "Mój profil", link: "/dodaj" },
    { name: "Zapisane artykuły", link: "/daa" },
    { name: "Moje artykuły", link: "/daa" },
    { name: "Dodaj nowy artykuł", link: "/daa" },
  ];
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  .title {
    font-size: 15px;
    font-family: $family;
    font-weight: 300;
  }
  .title:hover {
    font-size: 15px;
    font-family: $family;
    font-weight: 400;
    cursor: pointer;
  }
  </style>
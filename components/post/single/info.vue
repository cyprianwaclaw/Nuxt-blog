<template>
    <div class="w-full flex justify-between px-[15px] py-[14px] border-own">
        <div class="flex gray place-items-center gap-[16px] place-items-center">
            <div class="flex place-items-center gap-[3px] cursor-pointer">
                <Icon name="ph:eye" size="21"/>
              <p class="text-[15px]"> 12</p>
            </div>
            <div class="flex place-items-center gap-[3px]">
                <Icon name="ph:chat-circle-dots" size="21"/>
              <p class="text-[15px]">{{ post?.time_read }} </p>
            </div>
            <ButtonsSaved/>
            <!-- <Icon name="ph:bookmark-simple" size="21"/> -->
          </div>

          <div class="flex gray place-items-center gap-[16px]">
<ButtonsRating />
            <Icon name="ph:upload-simple" size="24" class="cursor-pointer"/>
          </div>

    </div>
</template>

<script setup lang="ts">
import { object } from "yup";

const props = defineProps({
    post: {
        type:Object,
    }
})

const iconStar = [{}]
</script>
  
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own{
    border-bottom: 1px solid $border;
    border-top: 1px solid $border;

}
.image {
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
}

.avatar {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  object-fit: cover;
}
.dot {
  width: 5px;
  height: 5px;
  background-color: $gray;
  border-radius: 50%;
}
.gray {
  color: $gray;
}
.star-icon {
    width: 100px; /* Dostosuj rozmiar ikony do swoich preferencji */
    height: 100px; /* Dostosuj rozmiar ikony do swoich preferencji */
    fill: #FFD700; /* Kolor ikony gwiazdki (na początek) */
    transition: fill 0.3s ease; /* Dodaj płynny efekt zmiany koloru */
}

.star-icon:hover {
    fill: #FF5733; /* Kolor ikony po najechaniu myszką */
}
</style>
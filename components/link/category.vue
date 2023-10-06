<template>
  <button
    class="button-category"
    @click="routerPush()"
    :style="{
      fontSize: props.size + 'px',
      paddingTop: props.paddingY + 'px',
      paddingBottom: props.paddingY + 'px',
      paddingLeft: props.paddingX + 'px',
      paddingRight: props.paddingX + 'px',
    }"
  >
    <p
      class="category-text"
      :class="[
        props.size ? '' : 'text-[13px]',
        props.paddingX && props.paddingY ? '' : 'px-[15px] py-[5px]',
      ]"
    >
      {{ props.name }}
    </p>
  </button>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: false,
  },
  paddingX: {
    type: Number,
    required: false,
  },
  paddingY: {
    type: Number,
    required: false,
  },
});

const routerPush = () => {
  router.push({
    path: `/temat/${props.link}`,
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.category-text {
  color: $text-gray;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.52px;
}

.button-category {
  border-radius: 35px;
  border: 1px solid $text-gray;
  font-size: 14px;
  align-items: flex-start;
  color: $text-gray;
  font-family: $family;
}

.button-category:hover > p{
  color: $text-black;
}
.button-category:hover{
  color: $text-black;
border: 1px solid $text-black;
}

.category-text1 {
  color: #999999;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.64px;
}

.button-category1 {
  align-items: flex-start;
  color: $text-gray;
  border-radius: 35px;
  background: #ECECEC;
  font-family: $family;
}

.button-category1:hover > p{
  color: $text-black;
}
.button-category1:hover{
  color: $text-black;
border: 1px solid $text-black;
}
</style>

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
        props.size ? '' : 'text-[14px]',
        props.paddingX && props.paddingY ? '' : 'px-[14px] py-[6px]',
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
</style>

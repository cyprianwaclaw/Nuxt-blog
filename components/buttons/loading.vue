<template>
  <div v-if="props.loading" class="button-primary loading-button">
    <div strss="spinner-container">
      <svg
        class="spinner"
        width="24px"
        height="24px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  </div>
  <div class="button-primary" v-else>
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.loading-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

// Here is where the magic happens

$offset: 187;
$duration: 1.2s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: white;
  }
  25% {
    stroke: white;
  }
  50% {
    stroke: white;
  }
  75% {
    stroke: white;
  }
  100% {
    stroke: white;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>

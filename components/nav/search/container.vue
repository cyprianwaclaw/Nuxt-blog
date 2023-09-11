<template>
  <div>
    <p v-if="props.searchValue">Wartość wyszukiwania: {{ props.searchValue }}</p>
    <div v-else>
      <div class="w-[250px]">
<p>Ostatnie wyszukiwania</p>
<LinkHover
v-for="(link, index) in props.lastResults"
:key="index"
class="mt-[4px] cursor-pointer"
:name="sliceText(link.name, 18)"
:link="link.name"
size="20"
iconSize="22"
:notHover="true"
/>
      </div>
      <div class="flex flex-col w-[500px] mt-10">
        <p>Polecane tematy</p>
        <div class="flex flex-wrap gap-[14px] mt-3">
          <div v-for="(single, index) in props.categories" :key="index">
            <LinkCategory :name="single.name" :link="single.id" @click="$emit('close')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const props = defineProps({
  searchValue: {
    type: String as PropType<string>,
    required: true,
  },
  lastResults: {
    type: Array as PropType<any[]>,
    required: true,
  },
  categories: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
const emit = defineEmits(['close'])
</script>

<style scoped></style>

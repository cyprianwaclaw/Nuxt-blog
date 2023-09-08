<template>
    <div>
trest
<p v-if="props.searchValue">Wartość wyszukiwania: {{ props.searchValue }}</p>
<p v-if="user">
    {{ last.data[0].last }}
</p>
<!-- {{ serach }} -->
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser();
const last = ref()
const props = defineProps({
  searchValue: {
    type: String as PropType<string>,
    required: true,
  },
});
if(user.value){
last.value = await supabase
.from('search')
.select('last')
.eq('user_id', user?.value?.id)
}

// watch(user, async (newValue) => {
//    let { data: serach, error } = await supabase
//     .from('search')
//     .select('last')
//     .eq('user_id', user.value.id)
// })
// if(user){
    // let { data: serach, error } = await supabase
    // .from('search')
    // .select('last')
    // .eq('user_id', user.value.id)
// }
</script>

<style scoped>

</style>
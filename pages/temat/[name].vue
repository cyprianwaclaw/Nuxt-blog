<template>
    <div>
        <Head>
            <Title>{{ currentCategoryName }}</Title>
        </Head>
        <!-- {{ currentCategory }} -->
        <pre>
{{ currentCategoryId }}
{{  currentCategory }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()
const currentCategory = ref()

const currentCategoryId = router.options.history.state.category_id as number
const currentCategoryName = router.options.history.state.category_name as string

onMounted(async () => {
const fetchCategory = await supabase
.from('categories')
  .select('*')
  .match({id: currentCategoryId })
  .single()

  currentCategory.value = fetchCategory.data
  
})
</script>

<style scoped>

</style>

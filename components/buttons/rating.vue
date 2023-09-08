<template>
  <div v-if="isLoading">Ładowanie</div>
  <div class="star-rating" v-else>
    <div
      v-for="star in 5"
      :key="star"
      @mouseover="highlightStars(star)"
      @mouseleave="resetStars()"
      @click="toggleRating(star)"
      class="star"
      :class="{ 'star-disabled': selectedRating > 0 }"
    >
      <Icon
        :name="
          star <= selectedRating ? 'ph:bookmark-simple' : 'ph:bookmark-simple-duotone'
        "
        :size="21"
        :class="{
          'star-highlighted': star <= hoverRating || star <= selectedRating,
          'star-selected': star <= selectedRating,
        }"
      />
    </div>
  </div>
  {{ rating }}

  <button @click="remove()">usun</button>
</template>

<script setup>
const user = useSupabaseUser();
const route = useRouter();
const supabase = useSupabaseClient();

let selectedRating = ref(0);
const hoverRating = ref(0);
const isLoading = ref(true);

const fetchData = async () => {
  const { data, error } = await supabase
    .from("ratings")
    .select("rate")
    .eq("user_id", user?.value?.id)
    .eq("post_id", route?.currentRoute.value?.params?.name)
    .single();

  selectedRating.value = data?.rate || 0;

  isLoading.value = false;
};

onMounted(() => {
  fetchData();
});

const toggleRating = async (rating) => {
  const insertData = [
    {
      user_id: user?.value?.id,
      post_id: route?.currentRoute.value?.params?.name,
      rate: rating,
    },
  ];
  if (selectedRating.value === 0) {
    selectedRating.value = rating;

    const { data, error } = await supabase
    .from("ratings")
    .insert(insertData)

  }
};

const highlightStars = (rating) => {
  hoverRating.value = rating;
};

const resetStars = () => {
  hoverRating.value = 0;
};

const remove = async() => {
  selectedRating.value = 0;
  hoverRating.value = 0;

  const { data, error } = await supabase
    .from("ratings")
    .delete()
    .eq("user_id", user?.value?.id)
    .eq("post_id", route?.currentRoute.value?.params?.name)
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.star-rating {
  display: flex;
}

.star {
  margin-right: 5px;
  cursor: pointer;
}

.star-highlighted,
.star-selected {
  color: green;
}

.star-selected {
  color: green;
}

.star-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

<template>
  <ModalConfirmation
    :modalActive="open"
    des="Przesłano Twoją ocenę!"
    status="success"
    @close="isModal()"
  />
  <div v-if="isLoading">Ładowanie</div>
  <div class="star-rating" v-else>
    <div v-if="!user" class="star-rating">
      <div v-for="star in 5" :key="star">
        <Icon name="ph:star" :size="23" class="hover:cursor-pointer" />
      </div>
    </div>
    <div
      v-else
      v-for="star in 5"
      :key="star"
      @mouseover="highlightStars(star)"
      @mouseleave="resetStars()"
      @click="toggleRating(star)"
      class="star"
      :class="{ 'star-disabled': selectedRating > 0 }"
    >
      <Icon
        :name="star <= selectedRating ? 'ph:star-fill' : 'ph:star'"
        :size="21"
        :class="{
          'star-highlighted': star <= hoverRating || star <= selectedRating,
          'star-selected': star <= selectedRating,
        }"
      />
    </div>
    <button @click="remove()" v-if="selectedRating">usun</button>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const route = useRouter();
const supabase = useSupabaseClient();
const open = ref(false);

let selectedRating = ref(0);
const hoverRating = ref(0);
const isLoading = ref(true);

const isModal = () => {
  open.value = true;

  setTimeout(() => {
    open.value = false;
  }, 1200);
};

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
    isModal();
    const { data, error } = await supabase.from("ratings").insert(insertData);
  }
};

const highlightStars = (rating) => {
  hoverRating.value = rating;
};

const resetStars = () => {
  hoverRating.value = 0;
};

const remove = async () => {
  selectedRating.value = 0;
  hoverRating.value = 0;

  const { data, error } = await supabase
    .from("ratings")
    .delete()
    .eq("user_id", user?.value?.id)
    .eq("post_id", route?.currentRoute.value?.params?.name);
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
  color: #ffc62e;
}

.star-selected {
  color: #ffc62e;
}

.star-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

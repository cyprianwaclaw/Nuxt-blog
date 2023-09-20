<!-- <template>
  <div class=" mb-20">
    <input type="checkbox" id="checkbox1" v-model="x" @change="handleCheckboxChange('x')" />
    <label for="checkbox1">Imię</label>
    <input type="checkbox" id="checkbox2" v-model="y" @change="handleCheckboxChange('y')" />
    <label for="checkbox2">Nazwisko</label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const x = ref(true)
const y = ref(false)

const handleCheckboxChange = (selected) => {
  if (selected === 'x' && x.value) {
    y.value = false
  } else if (selected === 'y' && y.value) {
    x.value = false
  }
}
</script> -->



<!-- <template>
  <div class="mb-20 ml-10">
    <div v-for="(checkbox, index) in checkboxes" :key="index">
      <input :type="checkbox.type" :id="checkbox.id" v-model="checkbox.checked" @change="handleCheckboxChange(index)" />
      <label :for="checkbox.id">{{ checkbox.label }}</label>
    </div>
    <button @click="addCokkie()">add</button>
  
  </div>
</template>

<script setup>
  const cookieData = useCookie('select')
//   const array = ref([
//   { id: 'checkbox1', type: 'checkbox', label: 'Imię', checked: false },
//   { id: 'checkbox2', type: 'checkbox', label: 'Nazwisko', checked: false },
// ])

const checkboxes = ref([])
checkboxes.value = [
  { id: 'checkbox1', type: 'checkbox', label: 'Imię', checked: false },
  { id: 'checkbox2', type: 'checkbox', label: 'Nazwisko', checked: false },
]

const currentArray = () => {
if(cookieData.length){
  return cookieData.value
} else {
  return checkboxes.value
}
}
onMounted(() => {
  currentArray()
})
// const checkboxes = ref([])

// onMounted(() => {
//  checkboxes.value = cookieData.value.length ? cookieData.value : array.value

// })

const handleCheckboxChange = (selectedIndex) => {
  checkboxes.value.forEach((checkbox, index) => {
    if (index !== selectedIndex) {
      checkbox.checked = false
    }
  })
}
const changeArray = ref([])

watch(checkboxes.value, (newValue) => {
  console.log(newValue)
  changeArray.value = newValue
})
const addCokkie = () => {
const cookie = useCookie('select')
cookie.value = changeArray.value
}
</script>
 -->






 <template>
  <div class="mb-20 ml-10">
    <div v-for="(checkbox, index) in checkboxes" :key="index">
      <input :type="checkbox.type" :id="checkbox.id" v-model="checkbox.checked" @change="handleCheckboxChange(index)" />
      <label :for="checkbox.id">{{ checkbox.label }}</label>
    </div>
    <button @click="saveCookies()">Zapisz</button>
  </div>
</template>

<script setup>

const checkboxes = ref([
  { id: 'checkbox1', type: 'checkbox', label: 'Imię', checked: false },
  { id: 'checkbox2', type: 'checkbox', label: 'Nazwisko', checked: false }
])

const cookieData = useCookie('select')

const handleCheckboxChange = (selectedIndex) => {
  checkboxes.value.forEach((checkbox, index) => {
    if (index !== selectedIndex) {
      checkbox.checked = false
    }
  })
}

const saveCookies = () => {
  const selectedCheckboxes = checkboxes.value.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.label)
  cookieData.value = selectedCheckboxes
}

onMounted(() => {
  // Wczytaj dane z ciasteczka i ustaw stan checkboxów
  if (cookieData.value.length) {
    checkboxes.value.forEach((checkbox) => {
      checkbox.checked = cookieData.value.includes(checkbox.label)
    })
  }
})
</script>







<!-- 
<script setup lang="ts">
const test = useCookie('userInfo')
const user = useCookie(
  'userInfo',
  {
    default: () => ({ score: -1 }),
    watch: false
  }
)

if (user.value && user.value !== null) {
  user.value.score++; // userInfo cookie not update with this change
}
</script>

<template>
  {{ test }}
  <div>User score: {{ user?.score }}</div>
</template>
 -->

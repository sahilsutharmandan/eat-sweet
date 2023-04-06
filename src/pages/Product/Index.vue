<template>
  <FullPageLayout>
    <div class="mb-4">
      <Dropdown
        v-model="selectedMeal"
        :options="indainMeals"
        optionLabel="name"
        placeholder="Select a Meal"
        class="w-full"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <img
              :alt="slotProps.value.strMeal"
              :src="slotProps.value.strMealThumb"
              class="mr-2"
              style="width: 18px"
            />
            <div>{{ slotProps.value.strMeal }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <img
              :alt="slotProps.option.strMeal"
              :src="slotProps.option.strMealThumb"
              class="mr-2"
              style="width: 18px"
            />
            <div>{{ slotProps.option.strMeal }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="flex gap-4" v-for="(item, index) in meals" :key="index">
      <div class="w-3/4 flex gap-6">
        <div class="w-1/3">
          <img :src="item.strMealThumb" alt="" />
        </div>
        <div class="w-2/3">
          <p>{{ item.strCategory }}</p>
          <h2 class="text-3xl font-semibold">{{ item.strMeal }}</h2>
          <p class="py-2">4.5 rating, 432 Reviews</p>
          <h2 class="text-3xl font-semibold">$459.44</h2>

          <p class="bg-green-200 text-green-800 font-semibold px-2 py-1.5 my-1">
            Recipes
          </p>
          <p class="px-2">{{ item.strInstructions }}</p>
        </div>
      </div>
      <div class="flex-1 h-fit border rounded-2xl p-5">
        <h3 class="text-xl font-semibold">Ingredient</h3>
        <ul class="pl-8 list-disc">
          <li v-if="item.strIngredient1">{{ item.strIngredient1 }}</li>
          <li v-if="item.strIngredient2">{{ item.strIngredient2 }}</li>
          <li v-if="item.strIngredient3">{{ item.strIngredient3 }}</li>
          <li v-if="item.strIngredient5">{{ item.strIngredient5 }}</li>
          <li v-if="item.strIngredient6">{{ item.strIngredient6 }}</li>
          <li v-if="item.strIngredient7">{{ item.strIngredient7 }}</li>
          <li v-if="item.strIngredient8">{{ item.strIngredient8 }}</li>
          <li v-if="item.strIngredient9">{{ item.strIngredient9 }}</li>
          <li v-if="item.strIngredient10">{{ item.strIngredient10 }}</li>
          <li v-if="item.strIngredient11">{{ item.strIngredient11 }}</li>
          <li v-if="item.strIngredient12">{{ item.strIngredient12 }}</li>
          <li v-if="item.strIngredient13">{{ item.strIngredient13 }}</li>
          <li v-if="item.strIngredient14">{{ item.strIngredient14 }}</li>
          <li v-if="item.strIngredient15">{{ item.strIngredient15 }}</li>
          <li v-if="item.strIngredient16">{{ item.strIngredient16 }}</li>
          <li v-if="item.strIngredient17">{{ item.strIngredient17 }}</li>
          <li v-if="item.strIngredient18">{{ item.strIngredient18 }}</li>
          <li v-if="item.strIngredient19">{{ item.strIngredient19 }}</li>
          <li v-if="item.strIngredient20">{{ item.strIngredient20 }}</li>
        </ul>
      </div>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Dropdown from "primevue/dropdown";
const store = useStore();
const getMeals = (id) => {
  store.dispatch("MealsModule/getMealsById", id);
};
const meals = computed(() => {
  return store.getters["MealsModule/meals"];
});
const country = ref("Indian");
const getIndianMeals = (country) => {
  store.dispatch("MealsModule/getIndianMeals", country);
};
const indainMeals = computed(() => {
  return store.getters["MealsModule/indainMeals"];
});

const selectedMeal = ref();
const mealId = ref("52772");
onMounted(() => {
  getMeals(mealId.value);
  getIndianMeals(country.value);
});
watch(selectedMeal, (newValue) => {
  getMeals(newValue.idMeal);
});
</script>

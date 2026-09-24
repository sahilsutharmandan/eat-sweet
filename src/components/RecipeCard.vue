<template>
  <article class="recipe-card">
    <img v-lazy="recipe.image" class="recipe-image" :alt="recipe.label" />
    <div class="card-body">
      <router-link to="/recipe-details" @click="store.dispatch('FoodRecipeModule/getRecipeDetails', recipe)"><h3>{{ recipe.label }}</h3></router-link>
      <p class="description">{{ recipe.dietLabels?.join(' · ') || recipe.mealType?.join(' · ') || 'A little inspiration for your next meal' }}</p>
      <dl class="nutrition">
        <div><FireIcon aria-hidden="true" /><span><dd>{{ Math.floor(recipe.calories).toLocaleString() }}</dd><dt>Calories</dt></span></div>
        <div><ListBulletIcon aria-hidden="true" /><span><dd>{{ recipe.ingredients?.length || 0 }}</dd><dt>Ingredients</dt></span></div>
      </dl>
      <div class="card-footer"><span>Made to be enjoyed</span><button type="button" :aria-label="`${favorite ? 'Remove' : 'Save'} ${recipe.label} ${favorite ? 'from' : 'to'} favorites`" :aria-pressed="favorite" @click="store.dispatch('FoodRecipeModule/isFavoriteRecipe', recipe)"><HeartIcon :class="{ saved: favorite }" /></button></div>
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { FireIcon, ListBulletIcon, HeartIcon } from '@heroicons/vue/24/outline';
const props = defineProps({ recipe: Object });
const store = useStore();
const favorite = computed(() => store.getters['FoodRecipeModule/favoriteRecipe'].some(item => item.label === props.recipe.label));
</script>
<style scoped>
.recipe-card { min-width:0; padding-top:8px; }
.recipe-image { width:128px; height:128px; border-radius:50%; object-fit:cover; margin:auto; z-index:1; box-shadow:0 5px 18px #24433218; border:5px solid white; }
.card-body { border:1px solid #e0e9e2; border-radius:24px; margin-top:-56px; padding:72px 20px 14px; background:linear-gradient(150deg,#fff 60%,#f6faf4); box-shadow:0 5px 18px #24433206; }
h3 { font-size:21px; line-height:1.3; font-weight:750; letter-spacing:-.5px; color:#203e2c; overflow-wrap:anywhere; }
.description { color:#687b6e; font-size:13px; font-weight:400; margin-top:8px; min-height:20px; }
.nutrition { display:flex; flex-wrap:wrap; gap:16px; margin:20px 0; }
.nutrition > div { display:flex; align-items:center; gap:8px; flex:1; }
.nutrition svg { width:22px; height:22px; color:#52805b; flex-shrink:0; }
dd { font-size:17px; font-weight:700; color:#294d33; line-height:1.3; } dt { font-size:11px; color:#697a6f; }
.card-footer { display:flex; align-items:center; justify-content:space-between; gap:6px; border-top:1px solid #e5ece4; padding-top:10px; }
.card-footer span { font-size:11px; color:#718074; } button { padding:8px; border-radius:50%; } button:hover { background:#edf5e9; } button:focus-visible { outline:2px solid #175c3a; } button svg { width:20px; height:20px; } .saved { fill:#df6563; color:#df6563; }
</style>
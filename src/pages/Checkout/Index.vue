<template>
  <FullPageLayout class="flex flex-col">
    <div class="checkout-toolbar">
      <MultiselectDropdown v-model="selection" class="recipe-selector" />
      <button v-if="recipe" class="clear-selection" @click="selection = null">Clear selection</button>
    </div>

    <section v-if="!recipe" class="checkout-empty" aria-labelledby="checkout-title">
      <img :src="chefImage" alt="" />
      <h1 id="checkout-title">Ordering is coming soon</h1>
      <p>Something delicious is on its way. Select a recipe to explore its ingredients and nutrition while we get checkout ready.</p>
    </section>

    <article v-else class="recipe-preview" aria-labelledby="recipe-title">
      <div class="preview-intro">
        <span class="eyebrow">Your recipe preview</span>
        <span class="coming-badge"><span aria-hidden="true">●</span> Ordering coming soon</span>
      </div>
      <div class="recipe-hero">
        <div class="recipe-photo">
          <img v-if="recipe.image && !imageFailed" :src="recipe.image" :alt="recipe.label" @error="imageFailed = true" />
          <span v-else>Recipe image unavailable</span>
        </div>
        <div class="recipe-summary">
          <p v-if="context" class="recipe-context">{{ context }}</p>
          <h1 id="recipe-title">{{ recipe.label }}</h1>
          <p v-if="recipe.source" class="recipe-source">Recipe by {{ recipe.source }}</p>
          <dl class="recipe-stats">
            <div><dt>{{ servings ? 'kcal / serving' : 'kcal / recipe' }}</dt><dd>{{ calories }}</dd></div>
            <div><dt>Servings</dt><dd>{{ servings || '—' }}</dd></div>
            <div><dt>{{ recipe.totalTime > 0 ? 'Minutes' : 'Prep time' }}</dt><dd>{{ recipe.totalTime > 0 ? recipe.totalTime : '—' }}</dd></div>
          </dl>
          <p class="preview-note">Explore your next meal.<br />Checkout and ordering will be available soon.</p>
        </div>
      </div>
      <div class="recipe-information">
        <section class="ingredient-section" aria-labelledby="ingredients-title">
          <div class="section-heading"><h2 id="ingredients-title">What goes in</h2><span>{{ ingredients.length }} ingredients</span></div>
          <p class="section-caption">Quantities for the full recipe{{ servings ? ` · ${servings} servings` : '' }}</p>
          <ul v-if="ingredients.length" class="ingredient-list">
            <li v-for="(ingredient, index) in ingredients" :key="index"><span class="ingredient-dot" aria-hidden="true"></span>{{ ingredient }}</li>
          </ul>
          <p v-else class="section-caption">Ingredient information isn't available for this recipe.</p>
        </section>
        <section class="diet-section" aria-labelledby="diet-title">
          <h2 id="diet-title">Diet &amp; health</h2>
          <p class="section-caption">Labels provided with this recipe</p>
          <h3>Diet</h3>
          <div v-if="recipe.dietLabels?.length" class="label-list"><span v-for="label in recipe.dietLabels" :key="label">{{ label }}</span></div>
          <p v-else class="section-caption">No diet labels provided.</p>
          <h3>Health labels</h3>
          <div v-if="recipe.healthLabels?.length" class="label-list health-labels"><span v-for="label in recipe.healthLabels" :key="label">{{ label }}</span></div>
          <p v-else class="section-caption">No health labels provided.</p>
          <div v-if="recipe.cautions?.length" class="recipe-cautions"><h3>Allergen cautions</h3><p>{{ recipe.cautions.join(', ') }}</p></div>
        </section>
      </div>
    </article>
    <span class="sr-only" role="status">{{ recipe ? `Recipe preview updated: ${recipe.label}` : 'No recipe selected' }}</span>
  </FullPageLayout>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import FullPageLayout from '../../components/FullPageLayout.vue';
import MultiselectDropdown from '../../components/MultiselectDropdown.vue';
import chefImage from '../../images/chef.png';

const selection = ref(null);
const recipe = computed(() => selection.value?.recipe);
const imageFailed = ref(false);
watch(recipe, () => { imageFailed.value = false; });
const servings = computed(() => Number(recipe.value?.yield) > 0 ? Number(recipe.value.yield) : null);
const calories = computed(() => {
  const amount = recipe.value?.calories;
  return typeof amount === 'number' && Number.isFinite(amount)
    ? Math.round(amount / (servings.value || 1)).toLocaleString() : '—';
});
const ingredients = computed(() => recipe.value?.ingredientLines?.length
  ? recipe.value.ingredientLines : (recipe.value?.ingredients || []).map(item => item.text || item.food).filter(Boolean));
const context = computed(() => [...(recipe.value?.cuisineType || []), ...(recipe.value?.mealType || [])].join(' · '));
</script>
<style scoped>
.checkout-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.recipe-selector { width: 320px; max-width: 100%; }
.recipe-selector :deep(.p-dropdown) { width: 100%; }
.clear-selection { color: #166534; font-size: 13px; padding: 8px; text-decoration: underline; text-underline-offset: 4px; }
.clear-selection:focus-visible { outline: 2px solid #15803d; outline-offset: 3px; border-radius: 4px; }
.checkout-empty { flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 48px 0; gap: 16px; }
.checkout-empty img { width: 170px; max-width: 45%; }
.checkout-empty h1 { font-size: clamp(26px, 3vw, 38px); font-weight: 700; letter-spacing: -1px; line-height: 1.2; }
.checkout-empty p { max-width: 560px; color: #587064; font-size: 16px; line-height: 1.8; }
.recipe-preview { width: 100%; max-width: 1120px; margin: 28px auto 12px; color: #244332; }
.preview-intro { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.eyebrow { text-transform: uppercase; letter-spacing: 2px; font-size: 11px; font-weight: 700; color: #547060; }
.coming-badge { background: #f0fdf4; border: 1px solid #d4e9db; border-radius: 24px; padding: 6px 12px; font-size: 12px; color: #166534; }
.coming-badge span { margin-right: 5px; font-size: 8px; }
.recipe-hero { display: grid; grid-template-columns: 42% 1fr; border-radius: 20px; overflow: hidden; background: #eff8f1; border: 1px solid #deebe1; }
.recipe-photo { min-height: 320px; display: grid; place-items: center; background: #e0eee3; color: #547060; }
.recipe-photo img { width: 100%; height: 100%; position: absolute; object-fit: cover; }
.recipe-summary { padding: 32px 36px; }
.recipe-context { text-transform: capitalize; color: #547060; font-size: 13px; margin-bottom: 8px; }
.recipe-summary h1 { font-size: clamp(26px, 3vw, 40px); line-height: 1.12; font-weight: 700; letter-spacing: -1px; overflow-wrap: anywhere; }
.recipe-source { color: #547060; font-size: 13px; margin-top: 12px; }
.recipe-stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 24px; padding: 20px 0; border-top: 1px solid #d1e3d6; border-bottom: 1px solid #d1e3d6; }
.recipe-stats div { display: flex; flex-direction: column-reverse; gap: 3px; padding: 0 16px; border-left: 1px solid #d1e3d6; }
.recipe-stats div:first-child { padding-left: 0; border-left: 0; }
.recipe-stats dt { font-size: 11px; color: #547060; }
.recipe-stats dd { font-size: 26px; line-height: 1.2; font-weight: 600; }
.preview-note { margin-top: 18px; font-size: 13px; color: #547060; line-height: 1.7; }
.recipe-information { display: grid; grid-template-columns: 1.15fr 1fr; gap: 40px; margin-top: 32px; }
.recipe-information h2 { font-size: 21px; font-weight: 600; letter-spacing: -.4px; }
.section-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.section-heading > span { font-size: 12px; color: #547060; }
.section-caption { font-size: 12px; color: #62766a; margin-top: 4px; }
.ingredient-list { margin-top: 18px; }
.ingredient-list li { display: flex; align-items: baseline; gap: 12px; border-bottom: 1px solid #edf0ee; padding: 12px 0; font-size: 14px; line-height: 1.6; }
.ingredient-dot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: #77a688; }
.diet-section { border-left: 1px solid #e3ece6; padding-left: 32px; }
.diet-section h3 { font-size: 12px; font-weight: 600; margin: 18px 0 8px; }
.label-list { display: flex; flex-wrap: wrap; gap: 7px; }
.label-list span { font-size: 11px; border-radius: 5px; padding: 5px 9px; background: #e9f5ed; color: #166534; }
.health-labels span { background: #f7faf8; border: 1px solid #dfe9e2; color: #466150; }
.recipe-cautions p { font-size: 12px; color: #62766a; }
@media (max-width: 640px) {
  .recipe-selector { width: 100%; }
  .recipe-hero { grid-template-columns: 1fr; }
  .recipe-photo { min-height: 230px; }
  .recipe-summary { padding: 24px; }
  .recipe-information { grid-template-columns: 1fr; gap: 28px; }
  .diet-section { border-left: 0; border-top: 1px solid #e3ece6; padding: 24px 0 0; }
  .recipe-stats div { padding: 0 10px; }
  .checkout-empty { padding: 40px 0; }
}
</style>

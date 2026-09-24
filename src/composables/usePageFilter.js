import { ref } from 'vue';
export function matchesSearch(value, query) {
  const searchableText = item => {
    if (typeof item === 'string') return item;
    if (Array.isArray(item)) return item.map(searchableText).join(' ');
    if (!item || typeof item !== 'object') return '';
    return Object.entries(item).filter(([key]) => /^(recipe|label|food|text|ingredients|ingredientLines|dietLabels|healthLabels|mealType|cuisineType|strMeal|strCategory|strIngredient\d+)$/.test(key)).map(([, field]) => searchableText(field)).join(' ');
  };
  const text = searchableText(value).toLocaleLowerCase();
  return (query || '').trim().toLocaleLowerCase().split(/\s+/).every(term => text.includes(term));
}
export function usePageFilter() {
  const searchFoodRecipe = ref('');
  const searchRecipe = value => { searchFoodRecipe.value = value; };
  const filterItems = items => (items || []).filter(item => matchesSearch(item, searchFoodRecipe.value));
  return { searchFoodRecipe, searchRecipe, filterItems };
}

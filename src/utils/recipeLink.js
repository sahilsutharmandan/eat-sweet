export function recipeId(recipe) {
  return recipe?.uri?.split('#recipe_')[1] || '';
}

export function recipeLink(recipe) {
  return { name: 'recipe_details', query: { id: recipeId(recipe) } };
}

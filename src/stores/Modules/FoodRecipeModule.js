import axios from "axios";

function getStoredItem(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        return fallback;
    }
}

function setStoredItem(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
}

export default {
    namespaced: true,
    state() {
        return {
            recipe: [],
            favoriteRecipe: getStoredItem('favoriteRecipe', []),
            recipeDetails: getStoredItem('recipeDetails', null) || {},
            loading: false
        }
    },
    mutations: {
        GET_RECIPE(state, data) {
            state.recipe = data
        },
        FAVORITE_RECIPE(state, recipe) {
            const existingRecipe = state.favoriteRecipe.find(item => item.label === recipe.label);
            if (!existingRecipe) {
                state.favoriteRecipe.push(recipe);
            } else {
                state.favoriteRecipe = state.favoriteRecipe.filter(item => item.label !== recipe.label);
            }
            setStoredItem('favoriteRecipe', state.favoriteRecipe);
        },
        GET_RECIPE_DETAILS(state, recipe) {
            state.recipeDetails = recipe
            if (recipe && Object.keys(recipe).length > 0) {
                setStoredItem('recipeDetails', recipe);
            }
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async getRecipe({ commit }, searchBy) {
            try {
                commit('SET_LOADING', true);
                const response = await axios.get(`${import.meta.env.VITE_FOOD_RECIPE_API_URL}?type=public&app_id=${import.meta.env.VITE_FOOD_RECIPE_APP_ID}&app_key=${import.meta.env.VITE_FOOD_RECIPE_API_KEY}&q=${encodeURIComponent(searchBy || '')}`);
                commit('GET_RECIPE', response);
                return response;
            } catch (error) {
                console.log(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
        isFavoriteRecipe(context, favoriteRecipe) {
            context.commit('FAVORITE_RECIPE', favoriteRecipe)

        },
        getRecipeDetails(context, recipe) {
            context.commit('GET_RECIPE_DETAILS', recipe)
        }

    },
    getters: {
        getRecipe(state) {
            return state.recipe
        },
        favoriteRecipe(state) {
            return state.favoriteRecipe
        },
        recipeDetails(state) {
            return state.recipeDetails
        },
        loading(state) {
            return state.loading
        }

    }
}
import axios from "axios";
export default {
    namespaced: true,
    state() {
        return {
            recipe: [],
            favoriteRecipe: [],
            recipeDetails: [],
            loading: true
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
        },
        GET_RECIPE_DETAILS(state, recipe) {
            state.recipeDetails = recipe
            console.log(recipe)
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async getRecipe({ commit }, searchBy) {
            try {
                commit('SET_LOADING', true);
                const response = await axios.get(`https://api.edamam.com/search?app_id=2bc600a3&app_key=1de47a2f471a653f2819b0d80a56f9f9&from=10&to=50&q=${searchBy}`);
                commit('GET_RECIPE', response);
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
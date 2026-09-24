import axios from "axios";
export default {
    namespaced: true,
    state() {
        return {
            recipe: [],
            favoriteRecipe: [],
            recipeDetails: null,
            searchError: "",
            searchRequest: 0,
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

        },
        SEARCH_STARTED(state) {
            state.searchRequest++;
            state.searchError = "";
            state.recipe = [];
        },
        SEARCH_FAILED(state) {
            state.searchError = "Unable to load recipes. Please try again.";
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async getRecipe({ commit, state }, searchBy) {
            commit('SEARCH_STARTED');
            const request = state.searchRequest;
            commit('SET_LOADING', true);
            try {
                const response = await axios.get(import.meta.env.VITE_FOOD_RECIPE_API_URL, {
                    params: {
                        type: 'public',
                        app_id: import.meta.env.VITE_FOOD_RECIPE_APP_ID,
                        app_key: import.meta.env.VITE_FOOD_RECIPE_API_KEY,
                        q: String(searchBy || '').trim() || 'Vegetarian'
                    }
                });
                if (request === state.searchRequest) commit('GET_RECIPE', response);
            } catch (error) {
                if (request === state.searchRequest) commit('SEARCH_FAILED');
            } finally {
                if (request === state.searchRequest) commit('SET_LOADING', false);
            }
        },
        async loadRecipeDetails(_, id) {
            const response = await axios.get(`${import.meta.env.VITE_FOOD_RECIPE_API_URL}/${encodeURIComponent(id)}`, {
                params: {
                    type: 'public',
                    app_id: import.meta.env.VITE_FOOD_RECIPE_APP_ID,
                    app_key: import.meta.env.VITE_FOOD_RECIPE_API_KEY
                }
            });
            return response.data.recipe;
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
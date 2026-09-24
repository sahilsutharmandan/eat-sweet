import axios from "axios";
export default {
    namespaced: true,
    state() {
        let savedFavorites = [];
        try {
            const raw = localStorage.getItem('eatsweet_favorites');
            if (raw) savedFavorites = JSON.parse(raw);
        } catch (e) {}
        return {
            recipe: [],
            favoriteRecipe: savedFavorites,
            recipeDetails: [],
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
            try {
                localStorage.setItem('eatsweet_favorites', JSON.stringify(state.favoriteRecipe));
            } catch (e) {}
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
                const response = await axios.get(`${import.meta.env.VITE_FOOD_RECIPE_API_URL}?type=public&app_id=${import.meta.env.VITE_FOOD_RECIPE_APP_ID}&app_key=${import.meta.env.VITE_FOOD_RECIPE_API_KEY}&q=${searchBy}`);
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
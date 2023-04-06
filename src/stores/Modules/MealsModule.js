import axios from "axios";
export default {
    namespaced: true,
    state() {
        return {
            meals: [],
            indainMeals: []
        }
    },
    mutations: {
        GET_MEAL(state, data) {
            state.meals = data?.data?.meals
            console.log(data?.data)
        },
        GET_INDIAN_MEAL(state, data) {
            state.indainMeals = data?.data?.meals
        },
        GET_MEAL_BY_ID(state, data) {
            state.meals = data?.data?.meals
        }
    },
    actions: {
        getMeals(context) {
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c').then((response) => {
                context.commit('GET_MEAL', response)
            })
        },
        getIndianMeals(context, country) {

            axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + country).then((response) => {
                context.commit('GET_INDIAN_MEAL', response)
            })
        },
        getMealsById(context, mealId) {
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId).then((response) => {
                context.commit('GET_MEAL_BY_ID', response)
                console.log(mealId)
            })
        }
    },
    getters: {
        meals(state) {
            return state.meals
        },
        indainMeals(state) {
            return state.indainMeals
        }
    }
}
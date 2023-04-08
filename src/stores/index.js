import { createStore } from 'vuex';
import MealsModule from './Modules/MealsModule.js'
import GreetingModule from './Modules/GreetingModule.js'
import FoodRecipeModule from './Modules/FoodRecipeModule.js'
const store = createStore({
    modules: {
        MealsModule: MealsModule,
        GreetingModule: GreetingModule,
        FoodRecipeModule: FoodRecipeModule
    }
});
export default store;
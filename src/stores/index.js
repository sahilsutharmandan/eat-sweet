import { createStore } from 'vuex';
import MealsModule from './Modules/MealsModule.js'
import GreetingModule from './Modules/GreetingModule.js'
const store = createStore({
    modules: {
        MealsModule: MealsModule,
        GreetingModule: GreetingModule
    }
});
export default store;
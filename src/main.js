import { createApp } from 'vue'
import { createPinia } from 'pinia'

import stores from './stores/index.js';
import App from './App.vue'
import router from './router'

import FullPageLayout from './components/FullPageLayout.vue'
import DropDown from './components/DropDown.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'
import FoodItem from './components/FoodItem.vue'
import FavoriteRecipe from './components/FavoriteRecipe.vue'
import Loader from './components/Loader.vue'
import MultiselectDropdown from './components/MultiselectDropdown.vue'

import PrimeVue from 'primevue/config';
import VueLazyload from 'vue-lazyload'
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';

import './assets/main.css'
import '@flaticon/flaticon-uicons/css/all/all.css';
import 'primeicons/primeicons.css';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(stores)
app.use(PrimeVue)
app.use(VueLazyload)
app.use(Badge)

app.component('FullPageLayout', FullPageLayout)
app.component('DropDown', DropDown)
app.component('HeaderNavbar', HeaderNavbar)
app.component('FoodItem', FoodItem)
app.component('FavoriteRecipe', FavoriteRecipe)
app.component('Loader', Loader)
app.component('MultiselectDropdown', MultiselectDropdown)

app.directive('badge', BadgeDirective);
app.mount('#app')

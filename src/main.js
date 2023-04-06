import { createApp } from 'vue'
import { createPinia } from 'pinia'
import stores from './stores/index.js';
import App from './App.vue'
import router from './router'
import FullPageLayout from './components/FullPageLayout.vue'
import PrimeVue from 'primevue/config';
import './assets/main.css'
import '@flaticon/flaticon-uicons/css/all/all.css';
import 'primeicons/primeicons.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(stores)
app.use(PrimeVue)
app.component('FullPageLayout', FullPageLayout)
app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../pages/Dashboard/Dashboard.vue')
    },
    {
      path: '/by-country',
      name: 'by country',
      component: () => import('../pages/FoodByCountry/Index.vue')
    },
    {
      path: '/products',
      name: 'product',
      component: () => import('../pages/Product/Index.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../pages/Checkout/Index.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../pages/Favorite/Index.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/Errors/NotFound.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

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
      name: 'by_country',
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
      path: '/recipe',
      name: 'recipe',
      component: () => import('../pages/Recipe/Index.vue')
    },
    {
      path: '/recipe-details',
      name: 'recipe_details',
      component: () => import('../pages/RecipeDetails.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../pages/Errors/NotFound.vue')
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../pages/ProductPage.vue'
import ProductDetail from '../pages/ProductDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: ProductPage },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

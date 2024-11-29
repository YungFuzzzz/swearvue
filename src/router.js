import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Orders from './components/Orders.vue'
import OrderDetail from './components/OrderDetail.vue'
import PasswordChange from './components/PasswordChange.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/orders', component: Orders },
  { path: '/orders/:id', component: OrderDetail },
  { path: '/change-password', component: PasswordChange }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router';
import OrdersPage from './components/Orders.vue'; // Importeer de component voor orders
import LoginPage from './components/Login.vue';   // Importeer de component voor login

const routes = [
  {
    path: '/', // Basisroute
    name: 'home',
    component: OrdersPage, // De component die je wilt tonen op de homepagina
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage, // Orderspagina voor admins
  },
  {
    path: '/login', // Route voor de loginpagina
    name: 'login',
    component: LoginPage, // De logincomponent
  },
  // Voeg andere routes toe indien nodig
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import OrdersPage from './components/Orders.vue'; // Importeer de component die je wilt weergeven

const routes = [
  {
    path: '/', // Basisroute
    name: 'home',
    component: OrdersPage, // De component die je wilt tonen op de homepagina
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
  },
  // Voeg meer routes toe als nodig, bijvoorbeeld een route voor /orders/:id voor orderdetails
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
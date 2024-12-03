import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Beschermde route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Globale route guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check of de gebruiker is ingelogd
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect naar login als de gebruiker niet ingelogd is
  } else {
    next(); // Verder gaan naar de gewenste route
  }
});

export default router;
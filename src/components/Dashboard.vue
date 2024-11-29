<template>
  <div class="dashboard">
    <h2>Admin Dashboard</h2>
    <p>Total Orders: {{ totalOrders }}</p>
    <router-link to="/orders">View Orders</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Primus from 'primus';

export default {
  data() {
    return {
      totalOrders: 0,
      primus: null
    };
  },
  created() {
    this.fetchTotalOrders();
    this.setupWebSocket();
  },
  beforeDestroy() {
    if (this.primus) {
      this.primus.end(); // Zorg ervoor dat de WebSocket wordt afgesloten bij het vernietigen van de component
    }
  },
  methods: {
    async fetchTotalOrders() {
      const response = await fetch('/api/orders/count');
      const data = await response.json();
      this.totalOrders = data.count;
    },
    setupWebSocket() {
      this.primus = new Primus('http://localhost:3000'); // WebSocket server URL

      // Luister naar het 'new-order' event van de backend
      this.primus.on('new-order', (order) => {
        this.totalOrders++; // Verhoog de teller wanneer er een nieuwe bestelling binnenkomt
        console.log('New order received:', order);
      });
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}
</style>
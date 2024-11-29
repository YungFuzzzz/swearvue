<template>
  <div class="dashboard">
    <h2>Admin Dashboard</h2>
    <p>Total Orders: {{ totalOrders }}</p>
    <router-link to="/orders">View Orders</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useWebSocket } from '@/services/WebSocketService'; // Import de WebSocketService

export default {
  name: 'Dashboard',
  setup() {
    const totalOrders = ref(0); // Gebruik de reactive variabele voor totalOrders
    const { onNewOrder } = useWebSocket(); // Verkrijg de WebSocket-methoden

    // Functie om het aantal bestellingen op te halen
    const fetchTotalOrders = async () => {
      const response = await fetch('/api/orders/count');
      const data = await response.json();
      totalOrders.value = data.count;
    };

    // WebSocket instellen en luisteren naar nieuwe bestellingen
    onMounted(() => {
      fetchTotalOrders();

      // Luister naar de 'new-order' event van de WebSocket service
      onNewOrder((order) => {
        totalOrders.value++; // Verhoog de totaal aantal bestellingen
        console.log('New order received:', order);
      });
    });

    // Opschonen bij het vernietigen van de component
    onBeforeUnmount(() => {
      // Als nodig kan je hier andere schoonmaakacties uitvoeren voor WebSocket
    });

    const logout = () => {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    };

    return {
      totalOrders,
      logout,
    };
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}
</style>
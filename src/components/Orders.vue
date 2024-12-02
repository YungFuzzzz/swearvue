<template>
  <div>
    <h1>ORDERS</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">{{ order.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useWebSocket } from '@/services/WebSocketService'; // Import WebSocket service

export default {
  name: 'OrdersPage',
  setup() {
    const orders = ref([]);
    const { onNewOrder } = useWebSocket(); // Verkrijg de methoden uit de WebSocketService

    // Gebruik WebSocket om nieuwe orders te ontvangen
    onMounted(() => {
      onNewOrder((order) => {
        orders.value.push(order); // Voeg nieuwe order toe aan de lijst
      });
    });

    return {
      orders,
    };
  },
};
</script>

<style scoped>
/* Je stijlen voor de Orders pagina */
</style>
<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="order">
      <h2>Order ID: {{ order._id }}</h2>
      <p><strong>Kleur:</strong> {{ order.color }}</p>
      <p><strong>Materiaal:</strong> {{ order.material }}</p>
      <p><strong>Maat:</strong> {{ order.size }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
    </div>
    <div v-else>
      <p>Loading order...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: null, // Houd de ordergegevens bij
      error: null, // Foutmelding indien nodig
    };
  },
  created() {
    this.fetchOrderDetails(); // Haal de orderdetails op zodra het component wordt geladen
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.params.id; // Haal de order ID op uit de URL
      axios
        .get(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          this.order = response.data.data; // Zet de ontvangen order in de `order` array
        })
        .catch((error) => {
          console.error('Fout bij het ophalen van de bestelling:', error);
          this.error = 'Er is een probleem met het ophalen van de bestelling.'; // Toon een foutmelding
        });
    },
  },
};
</script>

<style scoped>
.order-details {
  padding: 20px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  font-weight: bold;
}

.order-details h2 {
  margin-bottom: 10px;
}

.order-details p {
  margin: 5px 0;
}
</style>
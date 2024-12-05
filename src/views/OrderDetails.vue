<template>
  <div class="order-details" v-if="order">
    <h1>Bestelling ID: {{ order.id }}</h1>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Details:</strong> {{ order.details }}</p>
    <button @click="updateOrderStatus('verzonden')">Markeer als Verzonden</button>
    <button @click="updateOrderStatus('geannuleerd')">Markeer als Geannuleerd</button>
  </div>
  <div v-else>
    <p>Bestelling niet gevonden.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      order: null, // De bestelling
    };
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.params.id; // Haal de ID op van de route
      axios
        .get(`https://swear-api-uhq5.onrender.com/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.order = response.data; // Bewaar de bestelling
        })
        .catch((error) => {
          console.error("Fout bij het ophalen van de bestelling:", error);
          // Voeg hier optioneel een foutmelding toe voor de gebruiker
        });
    },
    updateOrderStatus(status) {
      // Voeg hier de logica toe voor het bijwerken van de bestellingstatus
      axios
        .put(
          `https://swear-api-uhq5.onrender.com/api/v1/orders/${this.order.id}`,
          { status },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          this.order.status = status; // Update de status lokaal
        })
        .catch((error) => {
          console.error("Fout bij het updaten van de bestellingstatus:", error);
        });
    },
  },
  created() {
    this.fetchOrderDetails(); // Haal de bestellingdetails op bij het laden van de component
  },
};
</script>

<style scoped>
.order-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 15px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    
    <!-- Foutmelding weergeven als er een probleem is met het ophalen van bestellingen -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Totaal aantal bestellingen weergeven -->
    <p><strong>Aantal bestellingen:</strong> {{ orders.length }}</p>

    <!-- Bestellingen weergeven -->
    <div v-if="orders.length > 0" class="orders-list">
      <div v-for="order in orders" :key="order._id" class="order-card">
        <router-link :to="`/orders/${order._id}`" class="order-link">
          <h3>Order ID: {{ order._id }}</h3>
        </router-link>

        <div class="order-details">
          <p><strong>Kleur:</strong> {{ order.color }}</p>
          <p><strong>Maat:</strong> {{ order.size }}</p>
          <p><strong>Materiaal:</strong> {{ order.material }}</p>
          <p><strong>Status:</strong> <span :class="getStatusClass(order.status)">{{ order.status }}</span></p>
        </div>

        <div v-if="order.customization" class="customization">
          <p><strong>Aangepaste opties:</strong> {{ order.customization }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Geen bestellingen gevonden.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      error: null, // Foutmelding indien nodig
      ws: null, // WebSocket verbinding
    };
  },
  created() {
    this.openWebSocket();
    this.fetchOrders(); // Ophalen van bestellingen bij het laden van de pagina
  },
  methods: {
    openWebSocket() {
      // Maak een WebSocket verbinding met de server
      this.ws = new WebSocket('wss://je-websocket-server-url'); // Vergeet de juiste WebSocket URL in te stellen!

      this.ws.onopen = () => {
        console.log('WebSocket verbonden!');
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket bericht ontvangen:', data);

        // Werk de bestellingenlijst bij als er een wijziging is
        this.fetchOrders(); // Je kunt de data ook verwerken zonder de hele lijst opnieuw op te halen
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket fout:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket gesloten');
      };
    },
    fetchOrders() {
      // Ophalen van bestellingen van de server
      axios
        .get('https://swear-api-uhq5.onrender.com/api/v1/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          this.orders = response.data.data; // Zet de opgehaalde bestellingen in de orders array
        })
        .catch((error) => {
          console.error('Fout bij het ophalen van bestellingen:', error);
          this.error = 'Er is een probleem met het ophalen van de bestellingen.';
        });
    },
    getStatusClass(status) {
      return status === 'verzonden' ? 'status-sent' : 'status-canceled';
    },
  },
  beforeDestroy() {
    // Sluit de WebSocket verbinding wanneer het component wordt vernietigd
    if (this.ws) {
      this.ws.close();
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f9f9f9;
}

.error {
  color: red;
  font-weight: bold;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.order-card {
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.order-link {
  text-decoration: none;
  color: #333;
}

.order-link:hover {
  color: #007bff;
}

.order-details p {
  margin: 5px 0;
}

.status-sent {
  color: green;
  font-weight: bold;
}

.status-canceled {
  color: red;
  font-weight: bold;
}

.customization {
  margin-top: 15px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
}
</style>
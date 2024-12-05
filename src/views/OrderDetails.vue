<template>
    <div>
      <h1>Bestelling Details</h1>
      <p><strong>ID:</strong> {{ order.id }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Kleuren:</strong> {{ order.colors.join(', ') }}</p>
      <p><strong>Materiaal:</strong> {{ order.material }}</p>
      <p><strong>Schoenmaat:</strong> {{ order.size }}</p>
      <button @click="markAsShipped">Markeren als verzonden</button>
      <button @click="deleteOrder">Verwijderen</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        order: null,
      };
    },
    methods: {
      fetchOrder() {
        axios.get(`https://your-api-url.com/api/v1/orders/${this.$route.params.id}`)
          .then(response => {
            this.order = response.data;
          });
      },
      markAsShipped() {
        axios.put(`https://your-api-url.com/api/v1/orders/${this.order.id}`, {
          status: 'Shipped',
        }).then(() => {
          this.order.status = 'Shipped';
        });
      },
      deleteOrder() {
        axios.delete(`https://your-api-url.com/api/v1/orders/${this.order.id}`).then(() => {
          this.$router.push('/dashboard'); // Terug naar het dashboard
        });
      },
    },
    created() {
      this.fetchOrder();
    },
  };
  </script>  
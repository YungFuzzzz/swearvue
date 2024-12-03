<template>
  <div>
    <h2>Order List</h2>
    <ul>
      <li v-for="order in orders" :key="order.id">
        {{ order.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
/* Optioneel: globale CSS */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
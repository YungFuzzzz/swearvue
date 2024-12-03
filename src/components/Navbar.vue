<template>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
nav {
  background: #333;
  color: white;
  padding: 1rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
}

li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

li a:hover {
  text-decoration: underline;
}
</style>
<template>
    <nav>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
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
    background-color: #69ff47;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
  }
  
  nav ul li {
    margin: 0;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
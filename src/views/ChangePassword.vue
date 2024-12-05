<template>
    <div>
      <h1>Wachtwoord wijzigen</h1>
      <form @submit.prevent="changePassword">
        <input v-model="oldPassword" type="password" placeholder="Huidig wachtwoord" />
        <input v-model="newPassword" type="password" placeholder="Nieuw wachtwoord" />
        <button type="submit">Opslaan</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        errorMessage: '',
      };
    },
    methods: {
      changePassword() {
        axios.post('https://your-api-url.com/api/v1/users/change-password', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }).then(() => {
          alert('Wachtwoord succesvol gewijzigd!');
        }).catch(err => {
          this.errorMessage = err.response.data.message;
        });
      },
    },
  };
  </script>  
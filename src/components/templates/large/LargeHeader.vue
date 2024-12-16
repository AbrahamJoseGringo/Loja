<script setup>
import LogoTitle from '../LogoTitle.vue'
</script>

<template>
  <section class="logo-nav">
    <LogoTitle />
    <nav>
      <router-link>Home</router-link>
      <router-link>Mais informações</router-link>
      <router-link>Redes Sociais</router-link>
    </nav>
  </section>
  <section class="icons">
    <input type="text" placeholder="Pesquisa" />
    <span class="fi fi-br"></span>
    <router-link>Acessar</router-link>
    <router-link>Registrar</router-link>
    <button>
      <i class="mdi mdi-book" />
      Books
    </button>
  </section>
</template>

<style scoped>
.logo-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.logo-nav nav{
    margin-left: 5rem;
    display: flex;
    flex-direction: row;
    gap: 3rem;
}


a {
  text-decoration: none;
  color: #9b9b9b;
}

.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
  /* font-size: 1.7rem; */
}

.icons input[type='text'] {
  background-color: #292929;
  border: 0;
  padding: 0.5em;
  border-radius: 10px;
  color: rgb(0, 0, 0);
}

.icons button {
  background-color: #ff8a00;
  padding: 0.4rem;
  border: 0;
  border-radius: 10px;
}
</style>

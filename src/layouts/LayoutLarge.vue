<script setup>
import LargeHeader from '@/components/templates/large/LargeHeader.vue'
import LargeFooter from '@/components/templates/large/LargeFooter.vue'
</script>

<template>
  <div id="layout-large">
    <header>
      <large-header />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <large-footer />
    </footer>
  </div>
</template>

<style scoped>
#layout-large {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: #000000 2px solid;
  background-color: #030303;
  color: #9b9b9b;

  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 5%;
}

main {
  margin-top: 5%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  width: 100%;
  padding-bottom: 4rem;
  padding-top: 1.5rem;
  position: relative;
}

footer {
  border-top: #000000 1px solid;
  box-shadow: 0 0 10px 0 #000000;
  padding: 1.5rem;
  margin-top: auto;
  background-color: rgb(0, 0, 0);

  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: rgb(0, 0, 0);
  text-align: center;
  z-index: 10;
}
</style>

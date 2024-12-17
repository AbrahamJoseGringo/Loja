<script setup>
import { onMounted, watch } from 'vue';
import { useLivrosStore } from '@/stores/livros';

import { formatDescription, formatPrice, formatTitle } from '@/helpers/format';
import { RouterLink } from 'vue-router';

const props = defineProps(['category_id']);
const livrosStore = useLivrosStore();

async function getLivros() {
  if (props.category_id) {
    await livrosStore.getLivrosByCategory(props.category_id);
  } else {
    await livrosStore.getLivros();
  }
}

watch(
  () => props.category_id,
  async () => {
    await getLivros();
  },
);

onMounted(async () => {
  await livrosStore.getLivros();
  
});
</script>

<template>
  
  <div class="livros-list">

    <RouterLink :to="{ name: 'LivrosAdd' }">
      <button class="icon ">
        <i class="mdi mdi-plus" />
      </button>
    </RouterLink>
    <div v-if="livrosStore.livros.length === 0">
      <p>Produtos não encontrados!!!</p>
    </div>
    <div v-for="livros in livrosStore.livros" :key="livros.id" class="product-card">
      <div class="livros-img-wrapper">
        <img :src="livros.image?.url" alt="livros.name" />
        <i class="mdi mdi-heart-outline" />
      </div>
      <div class="product-title-price">
        <p>{{ formatTitle(livros.title) }}</p>
        <p>{{ formatPrice(livros.price * 1) }}</p>
      </div>
      <div class="product-description-stars">
        <p>{{ formatDescription(livros.description) }}</p>
        <div class="stars">
          <i class="mdi mdi-star" />
          <i class="mdi mdi-star" />
          <i class="mdi mdi-star" />
          <i class="mdi mdi-star" />
          <i class="mdi mdi-star" />
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.icon {
  background-color: #0a2668;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  position: fixed;
  bottom: 12rem;
  right: 20px;
}

.icon:hover {
  background-color: #bac9e8;
  color: #0a2668;
}

.icon i {
  font-size: 2rem;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
}

.product-card {
  width: 225px;
  font-family: 'Belleza', sans-serif;
}

.product-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: top;
  gap: 0.5rem;
  padding-top: 20px;
  margin-bottom: 1rem;
  background-color: #eeeeee;
  height: 201px;
}

.product-img-wrapper img {
  width: 153px;
  height: 170px;
  object-fit: cover;
}

.product-title-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.product-title-price p {
  font-weight: bold;
  font-size: 16px;
  color: #010101;
}

.product-description-stars {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.product-description-stars p {
  font-size: 12px;
  color: #535050;
}
</style>

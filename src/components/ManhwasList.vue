<script setup>
import { onMounted, watch } from 'vue';
import { useManhwasStore } from '@/stores/manhwas';

import { formatDescription, formatPrice, formatTitle } from '@/helpers/format';
import { RouterLink } from 'vue-router';

const props = defineProps(['category_id']);
const manhwasStore = useManhwasStore();

async function getManhwas() {
  if (props.category_id) {
    await manhwasStore.getManhwasByCategory(props.category_id);
  } else {
    await manhwasStore.getManhwas();
  }
}

watch(
  () => props.category_id,
  async () => {
    await getManhwas();
  },
);

onMounted(async () => {
  await manhwasStore.getManhwas();
  
});
</script>

<template>
  
  <div class="manhwas-list">

    <RouterLink :to="{ name: 'ManhwasAdd' }">
      <button class="icon ">
        <i class="mdi mdi-plus" />
      </button>
    </RouterLink>
    <div v-if="manhwassStore.manhwas.length === 0">
      <p>Produtos não encontrados!!!</p>
    </div>
    <div v-for="manhwas in manhwasStore.manhwas" :key="manhwas.id" class="manhwas-card">
      <div class="manhwas-img-wrapper">
        <img :src="manhwas.image?.url" alt="manhwas.name" />
        <i class="mdi mdi-heart-outline" />
      </div>
      <div class="manhwas-title-price">
        <p>{{ formatTitle(manhwas.title) }}</p>
        <p>{{ formatPrice(manhwas.price * 1) }}</p>
      </div>
      <div class="product-description-stars">
        <p>{{ formatDescription(manhwas.description) }}</p>
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

.manhwas-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
}

.manhwas-card {
  width: 225px;
  font-family: 'Belleza', sans-serif;
}

.manhwas-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: top;
  gap: 0.5rem;
  padding-top: 20px;
  margin-bottom: 1rem;
  background-color: #eeeeee;
  height: 201px;
}

.manhwas-img-wrapper img {
  width: 153px;
  height: 170px;
  object-fit: cover;
}

.manhwas-title-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.manhwas-title-price p {
  font-weight: bold;
  font-size: 16px;
  color: #010101;
}

.manhwas-description-stars {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.manhwas-description-stars p {
  font-size: 12px;
  color: #535050;
}
</style>

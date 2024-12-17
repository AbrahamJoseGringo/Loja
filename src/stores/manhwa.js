import { ref } from 'vue';
import { defineStore } from 'pinia';

import ManhwasService from '@/services/manhwa';
const manhwasService = new ManhwasService();

export const useManhwasStore = defineStore('manhwas', () => {
  const manhwas = ref([]);

  async function getManhwas() {
    manhwas.value = await manhwasService.getManhwas();
  }

  async function getManhwasByCategory(category_id) {
    manhwas.value = await manhwasService.getManhwasByCategory(category_id);
  }

  async function createManhwas(manhwas) {
    await manhwasService.createManhwas(manhwas);
    getManhwas();
  }

  return { manhwas, createManhwas, getManhwas, getManhwasByCategory };
});

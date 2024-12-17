import { ref } from 'vue';
import { defineStore } from 'pinia';

import { LivrosService } from '@/services/livros';
const livrosService = new LivrosService();

export const useLivrosStore = defineStore('livros', () => {
  const livros = ref([]);

  async function getLivros() {
    livros.value = await livrosService.getLivros();
  }

  async function getLivrosByCategory(category_id) {
    livros.value = await livrosService.getLivrosByCategory(category_id);
  }

  async function createLivro(livro) {
    await livrosService.createLivro(livro);
    getLivros();
  }

  return { livros, createLivro, getLivros, getLivrosByCategory };
});

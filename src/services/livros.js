import axios from 'axios';

export default class Livros {
  async getLivros() {
    const response = await axios.get('/livros/');
    return response.data.results;
  }

  async getLivrosByCategory(category_id) {
    const response = await axios.get(`/livros/?category__id=${category_id}`);
    return response.data.results;
  }

  async createLivro(livros) {
    const response = await axios.post('/livros/', livros);
    return response.data;
  }
}
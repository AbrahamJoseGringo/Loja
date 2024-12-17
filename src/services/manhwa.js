import axios from 'axios';

export default class Manhwas {
  async getManhwas() {
    const response = await axios.get('/manhwas/');
    return response.data.results;
  }

  async getManhwasByCategory(category_id) {
    const response = await axios.get(`/manhwas/${category_id}`);
    return response.data.results;
  }

  async createManhwa(manhwas) {
    const response = await axios.post('/manhwas/', manhwas);
    return response.data;
  }
}
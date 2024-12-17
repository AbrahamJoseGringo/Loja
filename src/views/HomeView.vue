<script setup>
import { ref, onMounted } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import { useLivrosStore } from '@/stores/livros'
import { useManhwasStore } from '@/stores/manhwa'


const authStore = useAuthStore()
const livrosStore = useLivrosStore()
const manhwasStore = useManhwasStore()

// Dados reativos
const livros = ref([])
const manhwas = ref([])
const populares = ref([])

// Verifica o usuário autenticado
const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token')
    const passageUser = new PassageUser(authToken)
    const user = await passageUser.userInfo(authToken)
    if (user) {
      await authStore.setToken(authToken)
    } else {
      authStore.unsetToken()
    }
  } catch (error) {
    authStore.unsetToken()
  }
}

// Função para filtrar livros populares com base na avaliação
const filterPopulares = () => {
  const livrosPopulares = livros.value.filter(livro => livro.calificacion_promedio && livro.calificacion_promedio >= 4)
  const manhwasPopulares = manhwas.value.filter(manhwa => manhwa.calificacion_prom && manhwa.calificacion_prom >= 8)
  populares.value = [...livrosPopulares, ...manhwasPopulares]
}

// Carrega os dados na montagem do componente
onMounted(async () => {
  await getUserInfo()
  await livrosStore.getLivros()
  await manhwasStore.getManhwas()
  livros.value = livrosStore.livros || []
  manhwas.value = manhwasStore.manhwas || []
  filterPopulares()  // Filtra os livros populares
})
</script>

<template>
  <div class="container">
    <!-- Título Principal -->
    <h1 class="title">Lista de Livros e Mangás</h1>
    <hr />

    <!-- Seção Populares Hoje -->
    <div>
      <h2>Populares Hoje</h2>
      <div v-if="populares.length > 0" class="grid">
        <div v-for="item in populares" :key="item.id" class="card">
          <img :src="item.capa_url || 'default-image.jpg'" alt="Capa" class="image" />
          <div class="info">
            <h3>{{ item.titulo || 'Título Desconhecido' }}</h3>
            <p>{{ item.autores || 'Autor Desconhecido' }}</p>
            <p class="status">
              {{ item.completo !== undefined ? (item.completo ? 'Completo' : 'Incompleto') : 'Status Desconhecido' }}
            </p>
            
            <!-- Exibindo a avaliação com estrelas -->
            <div class="rating">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star" 
                :class="{'filled': star <= Math.round(item.calificacion_promedio || item.calificacion_prom || 0)}">
                ★
              </span>
              <span class="rating-text">
                ({{ (item.calificacion_promedio || item.calificacion_prom || 0).toFixed(1) }})
              </span>
            </div>
          </div>
        </div>
      </div>
      <p v-else>Nenhum item popular encontrado.</p>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 2rem;
  color: white;
  background-color: #111;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 1.5rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.card {
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto; /* Ajusta o tamanho do card conforme a imagem */
}

.card:hover {
  transform: scale(1.05);
}

.image {
  width: 100%; /* A imagem ocupa 73% da largura do card */
  height: auto; /* Altura fixa de 250px */
  top: 0;
  transition: transform .2s;
}

.info {
  padding: 0.5rem;
}

.info h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.status {
  font-size: 0.8rem;
  color: #ff9800;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 1rem;
  width: 100%;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #ff9800;
}

.rating-text {
  font-size: 0.8rem;
  color: #ccc;
}

</style>
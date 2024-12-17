<script setup>
import { ref, onMounted } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import { useLivrosStore } from '@/stores/livros'

const authStore = useAuthStore()
const livrosStore = useLivrosStore()

// Dados reativos
const livros = ref([])
const livrosPopulares = ref([])

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
  livrosPopulares.value = livros.value.filter(livro => livro.calificacion_promedio >= 4)
}

// Carrega os dados na montagem do componente
onMounted(async () => {
  await getUserInfo()
  await livrosStore.getLivros()
  livros.value = livrosStore.livros
  filterPopulares()  // Filtra os livros populares
})
</script>

<template>
  <div class="container">
    <!-- Título Principal -->
    <h1 class="title">Lista de Livros e Mangás</h1>
    <hr />

    <div>
      <h2>Populares Hoje</h2>
      <div class="grid">
        <div v-for="livro in livrosPopulares" :key="livro.id" class="card">
          <!-- Verifique se a capa existe e exiba a imagem -->
          <img :src="livro.capa_url || 'default-image.jpg'" alt="Capa do Livro" class="image" />
          <div class="info">
            <h3>{{ livro.titulo }}</h3>
            <p>{{ livro.autor }}</p>
            <p class="status">{{ livro.completo ? 'Livro Completo' : 'Incompleto' }}</p>
            
            <!-- Exibindo a avaliação com estrelas -->
            <div class="rating">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star" 
                :class="{'filled': star <= Math.round(livro.calificacion_promedio)}">
                ★
              </span>
              <span class="rating-text">({{ livro.calificacion_promedio ? livro.calificacion_promedio.toFixed(1) : 'Sem avaliação' }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Mangás (não modificada aqui) -->
    <!-- ... -->
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
  width: 73%; /* A imagem ocupa 73% da largura do card */
  height: 250px; /* Altura fixa de 250px */
  object-fit: cover; /* Garante que a imagem preencha o espaço sem distorcer */
  margin: 0 auto; /* Centraliza a imagem horizontalmente */
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
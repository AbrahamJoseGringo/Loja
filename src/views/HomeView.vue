<script setup>
import { ref, onMounted } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'
import { useLivrosStore } from '@/stores/livros'
import axios from 'axios'

const authStore = useAuthStore()
const livrosStore = useLivrosStore()
const livros = ref([])
const mangas = ref([]) 


const fetchLivrosEMangas = async () => {
  try {
    const livrosResponse = await axios.get('https://epic-reads-pimm.onrender.com/api/livros/')
    livros.value = livrosResponse.data

    // Busca a lista de mangás (AAexemplo de endpoint, ajuste conforme necessário)
    const mangasResponse = await axios.get('https://epic-reads-pimm.onrender.com/api/mangas/')
    mangas.value = mangasResponse.data
  } catch (error) {
    console.error('Erro ao buscar livros ou mangás:', error)
  }
}

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

onMounted(async () => {
  await getUserInfo()
  await livrosStore.fetchLivros()
})
</script>

<template>
  <div class="container">
    <h1 class="title">Lista de Livros e Mangás</h1>
    <hr />

    <div>
      <h2>Livros</h2>
      <ul v-if="livroStore.livros.length > 0" class="list">
        <li v-for="livro in livroStore.livros" :key="livro.id" class="item">
          <strong>{{ livro.titulo }}</strong> - {{ livro.autor }}
        </li>
      </ul>
      <p v-else>Nenhum livro encontrado.</p>
    </div>

    <!-- Lista de Mangás -->
    <div>
      <h2>Mangás</h2>
      <ul v-if="mangas.length > 0" class="list">
        <li v-for="manga in mangas" :key="manga.id" class="item">
          <strong>{{ manga.titulo }}</strong> - {{ manga.autor }}
        </li>
      </ul>
      <p v-else>Nenhum mangá encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-left: 15vw;
  color: white;
}

.title {
  font-weight: bolder;
  font-size: 1.3rem;
}

h2 {
  font-size: 1.1rem;
  margin-top: 1rem;
}

.list {
  list-style: none;
  padding: 0;
}

.item {
  background: #333;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 1rem;
}
</style>

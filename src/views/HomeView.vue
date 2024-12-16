<script setup>
import { onMounted } from 'vue'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="container">
    <h1 class="title">Lista de livros e Mangás</h1>
    <hr />
    <product-list />
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
</style>

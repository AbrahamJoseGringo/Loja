<script setup>
import { onMounted, reactive, ref } from 'vue';

import ModalAddCategory from '@/components/ModalAddCategory.vue';
import { useCategoryStore } from '@/stores/category';
import { useLivrosStore } from '@/stores/livros';
import { useUploaderStore } from '@/stores/uploader';

const categoryStore = useCategoryStore();
const livrosStore = useLivrosStore();
const uploaderStore = useUploaderStore();

const showModal = ref(false);

const file = ref(null);
const previewImage = ref('');

const livro = reactive({
  title: '',
  description: '',
  category: '',
  image_attachment_key: '',
  price: '',
  stock: '',
});

const uploadImage = (e) => {
  file.value = e.target.files[0];
  previewImage.value = URL.createObjectURL(e.target.files[0]);
};

async function save() {
  livro.image_attachment_key = await uploaderStore.uploadImage(file.value);
  await livrosStore.createLivro(livro);
  Object.assign(livro, {
    title: '',
    description: '',
    category: '',
    image_attachment_key: '',
    price: '',
    stock: '',
  });
}

onMounted(async () => {
  await categoryStore.getCategories();
});
</script>
<template>
  
  <h1>Adicionar Produto</h1>
  <form class="form" @submit.prevent="save">
    <div class="row-form">
      <label for="title">Título</label>
      <input type="text" id="title" v-model="livro.title" />
    </div>
    <div class="row-form">
      <label for="description">Descrição</label>
      <textarea id="description" v-model="livro.description"></textarea>
    </div>
    <div class="row-form">
      <label for="category">Categoria</label>
      <div class="row ">
        <select id="category" v-model="product.category">
          <option value="" disabled>Selecione uma categoria</option>
          <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <button class="btn-icon" @click="showModal = !showModal">+</button>
      </div>
    </div>
    <div class="row-form">
      <label for="image">Imagem</label>
      <div class="row">
        <input type="file" id="image" @change="uploadImage" />
        <img
          v-if="previewImage"
          :src="previewImage"
          class="previewImage"
          alt="preview"
        />
      </div>
    </div>
    <div class="row-form">
      <label for="price">Preço</label>
      <input type="number" id="price" v-model="livro.price" />
    </div>
    <div class="row-form">
      <label for="stock">Estoque</label>
      <input type="number" id="stock" v-model="livro.stock" />
    </div>
    <button class="btn-send" type="submit">Adicionar</button>
  </form>
  

  <modal-add-category v-if="showModal" @close="showModal = !showModal" />
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  margin-left: 2rem;
}

.row-form {
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  max-width: 400px;
}

.form button.btn-send {
  background-color: #0a2668;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1.3rem;
  cursor: pointer;
  width: 200px;
}

.form button.btn-icon {
  background-color: #0a2668;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
}

.previewImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #0a2668;
  padding: 0.1rem;
}
</style>

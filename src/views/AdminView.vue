<template>
  <div class="container py-4">
    <h2 class="mb-4">⚙️ Manajemen Produk</h2>

    <!-- Form Tambah / Edit -->
    <form @submit.prevent="saveProduct" class="mb-4">
      <div class="row g-2 align-items-end">
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="form.name" placeholder="Nama Produk" required />
        </div>
        <div class="col-md-3">
          <input type="number" class="form-control" v-model="form.price" placeholder="Harga" required />
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100" type="submit">{{ form.id ? 'Update' : 'Tambah' }}</button>
        </div>
        <div class="col-md-2" v-if="form.id">
          <button class="btn btn-secondary w-100" @click="resetForm">Batal</button>
        </div>
      </div>
    </form>

    <!-- Tabel Produk -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Harga</th>
          <th class="text-end">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>Rp {{ product.price }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-warning me-2" @click="editProduct(product)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const form = ref({ id: null, name: '', price: '' })

const fetchProducts = async () => {
  const res = await fetch('http://localhost:8787/api/products')
  products.value = await res.json()
}

onMounted(fetchProducts)

const saveProduct = async () => {
  const method = form.value.id ? 'PUT' : 'POST'
  const url = form.value.id
    ? `http://localhost:8787/api/products/${form.value.id}`
    : `http://localhost:8787/api/products`

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })

  resetForm()
  fetchProducts()
}

const editProduct = (product) => {
  form.value = { ...product }
}

const deleteProduct = async (id) => {
  await fetch(`http://localhost:8787/api/products/${id}`, { method: 'DELETE' })
  fetchProducts()
}

const resetForm = () => {
  form.value = { id: null, name: '', price: '' }
}
</script>

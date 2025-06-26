<template>
  <div class="container">
    <h2>CRUD Produk</h2>
    <table class="table table-striped">
      <thead>
        <tr><th>Nama</th><th>Harga</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.price }}</td>
          <td>
            <button class="btn btn-sm btn-warning">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(p.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

async function loadProducts() {
  const res = await fetch('http://localhost:8787/api/products')
  products.value = await res.json()
}
async function deleteProduct(id) {
  await fetch(`http://localhost:8787/api/products/${id}`, { method: 'DELETE' })
  loadProducts()
}
onMounted(loadProducts)
</script>

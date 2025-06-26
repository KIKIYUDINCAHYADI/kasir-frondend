<template>
  <div>
    <h5>Daftar Produk</h5>
    <ul class="list-group">
      <li v-for="product in products" :key="product.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          {{ product.name }} <br />
          <small>Rp {{ product.price }}</small>
        </div>
        <button class="btn btn-sm btn-primary" @click="$emit('add-to-cart', product)">
          Tambah
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:8787/api/products')
  products.value = await res.json()
})
</script>

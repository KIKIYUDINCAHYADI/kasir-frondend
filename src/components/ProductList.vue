<template>
  <div>
    <h5>Daftar Produk</h5>
    <ul class="list-group">
      <li
        v-for="product in products"
        :key="product.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
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
// Membuat variabel reaktif 'products' untuk menyimpan daftar produk dari backend.
// `ref([])` artinya inisialisasi dengan array kosong dan data ini bisa berubah secara reaktif di tampilan.

const BASE_URL = 'https://backend-kasir.cahyadik773.workers.dev'
// Mendefinisikan URL dasar backend API. Nantinya akan digunakan untuk melakukan fetch data produk dari server.

onMounted(async () => {
  // Lifecycle hook dari Vue yang dipanggil secara otomatis saat komponen pertama kali dimuat.

  const res = await fetch(`${BASE_URL}/api/products`)
  // Mengirim permintaan GET ke endpoint `/api/products` untuk mengambil daftar produk dari backend.

  products.value = await res.json()
  // Mengubah hasil JSON yang didapat dari response menjadi array objek dan menyimpannya ke dalam `products`.
  // `.value` digunakan karena `products` adalah ref.
})
</script>

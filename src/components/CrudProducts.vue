<template>
  <div class="container py-4">
    <h2 class="mb-3">🛠️ CRUD Produk</h2>
    <table class="table table-bordered table-striped align-middle">
      <thead class="table-light">
        <tr>
          <th>Nama</th>
          <th>Harga</th>
          <th style="width: 150px;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td>Rp {{ p.price }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(p.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const BASE_URL = 'https://backend-kasir.cahyadik773.workers.dev'
// Menyimpan alamat dasar dari backend API. Ini digunakan untuk menyusun URL endpoint yang akan dipanggil.

const products = ref([])
// Membuat variabel reaktif `products` yang akan menyimpan data daftar produk. 
// `ref([])` artinya dimulai dari array kosong, dan akan diisi saat data berhasil di-fetch.

async function loadProducts() {
  // Fungsi asinkron untuk mengambil semua data produk dari backend.
  const res = await fetch(`${BASE_URL}/api/products`)
  // Mengirim permintaan GET ke endpoint '/api/products'.
  products.value = await res.json()
  // Hasil response diubah ke format JSON dan disimpan ke variabel `products` (menggunakan `.value` karena ini ref).
}

async function deleteProduct(id) {
  // Fungsi untuk menghapus produk berdasarkan ID yang diberikan.
  await fetch(`${BASE_URL}/api/products/${id}`, { method: 'DELETE' })
  // Mengirim permintaan DELETE ke endpoint spesifik berdasarkan ID produk.
  loadProducts()
  // Setelah penghapusan berhasil, memanggil ulang `loadProducts()` untuk menyegarkan daftar produk.
}

onMounted(loadProducts)
// Lifecycle hook Vue: menjalankan `loadProducts()` secara otomatis saat komponen pertama kali dimuat.

</script>

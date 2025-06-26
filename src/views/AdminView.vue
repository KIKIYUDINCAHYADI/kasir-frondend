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
// Mengimpor `ref` untuk membuat data reaktif dan `onMounted` untuk mengeksekusi fungsi saat komponen pertama kali dimuat

const BASE_URL = 'https://backend-kasir.cahyadik773.workers.dev'
// URL dasar untuk semua endpoint API yang terhubung ke backend Cloudflare Workers

const products = ref([]) 
// State reaktif untuk menyimpan daftar produk dari API

const form = ref({ id: null, name: '', price: '' }) 
// State reaktif untuk menyimpan data form (digunakan untuk tambah/edit produk)

const fetchProducts = async () => {
  // Fungsi async untuk mengambil semua data produk dari server
  const res = await fetch(`${BASE_URL}/api/products`) // Panggil API GET
  products.value = await res.json() // Simpan hasil ke state `products`
}

onMounted(fetchProducts) 
// Saat komponen dimuat, jalankan `fetchProducts()` agar data produk langsung muncul

const saveProduct = async () => {
  // Fungsi untuk menyimpan (tambah atau edit) produk
  const method = form.value.id ? 'PUT' : 'POST'
  // Jika form punya ID → update (PUT), jika tidak → tambah baru (POST)

  const url = form.value.id
    ? `${BASE_URL}/api/products/${form.value.id}`
    : `${BASE_URL}/api/products`
  // Tentukan URL: jika edit, tambahkan ID produk ke URL

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' }, // Format data JSON
    body: JSON.stringify(form.value) // Kirim data form sebagai JSON
  })

  resetForm() // Kosongkan form setelah simpan
  fetchProducts() // Ambil ulang data produk agar UI ter-update
}

const editProduct = (product) => {
  // Fungsi untuk mengisi form dengan data produk yang dipilih
  form.value = { ...product } 
  // Salin semua properti produk ke dalam form (edit mode)
}

const deleteProduct = async (id) => {
  // Fungsi untuk menghapus produk berdasarkan ID
  await fetch(`${BASE_URL}/api/products/${id}`, { method: 'DELETE' })
  // Panggil API DELETE untuk hapus produk
  fetchProducts() // Ambil ulang data agar UI ter-update
}

const resetForm = () => {
  // Fungsi untuk mereset form kembali ke keadaan kosong
  form.value = { id: null, name: '', price: '' }
}
</script>


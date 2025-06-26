<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold"><i class="bi bi-shop"></i> Kasir</h2>
      <span class="badge bg-primary fs-6">
        Total: Rp {{ total }}
      </span>
    </div>

    <div class="row">
      <!-- Produk -->
      <div class="col-md-8">
        <div class="row row-cols-1 row-cols-md-2 g-3">
          <div v-for="product in products" :key="product.id" class="col">
            <div class="card shadow-sm h-100">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text text-muted">Rp {{ product.price }}</p>
                </div>
                <button class="btn btn-outline-primary mt-2 w-100" @click="addToCart(product)">
                  <i class="bi bi-cart-plus"></i> Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Keranjang -->
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0"><i class="bi bi-basket"></i> Keranjang</h5>
          </div>
          <div class="card-body p-3">
            <ul class="list-group mb-3">
              <li v-if="cart.length === 0" class="list-group-item text-center text-muted">Belum ada item</li>
              <li
                v-for="(item, index) in cart"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ item.name }}
                <span class="text-end">Rp {{ item.price }}</span>
              </li>
            </ul>
            <div class="text-end mb-2">
              <strong>Total: Rp {{ total }}</strong>
            </div>
            <button class="btn btn-success w-100" :disabled="cart.length === 0" @click="checkout">
              <i class="bi bi-cash-coin"></i> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const BASE_URL = 'https://backend-kasir.cahyadik773.workers.dev'
// URL dasar untuk semua permintaan API ke backend (Cloudflare Workers)

const cart = ref([])      // Menyimpan daftar produk yang ditambahkan ke keranjang
const products = ref([])  // Menyimpan daftar semua produk yang diambil dari backend

// Lifecycle hook yang akan dipanggil ketika komponen pertama kali dirender
onMounted(async () => {
  const res = await fetch(`${BASE_URL}/api/products`)
  // Panggil API untuk mengambil semua produk
  products.value = await res.json()
  // Simpan hasil respon ke dalam variabel `products`
})

function addToCart(product) {
  // Fungsi untuk menambahkan produk ke keranjang
  cart.value.push(product)
}

async function checkout() {
  // Fungsi untuk melakukan proses checkout (transaksi)
  try {
    const totalValue = total.value
    // Hitung total harga semua produk di keranjang

    const res = await fetch(`${BASE_URL}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.value,   // Kirim seluruh isi keranjang
        total: totalValue    // Kirim nilai total harga
      })
    })

    if (res.ok) {
      // Jika respon berhasil (status 200-299)
      alert('Transaksi berhasil!')
      cart.value = [] // Kosongkan keranjang setelah checkout
    } else {
      alert('Gagal melakukan checkout.')
      // Jika respon error dari server (status di luar 2xx)
    }
  } catch (e) {
    // Menangani error jaringan atau kegagalan lainnya
    alert('Terjadi kesalahan saat checkout.')
    console.error(e)
  }
}

const total = computed(() =>
  // Nilai total harga semua item dalam keranjang
  cart.value.reduce((sum, item) => sum + item.price, 0)
)
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>

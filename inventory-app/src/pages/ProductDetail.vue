<template>
    <div class="max-w-xl mx-auto p-4">
        <router-link to="/" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Quay lại
        </router-link>
        <div v-if="product" class="mt-4 p-4 border rounded shadow bg-white">
            <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
            <p><strong>Giá:</strong> {{ product.price.toLocaleString() }}đ</p>
            <p><strong>Số lượng:</strong> {{ product.quantity }}</p>
            <p class="mt-4 text-gray-600 italic">ID: {{ product.id }}</p>
        </div>

        <div v-else class="text-red-500 mt-4">Không tìm thấy sản phẩm!</div>
    </div>
</template>

<script>
import { useInventoryStore } from '../stores/inventory'

export default {
    name: 'ProductDetail',
    data() {
        return {
            product: null
        }
    },

    created() {
        const store = useInventoryStore()
        const id = Number(this.$route.params.id)
        this.product = store.products.find(p => p.id === id)
    }
}
</script>

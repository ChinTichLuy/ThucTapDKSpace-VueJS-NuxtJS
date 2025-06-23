<template>
    <!-- test delay -->
    <div v-if="loading" class="flex justify-center items-center h-32">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
    </div>
    <div v-else class="max-w-3xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Quản lý kho hàng</h1>

        <ProductForm :initialData="selectedProduct" @submit="handleSubmit" />

        <div class="flex justify-between items-center bg-gray-100 p-4 rounded mb-4">
            <div>Tổng sản phẩm: <strong>{{ productCount }}</strong></div>
            <div>Tổng giá trị kho: <strong>{{ totalValue.toLocaleString() }}đ</strong></div>
        </div>

        <ProductList @edit="selectProduct" />
    </div>
</template>

<script>
import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'
import { useInventoryStore } from '../stores/inventory'

export default {
    name: 'ProductPage',
    components: {
        ProductForm,
        ProductList
    },

    data() {
        return {
            store: useInventoryStore(),
            selectedProduct: null
        }
    },

    created() {
        this.store.fetchProducts()
    },

    computed: {
        productCount() {
            return this.store.productCount
        },
        totalValue() {
            return this.store.totalValue
        },
        loading() {
            return this.store.loading
        }
    },

    methods: {
        selectProduct(product) {
            this.selectedProduct = { ...product }
        },

        handleSubmit(product) {
            if (product.id) {
                this.store.updateProduct(product.id, product)
            } else {
                this.store.addProduct(product)
            }
            this.selectedProduct = null
        }
    }
}
</script>

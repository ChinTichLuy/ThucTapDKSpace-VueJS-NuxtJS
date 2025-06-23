<template>
    <div class="mt-6">
        <h2 class="text-xl font-bold mb-4 text-gray-700">
            Danh sách sản phẩm ({{ productCount }})
        </h2>
        
        <div v-if="products.length === 0" class="text-gray-500 italic">
            Không có sản phẩm nào trong kho.
        </div>

        <div v-else class="space-y-3">
            <ProductItem v-for="product in products" :key="product.id" :product="product" @edit="handleEdit"
                @delete="deleteProduct" />
        </div>
    </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import { useInventoryStore } from '../stores/inventory'

export default {
    name: 'ProductList',
    components: {
        ProductItem
    },
    emits: ['edit'],

    data() {
        return {
            store: useInventoryStore()
        }
    },
    computed: {
        products() {
            return this.store.products
        },
        productCount() {
            return this.store.productCount
        }
    },
    methods: {
        handleEdit(product) {
            this.$emit('edit', product)
        },
        deleteProduct(id) {
            this.store.deleteProduct(id)
        }
    }
}
</script>

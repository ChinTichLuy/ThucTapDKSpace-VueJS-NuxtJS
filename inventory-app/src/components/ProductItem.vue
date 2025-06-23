<template>
    <div class="flex justify-between items-center py-2 border-b">
        <div>
            <router-link :to="`/product/${product.id}`" class="text-sm text-blue-500 hover:underline">
                <h2 class="font-semibold text-lg text-gray-800">{{ product.name }}</h2>
            </router-link>
            <p class="text-sm text-gray-500">
                Giá: {{ product.price.toLocaleString() }}đ • Số lượng: {{ product.quantity }}
            </p>
        </div>

        <div class="flex gap-2">

            <button @click="$emit('edit', product)"
                class="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded">
                Sửa
            </button>
            <button @click="$emit('delete', product.id)"
                class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
                Xoá
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    emits: ['edit', 'delete']
}
</script>

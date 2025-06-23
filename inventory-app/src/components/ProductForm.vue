<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 mb-6">
        <input v-model="form.name" type="text" placeholder="Tên sản phẩm" class="border px-3 py-2 rounded" required />

        <input v-model.number="form.price" type="number" placeholder="Giá (VND)" min="1000" class="border px-3 py-2 rounded"
            required />

        <input v-model.number="form.quantity" type="number" placeholder="Số lượng" min="1" class="border px-3 py-2 rounded"
            required />

        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            {{ form.id ? 'Cập nhật' : 'Thêm mới' }}
        </button>
    </form>
</template>

<script>
export default {
    name: 'ProductForm',

    props: {
        initialData: {
            type: Object,
            default: () => ({ name: '', price: 0, quantity: 0 })
        }
    },

    emits: ['submit'],

    data() {
        return {
            form: { ...this.initialData }
        }
    },

    watch: {
        initialData: {
            handler(newData) {
                this.form = { ...newData }
            },
            deep: true
        }
    },

    methods: {
        handleSubmit() {
            if (!this.form.name.trim()) return
            this.$emit('submit', { ...this.form })
            this.form = { name: '', price: 0, quantity: 0 }
        }
    }
}
</script>

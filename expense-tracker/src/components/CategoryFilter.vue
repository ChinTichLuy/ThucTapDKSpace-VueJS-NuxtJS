<template>
    <div class="mb-6">
        <select v-model="localCategory" @change="emitCategory"
            class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Tất cả</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'CategoryFilter',
    props: {
        categories: Array,
        selectedCategory: String
    },
    data() {
        return {
            localCategory: this.selectedCategory
        }
    },
    methods: {
        emitCategory() {
            this.$emit('update:category', this.localCategory);
        }
    },
    watch: {
        selectedCategory(newVal) {
            this.localCategory = newVal;
        }
    }
}
</script>

<style scoped>
.category-filter {
    margin-bottom: 16px;
}
</style>

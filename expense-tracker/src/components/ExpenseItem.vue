<template>
    <div
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm mb-2 bg-white hover:shadow-md transition duration-200">
        <div>
            <p class="text-lg font-semibold text-gray-800">{{ expense.name }}</p>
            <p class="text-sm text-gray-600">
                {{ expense.category }} | {{ expense.date }}
            </p>
            <p class="text-base text-green-600 font-bold mt-1">
                {{ expense.amount.toLocaleString() }}₫
            </p>
        </div>
        <!-- .stop: ngăn không cho sự kiện "click" lan lên các thành phần cha -->
        <button @click.stop="emitDelete"
            class="text-red-600 border border-red-300 hover:bg-red-100 px-3 py-1 rounded transition duration-150">
            Xoá
        </button>
    </div>
</template>

<script>
export default {
    name: 'ExpenseItem',
    props: {
        expense: Object
    },
    methods: {
        emitDelete() {
            this.$emit('delete', this.expense.id);
        }
    }
}
</script>

<style scoped>
.expense-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}
</style>

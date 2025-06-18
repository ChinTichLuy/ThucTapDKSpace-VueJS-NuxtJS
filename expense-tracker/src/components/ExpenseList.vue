<template>
    <div class="space-y-4">
        <ExpenseItem v-for="expense in sortedExpenses" :key="expense.id" :expense="expense"
            @delete="$emit('delete', expense.id)" />
    </div>
</template>


<script>
import ExpenseItem from './ExpenseItem.vue';

export default {
    name: 'ExpenseList',
    props: {
        expenses: Array
    },
    components: {
        ExpenseItem
    },
    //computed sortedExpenses: sắp xếp các khoản chi theo ngày giảm dần
    computed: {
        sortedExpenses() {
            return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }
}
</script>

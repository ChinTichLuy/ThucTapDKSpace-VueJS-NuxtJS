<template>
  <div id="app" class="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
    <h1 class="text-2xl font-bold mb-4 text-center text-blue-600">Quản lý Chi tiêu Cá nhân</h1>

    <CategoryFilter :categories="categories" :selectedCategory="selectedCategory"
      @update:category="selectedCategory = $event" />

    <ExpenseForm :categories="categories" @submit="addExpense" />

    <h3 class="text-lg font-semibold mt-6 mb-2 text-gray-700">
      Tổng chi tiêu:
      <span class="text-red-600">{{ totalAmount.toLocaleString() }} VND</span>
    </h3>

    <ExpenseList :expenses="filteredExpenses" @delete="deleteExpense" />
  </div>
</template>


<script>
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import CategoryFilter from './components/CategoryFilter.vue';

export default {
  name: 'App',
  components: {
    ExpenseForm,
    ExpenseList,
    CategoryFilter
  },
  data() {
    return {
      expenses: [],
      categories: ['Food', 'Transport', 'Entertainment', 'Health', 'Other'],
      selectedCategory: ''
    };
  },
  computed: {
    filteredExpenses() {
      if (!this.selectedCategory) return this.expenses;
      return this.expenses.filter(exp => exp.category === this.selectedCategory);
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    }
  },
  methods: {
    addExpense(expense) {
      // Kiểm tra dữ liệu expense trước khi thêm
      if (
        expense &&
        expense.name &&
        expense.amount >= 1000 &&
        expense.category &&
        expense.date
      ) {
        this.expenses.push(expense);
      }
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter(exp => exp.id !== id);
    },
    loadFromStorage() {
      const data = localStorage.getItem('expenses');
      if (data) {
        this.expenses = JSON.parse(data);
      }
    }
  },
  watch: {
    expenses: {
      deep: true,
      handler(newVal) {
        localStorage.setItem('expenses', JSON.stringify(newVal));
      }
    }
  },
  created() {
    this.loadFromStorage();
  }
}
</script>

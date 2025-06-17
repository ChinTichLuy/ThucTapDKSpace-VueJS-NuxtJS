<template>
  <div class="max-w-2xl mx-auto p-4 bg-white shadow rounded mt-6">
    <MainNavbar />
    <FilterTabs :activeFilter="filter" @change-filter="filter = $event" />
    <button
      @click="addNewItem"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Thêm mới
    </button>

    <keep-alive>
      <component
        :is="showForm ? 'ItemForm' : 'ItemList'"
        v-bind="showForm ? { initialData: editingItem } : { items: filteredItems }"
        @toggle="toggleItem"
        @edit="editItem"
        @delete="deleteItem"
        @submit="handleSubmit"
        @cancel="cancelForm"
      >
        <template v-slot:default>
          <h2>Danh Sách item</h2>
        </template>
        <template v-slot:empty>
          <p>Trống!</p>
        </template>
      </component>
    </keep-alive>
  </div>
</template>


<script>
import ItemForm from './components/ItemForm.vue'
import ItemList from './components/ItemList.vue'
import FilterTabs from './components/FilterTabs.vue'

export default {
  name: 'App',
  components: {
    ItemForm,
    ItemList,
    FilterTabs
  },
  data() {
    return {
      items: [],
      filter: 'all',
      editingItem: null,
      showForm: false
    }
  },
  computed: {
    filteredItems() {
      if (this.filter === 'purchased') return this.items.filter(i => i.purchased)
      if (this.filter === 'not-purchased') return this.items.filter(i => !i.purchased)
      return this.items
    }
  },
 methods: {
  addNewItem() {
    this.editingItem = { name: '', quantity: 1, purchased: false }
    this.showForm = true
  },
  toggleItem(id) {
    const item = this.items.find(i => i.id === id)
    if (item) item.purchased = !item.purchased
  },
  deleteItem(id) {
    this.items = this.items.filter(i => i.id !== id)
  },
  editItem(item) {
    this.editingItem = { ...item }
    this.showForm = true
  },
  handleSubmit(item) {
    if (item.id) {
      const index = this.items.findIndex(i => i.id === item.id)
      if (index !== -1) this.items[index] = item
    } else {
      this.items.push({ ...item, id: Date.now(), purchased: false })
    }
    this.showForm = false
    this.editingItem = null
  },
  cancelForm() {
    this.showForm = false
    this.editingItem = null
  }
},

  watch: {
    items: {
      handler(val) {
        localStorage.setItem('shopping-items', JSON.stringify(val))
      },
      deep: true
    }
  },
  mounted() {
    const data = localStorage.getItem('shopping-items')
    if (data) this.items = JSON.parse(data)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>

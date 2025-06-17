<template>
  <div class="flex gap-4 mb-4 border-b pb-2">
  <button
    v-for="tab in filters"
    :key="tab.value"
    @click="$emit('change-filter', tab.value)"
    :class="[
      'px-3 py-1 rounded',
      activeFilter === tab.value ? 'font-bold border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
    ]"
  >
    {{ tab.label }}
  </button>
</div>

</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    activeFilter: String
  },
  data() {
    return {
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Đã mua', value: 'purchased' },
        { label: 'Chưa mua', value: 'not-purchased' }
      ]
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
}
.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
</style>

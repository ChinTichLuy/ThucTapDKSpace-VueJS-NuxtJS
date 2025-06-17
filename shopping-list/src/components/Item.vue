<template>
 <div class="flex justify-between items-center py-2 border-b" :class="{ 'line-through text-gray-500': item.purchased }">
  <div>
    <input
    type="checkbox"
    :checked="item.purchased"
    @change="$emit('toggle', item.id)"
    class="mr-2"
    />
    {{ item.name }} (x{{ item.quantity }})
  </div>
  <div class="flex gap-2">
    <button @click="$emit('edit', item)" class="text-blue-600 hover:underline">Sửa</button>
    <button @click="$emit('delete', item.id)" class="text-red-600 hover:underline">Xoá</button>
  </div>
</div>

</template>

<script>
export default {
  name: 'MainItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator(value) {
        return value.id && value.name && typeof value.purchased === 'boolean'
      }
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.purchased {
  text-decoration: line-through;
  color: #888;
}
</style>

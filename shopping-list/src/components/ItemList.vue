<template>
  <div>
    <slot></slot>
    <div v-if="items.length === 0">
      <slot name="empty"></slot>
    </div>
    <Item
      v-for="item in items"
      :key="item.id"
      :item="item"
      @toggle="$emit('toggle', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)" />
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'ItemList',
  components: { Item },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

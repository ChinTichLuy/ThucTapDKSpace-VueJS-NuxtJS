<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row gap-4 mb-6">
  <input v-model="formData.name" placeholder="Tên mặt hàng" required
    class="border px-4 py-2 rounded w-full md:w-auto" />
  <input v-model.number="formData.quantity" type="number" min="1" placeholder="Số lượng" required
    class="border px-4 py-2 rounded w-full md:w-32" />
  <div class="flex gap-2">
    <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
      {{ isEditing ? 'Lưu' : 'Thêm' }}
    </button>
    <button type="button" @click="$emit('cancel')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
      Quay lại
    </button>
  </div>
</form>

</template>

<script>
export default {
  name: 'ItemForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({ name: '', quantity: 1, purchased: false })
    }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      formData: { name: '', quantity: 1, purchased: false }
    }
  },
  computed: {
    isEditing() {
      return !!this.initialData.id
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newVal) {
        this.formData = { ...newVal }
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.formData.name) return
      this.$emit('submit', { ...this.formData })
      this.formData = { name: '', quantity: 1, purchased: false } // reset sau khi submit
    }
  }
}
</script>

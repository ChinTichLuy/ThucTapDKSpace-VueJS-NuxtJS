<template>
  <li class="flex items-center justify-between p-2 border-b">
    <div class="flex items-center gap-2">
      <!-- :checked="task.completed" Gán trạng thái checkbox dựa trên thuộc tính completed của task -->
      <!-- @change="$emit('toggle', task)"	Khi người dùng tick checkbox
    -> gửi sự kiện toggle và task về App.vue để xử lý (hoàn thành/ chưa hoàn thành) -->
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task)"
      />
      <!-- Nếu task hoàn thành thì hiển thị gạch ngang và xám chữ qua css class -->
      <span :class="{ 'line-through text-gray-400': task.completed }">
        {{ task.title }}
      </span>
    </div>
    <!-- Khi bấm nút Xóa, gọi hàm del() phía dưới để xoá công việc -->
    <button @click="del" class="text-red-500 hover:underline">Xóa</button>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  // props: Nhận một task từ component cha (App.vue)
  props: {
    task: Object,
  },
  methods: {
    // Gửi sự kiện delete kèm theo task để cha biết cần xoá task nào
    del() {
      this.$emit("delete", this.task);
    },
  },
};
</script>

<template>
  <!-- Bắt sự kiện submit của form để gọi method submitTask
   Dùng .prevent để không reload trang -->
  <form @submit.prevent="submitTask" class="mb-4 flex">
    <!-- v-model : liên kết 2 chiều với biến title trong data
      Khi người dùng nhập, giá trị sẽ tự cập nhật -->
    <input
      v-model="title"
      type="text"
      placeholder="Nhập công việc..."
      class="flex-1 p-2 border rounded-l"
      required
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
    >
      Thêm
    </button>
  </form>
</template>

<script>
export default {
  name: "TaskForm", //Tên của component
  // Khởi tạo biến title, chứa nội dung người dùng nhập
  data() {
    return {
      title: "",
    };
  },
  methods: {
    submitTask() {
      // Kiểm tra không được để trống
      if (this.title.trim() !== "") {
        // Gửi nội dung lên component cha bằng sự kiện this.$emit("add", this.title)
        this.$emit("add", this.title.trim());
        // Sau đó reset lại input về rỗng
        this.title = "";
      }
    },
  },
};
</script>

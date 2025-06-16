<template>
  <div class="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Danh sách công việc</h1>
    <TaskForm @add="addTask" />
    <ul class="list-none p-0">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </ul>

    <p class="mt-4 text-gray-600">{{ remaining }} công việc chưa hoàn thành</p>
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskItem from "./components/TaskItem.vue";

export default {
  name: "App", // Đặt tên cho component
  components: {
    //Khai báo các component con mà App.vue sẽ sử dụng trong phần <template>
    TaskForm,
    TaskItem,
  },
  data() {
    return {
      //Khởi tạo một mảng rỗng tasks, để chứa danh sách công việc
      tasks: [],
      /**
       * Mỗi phần tử trong tasks sẽ có cấu trúc kiểu:
       * {
       *  id: 1718537223,
       *  title: "Học VueJS",
       *  completed: false
       * }
       */
    };
  },
  // computed: tự động cập nhật nếu tasks thay đổi
  computed: {
    remaining() {
      //Tính toán số lượng công việc chưa hoàn thành (completed = false)
      //duyệt qua từng task, chỉ giữ lại những task mà completed: false
      return this.tasks.filter((task) => !task.completed).length;
      //.length: Lấy độ dài của mảng đã lọc, tức là số lượng task chưa hoàn thành
    },
  },
  methods: {
    addTask(title) {
      //Nhận tiêu đề title từ TaskForm, tạo một object task mới và (push)thêm vào mảng tasks
      this.tasks.push({
        id: Date.now(), //tạo ID duy nhất theo timestamp
        title,
        completed: false, //mặc định là chưa hoàn thành
      });
    },
    //Khi click checkbox sẽ đổi trạng thái completed (true ⇄ false)
    toggleTask(task) {
      task.completed = !task.completed;
    },
    //Xóa task có id tương ứng ra khỏi mảng tasks
    deleteTask(task) {
      //lọc (lấy) ra toàn bộ các task KHÔNG trùng id với task cần xóa
      //còn task mà trùng với id task truyền vào thì sẽ ko lấy -> bỏ -> xóa
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },
  },
  //Khi App.vue được mount (hiển thị lần đầu), nó đọc dữ liệu từ localStorage, nếu có thì gán lại vào tasks
  mounted() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  },
  //Lưu danh sách tasks xuống localStorage mỗi khi có thay đổi, để giữ dữ liệu khi reload trang
  //watch: Là một tính năng của Vue để theo dõi dữ liệu
  watch: {
    // tasks: là tên biến trong data() đang muốn theo dõi
    tasks: {
      // handler(): Hàm sẽ được gọi mỗi khi tasks thay đổi
      //newVal là giá trị mới của tasks sau khi thay đổi
      handler(newVal) {
        //Lưu tasks vào localStorage dưới dạng chuỗi JSON
        localStorage.setItem("tasks", JSON.stringify(newVal));
        //Vì localStorage chỉ lưu dữ liệu dạng chuỗi nên cần dùng JSON.stringify
      },
      deep: true,
      //deep: true theo dõi cả phần tử bên trong mảng (ví dụ: thay đổi trạng thái completed)
      //Nếu không có deep: true, thì việc cập nhật task.completed = true sẽ không kích hoạt watch
    },
  },
};
</script>

<style>
body {
  font-family: "Segoe UI", sans-serif;
  background: #f9f9f9;
}
</style>

<template>
  <div class="max-w-md mx-auto p-4">
    <TaskForm @submit="addTask" />
    <TaskList :tasks="tasks" @toggle="toggleTask" @delete="deleteTask" />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: { TaskForm, TaskList },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    addTask(title) {
      if (!title.trim()) return;
      this.tasks.push({ id: Date.now(), title, completed: false });
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      deep: true,
    },
  },
  mounted() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved);
  }
}
</script>

<style></style>
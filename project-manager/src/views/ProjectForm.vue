<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mb-4">
        <input v-model="title" placeholder="Title" class="border p-2" required />
        <textarea v-model="description" placeholder="Description" class="border p-2" required></textarea>

        <!-- Nhập task -->
        <div class="flex gap-2">
            <input v-model="newTask" placeholder="New task" class="border p-2 flex-1" />
            <button type="button" @click="addTask" class="bg-green-600 text-white px-4 py-2">
                Add Task
            </button>
        </div>

        <!-- Danh sách task -->
        <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
        </ul>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2">Lưu</button>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = ref('')
const description = ref('')
const tasks = ref([])
const newTask = ref('')

const id = route.params.id

onMounted(() => {
    if (id) {
        const list = JSON.parse(localStorage.getItem('projects') || '[]')
        const project = list.find(p => String(p.id) === String(id))
        if (project) {
            title.value = project.title
            description.value = project.description
            tasks.value = Array.isArray(project.tasks) ? project.tasks : []
        }
    }
})

function addTask() {
    const task = newTask.value.trim()
    if (task) {
        tasks.value.push(task)
        newTask.value = ''
    }
}

function onSubmit() {
    let list = JSON.parse(localStorage.getItem('projects') || '[]')

    if (id) {
        // Cập nhật project
        list = list.map(p =>
            p.id === id
                ? { ...p, title: title.value, description: description.value, tasks: tasks.value }
                : p
        )
    } else {
        // Thêm mới project
        list.push({
            id: Date.now().toString(),
            title: title.value,
            description: description.value,
            tasks: tasks.value
        })
    }

    localStorage.setItem('projects', JSON.stringify(list))
    router.push('/projects')
}
</script>

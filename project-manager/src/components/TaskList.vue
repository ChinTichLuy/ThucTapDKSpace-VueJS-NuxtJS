<template>
    <div class="p-4">
        <h3 class="font-semibold mb-2">Tasks</h3>
        <ul>
            <li v-for="task in project?.tasks" :key="task">{{ task }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const project = ref(null)
const route = useRoute()

onMounted(() => {
    const list = JSON.parse(localStorage.getItem('projects') || '[]')
    const found = list.find(p => String(p.id) === String(route.params.id))
    if (found) {
        if (!Array.isArray(found.tasks)) {
            found.tasks = [] // đảm bảo có tasks
        }
        project.value = found
    } else {
        console.warn('Không tìm thấy project với ID:', route.params.id)
    }
})
</script>

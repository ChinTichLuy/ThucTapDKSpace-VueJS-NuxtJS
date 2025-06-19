<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Projects</h2>
        <ProjectItem v-for="project in projects" :key="project.id" :project="project" @delete="deleteProject" />
    </div>
</template>

<script setup>
import ProjectItem from '../components/ProjectItem.vue'
import { ref, onMounted } from 'vue'

const projects = ref([])
onMounted(() => {
    projects.value = JSON.parse(localStorage.getItem('projects') || '[]')
})

function deleteProject(id) {
    projects.value = projects.value.filter(p => p.id !== id)
    localStorage.setItem('projects', JSON.stringify(projects.value))
}
</script>
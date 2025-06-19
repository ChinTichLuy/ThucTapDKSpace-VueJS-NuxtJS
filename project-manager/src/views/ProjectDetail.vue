<template>
    <div>
        <h2 class="text-xl font-bold mb-2">{{ project?.title }}</h2>
        <p class="mb-4">{{ project?.description }}</p>
        <router-link :to="`/projects/${$route.params.id}/tasks`" class="text-blue-500">Xem Tasks</router-link>
        <router-view />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const project = ref(null)

onMounted(() => {
    const list = JSON.parse(localStorage.getItem('projects') || '[]')
    project.value = list.find(p => p.id == route.params.id)
})
</script>
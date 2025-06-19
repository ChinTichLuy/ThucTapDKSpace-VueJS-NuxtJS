<template>
    <div class="p-4 border-b flex justify-between items-center">
        <div>
            <h3 class="text-lg font-bold">{{ props.project.title }}</h3>
            <p class="text-gray-500">{{ props.project.description }}</p>
        </div>
        <div class="space-x-2">
            <button @click="$router.push({ name: 'project-detail', params: { id: props.project.id } })"
                class="text-blue-500">
                Xem
            </button>
            <button @click="goToEdit" class="text-yellow-500">Sửa</button>
            <button @click="emit('delete', props.project.id)" class="text-red-500">Xóa</button>
        </div>
    </div>
</template>
<script setup>
// eslint-disable-next-line no-undef
const props = defineProps(['project'])
// eslint-disable-next-line no-undef
const emit = defineEmits(['delete'])

function goToEdit() {
    window.location.href = `/projects/${props.project.id}/edit`
}
</script>

<template>
    <transition>
        <li class="flex justify-between items-center p-2 border-b hover:bg-gray-100 animate__animated animate__fadeIn"
            :class="{ 'line-through text-gray-500': task.completed }"
            :style="{ backgroundColor: task.completed ? '#f0f0f0' : 'white' }">
            <div class="flex items-center">
                <input type="checkbox" class="mr-2" :checked="task.completed" @change="$emit('toggle', task.id)" />
                <span>{{ task.title }}</span>
            </div>
            <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">Xóa</button>
        </li>
    </transition>
</template>

<script>
export default {
    props: ['task'],
    emits: ['toggle', 'delete']
}
</script>

<style scoped>
.v-enter-active {
    transition: all 0.3s;
}

.v-enter-from {
    transform: scale(0.8);
    opacity: 0;
}
</style>

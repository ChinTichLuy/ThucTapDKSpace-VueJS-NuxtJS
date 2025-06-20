<template>
    <div class="p-4 space-y-4">
        <button @click="isVisible = !isVisible" class="bg-blue-500 text-white px-4 py-2 rounded">
            {{ isVisible ? 'ẩn form' : 'thêm mới' }}
        </button>

        <transition>
            <form v-if="isVisible" @submit.prevent="handleSubmit" class="flex gap-2 mb-4 p-4 animate__bounceIn">
                <input v-model="title" type="text" placeholder="Nhập công việc..." class="w-full p-2 border rounded" />
                <button :class="['p-2 rounded text-white', isValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300']"
                    :disabled="!isValid">
                    Thêm
                </button>
            </form>
        </transition>
    </div>
</template>

<script>
export default {
    emits: ['submit'],
    data() {
        return {
            title: '',
            isVisible: false,
        };
    },
    computed: {
        isValid() {
            return this.title.trim().length > 1;
        },
    },
    methods: {
        handleSubmit() {
            if (!this.isValid) return;
            this.$emit('submit', this.title.trim());
            this.title = '';
        },
    },
};
</script>

<style scoped>
/* Transition in/out */
.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

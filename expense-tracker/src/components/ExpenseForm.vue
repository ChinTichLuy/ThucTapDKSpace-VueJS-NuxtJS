<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md mb-6">
        <!-- Tên khoản chi -->
        <div>
            <input type="text" v-model="form.name" placeholder="Tên khoản chi" @keyup.enter="handleSubmit"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Số tiền -->
        <div>
            <input type="number" v-model.number="form.amount" placeholder="Số tiền" min="1000"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <p v-if="errors.amount" class="text-red-500 text-sm mt-1">{{ errors.amount }}</p>
        </div>

        <!-- Danh mục -->
        <div>
            <select v-model="form.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">-- Chọn danh mục --</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
        </div>

        <!-- Ngày -->
        <div>
            <input type="date" v-model="form.date"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <p v-if="errors.date" class="text-red-500 text-sm mt-1">{{ errors.date }}</p>
        </div>

        <!-- Nút Submit -->
        <button type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200">
            Lưu
        </button>
    </form>
</template>


<script>
export default {
    name: 'ExpenseForm',
    props: {
        categories: Array
    },
    data() {
        return {
            form: {
                name: '',
                amount: 1000,
                category: '',
                date: ''
            },
            errors: {}
        }
    },
    watch: {
        'form.amount'(val) {
            if (val > 1000000) {
                alert('Cảnh báo: Số tiền quá lớn!');
            }
        }
    },
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.form.name || this.form.name.trim().length < 3) {
                this.errors.name = 'Tên phải có ít nhất 3 ký tự!';
            }

            if (!this.form.amount || this.form.amount < 1000) {
                this.errors.amount = 'Số tiền phải lớn hơn 1000 VNĐ!';
            }

            if (!this.form.category) {
                this.errors.category = 'Hãy chọn danh mục!';
            }

            const today = new Date().toISOString().split('T')[0];
            //new Date()	    Tạo đối tượng ngày giờ hiện tại
            //.toISOString()	Chuyển thành chuỗi ISO.     vd: 2025-06-18T03:45:12.000Z
            // .split('T')	    Cắt chuỗi thành mảng.       vd: ['2025-06-18', '03:45:12.000Z']
            // [0]	            Lấy phần đầu tiên là ngày.  vd "2025-06-18"
            if (!this.form.date) {
                this.errors.date = 'Vui lòng chọn ngày!';
            } else if (this.form.date > today) {
                this.errors.date = 'Không được chọn ngày trong tương lai!';
            }

            return Object.keys(this.errors).length === 0;
            /**   Object.keys(this.errors) sẽ trả về mảng các tên thuộc tính bị lỗi
             *    ví dụ: ['name', 'amount']
             *    .length === 0 nghĩa là không có lỗi nào, tất cả hợp lệ
             */
        },
        handleSubmit() {
            if (!this.validateForm()) {
                // Nếu có lỗi thì không emit
                return;
            }

            // Gửi dữ liệu ra ngoài component (emit) với sự kiện 'submit'
            this.$emit('submit', {
                ...this.form,// Sao chép tất cả dữ liệu trong form (name, amount, category, date)
                amount: Number(this.form.amount), // đảm bảo amount là số
                id: Date.now()// Tạo một id duy nhất theo thời gian hiện tại (dùng làm mã khoản chi tiêu)
            });
            // Reset form về rỗng sau khi đã submit thành công
            this.form = {
                name: '',
                amount: 1000,
                category: '',
                date: ''
            };
            this.errors = {}; // xoá lỗi nếu có

        }
    }
}
</script>

<style scoped>
.expense-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
}

.error {
    color: red;
    font-size: 0.8em;
}
</style>

import { defineStore } from 'pinia' // import hàm defineStore để tạo một store mới

// Khởi tạo store có tên 'inventory'
export const useInventoryStore = defineStore('inventory', {

    // state: Nơi chứa dữ liệu trung tâm cho toàn app
    state: () => {
        // Lấy dữ liệu sản phẩm từ localStorage nếu có
        const saved = localStorage.getItem('products')
        return {
            products: saved ? JSON.parse(saved) : [], // Danh sách sản phẩm (mảng các object)
            loading: false, // Trạng thái đang tải (đang gải lập là false)
            error: null     // Nếu có lỗi khi fetch hoặc xử lý, sẽ lưu ở đây
        }
    },

    //getters: Giống như computed, để tính toán từ state
    getters: {
        // Tính tổng giá trị kho (price * quantity cho mỗi sản phẩm)
        totalValue: (state) =>
            state.products.reduce((sum, p) => sum + p.price * p.quantity, 0),

        // Đếm tổng số sản phẩm trong kho    
        productCount: (state) => state.products.length
    },

    //actions: Các hàm xử lý logic (giống methods)
    actions: {

        addProduct(product) {
            product.id = Date.now() // Gán ID dựa trên timestamp hiện tại
            this.products.push(product) // Thêm vào mảng products
            // this.saveProducts()
        },

        updateProduct(id, updated) {
            const index = this.products.findIndex(p => p.id === id) // Tìm vị trí sản phẩm
            if (index !== -1) {
                // Gộp dữ liệu cũ và mới để cập nhật
                this.products[index] = { ...this.products[index], ...updated }
                // this.saveProducts()
            }
        },

        deleteProduct(id) {
            this.products = this.products.filter(p => p.id !== id) // Giữ lại các sản phẩm khác ID
            // this.saveProducts()
        },

        // Giả lập fetch sản phẩm (đang không cần load lại vì đã load ở state)
        fetchProducts() {

            this.loading = true
            console.log('loading...')

            // giả sử delay = 1 khoảng time
            setTimeout(() => {
                this.loading = false
                console.log('load xong!') // Log sau 1 khoảng time quy định
            }, 3000)
        },

        // saveProducts() {
        //     localStorage.setItem('products', JSON.stringify(this.products))
        // },
    }
})

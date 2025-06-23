export function autoSavePlugin({ store }) {
    // Khi có bất kỳ thay đổi nào với store (mutation = thay đổi)
    store.$subscribe((mutation, state) => {
        // Kiểm tra xem store này có phải inventory không
        if (store.$id === 'inventory') {
            /// Lưu lại toàn bộ products vào localStorage mỗi lần thay đổi
            localStorage.setItem('products', JSON.stringify(state.products))
        }
    })
}
/**
 * Mỗi lần thêm, sửa, xoá sản phẩm -> store.products thay đổi
 * Plugin này sẽ tự động lưu lại vào localStorage
 * Không cần gọi saveProducts() thủ công nữa
 */
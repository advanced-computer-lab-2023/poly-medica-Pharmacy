import CartRepository from '../database/repository/cart-repository.js';

class CartService {
	constructor() {
		this.repository = new CartRepository();
	}

	async createCart(userId) {
		const cart = await this.repository.createCart(userId);
		return cart;
	}

	async addMedicineToCart(userId, medicineId) {
		const cart = this.repository.addMedicineToCart(userId, medicineId);
		return cart;
	}

	async updateMedicineInCart(id, quantity) {
		const cart = this.repository.updateMedicineInCart(id, quantity);
		return cart;
	}

	async deleteMedicineFromCart(id) {
		const medicine = this.repository.deleteMedicineFromCart(id);
		return medicine;
	}

	async getCart(userId) {
		const cart = this.repository.getCart(userId);
		return cart;
	}
}

export default CartService;

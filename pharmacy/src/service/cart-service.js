import CartRepository from '../database/repository/cart-repository.js';

class CartService {
	constructor() {
		this.repository = new CartRepository();
	}

	async createCart(userId) {
		const cart = await this.repository.createCart(userId);
		return cart;
	}

	async addMedicineToCart(userId, medicine, quantity) {
		const cart = await this.repository.addMedicineToCart(
			userId,
			medicine,
			quantity,
		);
		return cart;
	}

	async getCartMedicines(userId) {
		const medicines = await this.repository.getCartMedicines(userId);
		return medicines;
	}

	async getMedicines(medicineIds) {
		const medicines = await this.repository.getMedicines(medicineIds);
		return medicines;
	}

	async updateMedicineInCart(id, quantity) {
		const cart = await this.repository.updateMedicineInCart(id, quantity);
		return cart;
	}

	async deleteMedicineFromCart(id) {
		const medicine = await this.repository.deleteMedicineFromCart(id);
		return medicine;
	}

	async getCart(userId) {
		const cart = await this.repository.getCart(userId);
		return cart;
	}
}

export default CartService;

import CartRepository from '../database/repository/cart-repository.js';

class CartService {
	constructor() {
		this.repository = new CartRepository();
	}

	async createCart(userId) {
		const cart = await this.repository.createCart(userId);
		return cart;
	}

	async addMedicineToCart(userId, medicine) {
		const cart = await this.repository.addMedicineToCart(userId, medicine);
		return cart;
	}

	async getMedicine(userId, medicineId) {
		const medicine = await this.repository.getMedicine(userId, medicineId);
		return medicine;
	}

	async getCartMedicines(userId) {
		const medicines = await this.repository.getCartMedicines(userId);
		return medicines;
	}

	async getMedicines(medicineIds) {
		const medicines = await this.repository.getMedicines(medicineIds);
		return medicines;
	}

	async updateMedicineInCart(userId, medicineId, quantity) {
		const cart = await this.repository.updateMedicineInCart(
			userId,
			medicineId,
			quantity,
		);
		return cart;
	}

	async deleteAllMedicinesFromCart(userId) {
		const cart = await this.repository.deleteAllMedicinesFromCart(userId);
		return cart;
	}

	async deleteMedicineFromCart(userId, medicineId) {
		const cart = await this.repository.deleteMedicineFromCart(
			userId,
			medicineId,
		);
		return cart;
	}

	async getCart(userId) {
		const cart = await this.repository.getCart(userId);
		return cart;
	}
}

export default CartService;

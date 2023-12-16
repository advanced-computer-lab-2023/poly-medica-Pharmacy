import CartModel from '../models/Cart.js';
import mongoose from 'mongoose';

class CartRepository {
	async createCart(userId) {
		const cart = await CartModel.create({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async addMedicineToCart(userId, medicine) {
		await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					medicines: {
						medicine: medicine,
					},
				},
			},
			{ new: true },
		);

		return await this.getCart(userId);
	}

	async addPrescriptionToCart(
		userId,
		prescriptionId,
		description,
		doctorName,
		medicines,
		medicinesQuantity,
		price,
	) {
		await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					prescriptions: {
						prescriptionId: prescriptionId,
						description: description,
						doctorName: doctorName,
						medicines: medicines,
						medicinesQuantity: medicinesQuantity,
						price: price,
					},
				},
			},
			{ new: true },
		);

		return await this.getCart(userId);
	}

	async addPrescriptionMedicineToCart(userId, medicine, quantity) {
		await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$push: {
					medicines: {
						medicine: medicine,
						quantity: quantity,
					},
				},
			},
			{ new: true },
		);

		return await this.getCart(userId);
	}

	async getMedicine(userId, medicineId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart.medicines.find((item) => item.medicine._id == medicineId);
	}

	async getCartMedicines(userId) {
		const cart = this.getCart(userId);
		return cart.medicines;
	}

	async updateMedicineInCart(userId, medicineId, quantity) {
		const cart = await CartModel.findOneAndUpdate(
			{
				userId: new mongoose.Types.ObjectId(userId),
				'medicines.medicine._id': medicineId,
			},
			{
				$set: {
					'medicines.$.quantity': quantity,
				},
			},
			{ new: true },
		);
		return cart;
	}

	async deleteAllMedicinesFromCart(userId) {
		const cart = await CartModel.findOneAndUpdate(
			{ userId: new mongoose.Types.ObjectId(userId) },
			{
				$set: {
					medicines: [],
				},
			},
			{ new: true },
		);
		return cart;
	}

	async getCart(userId) {
		const cart = await CartModel.findOne({
			userId: new mongoose.Types.ObjectId(userId),
		});
		return cart;
	}

	async deleteMedicineFromCart(userId, medicineId) {
		const cart = await this.getCart(userId);
		if (cart) {
			cart.medicines = cart.medicines.filter(
				(item) => item.medicine._id != medicineId,
			);
			await cart.save();
		}
		return cart;
	}

	async getCartItemsLength(userId) {
		const cart = await this.getCart(userId);
		const quantities = cart.medicines.map((item) => item.quantity);
		const length = quantities.reduce((a, b) => a + b, 0);
		return length;
	}
}

export default CartRepository;

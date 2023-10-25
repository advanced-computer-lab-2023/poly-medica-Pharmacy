import React, { useState, useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from '../../utils/AxiosConfig';

const Cart = () => {
	const user = useUserContext();
	const userId = user.user.id;
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		pharmacyAxios
			.get(`/cart/${userId}/medicines`)
			.then((response) => {
				setCartItems(response.data.medicines);
			})
			.catch((error) => {
				console.log(error);
			});

		console.log('cart items: ', cartItems);
	}, []);

	const handleDeleteMedicine = (id) => {
		pharmacyAxios
			.delete(`/cart/medicines/${id}`)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h1>Cart</h1>
			{Array.isArray(cartItems) &&
				cartItems.map((item) => (
					<div key={item.medicine._id}>
						<h3>{item.medicine.name}</h3>
						<p>{item.medicine.description}</p>
						<p>{item.medicine.price}</p>
						<p>{item.quantity}</p>
						<button onClick={() => handleDeleteMedicine(item.medicine._id)}>
							Delete
						</button>
					</div>
				))}
		</div>
	);
};

export default Cart;

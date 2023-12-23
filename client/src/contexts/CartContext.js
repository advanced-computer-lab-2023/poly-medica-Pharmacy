import React, { useState, useContext, createContext } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios } from 'utils/AxiosConfig';

const CartContext = createContext();

export const useCartContext = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	const [cartLength, setCartLength] = useState(0);
	const { user } = useUserContext();
	const userId = user.id;

	const updateCartLength = () => {
		pharmacyAxios
			.get(`/cart/users/${userId}/items/length`)
			.then((response) => {
				setCartLength(response.data.length);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<CartContext.Provider value={{ cartLength, updateCartLength }}>
			{children}
		</CartContext.Provider>
	);
};

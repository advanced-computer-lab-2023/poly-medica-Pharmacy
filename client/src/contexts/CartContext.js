import React, { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export const useCartContext = () => {
	return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
	const [cartLength, setCartLength] = useState(0);

	const updateCartLength = (len) => {
		setCartLength(len);
	};

	return (
		<CartContext.Provider value={{ cartLength, updateCartLength }}>
			{children}
		</CartContext.Provider>
	);
};

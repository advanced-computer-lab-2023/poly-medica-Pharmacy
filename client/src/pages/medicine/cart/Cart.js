// import React from 'react';
// import { useUserContext } from 'hooks/useUserContext';

// const Cart = () => {
// 	const user = useUserContext();
// 	const userId = user.user.id;
// 	const [cart, setCart] = useState([]);
// 	const [medicines, setMedicines] = useState([]);

// 	useEffect(() => {
// 		pharmacyAxios
// 			.get(`/cart/${userId}`)
// 			.then((response) => {
// 				setCart(response.data.cart);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	});
// };

// export default Cart;

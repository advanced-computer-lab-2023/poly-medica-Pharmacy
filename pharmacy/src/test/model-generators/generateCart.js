const generateCart = (userId, medicines) => {
	return {
		userId: userId,
		medicines: medicines,
	};
};

export default generateCart;

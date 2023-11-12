import { faker } from '@faker-js/faker';

const generateMedicine = () => {
	return {
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		description: faker.lorem.sentence(),
		pictureName: faker.image.url,
		quantity: faker.number.int(),
		sales: faker.number.int(),
		medicinalUse: faker.lorem.sentence(),
		activeIngerdients: faker.lorem.words(),
	};
};

export default generateMedicine;

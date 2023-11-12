import { faker } from '@faker-js/faker';
import generateUserData from './generateUserData.js';

const generatePharmacistReq = () => {
	const userData = generateUserData();
	return {
		userData,
		hourlyRate: faker.number.int({ min: 20, max: 1000 }),
		affiliation: faker.company.name(),
		educationalBackground: faker.lorem.sentence({ min: 3, max: 10 }),
	};
};

export default generatePharmacistReq;

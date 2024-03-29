import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { paymentAxios } from '../../utils/AxiosConfig';
import CheckoutForm from './Checkout';
import MainCard from '../../ui-component/cards/MainCard';
import { useLocation } from 'react-router-dom';
import { PUBLIC_KEY } from '../../utils/Constants';
const stripePromise = loadStripe(PUBLIC_KEY);

export default function App() {
	const [clientSecret, setClientSecret] = useState('');

	const location = useLocation();
	let paymentAmount = 0;
	let item = [];

	if (location.state) {
		item = location.state.items;
		console.log('item ==== ', item);
		paymentAmount = location.state.amountToPay;
	} else {
		paymentAmount = 1;
	}
	console.log('the payment amount is : ', paymentAmount);
	useEffect(() => {
		paymentAxios
			.post('/payment/card', { paymentAmount })
			.then((data) => setClientSecret(data.data.clientSecret));
	}, []);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<MainCard title='Pay'>
			<div className='App'>
				{clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm item={item} type={item.type} typeId={item.typeId} />
					</Elements>
				)}
			</div>
		</MainCard>
	);
}

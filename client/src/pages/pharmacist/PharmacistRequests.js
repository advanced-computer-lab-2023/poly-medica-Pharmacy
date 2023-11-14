import React, { useState, useEffect } from 'react';
import PharmacistsRequestCard from './PharmacistsRequestCard';
import { pharmacyAxios } from 'utils/AxiosConfig';

const DoctorRequests = () => {
	const [pharmacistRequests, setPharmacistRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		pharmacyAxios
			.get('/pharmacist-requests')
			.then((response) => response.data)
			.then((data) => {
				setPharmacistRequests(data.pharmacistRequests);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			});
	}, []);

	const handleAccept = (pharmacistReq) => {
		pharmacyAxios
			.delete(`/pharmacist-requests/${pharmacistReq._id}?accept=${true}`)
			.then((response) => response.data)
			.then(() => {
				setPharmacistRequests((prevPharmacistRequests) =>
					prevPharmacistRequests.filter(
						(pharmacistRequest) => pharmacistRequest._id !== pharmacistReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error accepting pharmacist request:', error);
			});

		pharmacyAxios
			.post('/pharmacists', JSON.stringify(pharmacistReq), {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => response.data)
			.then(() => {
				setPharmacistRequests((prevPharmacistRequests) =>
					prevPharmacistRequests.filter(
						(pharmacistRequest) => pharmacistRequest._id !== pharmacistReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error accepting pharmacist request:', error);
			});
	};

	const handleReject = (pharmacistReq) => {
		pharmacyAxios
			.delete(`/pharmacist-requests/${pharmacistReq._id}?accept=${false}`)
			.then(() => {
				setPharmacistRequests((prevPharmacistRequests) =>
					prevPharmacistRequests.filter(
						(pharmacistRequest) => pharmacistRequest._id !== pharmacistReq._id,
					),
				);
			})
			.catch((error) => {
				console.error('Error rejecting pharmacist request:', error);
			});
	};

	return (
		<div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					{pharmacistRequests.map((pharmacistRequest) => (
						<PharmacistsRequestCard
							key={pharmacistRequest._id}
							pharmacistReq={pharmacistRequest}
							onAccept={handleAccept}
							onReject={handleReject}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default DoctorRequests;

import React, { useState, useEffect } from 'react';
import PharmacistRequestCard from './PharmacistRequestCard';

const DoctorRequests = () => {
	const [pharmacistRequests, setPharmacistRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:8003/pharmacist-requests', {
			method: 'GET',
		})
			.then((response) => response.json())
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
		// Delete the pharmacist request from the database
		fetch(
			`http://localhost:8003/pharmacist-requests/${
				pharmacistReq._id
			}?accept=${true}`,
			{
				method: 'DELETE',
			},
		)
			.then((response) => response.json())
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

		// Add the pharmacist to the pharmacist table
		fetch('http://localhost:8003/pharmacists', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(pharmacistReq),
		})
			.then((response) => response.json())
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
		fetch(
			`http://localhost:8003/pharmacist-requests/${
				pharmacistReq._id
			}?accept=${false}`,
			{
				method: 'DELETE',
			},
		)
			.then((response) => response.json())
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
						<PharmacistRequestCard
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

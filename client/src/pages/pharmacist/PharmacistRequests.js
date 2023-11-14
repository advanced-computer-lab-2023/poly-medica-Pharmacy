import React, { useState, useEffect } from 'react';
import PharmacistsRequestCard from './PharmacistsRequestCard';
import AcceptConfirmationDialog from './AcceptConfirmationDialog.js';
import RejectConfirmationDialog from './RejectConfirmationDialog.js';
import Message from 'ui-component/Message';
import { pharmacyAxios } from 'utils/AxiosConfig';

const PharmacistRequests = () => {
	const [pharmacistRequests, setPharmacistRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPharmacistRequest, setSelectedPharmacistRequest] =
		useState('');
	const [confirmRejectDialog, setConfirmRejectDialog] = useState(false);
	const [confirmAcceptDialog, setConfirmAcceptDialog] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [pharmacistIsBeingAccepted, setPharmacistIsBeingAccepted] =
		useState(false);
	const [pharmacistIsBeingRejected, setPharmacistIsBeingRejected] =
		useState(false);

	const [pharmacistRequestAccepted, setPharmacistRequestAccepted] =
		useState(false);
	const [pharmacistRequestRejected, setPharmacistRequestRejected] =
		useState(false);

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

	const handleReject = (pharmacistReq) => {
		setSelectedPharmacistRequest(pharmacistReq);
		setConfirmRejectDialog(true);
	};

	const handleCancelReject = () => {
		setConfirmRejectDialog(false);
		setPharmacistIsBeingAccepted(false);
		setPharmacistIsBeingRejected(false);
		setTimeout(() => {
			setSelectedPharmacistRequest('');
		}, 1000);
	};

	const handleAccept = (pharmacistReq) => {
		setSelectedPharmacistRequest(pharmacistReq);
		setConfirmAcceptDialog(true);
	};

	const handleCancelAccept = () => {
		setConfirmAcceptDialog(false);
		setPharmacistIsBeingAccepted(false);
		setPharmacistIsBeingRejected(false);
		setTimeout(() => {
			setSelectedPharmacistRequest('');
		}, 1000);
	};

	const handleConfirmAccept = (pharmacistReq) => {
		setSelectedPharmacistRequest(pharmacistReq);
		setPharmacistIsBeingAccepted(true);
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
				setConfirmAcceptDialog(false);
				setSelectedPharmacistRequest('');
				setPharmacistIsBeingAccepted(false);
				setErrorMessage('Error in accepting pharmacist request.');
				console.error('Error accepting pharmacist request:', error);
			});

		pharmacyAxios
			.post('/pharmacists', JSON.stringify(pharmacistReq), {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => response.data)
			.then(() => {
				setConfirmAcceptDialog(false);
				setPharmacistRequests((prevPharmacistRequests) =>
					prevPharmacistRequests.filter(
						(pharmacistRequest) => pharmacistRequest._id !== pharmacistReq._id,
					),
				);
				setPharmacistIsBeingAccepted(false);
				setPharmacistRequestAccepted(true);
				setTimeout(() => {
					setPharmacistRequestAccepted(false);
					setSelectedPharmacistRequest('');
				}, 2000);
			})
			.catch((error) => {
				setConfirmAcceptDialog(false);
				setSelectedPharmacistRequest('');
				setPharmacistIsBeingAccepted(false);
				setErrorMessage('Error in accepting pharmacist request.');
				console.error('Error accepting pharmacist request:', error);
			});
	};

	const handleConfirmReject = (pharmacistReq) => {
		setSelectedPharmacistRequest(pharmacistReq);
		setConfirmRejectDialog(true);
		setPharmacistIsBeingRejected(true);
		pharmacyAxios
			.delete(`/pharmacist-requests/${pharmacistReq._id}?accept=${false}`)
			.then(() => {
				setConfirmRejectDialog(false);
				setPharmacistRequests((prevPharmacistRequests) =>
					prevPharmacistRequests.filter(
						(pharmacistRequest) => pharmacistRequest._id !== pharmacistReq._id,
					),
				);
				setPharmacistIsBeingRejected(false);
				setPharmacistRequestRejected(true);
				setTimeout(() => {
					setPharmacistRequestRejected(false);
					setSelectedPharmacistRequest('');
				}, 2000);
			})
			.catch((error) => {
				setConfirmRejectDialog(false);
				setSelectedPharmacistRequest('');
				setPharmacistIsBeingRejected(false);
				console.error('Error rejecting pharmacist request:', error);
			});
	};

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{pharmacistRequests.map((pharmacistRequest) => (
						<PharmacistsRequestCard
							key={pharmacistRequest._id}
							pharmacistReq={pharmacistRequest}
							onAccept={handleAccept}
							onReject={handleReject}
						/>
					))}

					<AcceptConfirmationDialog
						open={confirmAcceptDialog}
						onClose={handleCancelAccept}
						onConfirm={handleConfirmAccept}
						title='Accept Pharmacist Request'
						content={`Are you sure you want to accept the request of ${selectedPharmacistRequest?.userData?.userName}?`}
						errorMessage={errorMessage}
						someoneIsBeingAccepted={pharmacistIsBeingAccepted}
						selectedPharmacistRequest={selectedPharmacistRequest}
					/>

					<RejectConfirmationDialog
						open={confirmRejectDialog}
						onClose={handleCancelReject}
						onConfirm={handleConfirmReject}
						title='Reject Pharmacist Request'
						content={`Are you sure you want to reject the request of ${selectedPharmacistRequest?.userData?.userName}?`}
						errorMessage={errorMessage}
						someoneIsBeingRejected={pharmacistIsBeingRejected}
						selectedPharmacistRequest={selectedPharmacistRequest}
					/>

					{pharmacistRequestAccepted && (
						<Message
							message={`Pharmacist request accepted successfully!`}
							severity='success'
							time={2000}
							vertical={'bottom'}
							horizontal={'right'}
						/>
					)}

					{pharmacistRequestRejected && (
						<Message
							message={`Pharmacist request rejected successfully!`}
							severity='success'
							time={2000}
							vertical={'bottom'}
							horizontal={'right'}
						/>
					)}
				</>
			)}
		</>
	);
};

export default PharmacistRequests;

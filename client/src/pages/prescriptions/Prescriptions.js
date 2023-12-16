import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrescriptionsList from './PrescriptionsList';
import MainCard from '../../ui-component/cards/MainCard';
import { patientAxios } from '../../utils/AxiosConfig';
import PrescriptionDetails from './PrescriptionDetails';
import { useUserContext } from 'hooks/useUserContext';
import { DOCTOR_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';
import { pharmacyAxios } from 'pages/utilities/AxiosConfig';
import Loader from 'ui-component/Loader';

const Prescriptions = () => {
	const { user } = useUserContext();
	const patientID =
		user.type === PATIENT_TYPE_ENUM ? user.id : useParams().patientId;
	const [prescriptions, setPrescriptions] = useState([]);
	const [selectedPrescription, setSelectedPrescription] = useState(null);
	const [prescriptionDoctor, setPrescriptionDoctor] = useState(null);
	const [medicines, setMedicines] = useState([]);
	const [loadingPrescription, setLoadingPrescription] = useState(true);
	const [loadingMedicine, setLoadingMedicine] = useState(true);
	const singlePatientPrescriptions = user.type === DOCTOR_TYPE_ENUM;

	useEffect(() => {
		const getPrescriptions = async () => {
			try {
				const patientResponses = await patientAxios.get(
					`patient/${patientID}/prescriptions`,
				);
				if (singlePatientPrescriptions) {
					const filteredPrescriptions = patientResponses.data.filter(
						(prescription) => prescription.doctorId === user.id,
					);
					patientResponses.data = filteredPrescriptions;
				}

				const prescriptions = patientResponses.data.filter(
					(prescription) => prescription.filled === false,
				);

				setPrescriptions(prescriptions);
				setLoadingPrescription(false);
			} catch (err) {
				setLoadingPrescription(false);
				console.log(err);
			}
		};
		getPrescriptions();
	}, [prescriptions.length]);

	useEffect(() => {
		try {
			pharmacyAxios.get('/medicines').then((response) => {
				const responseMedicines = response.data.medicines;
				setMedicines(responseMedicines);
				setLoadingMedicine(false);
			});
		} catch (err) {
			console.log(err.message);
			setLoadingMedicine(false);
		}
	}, [selectedPrescription]);

	const handleDialogClose = () => {
		setSelectedPrescription(null);
	};

	const handleSelectingPrescription = (prescription, doctor) => {
		setSelectedPrescription(prescription);
		setPrescriptionDoctor(doctor);
	};

	const addToCart = (prescription) => {
		const prescriptionPrice = prescription.medicines.reduce(
			(acc, medicine) => acc + medicine.price * medicine.amount,
			0,
		);

		const medicinesQuantity = prescription.medicines.reduce(
			(acc, medicine) => acc + medicine.amount,
			0,
		);

		pharmacyAxios
			.post(`cart/users/${user.id}/prescription/`, {
				prescriptionId: prescription._id,
				description: prescription.description,
				doctorName: prescription.doctorName,
				medicines: prescription.medicines,
				medicinesQuantity: medicinesQuantity,
				price: prescriptionPrice,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return loadingMedicine || loadingPrescription ? (
		<Loader />
	) : (
		<MainCard title='Prescriptions'>
			<PrescriptionsList
				prescriptions={prescriptions}
				handleSelectingPrescription={handleSelectingPrescription}
				addToCart={addToCart}
			/>

			<PrescriptionDetails
				selectedPrescription={selectedPrescription}
				prescriptionDoctor={prescriptionDoctor}
				handleDialogClose={handleDialogClose}
				medicines={medicines}
			/>
		</MainCard>
	);
};

export default Prescriptions;

import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import InfoList from './InfoList';
import PatientDetails from './PatientDetails';

const PatientInfo = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
		pharmacyAxios.get('/patients')
			.then((response) => {
				setPatients(response.data.allPatients);
                setLoading(false);
			})
			.catch(error => {
				console.log(error);
                setLoading(true);
			});
	}, []);

    const handleDialogClose = () => {
		setSelectedPatients(null);
	};

	if (loading) return (<>Loading...</>);
    else{
        return (
            <MainCard title="Patients Info">
                <InfoList patients={patients} setSelectedPatients={setSelectedPatients} />
                <PatientDetails selectedPatients={selectedPatients} handleDialogClose={handleDialogClose} />
            </MainCard>
        );
    }

};
export default PatientInfo;
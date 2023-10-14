import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { pharmacyAxios } from '../../utils/AxiosConfig';
import InfoList from './InfoList';
import PharmacistsDetails from './PharmacistsDetails';

const ParmacistInfo = () => {
    const [pharmacists, setPharmacists] = useState([]);
    const [selectedPharmacists, setSelectedPharmacists] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
		pharmacyAxios.get('/pharmacists')
			.then((response) => {
				setPharmacists(response.data.pharmacists);
                setLoading(false);
			})
			.catch(error => {
				console.log(error);
                setLoading(true);
			});
	}, []);

    const handleDialogClose = () => {
		setSelectedPharmacists(null);
	};

	if (loading) return (<>Loading...</>);
    else{
        return (
            <MainCard title="PharmacistInfo">
                <InfoList pharmacists={pharmacists} setSelectedPharmacists={setSelectedPharmacists} />
                <PharmacistsDetails selectedPharmacists={selectedPharmacists} handleDialogClose={handleDialogClose} />
            </MainCard>
        );
    }
    
};
export default ParmacistInfo;

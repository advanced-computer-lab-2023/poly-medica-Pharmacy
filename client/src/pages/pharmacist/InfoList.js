
import React from 'react';
import { List } from '@mui/material';
import InfoCard from './InfoCard';

const InfoList = ({ pharmacists, setSelectedPharmacists }) => {
    console.log('Pharmacist = ', pharmacists);
    return (
        <List>
            {Array.isArray(pharmacists) &&
                pharmacists.map((pharmasict, index) => (
                    <div key={index}>
                        <div key={index}>
                            <InfoCard pharmacist={pharmasict} setSelectedPharmacists={setSelectedPharmacists}></InfoCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default InfoList;

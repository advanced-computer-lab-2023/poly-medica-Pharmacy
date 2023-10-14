
import React from 'react';
import { List } from '@mui/material';
import InfoCard from './InfoCard';

const InfoList = ({ pharmasicts, setSelectedPharmacist }) => {
    return (
        <List>
            {Array.isArray(pharmasicts) &&
                pharmasicts.map((pharmasict, index) => (
                    <div key={index}>
                        <div key={index}>
                            <InfoCard pharmasict={pharmasict} setSelectedPharmacist={setSelectedPharmacist}></InfoCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default InfoList;

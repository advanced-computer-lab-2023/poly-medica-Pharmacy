import { List } from '@mui/material';
import InfoCard from './InfoCard';

const InfoList = ({ patients, setSelectedPatients }) => {
    return (
        <List>
            {Array.isArray(patients) &&
                patients.map((patient, index) => (
                    <div key={index}>
                        <div key={index}>
                            <InfoCard patient={patient} setSelectedPatients={setSelectedPatients}></InfoCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default InfoList;
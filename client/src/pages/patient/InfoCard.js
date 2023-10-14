import { ListItem, ListItemText } from '@mui/material';


const InfoCard = ({ patient, setSelectedPatients }) => {
    return (
        <ListItem button onClick={() => setSelectedPatients(patient)}>
            <ListItemText primary={patient.name} secondary={
                <div
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {patient.dateOfBirth}
                </div>
            } sx={{
                width: '60%',
                lineHeight: '1.5em',
                maxHeight: '3em',
            }} />
            <ListItemText sx={{ paddingLeft: '2%' }} primary={`$${patient.gender}`} />
        </ListItem>
    );
};

export default InfoCard;
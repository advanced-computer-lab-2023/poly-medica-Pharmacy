import { ListItem, ListItemText } from '@mui/material';


const InfoCard = ({ pharmacist, setSelectedMedicine }) => {
    return (
        <ListItem button onClick={() => setSelectedMedicine(pharmacist)}>
            <ListItemText primary={pharmacist.userData.name} secondary={
                <div
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {pharmacist.affiliation}
                </div>
            } sx={{
                width: '60%',
                lineHeight: '1.5em',
                maxHeight: '3em',
            }} />
            <ListItemText sx={{ paddingLeft: '2%' }} primary={`$${pharmacist.hourlyRate}`} />
        </ListItem>
    );
};

export default InfoCard;

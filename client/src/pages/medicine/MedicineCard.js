
import { IconButton, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { PHARMACY_BASE_URL } from 'utils/Constants';

const MedicineCard = ({ medicine, setSelectedMedicine, handleEditButtonClick }) => {
    return (
        <ListItemButton onClick={() => setSelectedMedicine(medicine)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <img src={`${PHARMACY_BASE_URL}/medicines/${medicine._id}/pictures`} alt={medicine.name} width="80" height="80" />
            </ListItemAvatar>
            <ListItemText primary={medicine.name} secondary={
                <div
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {medicine.description}
                </div>
            } sx={{
                width: '60%',
                lineHeight: '1.5em',
                maxHeight: '3em',
            }} />
            <ListItemText sx={{ paddingLeft: '2%' }} primary={`$${medicine.price}`} />
            <IconButton
                edge="end"
                aria-label="edit"
                onClick={(event) => handleEditButtonClick(medicine, event)}
            >
                <EditIcon />
            </IconButton>
        </ListItemButton>
    );
};

export default MedicineCard;



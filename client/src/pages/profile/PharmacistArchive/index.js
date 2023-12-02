import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import { PHARMACY_BASE_URL } from 'utils/Constants';
import { pharmacyAxios } from 'utils/AxiosConfig';
import Swal from 'sweetalert2';

const PharmacistArchive = ({ name, id, handleDataChange }) => {
  
  const onDelete = async () => {
    try{
      await pharmacyAxios.patch(`/medicines/${id}/arcive/${false}`);
      handleDataChange();
    } catch(error){
      Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.response.data.message,
			});
    }
  };
    return (
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={name} src={`${PHARMACY_BASE_URL}/medicines/${id}/pictures`} />
          </ListItemAvatar>
          <ListItemText primary={name} />
          <IconButton edge="end" aria-label="delete" 
          onClick={onDelete}
          >
            <IconTrash />
          </IconButton>
        </ListItem>
      );
};
 
export default PharmacistArchive;
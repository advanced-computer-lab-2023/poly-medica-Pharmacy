import {
    Card,
    CardContent,
    TableCell,
    Table,
    TableBody,
    TableRow,
    Typography,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AddressCard = ({
    address,
    handleEditDialogOpen,
    setSelectedAddress,
    handleDelete,
    includeEdit = true,
    sxx = {},
    
}) => {
    handleEditDialogOpen;
    setSelectedAddress;
    return (
        <Card sx={sxx}>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                sx={{
                                    border: 0,
                                    padding: 0,
                                    width: '30%',
                                    fontWeight: 'bold',
                                }}>
                                Address
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    border: 0,
                                    padding: 0,
                                    width: '40%',
                                }}>
                                <Typography variant='body1' color='black'>
                                    {`${address.city}, ${address.street}, ${address.buildingName}`}
                                </Typography>
                            </TableCell>
                            <TableCell
                                align='center'
                                sx={{
                                    border: 0,
                                    padding: 0,
                                }}>
                                <Typography
                                    variant={address.primary ? 'h4' : 'body2'}
                                    color={
                                        address.primary
                                            ? 'primary'
                                            : 'textSecondary'
                                    }>
                                    {address.primary
                                        ? 'Primary'
                                        : 'Not Primary'}
                                </Typography>
                            </TableCell>
                            <TableCell
                                align='right'
                                sx={{
                                    border: 0,
                                    padding: 0,
                                }}>
                                {includeEdit && (
                                    <>
                                        <IconButton
                                            edge='end'
                                            aria-label='edit'
                                            sx={{
                                                marginRight: '2px'
                                            }}
                                            onClick={() => {
                                                const tmpAddress = JSON.parse(
                                                    JSON.stringify(address)
                                                );
                                                setSelectedAddress(tmpAddress);
                                                handleEditDialogOpen();
                                            }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge='end'
                                            aria-label='edit'
                                            onClick={() => {
                                                const tmpAddress = JSON.parse(
                                                    JSON.stringify(address)
                                                );
                                                setSelectedAddress(tmpAddress);
                                                handleDelete(tmpAddress);
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{
                                    padding: 0,
                                    paddingBottom: 5,
                                    width: '30%',
                                    fontWeight: 'bold',
                                }}>
                                Phone Number
                            </TableCell>
                            <TableCell
                                align='left'
                                sx={{
                                    padding: 0,
                                    paddingBottom: 5,
                                }}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'>
                                    {`${address.phoneNumber}`}
                                </Typography>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AddressCard;

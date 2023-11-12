// material-ui
import {
    Card,
    CardContent,
    CardHeader,
    ListItem,
    ListItemText,
    Button,
    Divider,
} from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { formatDate } from 'utils/DateFormat';
import { useUserContext } from 'hooks/useUserContext';
import { PENDING_STATUS } from 'utils/Constants';
import CancelOrderDialog from './CancelOrderDialog';

// ==============================|| CUSTOM SUB CARD ||============================== //

const OrdersCard = ({ order, setSelectedOrder, handleCancleOrder }) => {
    const theme = useTheme();
    const { user } = useUserContext();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    width: '80%',
                    margin: '20px auto',
                    border: '1px solid',
                    borderColor: theme.palette.primary.light,
                    ':hover': {
                        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                    },
                }}>
                <CardHeader
                    sx={{ padding: 3 }}
                    avatar={<ReceiptLongIcon />}
                    title={`Order Id : ${Math.ceil(
                        Math.abs(parseInt(order._id, 16)) / 5e20
                    )}`}
                    action={
                        user.type === 'patient' &&
                        order &&
                        order.status === PENDING_STATUS && (
                            <Button
                                variant='contained'
                                sx={{ marginRight: 2 }}
                                onClick={handleOpen}
                                color='error'>
                                Cancle Order
                            </Button>
                        )
                    }
                />
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light,
                    }}
                />
                <CardContent sx={{ padding: 2 }}>
                    <ListItem>
                        <ListItemText
                            primary={formatDate(order.createdAt)}
                            secondary={order.status}
                            sx={{
                                paddingLeft: 2,
                                width: '60%',
                                lineHeight: '1.5em',
                                maxHeight: '3em',
                            }}
                        />
                        <Button onClick={() => setSelectedOrder(order)}>
                            Details
                        </Button>
                    </ListItem>
                </CardContent>
            </Card>
            <CancelOrderDialog
                order={order}
                handleCancleOrder={handleCancleOrder}
                isOpen={open}
                handleClose={handleClose}
            />
        </>
    );
};

export default OrdersCard;

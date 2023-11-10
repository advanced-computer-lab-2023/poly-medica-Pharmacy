import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext.js';

import { PENDING_STATUS } from 'utils/Constants';

import OrderTable from './OrderTable';

// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const OrdersDetails = ({
    selectedOrder,
    handleDialogClose,
    handleCancleOrder,
    handleAcceptOrRejectOrder,
}) => {
    const { user } = useUserContext();
    return (
        <Dialog
            open={selectedOrder}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 800 : 400 },
            }}>
            {selectedOrder && (
                <>
                    <DialogTitle align='center' variant='h2'>
                        Order Details
                    </DialogTitle>
                    <DialogContent>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}></div>
                        <Typography variant='subtitle1'>Status:</Typography>
                        <Typography variant='body2'>
                            {selectedOrder.status}
                        </Typography>
                        <br />
                        <br />
                        <Typography variant='subtitle1'>Details:</Typography>
                        <OrderTable
                            items={selectedOrder.details}
                            total={selectedOrder.amount}
                        />
                    </DialogContent>
                    <DialogActions>
                        {user.type === 'patient' &&
                            selectedOrder &&
                            selectedOrder.status === PENDING_STATUS && (
                                <Button
                                    variant='contained'
                                    sx={{ margin: 2 }}
                                    onClick={handleCancleOrder}
                                    color='error'>
                                    Cancle Order
                                </Button>
                            )}
                        {user.type !== 'patient' && selectedOrder && (
                            <>
                                <Button
                                    variant='contained'
                                    sx={{ margin: 2 }}
                                    onClick={() => {
                                        handleAcceptOrRejectOrder('rejected');
                                    }}
                                    color='secondary'>
                                    Reject
                                </Button>
                                <Button
                                    variant='contained'
                                    sx={{ margin: 2 }}
                                    onClick={() => {
                                        handleAcceptOrRejectOrder('accepted');
                                    }}
                                    color='primary'>
                                    Accept
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default OrdersDetails;

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

const CancelOrderDialog = ({
    isOpen,
    handleClose,
    handleCancleOrder,
    order,
}) => {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle variant='h3'>Cancel Order</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to cancel this order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Go Back
                </Button>
                <Button
                    color='error'
                    onClick={() => {
                        handleCancleOrder(order);
                        handleClose();
                    }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelOrderDialog;

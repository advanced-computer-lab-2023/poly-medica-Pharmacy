// material-ui
import {
    Card,
    CardContent,
    CardHeader,
    ListItem,
    ListItemText,
    Button,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import moment from 'moment/moment';
import { DATE_FORAMT } from 'utils/Constants';

const formatDate = (date) => {
    const momentDate = new moment(date);
    return momentDate.format(DATE_FORAMT);
};
// ==============================|| CUSTOM SUB CARD ||============================== //

const OrdersCard = ({ order, setSelectedOrder }) => {
    const theme = useTheme();
    return (
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
            />
            <Divider
					sx={{
						opacity: 1,
						borderColor: theme.palette.primary.light
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
    );
};

export default OrdersCard;

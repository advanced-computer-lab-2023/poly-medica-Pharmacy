import { useState, useEffect } from 'react';
import { patientAxios } from 'utils/AxiosConfig.js';
import MainCard from 'ui-component/cards/MainCard';
import OrdersList from './OrdersList.js';
import OrdersDetails from './OrdersDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { CANCELLED_STATUS } from 'utils/Constants.js';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { user } = useUserContext();
    const userId = user.id;
    useEffect(() => {
        if (user.type === 'patient') {
            patientAxios
                .get(`/order/${userId}`)
                .then((response) => {
                    setOrders(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            patientAxios
                .get(`/order-pending/`)
                .then((response) => {
                    setOrders(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const handleDialogClose = () => {
        setSelectedOrder(null);
    };

    const handleCancleOrder = () => {
        selectedOrder.status = CANCELLED_STATUS;
        patientAxios
            .patch(`/order/${selectedOrder._id}`, { order: selectedOrder })
            .then((response) => {
                const order = response.data;
                setOrders((prevOrders) => {
                    const updateOrders = prevOrders.map((ord) => {
                        if (ord._id === order._id) return order;
                        return ord;
                    });
                    return updateOrders;
                });
            })
            .catch((err) => {
                console.log(err);
            });
        handleDialogClose();
    };

    const handleAcceptOrRejectOrder = (status) => {
        selectedOrder.status = status;
        patientAxios
            .patch(`/order/${selectedOrder._id}`, { order: selectedOrder })
            .then((response) => {
                const order = response.data;
                setOrders((prevOrders) => {
                    const updateOrders = prevOrders.filter((ord) => {
                        if (ord._id != order._id) return ord;
                    });
                    return updateOrders;
                });
            })
            .catch((err) => {
                console.log(err);
            });
        handleDialogClose();
    };

    return (
        <MainCard title='Orders'>
            <OrdersList orders={orders} setSelectedOrder={setSelectedOrder} />
            <OrdersDetails
                selectedOrder={selectedOrder}
                handleDialogClose={handleDialogClose}
                handleCancleOrder={handleCancleOrder}
                handleAcceptOrRejectOrder={handleAcceptOrRejectOrder}
            />
        </MainCard>
    );
};

export default Orders;

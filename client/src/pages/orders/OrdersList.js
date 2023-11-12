import React from 'react';
import { List } from '@mui/material';
import OrdersCard from './OrdersCard.js';

const OrdersList = ({ orders, setSelectedOrder, handleCancleOrder }) => {
    return (
        <List>
            {Array.isArray(orders) &&
                orders.map((order, index) => (
                    <div key={index}>
                        <div key={index}>
                            <OrdersCard
                                order={order}
                                setSelectedOrder={setSelectedOrder}
                                handleCancleOrder={
                                    handleCancleOrder
                                }></OrdersCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default OrdersList;

import { useEffect } from 'react';
import { completeOrder, getOrders, updateOrder } from '../api';
import { getToken } from '../auth';

const CheckoutComplete = () => {
    useEffect(() => {
        if (getToken()) {
            getOrders(getToken())
                .then(response => {
                    response.data.forEach(order => {
                        updateOrder(order.id, getToken(), { active: false })
                    })
                });
        }
    }, [])
    return (
        <div className='completedContainer'>
            <div className='completed'>
                <h3>Your order is on the way</h3>
            </div>
        </div>
    )
}

export default CheckoutComplete;
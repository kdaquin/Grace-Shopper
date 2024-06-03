import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteOrder, getOrders, getProductById, updateOrder } from '../api';
import { getToken } from '../auth';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IdjzcA9fKf653FRBvHUXVoO4SLUsVcmOF0L252jSEAlPNyPHrpgHbarIStgPfyNjQRaGNFfs8PpLbZ7hmvH1PyA00OFPGbrl4');

const Cart = ({ currentUser, setIsShown, setDisplayMessage }) => {
    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [cartRefresh, setCartRefresh] = useState();

    orderProducts.sort((a, b) => {
        const nameA = a.product.name.toLowerCase();
        const nameB = b.product.name.toLowerCase();
        let compare = 0;

        if (nameA > nameB) {
            compare = 1
        } else if (nameA < nameB) {
            compare = -1;
        }
        return compare;
    });


    const changeQuantity = (event, orderId) => {
        const [quantity] = event.target;

        if (quantity.value) {
            if (quantity.value < 1) {
                setDisplayMessage({
                    message: 'Quantity not allowed',
                    type: 'error'
                })
                setIsShown(true);
                return;
            }
            if (currentUser) {
                updateOrder(orderId, getToken(), { quantity: quantity.value })
                    .then(response => setCartRefresh(response))
            } else {
                const order = JSON.parse(localStorage.getItem(`order ${orderId}`));
                console.log(order);
                localStorage.setItem(`order ${orderId}`, JSON.stringify({ id: orderId, quantity: quantity.value, productId: order.productId }))
                setCartRefresh(order);
            }
        }
    }

    const handleDelete = async (id) => {
        if (currentUser) {
            const deletedOrder = await deleteOrder(id, getToken());
            setCartRefresh(deletedOrder);
        } else {
            localStorage.removeItem(`order ${id}`);
            setCartRefresh(id);
        }
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const orderKeys = Object.keys(localStorage).filter(key => key.split(' ')[0] === 'order')
        orderKeys.map(key => localStorage.removeItem(key));
        localStorage.removeItem('orderCount')

        const response = await axios.post('https://radiant-earth-72759.herokuapp.com/api/checkout', orders);
        const session = response.data
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        setOrders([]);

        if (result.error) {
            setDisplayMessage({
                message: result.error.message,
                type: 'error'
            })
            setIsShown(true);
        }
    }

    useEffect(() => {
        if (currentUser) {
            getOrders(getToken())
                .then(response => setOrders(response.data))
        } else {
            const orderKeys = Object.keys(localStorage).filter(key => key.split(' ')[0] === 'order')
            const _orders = orderKeys.map(key => JSON.parse(localStorage.getItem(key)));
            setOrders(_orders);
        }
    }, [currentUser, cartRefresh]);

    useEffect(() => {
        if (orders) {
            getOrderProducts(orders)
                .then(response => {
                    setOrderProducts(response)
                })
        }
    }, [orders]);

    let cartTotal = 0;

    return (
        <div className="cartPage">
            <h3>Cart</h3>
            <div className='cart'>
                <div className='orderList'>
                    {
                        orders?.length > 0 ?
                            orderProducts.map(({ order, product }) => {
                                cartTotal += product.price * order.quantity;
                                return (
                                    <div className='order' key={order.id}>
                                        <div>
                                            <h4>{product?.name}</h4>
                                            <p>Price: {product?.price}</p>
                                            <p>Category: {product?.category}</p>
                                            <p>{product?.description}</p>
                                            <img src={ product.photos } height="10%" width="10%"/>
                                        </div>
                                        <div>
                                            <p>x{order.quantity}</p>
                                            <form onSubmit={(event) => {
                                                event.preventDefault()
                                                changeQuantity(event, order.id)
                                            }}>
                                                <label>Change quantity</label>
                                                <input type='number' style={{ width: '20%' }}></input>
                                                <input type='submit'></input>
                                            </form>
                                        </div>
                                        <p>price: ${product?.price * order.quantity}</p>
                                        <button onClick={() => handleDelete(order.id)}>remove</button>

                                    </div>
                                )
                            })
                            : <h4>Go Shopping!</h4>
                    }
                </div>
            </div>
            <h3>Total: ${cartTotal}</h3>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    )
}

const getOrderProducts = async (orders) => {
    const orderProducts = await Promise.all(orders.map(async order => {
        const { data: product } = await getProductById(order.productId)
        return {
            product,
            order
        };
    }));
    return orderProducts;
}

export default Cart
import { useState, useEffect, useRef } from 'react';
import { getProducts, addProductToOrder } from '../api';
import { getToken } from '../auth';


const Home = ({currentUser, setDisplayMessage, setIsShown }) => {
const [products, setProducts] = useState([]);
const [orderToAdd, setOrderToAdd] = useState();


const addToCart = (event, { id }) => {
    let count = localStorage.getItem('orderCount');
    event.preventDefault();
    const [quantity] = event.target;
    if (quantity.value) {
        if (!currentUser) {
            count++;
            localStorage.setItem('orderCount', count)
            localStorage.setItem(`order ${count}`, JSON.stringify({
                productId: id,
                quantity: quantity.value
            }))
            setDisplayMessage({
                message: 'Added to cart!',
                type: 'success'
            })
            setIsShown(true);
        } else {
            setOrderToAdd({
                productId: id,
                quantity: quantity.value
            })
        }
    }
}


    useEffect(() => {
        getProducts()
            .then(response => {
                setProducts(response.data.allProducts);
            })
    }, [])
 let initialRender = useRef(true);

useEffect(() => {
    if (!initialRender.current) {
        if (orderToAdd) {
            addProductToOrder(orderToAdd, getToken())
                .then(response => {
                    if (response.data) {
                        setDisplayMessage({
                            message: 'Added to cart!',
                            type: 'success'
                        })
                        setIsShown(true);
                    } else {
                        setDisplayMessage({
                            message: 'Error adding to cart',
                            type: 'error'
                        })
                        setIsShown(true);
                    }
                })
        }
    } else {
        initialRender.current = false;
    }
}, [orderToAdd])




    return (

        <div className="homePage">
            <div className="homePageProducts">
                <h3>Welcome to Boring T-shirt Company!</h3>
                {/* https://imgur.com/JILcAMv */}
                <img src={'https://imgur.com/xY6kkh0.jpg'} style={{ width: '65%', border: 'solid' }}></img>
                <h5>Guaranteed 100% Boring or your money back.</h5>
                <h4>Our Featured Products</h4>

                <div className="featuredProducts">
                    {
                        products.map((product, index) => {
                            console.log(product.photos)

                            if (index === 8) {
                                return;
                            }
                            return (
                                <div className='product' key={index}>
                                    <img src={product.photos} style={{ width: '100%' }}></img>
                                    <h4>{product.name}</h4>
                                    <p>{product.description}</p>
                                    <p>Price- {product.price}</p>
                                    <p>Category- {product.category}</p>
                                    <form onSubmit={() => { addToCart(event, product) }}>
                                        <label>Quantity</label>
                                        <input type='number' maxLength="3" className="inputBox" />
                                        <button className='btn' type='submit'>Add to Cart</button>
                                    </form>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )

}

export default Home;
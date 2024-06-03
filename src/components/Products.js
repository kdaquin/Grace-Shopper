import { useEffect, useState, useRef } from 'react';
import { addProductToOrder, getProducts } from '../api';
import { getToken } from '../auth';

const Products = ({ currentUser, setDisplayMessage, setIsShown }) => {
    const [products, setProducts] = useState([]);
    const [orderToAdd, setOrderToAdd] = useState();
    const [searchTerm, setSearchTerm] = useState('')
    let filteredProducts = [];

    console.log(searchTerm)
    console.log(filteredProducts)
    const addToCart = (event, { id }) => {
        let count = localStorage.getItem('orderCount');
        event.preventDefault();
        const [quantity] = event.target;
        if (quantity.value) {
            if (!currentUser) {
                count++;
                localStorage.setItem('orderCount', count)
                localStorage.setItem(`order ${count}`, JSON.stringify({
                    id: count,
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
    }, []);

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
        <>
            <form className="searchForm">
                <fieldset>
                    <input
                        required
                        placeholder='What are you looking for?'
                        onChange={(event) => setSearchTerm((event.target.value).toLowerCase())}
                    ></input>
                </fieldset>
            </form>


            {
                searchTerm.length > 0
                    ?
                    <div className='productList'>
                        {
                            products.map((product, index) => {
                                (((product.name).toLowerCase()).includes(searchTerm) || ((product.description).toLowerCase()).includes(searchTerm) || ((product.category).toLowerCase()).includes(searchTerm))
                                    ? filteredProducts.push(products[index])
                                    : null;
                            })
                        }
                        {
                            filteredProducts.length > 0
                                ?
                                filteredProducts.map((product, index) => {
                                    return (
                                        <div className='product' key={index}>
                                            <img src={product.photos} style={{ width: '100%' }}></img>
                                            <div className='container'>
                                                <a className="twitter-share-button"
                                                    href="https://twitter.com/intent/tweet">
                                                    Tweet</a>
                                                <h4>{product.name}</h4>
                                                <p>Price: {product.price}</p>
                                                <p>Category: {product.category}</p>
                                                <p>{product.description}</p>
                                                
                                                <form onSubmit={() => { addToCart(event, product) }}>
                                                    <label>Quantity</label>
                                                    <input type='number' defaultValue='1' className="inputBox" />
                                                    <button type='Submit' className='btn'>Add to cart</button>
                                                </form>
                                                
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                (
                                    <div>
                                        <h1>No items</h1>
                                    </div>
                                )
                        }
                    </div>
                    :
                    <div className='productList'>
                        {products.map((product, index) => {
                            return (
                                <div className='product' key={index}>
                                    <img src={product.photos} style={{ width: '100%' }}></img>
                                    <div className='container'>
                                        <a className="twitter-share-button"
                                                    href="https://twitter.com/intent/tweet"
                                                    data-text="Check out this awesome website!">    
                                                    </a>
                                        <h4>{product.name}</h4>
                                        <p>Price: {product.price}</p>
                                        <p>Category: {product.category}</p>
                                        <p>{product.description}</p>

                                        <form onSubmit={() => { addToCart(event, product) }}>
                                            <label>Quantity</label>
                                            <input type='number' defaultValue='1' className="inputBox" />
                                            <button type='Submit' className='btn'>Add to cart</button>
                                        </form>
                                    </div>

                                </div>
                            )
                        })
                        }
                    </div>
            }
        </>
    )
}

export default Products;
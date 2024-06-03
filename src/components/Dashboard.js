import { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../api";
import { getToken } from "../auth";

const Dashboard = ({ setDisplayMessage, setIsShown }) => {
    const [newProduct, setNewProduct] = useState();
    const [productToUpdate, setProductToUpdate] = useState();
    const [updatedProduct, setUpdatedProduct] = useState();
    const [products, setProducts] = useState([]);
    const [productRefresh, setProductRefresh] = useState();

    products.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        let compare = 0;

        if (nameA > nameB) {
            compare = 1
        } else if (nameA < nameB) {
            compare = -1;
        }
        return compare;
    });

    const handleSubmit = (event, update = false) => {
        event.preventDefault();

        const [name, desc, category, photo, price] = event.target;

        if (name.value, desc.value, category.value, photo.value, price.value) {
            if (!update) {
                setNewProduct({
                    name: name.value,
                    description: desc.value,
                    category: category.value,
                    photos: photo.value,
                    price: price.value
                })
            } else {
                setUpdatedProduct({
                    name: name.value,
                    description: desc.value,
                    category: category.value,
                    photos: photo.value,
                    price: price.value
                })
            }
            name.value = '';
            desc.value = '';
            category.value = '';
            photo.value = '';
            price.value = '';
        } else {
            setDisplayMessage({
                message: 'Please fill in all feilds',
                type: 'error'
            })
            setIsShown(true);
        }
    }

    const handleUpdate = async (event, id) => {
        event.preventDefault();
        try {
            const product = await getProductById(id);
            setProductToUpdate(product.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (event, id) => {
        event.preventDefault();
        deleteProduct(id, getToken())
            .then(response => {
                setDisplayMessage({
                    message: 'Product deleted',
                    type: 'success'
                })
                setIsShown(true);
                setProductRefresh(response.data);
            })
    }

    useEffect(() => {
        getProducts()
            .then(response => setProducts(response.data.allProducts));
    }, [productRefresh])

    useEffect(() => {
        if (updatedProduct) {
            updateProduct(productToUpdate.id, updatedProduct, getToken())
                .then(response => {
                    if (!response.data) {
                        setDisplayMessage({
                            message: 'Product updated successfully',
                            type: 'success'
                        })
                        setIsShown(true);
                        setProductRefresh(response);
                        setProductToUpdate(null);
                    }
                })
        }
    }, [updatedProduct])

    useEffect(() => {
        if (newProduct) {
            createProduct(newProduct, getToken())
                .then(response => {
                    if (response.data) {
                        setDisplayMessage({
                            message: 'Product created successfully',
                            type: 'success'
                        })
                        setIsShown(true);
                        setProductRefresh(response.data);
                    }
                })
        }
    }, [newProduct])

    return (
        <div className='dashboard'>
            <div className='newProduct'>
                {
                    productToUpdate ?
                        <>
                            <h3>Update product</h3>
                            <div className='newProductForm'>
                                <form onSubmit={() => handleSubmit(event, true)}>
                                    <label>Name</label>
                                    <div>
                                        <input type='text' defaultValue={productToUpdate.name}></input>
                                    </div>
                                    <label>Description</label>
                                    <div>
                                        <input type='text' defaultValue={productToUpdate.description}></input>
                                    </div>
                                    <label>Category</label>
                                    <div>
                                        <input type='text' defaultValue={productToUpdate.category}></input>
                                    </div>
                                    <label>Photo</label>
                                    <div>
                                        <input type='text' defaultValue={productToUpdate.photos}></input>
                                    </div>
                                    <label>Price</label>
                                    <div>
                                        <input type='number' defaultValue={productToUpdate.price}></input>
                                    </div>
                                    <input type='submit'></input>
                                    <button onClick={() => setProductToUpdate(null)}>Cancel</button>
                                </form>
                            </div>
                        </> :
                        <>
                            <h3>New product</h3>
                            <div className='newProductForm'>
                                <form onSubmit={handleSubmit}>
                                    <label>Name</label>
                                    <div>
                                        <input type='text' defaultValue=''></input>
                                    </div>
                                    <label>Description</label>
                                    <div>
                                        <input type='text' defaultValue=''></input>
                                    </div>
                                    <label>Category</label>
                                    <div>
                                        <input type='text' defaultValue=''></input>
                                    </div>
                                    <label>Photo</label>
                                    <div>
                                        <input type='text' defaultValue=''></input>
                                    </div>
                                    <label>Price</label>
                                    <div>
                                        <input type='number' defaultValue=''></input>
                                    </div>
                                    <input type='submit'></input>
                                </form>
                            </div>
                        </>
                }
            </div>
            <div className='dashboardProductList'>
                {
                    products?.map((product, index) => {
                        return (
                            <div className='dashboardProduct' key={index}>
                                <img src={product.photos} style={{ width: '100%' }}></img>
                                <div className='container'>
                                    <h4>{product.name}</h4>
                                    <p>Price: {product.price}</p>
                                    <p>Category: {product.category}</p>
                                    <p>{product.description}</p>
                                    <div>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            handleUpdate(event, product.id)
                                        }}>Update</button>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            handleDelete(event, product.id)
                                        }}>Delete</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard;
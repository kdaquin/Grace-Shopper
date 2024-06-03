import axios from 'axios';

const baseUrl = 'https://radiant-earth-72759.herokuapp.com/api';

export const loginUser = async (user) => {
    try {
        const data = await axios.post(`${baseUrl}/user/login`, user);
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const registerUser = async (user) => {
    try {
        const data = await axios.post(`${baseUrl}/user/register`, user);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const checkUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.get(`${baseUrl}/user/me`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getProducts = async () => {
    try {
        const data = await axios.get(`${baseUrl}/products`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getProductById = async (id) => {
    try {
        const data = await axios.get(`${baseUrl}/products/id/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getProductsByCategory = async (category) => {
    try {
        const data = await axios.get(`${baseUrl}/products/category/${category}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const createProduct = async (product, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.post(`${baseUrl}/products/`, product, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateProduct = async (id, product, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.patch(`${baseUrl}/products/update/${id}`, product, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.delete(`${baseUrl}/products/delete/${id}`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const addProductToOrder = async (order, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.post(`${baseUrl}/order`, order, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.get(`${baseUrl}/order`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getCompletedOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.get(`${baseUrl}/order/completed_orders`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getOrderById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.get(`${baseUrl}/order/${id}`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const completeOrder = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.patch(`${baseUrl}/order/${id}`, config);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateOrder = async (id, token, update) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.patch(`${baseUrl}/order/${id}`, update, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteOrder = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.delete(`${baseUrl}/order/${id}`, config);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const editProfile = async (user, profile, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const data = await axios.post(`${baseUrl}/user/${user.username}/edit`, (user, profile), config);
        return data;
    } catch (error) {
        console.error(error);
    }
}
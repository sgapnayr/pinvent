import axios from 'axios'

const createProduct = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/products', formData)
    return response.data
}

export const getProducts = async () => {
    const response = await axios.get('http://localhost:4000/api/products')
    return response.data
}

const productService = {
    createProduct,
    getProducts
}

export default productService
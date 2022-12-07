import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from 'react-toastify'

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            toast.error(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, actions) {
            console.log('Store Value')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                toast.error(action.payload)
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.products = action.payload
                // toast.success("Product Added Successfully")
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                toast.error(action.payload)
            })
    }
});

export const { CALC_STORE_VALUE } = productSlice.actions

export const selectIsLoading = state => state.productReducer.isLoading
export const selectProducts = state => state.productReducer.products

export default productSlice.reducer
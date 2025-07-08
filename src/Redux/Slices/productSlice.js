import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('http://192.168.1.108:3002/products');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            if (action.payload) {
                const newProduct = {
                    id: Date.now(),
                    description: action.payload.description,
                    price: action.payload.price,
                    title: action.payload.title,
                    category: action.payload.category,
                    image: action.payload.image || '',
                    images: action.payload.images || [action.payload.image] || []
                };
                state.items.push(newProduct);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },

    reducers: {
        addItem: (state, action) => {
            state.products = [...state.products, { ...action.payload, quantity: 1 }];
        },
        removeItem: (state, action) => {
            const updatedProducts = state.products.filter(
                (product) => product.id !== action.payload.id
            );
            state.products = updatedProducts;
        },
        increaseQuantity: (state, action) => {
            const product = state.products.find((item) => item.id === action.payload.id);
            product && (product.quantity += 1);
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find((item) => item.id === action.payload.id);
            product && product.quantity > 1 && (product.quantity -= 1);
        }
    },
});

export const { removeItem, addItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
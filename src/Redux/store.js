import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slices/productSlice';
import cartReducer from './Slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

export const store = configureStore({
    reducer: {
        products: persistReducer(persistConfig, productReducer),
        cart: persistReducer(persistConfig, cartReducer),
    },
});

export const persistor = persistStore(store);
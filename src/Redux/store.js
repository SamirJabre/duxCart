import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slices/productSlice';
import cartReducer from './Slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';

// Fallback storage for cases where AsyncStorage might fail
const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem() {
            return Promise.resolve();
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage = AsyncStorage || createNoopStorage();

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ['products', 'cart'], // Only persist these reducers
    debug: __DEV__, // Enable debug in development
};

const persistedProductReducer = persistReducer({
    ...persistConfig,
    key: 'products'
}, productReducer);

const persistedCartReducer = persistReducer({
    ...persistConfig,
    key: 'cart'
}, cartReducer);

export const store = configureStore({
    reducer: {
        products: persistedProductReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
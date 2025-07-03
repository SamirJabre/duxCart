import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import AddProduct from './Pages/AddProduct'
import Login from './Pages/Login';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();

const Navigations = () => {
    return (
        <Tab.Navigator initialRouteName='Products' screenOptions={{ headerShown: false }} backBehavior='fullHistory'>
            <Tab.Screen name="Products" component={Products} options={{ tabBarLabel: 'Products', tabBarIcon: () => <Text>🛍️</Text> }} />
            <Tab.Screen name="Cart" component={Cart} options={{ tabBarLabel: 'Cart', tabBarIcon: () => <Text>🛒</Text> }} />
            <Tab.Screen name="AddProduct" component={AddProduct} options={{ tabBarLabel: 'Add Product', tabBarIcon: () => <Text>➕</Text> }} />
        </Tab.Navigator>
    );
}

export default Navigations;
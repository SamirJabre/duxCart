import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import AddProduct from './Pages/AddProduct'


const Tab = createBottomTabNavigator();

const Navigations = () => {
    return (
        <Tab.Navigator initialRouteName='Products' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Products" component={Products} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="AddProduct" component={AddProduct} />
        </Tab.Navigator>
    );
}

export default Navigations;
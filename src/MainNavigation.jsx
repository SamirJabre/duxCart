import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AppPage from './Pages/AppPage';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name="AppPage" component={AppPage} options={{ gestureEnabled: false, headerLeft: () => null}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;

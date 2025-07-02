import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigations from '../Navigations'

const AppPage = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Navigations />
        </NavigationContainer>
    )
}

export default AppPage
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Navigations from '../Navigations'

const AppPage = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Navigations />
        </>
    )
}

export default AppPage
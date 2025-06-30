import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigations from './src/Navigations'
import "./global.css"
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Navigations />
      </NavigationContainer>
    </Provider>
  )
}

export default App
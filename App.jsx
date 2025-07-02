import { StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigations from './src/Navigations'
import "./global.css"
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import Login from './src/Pages/Login'

const App = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}

export default App
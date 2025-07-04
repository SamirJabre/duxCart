import { StatusBar } from 'react-native'
import React from 'react'
import "./global.css"
import { Provider } from 'react-redux'
import { store, persistor } from './src/Redux/store'
import MainNavigation from './src/MainNavigation'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  )
}

export default App
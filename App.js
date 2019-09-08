import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './src/screens/MainScreen'
import ScrollScreen from './src/screens/ScrollScreen'

const MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreen,
  },
  Scroll: {
    screen: ScrollScreen
  }
})

const App = createAppContainer(MainNavigator)

export default () => {
  return (
    <App />
  )
}

import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import MainScreen from './src/screens/MainScreen'
import ScrollScreen from './src/screens/ScrollScreen'
import DecayScreen from './src/screens/DecayScreen'
import AddScreen from './src/screens/AddScreen'
import ParallelScreen from './src/screens/ParallelScreen'
import SequenceScreen from './src/screens/SequenceScreen'
import InterpolateScreen from './src/screens/InterpolateScreen'
import CreateAnimatedScreen from './src/screens/CreateAnimatedScreen'

const MainNavigator = createStackNavigator({
  Main: {
    screen: MainScreen,
  },
  Scroll: {
    screen: ScrollScreen
  },
  Decay: {
    screen: DecayScreen
  },
  CreateAnimated: {
    screen: CreateAnimatedScreen
  },
  Interpolate: {
    screen: InterpolateScreen
  },
  Sequence: {
    screen: SequenceScreen
  },
  Parallel: {
    screen: ParallelScreen
  },
  Add: {
    screen: AddScreen
  },
})

const App = createAppContainer(MainNavigator)

export default () => {
  return (
    <App />
  )
}

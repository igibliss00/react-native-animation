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
import D3NumberScreen from './src/screens/D3NumberScreen'
import D3PathScreen from './src/screens/D3PathScreen'
import SVGScreen from './src/screens/SVGScreen'
import FlubberScreen from './src/screens/FlubberScreen'
import CliffScreen from './src/screens/CliffScreen'
import CornerScreen from './src/screens/CornerScreen'

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
  Corner: {
    screen: CornerScreen
  },
  Cliff: {
    screen: CliffScreen
  },
  Flubber: {
    screen: FlubberScreen
  },
  SVG: {
    screen: SVGScreen
  },
  D3Path: {
    screen: D3PathScreen
  },
  D3Number: {
    screen: D3NumberScreen
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

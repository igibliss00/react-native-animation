import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Animated,
  ScrollView,
} from 'react-native';

export default function ScrollScreen() {
  const [animation] = useState(new Animated.Value(0))
  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ["rgb(255, 99, 71)", "rgb(99, 71, 255)"]
  })

  const animatedStyles = {
    backgroundColor: backgroundInterpolate
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: animation
                }
              }
            }
          ])
        }
      >
        <Animated.View 
          style={[styles.content, animatedStyles]}  
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    height: 3000,
  }
});

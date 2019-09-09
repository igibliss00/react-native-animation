import React, { useState } from 'react'
import {
    View,
    Button,
    StyleSheet,
    Animated
} from 'react-native'

export default CreateAnimated = () => {
    const [animation] = useState(new Animated.Value(0))
    const AnimatedButton = Animated.createAnimatedComponent(Button)
    const colorInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 99, 71)', 'rgb(00, 71, 255)']
    })
    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
        }).start(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
            })
        })
    }

    return (
        <View style={styles.container}>
            <AnimatedButton 
                title="Press Me" 
                onPress={startAnimation}
                color={colorInterpolate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
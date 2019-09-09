import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native'

export default InterpolateScreen = () => {
    const [animation] = useState(new Animated.Value(0))
    const animatedInterpolate = animation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 300, 0]
    })

    const interpolatedInterpolate = animatedInterpolate.interpolate({
        inputRange: [0, 300],
        outputRange: [1, .5]
    })

    const translateXInterpolate = animatedInterpolate.interpolate({
        inputRange: [0, 10, 40, 100, 300],
        outputRange: [3, -20, 50, -100, 200]
    })
    const animatedStyles = {
        transform: [
            {
                translateX: animatedInterpolate
            },
            {
                translateY: translateXInterpolate
            },
        ],
        opacity: interpolatedInterpolate,
    }
    
    const onPressHandler = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 400,
        }).start(() => {
            Animated.timing(animation, {
                toValue: 2,
                duration: 1500,
            }).start()
        })    
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressHandler}>
                <Animated.View style={[styles.box, animatedStyles]} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'tomato'
    }    
})



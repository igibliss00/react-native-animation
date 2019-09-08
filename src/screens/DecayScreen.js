import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
} from 'react-native'

export default DecayScreen = () => {
    const [animation] = useState(new Animated.ValueXY(0))
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e, gestureState) => {
            animation.extractOffset()
        },
        onPanResponderMove: Animated.event([
            null,
            { dx: animation.x, dy: animation.y },
        ]),
        onPanResponderRelease: (e, { vx, vy }) => {
            Animated.decay(animation, {
                velocity: { x: vx, y: vy },
                deceleration: 0.997,
            }).start()
        }
    })

    const animatedStyle = {
        transform: animation.getTranslateTransform()
    }

    return (
        <View>
            <Animated.View 
                style={[styles.box, animatedStyle]}
                {...panResponder.panHandlers}
            />
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
        width: 50,
        height: 50,
        backgroundColor: 'tomato',
    }
})


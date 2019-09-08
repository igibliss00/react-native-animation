import React, { useState } from 'react'
import {
    View,
    Animated,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

export default Sequence = () => {
    const [scaleAnimation] = useState(new Animated.Value(1))
    const [rotateAnimation] = useState(new Animated.Value(0))
    const rotateInterpolate = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1080deg']
    })

    const animatedStyles = {
        transform: [
            {
                scale: scaleAnimation,
            },{
                rotate: rotateInterpolate
            }
        ]
    }

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnimation, {
                toValue: 2,
                duration: 500,
            }),
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 1500,
            })
        ]).start()
    }

    return (
        <View style={styles.container}> 
            <TouchableWithoutFeedback onPress={handlePress}>
                <Animated.View style={[styles.box, animatedStyles]} />
            </TouchableWithoutFeedback>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },     box: {
        height: 150,
        width: 150,
        backgroundColor: 'tomato'
    }
})
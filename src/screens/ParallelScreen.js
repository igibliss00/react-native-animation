import React, { useState } from 'react'
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

export default Parallel = () => {
    const [colorAnimation] = useState(new Animated.Value(0))
    const [scaleAnimation] = useState(new Animated.Value(1))
    const handlePress = () => {
        Animated.parallel([
            Animated.timing(colorAnimation, {
                toValue: 1,
                duration: 500,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 2, 
                duration: 300
            })
        ]).start()
    }
    const backgroundInterpolate = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 99, 71)', 'rgb(00, 71, 255)']
    })
    const animatedStyles = {
        backgroundColor: backgroundInterpolate,
        transform: [{
            scale: scaleAnimation,            
        }]
    }
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={handlePress}>
                <Animated.View style={[styles.box, animatedStyles]} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        height: 150,
        width: 150,
    }
})